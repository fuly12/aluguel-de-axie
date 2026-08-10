#!/usr/bin/env node
// Refreshes level and morph (isMorphed / morphGenesHex) data for every collectible
// axie in data.js, using the official Axie Infinity Origins "fighters" endpoint,
// which returns `genesMetamorph` for any axie that has actually undergone the
// in-game Morph transformation (and omits it otherwise). This is the same signal
// the Axie mobile app / Origins client uses, so it's authoritative -- no guessing.
// Run with: node scripts/update-morph-data.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { ProxyAgent, request } from "undici";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const DATA_JS_PATH = path.join(REPO_ROOT, "data.js");
const PARTNERS_JS_PATH = path.join(REPO_ROOT, "partners.js");

const API_KEYS = [
  "EIQGZAmXQtwWsFksL90FYbOlVtGCKkJM",
  "Kpp5fReHLJMz4mwlTLecexM3r2qmwo0a",
  "wU8SuKBagVeiIxUK07N318cWnUQE2za9",
  "7tBFOSTnSY5EfdT7FnevFvuB8auZURoG",
];
let keyIndex = 0;
function nextKey() {
  return API_KEYS[keyIndex++ % API_KEYS.length];
}

const MARKET_URL = "https://api-gateway.skymavis.com/graphql/axie-marketplace";
const FIGHTERS_URL = "https://api-gateway.skymavis.com/origins/v2/community/users/fighters";
const PROXY_SERVER = process.env.HTTPS_PROXY || process.env.https_proxy;
const proxyAgent = PROXY_SERVER ? new ProxyAgent(PROXY_SERVER) : null;

async function httpGetJson(url, params) {
  const qs = new URLSearchParams(params).toString();
  const res = await request(`${url}?${qs}`, {
    dispatcher: proxyAgent || undefined,
    headers: { Accept: "application/json", "X-API-Key": nextKey(), "User-Agent": "Mozilla/5.0" },
  });
  const chunks = [];
  for await (const c of res.body) chunks.push(c);
  return JSON.parse(Buffer.concat(chunks).toString());
}

async function httpPostJson(url, body) {
  const res = await request(url, {
    method: "POST",
    dispatcher: proxyAgent || undefined,
    headers: { "Content-Type": "application/json", Accept: "*/*", "X-API-Key": nextKey(), "User-Agent": "Mozilla/5.0" },
    body: JSON.stringify(body),
  });
  const chunks = [];
  for await (const c of res.body) chunks.push(c);
  return JSON.parse(Buffer.concat(chunks).toString());
}

function loadAxieData() {
  const content = readFileSync(DATA_JS_PATH, "utf8");
  const prefix = "const AXIE_DATA = ";
  if (!content.startsWith(prefix)) throw new Error("Unexpected data.js format");
  return JSON.parse(content.slice(prefix.length).replace(/;\s*$/, ""));
}

function saveAxieData(axieData) {
  const prefix = "const AXIE_DATA = ";
  writeFileSync(DATA_JS_PATH, prefix + JSON.stringify(axieData, null, 2) + ";\n");
}

function loadPartnerWallets() {
  const content = readFileSync(PARTNERS_JS_PATH, "utf8");
  const match = content.match(/const PARTNER_NAMES = (\{[\s\S]*?\});/);
  if (!match) throw new Error("Could not find PARTNER_NAMES in partners.js");
  return Object.keys(JSON.parse(match[1]));
}

async function getAccountId(wallet) {
  const query = `query GetAxieOwnerFallback($owner: String) { axies(owner: $owner, size: 1) { results { ownerProfile { accountId } } } }`;
  const json = await httpPostJson(MARKET_URL, { query, variables: { owner: wallet } });
  return json?.data?.axies?.results?.[0]?.ownerProfile?.accountId || null;
}

async function fetchAllFighters(userId) {
  const metamorphMap = {};
  let offset = 0;
  const limit = 100;
  for (let page = 0; page < 50; page++) {
    const json = await httpGetJson(FIGHTERS_URL, { userID: userId, axieType: "ronin", limit, offset });
    const items = json?._items || [];
    if (items.length === 0) break;
    for (const f of items) {
      if (f.genesMetamorph) metamorphMap[String(f.id)] = f.genesMetamorph;
    }
    if (items.length < limit) break;
    offset += limit;
  }
  return metamorphMap;
}

async function fetchLevels(ids, batchSize = 25) {
  const levels = {};
  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    const parts = batch.map((id, j) => `a${j}: axie(axieId: "${id}") { id axpInfo { level } }`);
    const query = "query { " + parts.join(" ") + " }";
    const json = await httpPostJson(MARKET_URL, { query });
    const data = json.data || {};
    batch.forEach((id, j) => {
      const lvl = data[`a${j}`]?.axpInfo?.level;
      if (lvl != null) levels[id] = lvl;
    });
  }
  return levels;
}

async function main() {
  console.log("Loading data.js and partners.js...");
  const axieData = loadAxieData();
  const wallets = loadPartnerWallets();
  console.log("Wallets:", wallets);

  console.log("Resolving Ronin account IDs...");
  const metamorphByAxieId = {};
  for (const wallet of wallets) {
    const accountId = await getAccountId(wallet);
    if (!accountId) {
      console.log(`  WARNING: could not resolve accountId for ${wallet}, skipping`);
      continue;
    }
    const map = await fetchAllFighters(accountId);
    console.log(`  ${wallet} -> ${accountId}: ${Object.keys(map).length} morphed fighters`);
    Object.assign(metamorphByAxieId, map);
  }

  const collectible = axieData.filter((a) => a.collectible);
  const ids = [...new Set(collectible.map((a) => a.id))];
  console.log(`Fetching levels for ${ids.length} collectible axies...`);
  const levels = await fetchLevels(ids);

  console.log("Applying updates to data.js...");
  let levelChanges = 0;
  let morphChanges = 0;
  for (const axie of axieData) {
    if (!axie.collectible) continue;
    const newLevel = levels[axie.id];
    if (newLevel != null && axie.level !== newLevel) {
      axie.level = newLevel;
      levelChanges++;
    }
    const hex = metamorphByAxieId[axie.id] || null;
    const isMorphed = !!hex;
    if (axie.isMorphed !== isMorphed || axie.morphGenesHex !== hex) {
      axie.isMorphed = isMorphed;
      axie.morphGenesHex = hex;
      if (!isMorphed) axie.morphParts = null;
      morphChanges++;
    }
  }
  console.log(`Level changes: ${levelChanges}, morph status changes: ${morphChanges}`);

  if (levelChanges > 0 || morphChanges > 0) {
    saveAxieData(axieData);
    console.log("data.js updated.");
  } else {
    console.log("No changes detected.");
  }
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exitCode = 1;
});
