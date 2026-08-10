#!/usr/bin/env node
// Refreshes level and morph (isMorphed / morphGenesHex) data for every collectible
// axie in data.js, using the Axie Infinity marketplace GraphQL API and the local
// axie-renderer.bundle.js to detect which axies currently have evolved ("morphed")
// body parts. Run with: node scripts/update-morph-data.mjs

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { chromium } from "playwright-core";
import { ProxyAgent, request } from "undici";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const DATA_JS_PATH = path.join(REPO_ROOT, "data.js");
const RENDERER_PATH = path.join(REPO_ROOT, "axie-renderer.bundle.js");

const API_KEYS = [
  "EIQGZAmXQtwWsFksL90FYbOlVtGCKkJM",
  "Kpp5fReHLJMz4mwlTLecexM3r2qmwo0a",
  "wU8SuKBagVeiIxUK07N318cWnUQE2za9",
  "7tBFOSTnSY5EfdT7FnevFvuB8auZURoG",
];
let keyIndex = 0;
function nextKey() {
  const k = API_KEYS[keyIndex % API_KEYS.length];
  keyIndex++;
  return k;
}

const MARKET_URL = "https://api-gateway.skymavis.com/graphql/axie-marketplace";
const PROXY_SERVER = process.env.HTTPS_PROXY || process.env.https_proxy;
const marketProxyAgent = PROXY_SERVER ? new ProxyAgent(PROXY_SERVER) : null;
const PART_SLOTS = ["eyes", "ears", "horn", "mouth", "back", "tail"];
const MORPH_LV2_THRESHOLD = 4;

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

async function fetchBatch(ids, fields) {
  const parts = ids.map((id, i) => `a${i}: axie(axieId: "${id}") { id ${fields} }`);
  const query = "query { " + parts.join(" ") + " }";
  const headers = {
    "Content-Type": "application/json",
    "X-API-Key": nextKey(),
    "User-Agent": "Mozilla/5.0",
    Accept: "*/*",
  };
  const res = await request(MARKET_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
    dispatcher: marketProxyAgent || undefined,
  });
  const chunks = [];
  for await (const chunk of res.body) chunks.push(chunk);
  const json = JSON.parse(Buffer.concat(chunks).toString());
  const out = {};
  const data = json.data || {};
  ids.forEach((id, i) => {
    out[id] = data[`a${i}`] || null;
  });
  return out;
}

async function fetchAllAxieInfo(ids, fields, batchSize = 25) {
  const results = {};
  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    let attempt = 0;
    while (attempt < 3) {
      try {
        Object.assign(results, await fetchBatch(batch, fields));
        break;
      } catch (e) {
        attempt++;
        if (attempt >= 3) throw e;
        await new Promise((r) => setTimeout(r, 1500 * attempt));
      }
    }
  }
  return results;
}

