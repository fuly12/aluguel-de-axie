#!/usr/bin/env node
// Pre-renders a static PNG for every axie that has undergone the in-game Morph
// transformation, in two places:
//   1. axie.isMorphed && axie.morphGenesHex in data.js (our own axies, "Morfado" tab)
//      -> saved to morph-images/{axieId}.png
//   2. axie.is_morph in each snapshot of TOP100_DATASETS (top100.js)
//      -> saved to top100-images/{datasetKey}/{axieId}.png (one folder per season,
//         since the same axie id can be morphed in one season's snapshot and not
//         in an older one -- each season's photo is permanent once taken)
// Both use the same AxieRenderer (PixiJS + Spine) bundle the site itself uses.
//
// Why: rendering the morphed look live, in each visitor's browser, turned out to be
// fragile on mobile (silent WebGL/texture-loading failures produced a blank image).
// Doing it once here, offline, and serving the result as a plain static image (like
// the normal axie photos, which already work everywhere) removes that whole class
// of failure for site visitors.
//
// Run with: node scripts/render-morph-images.mjs
// Only axies/season-snapshots missing their file are (re)rendered; existing ones are
// left untouched, so this is cheap and safe to run repeatedly (e.g. every time the
// periodic automation runs, or after a new Top 100 season snapshot is added).

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { chromium } from "playwright";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const DATA_JS_PATH = path.join(REPO_ROOT, "data.js");
const TOP100_JS_PATH = path.join(REPO_ROOT, "top100.js");
const MORPH_IMAGES_DIR = path.join(REPO_ROOT, "morph-images");
const TOP100_IMAGES_DIR = path.join(REPO_ROOT, "top100-images");
const RENDERER_BUNDLE_PATH = path.join(REPO_ROOT, "axie-renderer.bundle.js");
const MORPH_MANIFEST_PATH = path.join(MORPH_IMAGES_DIR, "manifest.json");
const TOP100_MANIFEST_PATH = path.join(TOP100_IMAGES_DIR, "manifest.json");
const RENDER_TIMEOUT_MS = 25000;

