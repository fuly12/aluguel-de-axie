#!/usr/bin/env node
// Captura o ranking atual do Top 100 (Season Leaderboards) + o time de cada
// jogador, e acrescenta um novo snapshot em top100.js. E a mesma logica de
// fetch_top100_background()/get_player_team_data() do programa bottop100.py
// que o Fuly roda localmente, portada pra Node pra poder ser disparada
// automaticamente pela rotina agendada (sem precisar do computador dele ligado).
// Uso: node scripts/capture-top100.mjs "Nome da temporada"

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { ProxyAgent, request } from "undici";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const TOP100_JS_PATH = path.join(REPO_ROOT, "top100.js");

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

const URL_RANKING = "https://api-gateway.skymavis.com/origins/v2/season-leaderboards";
const URL_FIGHTERS = "https://api-gateway.skymavis.com/origins/v2/community/users/fighters";
const URL_RUNES = "https://api-gateway.skymavis.com/origins/v2/community/runes";
const urlBattle = (userId) => `https://api-gateway.skymavis.com/origin/v2/community/users/${userId}/battle-logs`;

const PROXY_SERVER = process.env.HTTPS_PROXY || process.env.https_proxy;
const proxyAgent = PROXY_SERVER ? new ProxyAgent(PROXY_SERVER) : null;

async function httpGetJson(url, params, timeoutMs = 10000) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : "";
  try {
    const res = await request(`${url}${qs}`, {
      dispatcher: proxyAgent || undefined,
      headers: { Accept: "application/json", "X-API-Key": nextKey(), "User-Agent": "Mozilla/5.0" },
      headersTimeout: timeoutMs,
      bodyTimeout: timeoutMs,
    });
    const chunks = [];
    for await (const c of res.body) chunks.push(c);
    if (res.statusCode !== 200) return null;
    return JSON.parse(Buffer.concat(chunks).toString());
  } catch (e) {
    return null;
  }
}

// ---------- catalogo de runas (id -> imageUrl); mesma ideia do catalogo de charms do bottop100.py ----------
const RUNE_CATALOG = {};
async function ensureRuneCatalog() {
  let offset = 0;
  for (let page = 0; page < 300; page++) {
    const json = await httpGetJson(URL_RUNES, { limit: 100, offset });
    const items = json?._items || [];
    if (items.length === 0) break;
    for (const r of items) {
      if (r.id && r.item?.imageUrl) RUNE_CATALOG[r.id] = r.item.imageUrl;
    }
    if (items.length < 100) break;
    offset += 100;
  }
  console.log(`Catalogo de runas: ${Object.keys(RUNE_CATALOG).length} runas`);
}

function getRuneImage(runeId) {
  if (!runeId) return null;
  runeId = String(runeId);
  if (RUNE_CATALOG[runeId]) return RUNE_CATALOG[runeId];
  if (/^\d+$/.test(runeId)) return `https://axiecdn.axieinfinity.com/runes/${runeId}.png`;
  const apiId = runeId.startsWith("rune_") ? runeId : `rune_${runeId}`;
  return `https://assets.axieinfinity.com/explorer/images/runes/${apiId}.png`;
}

// ---------- genesMetamorph de cada axie de um jogador ----------
async function fetchMorphGenesForUser(userId) {
  const metamorphMap = {};
  let offset = 0;
  const limit = 100;
  for (let page = 0; page < 20; page++) {
    const json = await httpGetJson(URL_FIGHTERS, { userID: userId, axieType: "ronin", limit, offset });
    const items = json?._items || [];
    if (items.length === 0) break;
    for (const f of items) {
      const axieId = String(f.id);
      const morphVal = f.genesMetamorph;
      if (morphVal && !["0", "0x0", ""].includes(String(morphVal))) {
        metamorphMap[axieId] = morphVal;
      } else if (f.genes && !["0", "0x0", ""].includes(String(f.genes))) {
        if (!(axieId in metamorphMap)) metamorphMap[axieId] = f.genes;
      }
    }
    if (items.length < limit) break;
    offset += limit;
  }
  return metamorphMap;
}

