const STORAGE_KEY = "aluguelAxieState_v1";

const ALL_CLASSES = ["Aquatic", "Beast", "Bird", "Bug", "Dawn", "Dusk", "Mech", "Plant", "Reptile", "Nightmare"];

const CLASS_CLASS_MAP = {
  Aquatic: "c-aquatic",
  Beast: "c-beast",
  Bird: "c-bird",
  Bug: "c-bug",
  Dawn: "c-dawn",
  Dusk: "c-dusk",
  Mech: "c-mech",
  Plant: "c-plant",
  Reptile: "c-reptile",
  Nightmare: "c-nightmare",
};

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();
let currentView = "standard";
let morphRenderToken = 0;

const GENESIS_TITLE_LABELS = {
  "ORIGIN": "Origin Gen 0",
  "MEO": "MEO",
  "MEO II": "MEO II",
};

const TIER_LABELS = ["Rara", "Épica", "Mística", "Final"];

function getEntry(id) {
  if (!state[id]) {
    state[id] = { rented: false, rentedTier: 0 };
  }
  if (state[id].rentedTier === undefined) {
    state[id].rentedTier = 0;
  }
  return state[id];
}

function updateEntry(id, patch) {
  const entry = getEntry(id);
  Object.assign(entry, patch);
  state[id] = entry;
  saveState(state);
}

function populateClassFilter() {
  const select = document.getElementById("filterClass");
  ALL_CLASSES.forEach((cls) => {
    const opt = document.createElement("option");
    opt.value = cls;
    opt.textContent = cls;
    select.appendChild(opt);
  });
}

function imageUrl(id) {
  return `https://axiecdn.axieinfinity.com/axies/${id}/axie/axie-full-transparent.png`;
}

function partsSummary(parts) {
  if (!parts || Object.keys(parts).length === 0) return "";
  return Object.values(parts).filter(Boolean).join(", ");
}

function renderGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  const searchId = document.getElementById("searchId").value.trim();
  const filterClass = document.getElementById("filterClass").value;
  const filterStatus = document.getElementById("filterStatus").value;
  const showAll = document.getElementById("filterShowAll").checked;

  let items = AXIE_DATA.filter((axie) => {
    const entry = getEntry(axie.id);
    if (!showAll && !axie.collectible) return false;
    if (searchId && !axie.id.includes(searchId)) return false;
    if (filterClass && axie.class !== filterClass) return false;
    if (filterStatus === "disponivel" && entry.rented) return false;
    if (filterStatus === "alugado" && !entry.rented) return false;
    return true;
  });

  if (items.length === 0) {
    grid.innerHTML = '<div class="empty">Nenhum axie encontrado com esses filtros.</div>';
  }

  items.forEach((axie) => {
    grid.appendChild(buildCard(axie));
  });

  updateStats();

  if (currentView === "morph") {
    queueMorphRenders(items);
  }
}

async function queueMorphRenders(items) {
  const myToken = ++morphRenderToken;
  if (!window.AxieRenderer) {
    console.warn("AxieRenderer não carregado — mostrando imagem padrão.");
    return;
  }
  for (const axie of items) {
    if (myToken !== morphRenderToken) return;
    if (!axie.morphGenesHex) continue;
    const imgEl = document.getElementById(`axie-img-${axie.id}`);
    const statusEl = document.getElementById(`morph-status-${axie.id}`);
    if (!imgEl) continue;
    await renderMorphImage(axie, imgEl, statusEl);
  }
}

function renderMorphImage(axie, imgEl, statusEl) {
  return new Promise((resolve) => {
    const tempId = `morph-temp-${axie.id}`;
    const tempContainer = document.createElement("div");
    tempContainer.id = tempId;
    tempContainer.style.position = "fixed";
    tempContainer.style.top = "-9999px";
    tempContainer.style.left = "-9999px";
    tempContainer.style.width = "300px";
    tempContainer.style.height = "300px";
    document.body.appendChild(tempContainer);

    const cleanup = () => {
      if (document.body.contains(tempContainer)) document.body.removeChild(tempContainer);
      resolve();
    };

    (async () => {
      try {
        if (statusEl) statusEl.textContent = "Gerando imagem morfada...";
        const renderer = new window.AxieRenderer(tempId);
        await renderer.render(axie.morphGenesHex, 0.3, 95);
        await new Promise((r) => setTimeout(r, 150));
        const dataUrl = renderer.extractImage();
        renderer.destroy();
        if (dataUrl && dataUrl.length > 100) {
          imgEl.src = dataUrl;
          imgEl.style.visibility = "visible";
          if (statusEl) statusEl.textContent = "";
        } else if (statusEl) {
          statusEl.textContent = "Não foi possível gerar a imagem morfada.";
        }
      } catch (err) {
        console.error("Erro ao renderizar morph do axie", axie.id, err);
        if (statusEl) statusEl.textContent = "Erro ao gerar imagem morfada.";
      } finally {
        cleanup();
      }
    })();
  });
}