// The manifest records which genesHex produced the currently-saved image for each
// key (axie id, or "{datasetKey}/{axieId}" for Top 100). A file existing on disk is
// NOT enough on its own to call it "done" -- an axie can be re-morphed later (a part
// changes), which changes morphGenesHex without the file going away, so the cached
// image would silently go stale. Comparing against the manifest catches that.
function loadManifest(manifestPath) {
  if (!existsSync(manifestPath)) return {};
  try {
    return JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch (e) {
    return {};
  }
}

function saveManifest(manifestPath, manifest) {
  const dir = path.dirname(manifestPath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
}

// Both Chromium's own network stack and Node's http clients (undici/fetch) get
// blocked (connection reset / HTTP 403) when fetching the mixer part textures
// from axiecdn.axieinfinity.com in this environment -- but plain `curl` reaches
// the exact same URLs fine (confirmed: curl succeeds 100% of repeated tries,
// undici gets a 403 WAF page every time). So every request the page makes for
// a texture is intercepted here and fetched via `curl` in a child process
// instead; PixiJS's loader never touches the real network directly.
async function fetchViaCurl(url) {
  const { stdout } = await execFileAsync(
    "curl",
    ["-sS", "--max-time", "15", "--fail", url],
    { encoding: "buffer", maxBuffer: 20 * 1024 * 1024 }
  );
  return stdout;
}

async function setupTextureProxy(page) {
  await page.route("https://axiecdn.axieinfinity.com/**", async (route) => {
    const url = route.request().url();
    try {
      const body = await fetchViaCurl(url);
      await route.fulfill({ status: 200, contentType: "image/png", body });
    } catch (err) {
      console.error(`  [proxy] falha buscando ${url}: ${err.message}`);
      await route.abort("failed");
    }
  });
}

function loadAxieData() {
  const content = readFileSync(DATA_JS_PATH, "utf8");
  const prefix = "const AXIE_DATA = ";
  if (!content.startsWith(prefix)) throw new Error("Unexpected data.js format");
  return JSON.parse(content.slice(prefix.length).replace(/;\s*$/, ""));
}

function loadTop100Datasets() {
  if (!existsSync(TOP100_JS_PATH)) return [];
  const content = readFileSync(TOP100_JS_PATH, "utf8");
  const prefix = "const TOP100_DATASETS = ";
  if (!content.startsWith(prefix)) throw new Error("Unexpected top100.js format");
  return JSON.parse(content.slice(prefix.length).replace(/;\s*$/, ""));
}

function collectPendingMorphTab(manifest) {
  return loadAxieData()
    .filter((a) => a.isMorphed && a.morphGenesHex)
    .filter((a) => {
      const outFile = path.join(MORPH_IMAGES_DIR, `${a.id}.png`);
      return !existsSync(outFile) || manifest[a.id] !== a.morphGenesHex;
    })
    .map((a) => ({
      label: `#${a.id}`,
      key: a.id,
      genes: a.morphGenesHex,
      outFile: path.join(MORPH_IMAGES_DIR, `${a.id}.png`),
    }));
}

function collectPendingTop100(manifest) {
  const pending = [];
  for (const dataset of loadTop100Datasets()) {
    const dir = path.join(TOP100_IMAGES_DIR, dataset.key);
    for (const p of dataset.players || []) {
      for (const axie of p.team || []) {
        if (!axie.is_morph || !axie.genes) continue;
        const key = `${dataset.key}/${axie.id}`;
        const outFile = path.join(dir, `${axie.id}.png`);
        if (existsSync(outFile) && manifest[key] === axie.genes) continue;
        pending.push({ label: `Top100 ${dataset.name} #${axie.id}`, key, genes: axie.genes, outFile });
      }
    }
  }
  return pending;
}

async function renderOnce(page, genesHex) {
  const renderPromise = page.evaluate(async (genes) => {
    const containerId = "render-target-" + Math.random().toString(36).slice(2);
    const container = document.createElement("div");
    container.id = containerId;
    container.style.width = "300px";
    container.style.height = "300px";
    document.body.appendChild(container);
    try {
      const renderer = new window.AxieRenderer(containerId);
      await renderer.render(genes, 0.3, 95);
      await new Promise((r) => setTimeout(r, 200));
      const dataUrl = renderer.extractImage();
      renderer.destroy();
      return { ok: true, dataUrl };
    } catch (err) {
      return { ok: false, error: err.message };
    } finally {
      container.remove();
    }
  }, genesHex);

  const timeoutPromise = new Promise((resolve) =>
    setTimeout(() => resolve({ ok: false, error: `timeout apos ${RENDER_TIMEOUT_MS}ms` }), RENDER_TIMEOUT_MS)
  );

  return Promise.race([renderPromise, timeoutPromise]);
}

function isDataUrlBlank(page, dataUrl) {
  return page.evaluate((url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, c.width, c.height).data;
        let visible = 0;
        let total = 0;
        for (let i = 0; i < data.length; i += 4 * 37) {
          total++;
          if (data[i + 3] > 20 && data[i] + data[i + 1] + data[i + 2] > 15) visible++;
        }
        resolve(total === 0 || visible / total < 0.02);
      };
      img.onerror = () => resolve(true);
      img.src = url;
    });
  }, dataUrl);
}