function buildDecodeHarnessHtml() {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>
<div id="c1" style="width:200px;height:200px;"></div>
<script src="/axie-renderer.bundle.js"></script>
<script>
window.captured = null;
const origProto = window.AxieRenderer.prototype.getResources;
window.AxieRenderer.prototype.getResources = function (mixer) {
  const comboObj = {};
  if (mixer.combo instanceof Map) {
    for (const [k, v] of mixer.combo.entries()) comboObj[k] = v;
  }
  window.captured = comboObj;
  return origProto.call(this, mixer);
};
window.decode = async function (hex) {
  window.captured = null;
  let renderer;
  try {
    renderer = new window.AxieRenderer("c1");
    await renderer.render(hex, 0.2, 20).catch(() => {});
  } catch (e) {}
  try { if (renderer) renderer.destroy(); } catch (e) {}
  return window.captured;
};
window.ready = true;
<\/script>
</body></html>`;
}

async function main() {
  if (!existsSync(RENDERER_PATH)) throw new Error("axie-renderer.bundle.js not found at repo root");

  console.log("Loading data.js...");
  const axieData = loadAxieData();
  const collectible = axieData.filter((a) => a.collectible);
  const ids = [...new Set(collectible.map((a) => a.id))];
  console.log(`Collectible axies: ${collectible.length} (${ids.length} unique ids)`);

  console.log("Fetching level + genes/newGenes from marketplace API...");
  const info = await fetchAllAxieInfo(ids, "axpInfo { level } genes newGenes");

  // Serve the repo root + a small decode harness over local HTTP for the headless browser.
  const http = await import("node:http");
  const harnessHtml = buildDecodeHarnessHtml();
  const server = http.createServer((req, res) => {
    if (req.url === "/__harness.html") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(harnessHtml);
      return;
    }
    const filePath = path.join(REPO_ROOT, decodeURIComponent(req.url.split("?")[0]));
    if (!filePath.startsWith(REPO_ROOT) || !existsSync(filePath)) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    res.writeHead(200);
    res.end(readFileSync(filePath));
  });
  await new Promise((resolve) => server.listen(8123, "127.0.0.1", resolve));

  async function fetchAssetViaProxy(url) {
    const res = await request(url, {
      dispatcher: marketProxyAgent || undefined,
      headers: { "User-Agent": "curl/8.5.0", Accept: "*/*" },
    });
    const chunks = [];
    for await (const chunk of res.body) chunks.push(chunk);
    return { status: res.statusCode, contentType: res.headers["content-type"] || "image/png", body: Buffer.concat(chunks) };
  }

  console.log("Launching headless browser to decode genes...");
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  });
  const page = await browser.newPage();
  await page.route("**axiecdn.axieinfinity.com/**", async (route) => {
    try {
      const r = await fetchAssetViaProxy(route.request().url());
      await route.fulfill({ status: r.status, contentType: r.contentType, body: r.body });
    } catch (e) {
      await route.abort();
    }
  });
  await page.goto("http://127.0.0.1:8123/__harness.html", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForFunction(() => window.ready === true, { timeout: 15000 });

  const morphResults = {};
  let done = 0;
  for (const id of ids) {
    const axieInfo = info[id];
    const level = axieInfo?.axpInfo?.level ?? null;
    const newGenes = axieInfo?.newGenes ?? null;
    let isMorphed = false;
    let lv2Count = 0;
    if (newGenes) {
      let combo = null;
      try {
        combo = await page.evaluate((hex) => window.decode(hex), newGenes);
      } catch (e) {
        combo = null;
      }
      if (combo) {
        for (const slot of PART_SLOTS) {
          if (combo[slot] && combo[slot].includes("lv2")) lv2Count++;
        }
      }
      isMorphed = lv2Count >= MORPH_LV2_THRESHOLD;
    }
    morphResults[id] = { level, isMorphed, morphGenesHex: isMorphed ? newGenes : null };
    done++;
    if (done % 25 === 0) console.log(`  ${done}/${ids.length}`);
  }

  await browser.close();
  server.close();

  console.log("Applying updates to data.js...");
  let levelChanges = 0;
  let morphChanges = 0;
  for (const axie of axieData) {
    const r = morphResults[axie.id];
    if (!r) continue;
    if (r.level != null && axie.level !== r.level) {
      axie.level = r.level;
      levelChanges++;
    }
    if (axie.isMorphed !== r.isMorphed || axie.morphGenesHex !== r.morphGenesHex) {
      axie.isMorphed = r.isMorphed;
      axie.morphGenesHex = r.morphGenesHex;
      if (!r.isMorphed) axie.morphParts = null;
      morphChanges++;
    }
  }
  console.log(`Level changes: ${levelChanges}, morph status changes: ${morphChanges}`);

  if (levelChanges > 0 || morphChanges > 0) {
    saveAxieData(axieData);
    console.log("data.js updated.");
    process.exitCode = 0;
  } else {
    console.log("No changes detected.");
  }
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exitCode = 1;
});