function collectibleTagsHtml(axie) {
  const tags = [];
  (axie.specialGenes || []).forEach((t) => tags.push(t));
  if (axie.genesisTitle && GENESIS_TITLE_LABELS[axie.genesisTitle]) {
    tags.push(GENESIS_TITLE_LABELS[axie.genesisTitle]);
  }
  if (tags.length === 0) return "";
  return `<div class="collectible-tags">${tags.map((t) => `<span class="tag-badge">${t}</span>`).join("")}</div>`;
}

function tierRowHtml(entry) {
  const items = TIER_LABELS.map((label, i) => {
    const tier = i + 1;
    const filled = entry.rentedTier >= tier;
    return `<div class="tier-item ${filled ? "filled" : ""}" data-tier="${tier}" title="${label}">
      <span class="tier-dot"></span>
      <span class="tier-label">${label}</span>
    </div>`;
  }).join("");
  return `
    <div class="card-row tier-row-label">
      <label>Alugado até</label>
    </div>
    <div class="tier-row">${items}</div>
  `;
}

function morphPartsHtml(axie) {
  if (!axie.isMorphed || !axie.morphParts) return "";
  const labels = { eyes: "Olhos", ears: "Orelhas", mouth: "Boca", horn: "Chifre", back: "Costas", tail: "Cauda" };
  const rows = Object.keys(labels)
    .map((k) => `<div class="morph-part-row"><span>${labels[k]}</span><strong>${axie.morphParts[k] || "-"}</strong></div>`)
    .join("");
  return `<div class="morph-parts-box"><div class="morph-parts-title">✨ Partes após o morph</div>${rows}</div>`;
}

function buildCard(axie) {
  const entry = getEntry(axie.id);

  const card = document.createElement("div");
  card.className = "card " + (entry.rented ? "alugado" : "disponivel");

  const badgeClass = CLASS_CLASS_MAP[axie.class] || "c-mech";

  const isMorphView = currentView === "morph" && axie.isMorphed;

  card.innerHTML = `
    <div class="card-photo">
      <img id="axie-img-${axie.id}" src="${imageUrl(axie.id)}" alt="Axie ${axie.id}" ${isMorphView ? "" : 'loading="lazy"'} title="${partsSummary(axie.parts)}"
           onerror="this.style.visibility='hidden'">
      ${isMorphView ? '<span class="morph-ribbon">✨ Morfado</span>' : ""}
      ${axie.level != null ? `<span class="level-badge">Lv. ${axie.level}</span>` : ""}
    </div>
    ${isMorphView ? `<div class="morph-status" id="morph-status-${axie.id}"></div>` : ""}
    <div class="card-info">
      <div class="card-id">#${axie.id}</div>
      <span class="class-badge" style="background: var(--${badgeClass})">${axie.class || "?"}</span>
    </div>
    ${collectibleTagsHtml(axie)}
    ${currentView === "morph" ? morphPartsHtml(axie) : ""}

    <div class="status-toggle ${entry.rented ? "alugado" : "disponivel"}">
      <span class="dot"></span>
      <span class="status-label">${entry.rented ? "Alugado" : "Disponível"}</span>
    </div>

    ${tierRowHtml(entry)}
  `;

  function refreshCardVisual() {
    const e = getEntry(axie.id);
    card.className = "card " + (e.rented ? "alugado" : "disponivel");
    const toggleEl = card.querySelector(".status-toggle");
    toggleEl.className = "status-toggle " + (e.rented ? "alugado" : "disponivel");
    toggleEl.querySelector(".status-label").textContent = e.rented ? "Alugado" : "Disponível";
    card.querySelectorAll(".tier-item").forEach((item) => {
      const tier = Number(item.dataset.tier);
      item.classList.toggle("filled", e.rentedTier >= tier);
    });
    updateStats();
  }

  const toggle = card.querySelector(".status-toggle");
  toggle.addEventListener("click", () => {
    const e = getEntry(axie.id);
    if (e.rented) {
      updateEntry(axie.id, { rented: false, rentedTier: 0 });
    } else {
      updateEntry(axie.id, { rented: true, rentedTier: 1 });
    }
    refreshCardVisual();
  });

  card.querySelectorAll(".tier-item").forEach((item) => {
    item.addEventListener("click", () => {
      const tier = Number(item.dataset.tier);
      updateEntry(axie.id, { rented: true, rentedTier: tier });
      refreshCardVisual();
    });
  });

  return card;
}

function updateStats() {
  const showAll = document.getElementById("filterShowAll").checked;
  const visibleAxies = showAll ? AXIE_DATA : AXIE_DATA.filter((axie) => axie.collectible);
  const total = visibleAxies.length;
  let alugados = 0;
  visibleAxies.forEach((axie) => {
    if (getEntry(axie.id).rented) alugados++;
  });
  document.getElementById("statTotal").textContent = total;
  document.getElementById("statAlugado").textContent = alugados;
  document.getElementById("statDisponivel").textContent = total - alugados;
}

function init() {
  populateClassFilter();
  ["searchId", "filterClass", "filterStatus", "filterShowAll"].forEach((id) => {
    document.getElementById(id).addEventListener("input", renderGrid);
    document.getElementById(id).addEventListener("change", renderGrid);
  });

  document.querySelectorAll(".view-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentView = btn.dataset.view;
      document.querySelectorAll(".view-tab").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderGrid();
    });
  });

  renderGrid();
}

document.addEventListener("DOMContentLoaded", init);