async function renderBatch(items, manifest, manifestPath) {
  if (items.length === 0) return { rendered: 0, failed: [] };

  const browser = await chromium.launch();
  let page = await browser.newPage({ viewport: { width: 400, height: 400 } });
  await setupTextureProxy(page);
  await page.goto("about:blank");
  await page.addScriptTag({ path: RENDERER_BUNDLE_PATH });

  const freshPage = async () => {
    await page.close().catch(() => {});
    page = await browser.newPage({ viewport: { width: 400, height: 400 } });
    await setupTextureProxy(page);
    await page.goto("about:blank");
    await page.addScriptTag({ path: RENDERER_BUNDLE_PATH });
  };

  let rendered = 0;
  const failed = [];

  for (const item of items) {
    let result = null;
    const MAX_ATTEMPTS = 3;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      result = await renderOnce(page, item.genes);
      if (result.ok) break;
      console.log(`  tentativa ${attempt}/${MAX_ATTEMPTS} falhou pro ${item.label}: ${result.error}`);
      if (result.error && result.error.startsWith("timeout")) await freshPage();
      await new Promise((r) => setTimeout(r, 1500));
    }

    if (!result.ok || !result.dataUrl || result.dataUrl.length < 200) {
      failed.push({ label: item.label, error: result?.error || "imagem vazia" });
      console.log(`  FALHOU: ${item.label}`);
      continue;
    }

    const blank = await isDataUrlBlank(page, result.dataUrl);
    if (blank) {
      failed.push({ label: item.label, error: "renderizacao vazia (sem conteudo visivel)" });
      console.log(`  FALHOU (vazio): ${item.label}`);
      continue;
    }

    const dir = path.dirname(item.outFile);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    const base64 = result.dataUrl.replace(/^data:image\/png;base64,/, "");
    writeFileSync(item.outFile, Buffer.from(base64, "base64"));
    manifest[item.key] = item.genes;
    saveManifest(manifestPath, manifest);
    rendered++;
    console.log(`  OK: ${item.label}`);
  }

  await browser.close();
  return { rendered, failed };
}

// One-time bootstrap for a manifest that doesn't exist yet: trust every image
// already on disk as matching the axie's current genes (we have no record of what
// genes actually produced it), so the first run under the new manifest system
// doesn't re-render ~1500 images that are almost certainly still correct. Anything
// that genuinely went stale before this point won't be caught by the bootstrap --
// only re-morphs from here on are guaranteed to be detected.
function bootstrapMorphManifest() {
  const manifest = {};
  for (const a of loadAxieData()) {
    if (a.isMorphed && a.morphGenesHex && existsSync(path.join(MORPH_IMAGES_DIR, `${a.id}.png`))) {
      manifest[a.id] = a.morphGenesHex;
    }
  }
  return manifest;
}

function bootstrapTop100Manifest() {
  const manifest = {};
  for (const dataset of loadTop100Datasets()) {
    for (const p of dataset.players || []) {
      for (const axie of p.team || []) {
        if (!axie.is_morph || !axie.genes) continue;
        const key = `${dataset.key}/${axie.id}`;
        if (existsSync(path.join(TOP100_IMAGES_DIR, dataset.key, `${axie.id}.png`))) {
          manifest[key] = axie.genes;
        }
      }
    }
  }
  return manifest;
}

async function main() {
  const morphManifest = existsSync(MORPH_MANIFEST_PATH) ? loadManifest(MORPH_MANIFEST_PATH) : bootstrapMorphManifest();
  const top100Manifest = existsSync(TOP100_MANIFEST_PATH) ? loadManifest(TOP100_MANIFEST_PATH) : bootstrapTop100Manifest();

  const morphPending = collectPendingMorphTab(morphManifest);
  const top100Pending = collectPendingTop100(top100Manifest);

  if (morphPending.length === 0 && top100Pending.length === 0) {
    saveManifest(MORPH_MANIFEST_PATH, morphManifest);
    saveManifest(TOP100_MANIFEST_PATH, top100Manifest);
    console.log("Nenhuma imagem nova pra renderizar.");
    return;
  }

  if (morphPending.length > 0) {
    console.log(`Renderizando ${morphPending.length} imagem(ns) da aba Morfado...`);
    const { rendered, failed } = await renderBatch(morphPending, morphManifest, MORPH_MANIFEST_PATH);
    console.log(`Morfado: ${rendered} renderizada(s), ${failed.length} falharam.`);
    if (failed.length > 0) console.log("Falhas (Morfado):", JSON.stringify(failed, null, 2));
  } else {
    saveManifest(MORPH_MANIFEST_PATH, morphManifest);
  }

  if (top100Pending.length > 0) {
    console.log(`Renderizando ${top100Pending.length} imagem(ns) do Top 100...`);
    const { rendered, failed } = await renderBatch(top100Pending, top100Manifest, TOP100_MANIFEST_PATH);
    console.log(`Top 100: ${rendered} renderizada(s), ${failed.length} falharam.`);
    if (failed.length > 0) console.log("Falhas (Top 100):", JSON.stringify(failed, null, 2));
  } else {
    saveManifest(TOP100_MANIFEST_PATH, top100Manifest);
  }
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exitCode = 1;
});
