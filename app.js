const STORAGE_KEY = "aluguelAxieState_v1";

const ALL_CLASSES = ["Aquatic", "Beast", "Bird", "Bug", "Dawn", "Dusk", "Mech", "Plant", "Reptile"];

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
};

const TAG_LABELS = {
  Nightmare: "Nightmare",
  NightmareShiny: "Nightmare Shiny",
  Japan: "Japonês",
  Xmas2018: "Natalino (Xmas)",
  Xmas2019: "Natalino (Xmas)",
  Summer2022: "Verão",
  SummerShiny2022: "Verão Shiny",
  Mystic: "Místico",
  Bionic: "Agamogenesis",
  ORIGIN: "Origin Gen 0",
  MEO: "MEO",
  "MEO II": "MEO II",
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

const EDIT_PASSWORD_HASH = "2e84c93c35e3200a861e077ad06e0d12a8496fa5dfb55bb745afc52e3dcc2911";
const EDIT_SESSION_KEY = "aluguelAxieEditUnlocked";
let editUnlocked = sessionStorage.getItem(EDIT_SESSION_KEY) === "true";

async function sha256Hex(str) {
  const enc = new TextEncoder().encode(str);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.style.display = "block";
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.style.display = "none";
  }, 2500);
}

function updateLockUI() {
  const lockBtn = document.getElementById("lockBtn");
  lockBtn.textContent = editUnlocked ? "🔓 Editando" : "🔒 Editar";
  lockBtn.classList.toggle("unlocked", editUnlocked);
  document.body.classList.toggle("edit-locked", !editUnlocked);
}

function openLockModal() {
  const modal = document.getElementById("lockModal");
  const input = document.getElementById("lockPasswordInput");
  const error = document.getElementById("lockError");
  error.style.display = "none";
  input.value = "";
  modal.style.display = "flex";
  input.focus();
}

function closeLockModal() {
  document.getElementById("lockModal").style.display = "none";
}

async function tryUnlock() {
  const input = document.getElementById("lockPasswordInput");
  const error = document.getElementById("lockError");
  const hash = await sha256Hex(input.value);
  if (hash === EDIT_PASSWORD_HASH) {
    editUnlocked = true;
    sessionStorage.setItem(EDIT_SESSION_KEY, "true");
    updateLockUI();
    closeLockModal();
    showToast("Modo edição ativado.");
  } else {
    error.style.display = "block";
  }
}

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
  const filterCollectibleTag = document.getElementById("filterCollectibleTag").value;
  const showAll = document.getElementById("filterShowAll").checked;

  let items = AXIE_DATA.filter((axie) => {
    const entry = getEntry(axie.id);
    if (!showAll && !axie.collectible) return false;
    if (searchId && !axie.id.includes(searchId)) return false;
    if (filterClass && axie.class !== filterClass) return false;
    if (filterStatus === "disponivel" && entry.rented) return false;
    if (filterStatus === "alugado" && !entry.rented) return false;
    if (filterCollectibleTag && !axieHasCollectibleTag(axie, filterCollectibleTag)) return false;
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
  (axie.specialGenes || []).forEach((t) => tags.push(TAG_LABELS[t] || t));
  if (axie.genesisTitle) {
    tags.push(TAG_LABELS[axie.genesisTitle] || axie.genesisTitle);
  }
  if (tags.length === 0) return "";
  return `<div class="collectible-tags">${tags.map((t) => `<span class="tag-badge">${t}</span>`).join("")}</div>`;
}

function axieHasCollectibleTag(axie, value) {
  if (!value) return true;
  if ((axie.specialGenes || []).includes(value)) return true;
  if (axie.genesisTitle === value) return true;
  return false;
}

function populateCollectibleFilter() {
  const select = document.getElementById("filterCollectibleTag");
  const values = new Set();
  AXIE_DATA.forEach((axie) => {
    (axie.specialGenes || []).forEach((t) => values.add(t));
    if (axie.genesisTitle) values.add(axie.genesisTitle);
  });
  Array.from(values)
    .sort((a, b) => (TAG_LABELS[a] || a).localeCompare(TAG_LABELS[b] || b))
    .forEach((value) => {
      const opt = document.createElement("option");
      opt.value = value;
      opt.textContent = TAG_LABELS[value] || value;
      select.appendChild(opt);
    });
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
    if (!editUnlocked) {
      showToast("Somente o administrador pode alterar isso. Clique em 🔒 Editar.");
      return;
    }
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
      if (!editUnlocked) {
        showToast("Somente o administrador pode alterar isso. Clique em 🔒 Editar.");
        return;
      }
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
  populateCollectibleFilter();
  ["searchId", "filterClass", "filterStatus", "filterCollectibleTag", "filterShowAll"].forEach((id) => {
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

  updateLockUI();

  document.getElementById("lockBtn").addEventListener("click", () => {
    if (editUnlocked) {
      editUnlocked = false;
      sessionStorage.removeItem(EDIT_SESSION_KEY);
      updateLockUI();
      showToast("Modo edição desativado.");
    } else {
      openLockModal();
    }
  });

  document.getElementById("lockCancel").addEventListener("click", closeLockModal);
  document.getElementById("lockConfirm").addEventListener("click", tryUnlock);
  document.getElementById("lockPasswordInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") tryUnlock();
  });
  document.getElementById("lockModal").addEventListener("click", (e) => {
    if (e.target.id === "lockModal") closeLockModal();
  });

  renderGrid();
}

document.addEventListener("DOMContentLoaded", init);