// ---------- time (ate 3 axies) da ultima partida de um jogador ----------
async function getPlayerTeamData(userId) {
  try {
    const metamorphMap = await fetchMorphGenesForUser(userId);
    const battleJson = await httpGetJson(urlBattle(userId), { limit: 1 });
    const items = battleJson?._items || [];
    if (items.length === 0) return [];

    const players = items[0]?.gameData?.players || [];
    const myP = players.find((p) => p.userID === userId);
    if (!myP) return [];

    const fighters = (myP.team?.fighters || []).slice(0, 3);
    const teamList = [];

    for (const f of fighters) {
      const axieId = String(f.axieID || "0");
      let genesFinal = null;
      let isMorph = false;

      const morphVal = metamorphMap[axieId];
      if (morphVal && !["0", "0x0", ""].includes(String(morphVal))) {
        genesFinal = morphVal;
        isMorph = true;
      }
      if (!genesFinal) {
        const v = f.genesMetamorph || f.genes_metamorph;
        if (v && !["0", "0x0", ""].includes(String(v))) {
          genesFinal = v;
          isMorph = true;
        }
      }
      if (!genesFinal && f.genes && !["0", "0x0", ""].includes(String(f.genes))) {
        genesFinal = f.genes;
      }
      if (!genesFinal) {
        const v = f.newGenes || f.new_genes;
        if (v && !["0", "0x0", ""].includes(String(v))) genesFinal = v;
      }
      genesFinal = genesFinal || "";

      let runeId = null;
      const rawRunes = f.runes;
      if (Array.isArray(rawRunes) && rawRunes.length > 0) {
        runeId = rawRunes[0];
      } else if (f.rune) {
        runeId = typeof f.rune === "object" ? f.rune.tokenId : f.rune;
      }

      teamList.push({
        id: axieId,
        genes: genesFinal,
        is_morph: isMorph,
        rune_img: getRuneImage(runeId),
        link: `https://axie.top/axie/${axieId}`,
        static_img: `https://axiecdn.axieinfinity.com/axies/${axieId}/axie/axie-full-transparent.png`,
      });
    }
    return teamList;
  } catch (e) {
    console.error(`  [team] falha pro usuario ${userId}: ${e.message}`);
    return [];
  }
}

// ---------- top100.js ----------
function loadTop100Datasets() {
  try {
    const content = readFileSync(TOP100_JS_PATH, "utf8");
    const prefix = "const TOP100_DATASETS = ";
    if (!content.startsWith(prefix)) return [];
    return JSON.parse(content.slice(prefix.length).replace(/;\s*$/, ""));
  } catch {
    return [];
  }
}

function saveTop100Datasets(datasets) {
  const prefix = "const TOP100_DATASETS = ";
  writeFileSync(TOP100_JS_PATH, prefix + JSON.stringify(datasets) + ";\n");
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function makeKey(now) {
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

function formatSavedAt(now) {
  return `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

async function main() {
  const seasonName = process.argv[2];
  if (!seasonName) {
    console.error('Uso: node scripts/capture-top100.mjs "Nome da temporada"');
    process.exitCode = 1;
    return;
  }

  console.log("Buscando catalogo de runas...");
  await ensureRuneCatalog();

  console.log("Buscando ranking Top 100...");
  const rankingJson = await httpGetJson(URL_RANKING, { limit: 100, offset: 0 });
  const rankedPlayers = rankingJson?._items || [];
  if (rankedPlayers.length === 0) {
    throw new Error("Ranking retornou vazio - API pode estar fora do ar ou chave invalida");
  }
  console.log(`${rankedPlayers.length} jogadores no ranking. Buscando times...`);

  const CONCURRENCY = 10;
  const results = new Array(rankedPlayers.length);
  let nextIdx = 0;
  let done = 0;
  async function worker() {
    for (;;) {
      const i = nextIdx++;
      if (i >= rankedPlayers.length) break;
      const p = rankedPlayers[i];
      const team = await getPlayerTeamData(p.userID);
      results[i] = { rank: p.topRank, name: p.name, stars: p.vstar, team };
      done++;
      if (done % 10 === 0) console.log(`  ${done}/${rankedPlayers.length} times buscados...`);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  results.sort((a, b) => a.rank - b.rank);

  const now = new Date();
  const newDataset = {
    key: makeKey(now),
    name: seasonName,
    saved_at: formatSavedAt(now),
    players: results,
  };

  const datasets = loadTop100Datasets();
  datasets.unshift(newDataset);
  saveTop100Datasets(datasets);

  console.log(`Captura concluida: "${seasonName}" (key ${newDataset.key}), ${results.length} jogadores salvos em top100.js`);
  console.log(`DATASET_KEY=${newDataset.key}`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exitCode = 1;
});
