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

const TAG_LABELS_BY_LANG = {
  pt: {
    Nightmare: "Nightmare", NightmareShiny: "Nightmare Shiny", Japan: "Japonês",
    Xmas2018: "Natalino (Xmas)", Xmas2019: "Natalino (Xmas)", Summer2022: "Verão",
    SummerShiny2022: "Verão Shiny", Mystic: "Místico", Bionic: "Agamogenesis",
    ORIGIN: "Origin Gen 0", MEO: "MEO", "MEO II": "MEO II",
  },
  en: {
    Nightmare: "Nightmare", NightmareShiny: "Nightmare Shiny", Japan: "Japanese",
    Xmas2018: "Christmas (Xmas)", Xmas2019: "Christmas (Xmas)", Summer2022: "Summer",
    SummerShiny2022: "Summer Shiny", Mystic: "Mystic", Bionic: "Agamogenesis",
    ORIGIN: "Origin Gen 0", MEO: "MEO", "MEO II": "MEO II",
  },
  es: {
    Nightmare: "Nightmare", NightmareShiny: "Nightmare Shiny", Japan: "Japonés",
    Xmas2018: "Navideño (Xmas)", Xmas2019: "Navideño (Xmas)", Summer2022: "Verano",
    SummerShiny2022: "Verano Shiny", Mystic: "Místico", Bionic: "Agamogenesis",
    ORIGIN: "Origin Gen 0", MEO: "MEO", "MEO II": "MEO II",
  },
  fil: {
    Nightmare: "Nightmare", NightmareShiny: "Nightmare Shiny", Japan: "Hapon",
    Xmas2018: "Pasko (Xmas)", Xmas2019: "Pasko (Xmas)", Summer2022: "Tag-init",
    SummerShiny2022: "Tag-init Shiny", Mystic: "Mistiko", Bionic: "Agamogenesis",
    ORIGIN: "Origin Gen 0", MEO: "MEO", "MEO II": "MEO II",
  },
};

const I18N = {
  pt: {
    title: "🐾 Aluguel de Axies",
    discordContact: "Discord para contato:",
    statTotalLabel: "total",
    statAvailableLabel: "disponíveis",
    statRentedLabel: "alugados",
    lockBtnLocked: "🔒 Editar",
    lockBtnUnlocked: "🔓 Editando",
    exportBtnLabel: "📋 Copiar alterações",
    lockModalTitle: "🔒 Modo edição",
    lockModalDesc: "Digite a senha para poder alterar o status de aluguel.",
    lockPasswordPlaceholder: "Senha",
    lockErrorText: "Senha incorreta.",
    cancelBtn: "Cancelar",
    enterBtn: "Entrar",
    exportModalTitle: "📋 Copiar alterações",
    exportModalDesc: "Cole este texto numa mensagem para o Claude, pedindo para publicar as alterações.",
    closeBtn: "Fechar",
    tabStandard: "Padrão",
    tabMorph: "✨ Morfado",
    searchLabel: "Buscar por ID",
    searchPlaceholder: "Ex: 1519",
    classLabel: "Classe",
    statusLabel: "Status",
    optAll: "Todos",
    optAvailable: "Disponível",
    optRented: "Alugado",
    collectibleLabel: "Colecionável",
    showAllLabel: "Mostrar todos os axies não colecionáveis",
    emptyMsg: "Nenhum axie encontrado com esses filtros.",
    footerText: 'O status de aluguel exibido é o que foi publicado por último. Alterações feitas aqui ficam só neste navegador até serem enviadas ao Claude com o botão "📋 Copiar alterações" e publicadas.',
    toastLockedClick: "Somente o administrador pode alterar isso. Clique em 🔒 Editar.",
    toastEditOn: "Modo edição ativado.",
    toastEditOff: "Modo edição desativado.",
    toastCopied: "Copiado! Agora é só colar no chat com o Claude.",
    toastCopyFail: "Não consegui copiar automaticamente — selecione o texto e copie manualmente.",
    rentedUntilLabel: "Alugado até",
    tierRare: "Rara",
    tierEpic: "Épica",
    tierMystic: "Mística",
    tierFinal: "Final",
    morphPartsTitle: "✨ Partes após o morph",
    partEyes: "Olhos", partEars: "Orelhas", partMouth: "Boca", partHorn: "Chifre", partBack: "Costas", partTail: "Cauda",
    morphGenerating: "Gerando imagem morfada...",
    morphFailed: "Não foi possível gerar a imagem morfada.",
  },
  en: {
    title: "🐾 Axie Rentals",
    discordContact: "Discord contact:",
    statTotalLabel: "total",
    statAvailableLabel: "available",
    statRentedLabel: "rented",
    lockBtnLocked: "🔒 Edit",
    lockBtnUnlocked: "🔓 Editing",
    exportBtnLabel: "📋 Copy changes",
    lockModalTitle: "🔒 Edit mode",
    lockModalDesc: "Enter the password to change the rental status.",
    lockPasswordPlaceholder: "Password",
    lockErrorText: "Incorrect password.",
    cancelBtn: "Cancel",
    enterBtn: "Enter",
    exportModalTitle: "📋 Copy changes",
    exportModalDesc: "Paste this text in a message to Claude, asking to publish the changes.",
    closeBtn: "Close",
    tabStandard: "Standard",
    tabMorph: "✨ Morphed",
    searchLabel: "Search by ID",
    searchPlaceholder: "E.g.: 1519",
    classLabel: "Class",
    statusLabel: "Status",
    optAll: "All",
    optAvailable: "Available",
    optRented: "Rented",
    collectibleLabel: "Collectible",
    showAllLabel: "Show all non-collectible axies",
    emptyMsg: "No axie found with these filters.",
    footerText: 'The rental status shown is the last one published. Changes made here stay only in this browser until sent to Claude with the "📋 Copy changes" button and published.',
    toastLockedClick: "Only the admin can change this. Click 🔒 Edit.",
    toastEditOn: "Edit mode enabled.",
    toastEditOff: "Edit mode disabled.",
    toastCopied: "Copied! Now just paste it in the chat with Claude.",
    toastCopyFail: "Couldn't copy automatically — select the text and copy it manually.",
    rentedUntilLabel: "Rented until",
    tierRare: "Rare",
    tierEpic: "Epic",
    tierMystic: "Mystic",
    tierFinal: "Final",
    morphPartsTitle: "✨ Parts after the morph",
    partEyes: "Eyes", partEars: "Ears", partMouth: "Mouth", partHorn: "Horn", partBack: "Back", partTail: "Tail",
    morphGenerating: "Generating morphed image...",
    morphFailed: "Couldn't generate the morphed image.",
  },
  es: {
    title: "🐾 Alquiler de Axies",
    discordContact: "Contacto de Discord:",
    statTotalLabel: "total",
    statAvailableLabel: "disponibles",
    statRentedLabel: "alquilados",
    lockBtnLocked: "🔒 Editar",
    lockBtnUnlocked: "🔓 Editando",
    exportBtnLabel: "📋 Copiar cambios",
    lockModalTitle: "🔒 Modo edición",
    lockModalDesc: "Ingresa la contraseña para poder cambiar el estado del alquiler.",
    lockPasswordPlaceholder: "Contraseña",
    lockErrorText: "Contraseña incorrecta.",
    cancelBtn: "Cancelar",
    enterBtn: "Entrar",
    exportModalTitle: "📋 Copiar cambios",
    exportModalDesc: "Pega este texto en un mensaje para Claude, pidiendo que publique los cambios.",
    closeBtn: "Cerrar",
    tabStandard: "Estándar",
    tabMorph: "✨ Transformado",
    searchLabel: "Buscar por ID",
    searchPlaceholder: "Ej: 1519",
    classLabel: "Clase",
    statusLabel: "Estado",
    optAll: "Todos",
    optAvailable: "Disponible",
    optRented: "Alquilado",
    collectibleLabel: "Coleccionable",
    showAllLabel: "Mostrar todos los axies no coleccionables",
    emptyMsg: "No se encontró ningún axie con estos filtros.",
    footerText: 'El estado de alquiler mostrado es el último publicado. Los cambios hechos aquí quedan solo en este navegador hasta que se envíen a Claude con el botón "📋 Copiar cambios" y se publiquen.',
    toastLockedClick: "Solo el administrador puede cambiar esto. Haz clic en 🔒 Editar.",
    toastEditOn: "Modo edición activado.",
    toastEditOff: "Modo edición desactivado.",
    toastCopied: "¡Copiado! Ahora solo pégalo en el chat con Claude.",
    toastCopyFail: "No pude copiar automáticamente — selecciona el texto y cópialo manualmente.",
    rentedUntilLabel: "Alquilado hasta",
    tierRare: "Rara",
    tierEpic: "Épica",
    tierMystic: "Mística",
    tierFinal: "Final",
    morphPartsTitle: "✨ Partes después del morph",
    partEyes: "Ojos", partEars: "Orejas", partMouth: "Boca", partHorn: "Cuerno", partBack: "Espalda", partTail: "Cola",
    morphGenerating: "Generando imagen transformada...",
    morphFailed: "No se pudo generar la imagen transformada.",
  },
  fil: {
    title: "🐾 Pag-arkila ng Axies",
    discordContact: "Discord para sa kontak:",
    statTotalLabel: "kabuuan",
    statAvailableLabel: "magagamit",
    statRentedLabel: "inuupahan",
    lockBtnLocked: "🔒 I-edit",
    lockBtnUnlocked: "🔓 Ineedit",
    exportBtnLabel: "📋 Kopyahin ang mga pagbabago",
    lockModalTitle: "🔒 Mode ng pag-edit",
    lockModalDesc: "Ilagay ang password para mabago ang status ng pag-arkila.",
    lockPasswordPlaceholder: "Password",
    lockErrorText: "Maling password.",
    cancelBtn: "Kanselahin",
    enterBtn: "Pasukin",
    exportModalTitle: "📋 Kopyahin ang mga pagbabago",
    exportModalDesc: "I-paste ang tekstong ito sa isang mensahe kay Claude, hinihiling na i-publish ang mga pagbabago.",
    closeBtn: "Isara",
    tabStandard: "Standard",
    tabMorph: "✨ Na-morph",
    searchLabel: "Maghanap gamit ang ID",
    searchPlaceholder: "Hal: 1519",
    classLabel: "Klase",
    statusLabel: "Status",
    optAll: "Lahat",
    optAvailable: "Magagamit",
    optRented: "Inuupahan",
    collectibleLabel: "Makokolekta",
    showAllLabel: "Ipakita lahat ng axies na hindi makokolekta",
    emptyMsg: "Walang nahanap na axie sa mga filter na ito.",
    footerText: 'Ang status ng pag-arkila na ipinapakita ay ang huling na-publish. Ang mga pagbabagong ginawa dito ay nasa browser na ito lang hanggang ipadala kay Claude gamit ang button na "📋 Kopyahin ang mga pagbabago" at ma-publish.',
    toastLockedClick: "Tanging ang admin lang ang makakapagbago nito. I-click ang 🔒 I-edit.",
    toastEditOn: "Naka-on ang edit mode.",
    toastEditOff: "Naka-off ang edit mode.",
    toastCopied: "Nakopya! Ngayon i-paste na lang sa chat kay Claude.",
    toastCopyFail: "Hindi awtomatikong nakopya — piliin ang teksto at kopyahin nang manu-mano.",
    rentedUntilLabel: "Inuupahan hanggang",
    tierRare: "Bihira",
    tierEpic: "Epiko",
    tierMystic: "Mistiko",
    tierFinal: "Final",
    morphPartsTitle: "✨ Mga parte pagkatapos ng morph",
    partEyes: "Mata", partEars: "Tainga", partMouth: "Bibig", partHorn: "Sungay", partBack: "Likod", partTail: "Buntot",
    morphGenerating: "Gumagawa ng na-morph na larawan...",
    morphFailed: "Hindi magawa ang na-morph na larawan.",
  },
};

const LANG_KEY = "aluguelAxieLang";
let currentLang = localStorage.getItem(LANG_KEY) || "pt";

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || I18N.pt[key] || key;
}

function tagLabel(value) {
  const langMap = TAG_LABELS_BY_LANG[currentLang] || TAG_LABELS_BY_LANG.pt;
  return langMap[value] || value;
}

function translateStaticUI() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  translateStaticUI();
  updateLockUI();
  populateCollectibleFilter();
  renderGrid();
}

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

const AXIE_BY_ID = {};
AXIE_DATA.forEach((axie) => {
  AXIE_BY_ID[axie.id] = axie;
});

const EDIT_PASSWORD_HASH = "de3d43caad2bd3c4f0622fc60deecd06b34a0f25a80e30b81fe051a3c54799bb";
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
  lockBtn.textContent = editUnlocked ? t("lockBtnUnlocked") : t("lockBtnLocked");
  lockBtn.classList.toggle("unlocked", editUnlocked);
  document.body.classList.toggle("edit-locked", !editUnlocked);
  document.getElementById("exportBtn").style.display = editUnlocked ? "inline-block" : "none";
  document.getElementById("exportBtn").textContent = t("exportBtnLabel");
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
    showToast(t("toastEditOn"));
  } else {
    error.style.display = "block";
  }
}

function buildChangesPayload() {
  const changes = {};
  Object.keys(state).forEach((id) => {
    const axie = AXIE_BY_ID[id];
    if (!axie) return;
    const entry = state[id];
    const publishedRented = axie.rented || false;
    const publishedTier = axie.rentedTier || 0;
    if (!!entry.rented !== publishedRented || (entry.rentedTier || 0) !== publishedTier) {
      changes[id] = { rented: !!entry.rented, rentedTier: entry.rentedTier || 0 };
    }
  });
  return JSON.stringify(changes);
}

async function openExportModal() {
  const json = buildChangesPayload();
  const textarea = document.getElementById("exportTextarea");
  textarea.value = json;
  document.getElementById("exportModal").style.display = "flex";
  textarea.focus();
  textarea.select();
  try {
    await navigator.clipboard.writeText(json);
    showToast(t("toastCopied"));
  } catch (e) {
    showToast(t("toastCopyFail"));
  }
}

function closeExportModal() {
  document.getElementById("exportModal").style.display = "none";
}

function tierLabels() {
  return [t("tierRare"), t("tierEpic"), t("tierMystic"), t("tierFinal")];
}

function getEntry(id) {
  if (!state[id]) {
    const published = AXIE_BY_ID[id] || {};
    state[id] = {
      rented: published.rented || false,
      rentedTier: published.rentedTier || 0,
    };
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
    grid.innerHTML = `<div class="empty">${t("emptyMsg")}</div>`;
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
        if (statusEl) statusEl.textContent = t("morphGenerating");
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
          statusEl.textContent = t("morphFailed");
        }
      } catch (err) {
        console.error("Erro ao renderizar morph do axie", axie.id, err);
        if (statusEl) statusEl.textContent = t("morphFailed");
      } finally {
        cleanup();
      }
    })();
  });
}

function collectibleTagsHtml(axie) {
  const tags = [];
  (axie.specialGenes || []).forEach((tag) => tags.push(tagLabel(tag)));
  if (axie.genesisTitle) {
    tags.push(tagLabel(axie.genesisTitle));
  }
  if (tags.length === 0) return "";
  return `<div class="collectible-tags">${tags.map((tag) => `<span class="tag-badge">${tag}</span>`).join("")}</div>`;
}

function axieHasCollectibleTag(axie, value) {
  if (!value) return true;
  if ((axie.specialGenes || []).includes(value)) return true;
  if (axie.genesisTitle === value) return true;
  return false;
}

function populateCollectibleFilter() {
  const select = document.getElementById("filterCollectibleTag");
  while (select.options.length > 1) select.remove(1);
  const values = new Set();
  AXIE_DATA.forEach((axie) => {
    (axie.specialGenes || []).forEach((tag) => values.add(tag));
    if (axie.genesisTitle) values.add(axie.genesisTitle);
  });
  Array.from(values)
    .sort((a, b) => tagLabel(a).localeCompare(tagLabel(b)))
    .forEach((value) => {
      const opt = document.createElement("option");
      opt.value = value;
      opt.textContent = tagLabel(value);
      select.appendChild(opt);
    });
}

function tierRowHtml(entry) {
  const items = tierLabels().map((label, i) => {
    const tier = i + 1;
    const filled = entry.rentedTier >= tier;
    return `<div class="tier-item ${filled ? "filled" : ""}" data-tier="${tier}" title="${label}">
      <span class="tier-dot"></span>
      <span class="tier-label">${label}</span>
    </div>`;
  }).join("");
  return `
    <div class="card-row tier-row-label">
      <label>${t("rentedUntilLabel")}</label>
    </div>
    <div class="tier-row">${items}</div>
  `;
}

function morphPartsHtml(axie) {
  if (!axie.isMorphed || !axie.morphParts) return "";
  const labels = {
    eyes: t("partEyes"), ears: t("partEars"), mouth: t("partMouth"),
    horn: t("partHorn"), back: t("partBack"), tail: t("partTail"),
  };
  const rows = Object.keys(labels)
    .map((k) => `<div class="morph-part-row"><span>${labels[k]}</span><strong>${axie.morphParts[k] || "-"}</strong></div>`)
    .join("");
  return `<div class="morph-parts-box"><div class="morph-parts-title">${t("morphPartsTitle")}</div>${rows}</div>`;
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
      ${isMorphView ? `<span class="morph-ribbon">${t("tabMorph")}</span>` : ""}
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
      <span class="status-label">${entry.rented ? t("optRented") : t("optAvailable")}</span>
    </div>

    ${tierRowHtml(entry)}
  `;

  function refreshCardVisual() {
    const e = getEntry(axie.id);
    card.className = "card " + (e.rented ? "alugado" : "disponivel");
    const toggleEl = card.querySelector(".status-toggle");
    toggleEl.className = "status-toggle " + (e.rented ? "alugado" : "disponivel");
    toggleEl.querySelector(".status-label").textContent = e.rented ? t("optRented") : t("optAvailable");
    card.querySelectorAll(".tier-item").forEach((item) => {
      const tier = Number(item.dataset.tier);
      item.classList.toggle("filled", e.rentedTier >= tier);
    });
    updateStats();
  }

  const toggle = card.querySelector(".status-toggle");
  toggle.addEventListener("click", () => {
    if (!editUnlocked) {
      showToast(t("toastLockedClick"));
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
        showToast(t("toastLockedClick"));
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
  translateStaticUI();
  populateClassFilter();
  populateCollectibleFilter();

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

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
      showToast(t("toastEditOff"));
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

  document.getElementById("exportBtn").addEventListener("click", openExportModal);
  document.getElementById("exportClose").addEventListener("click", closeExportModal);
  document.getElementById("exportModal").addEventListener("click", (e) => {
    if (e.target.id === "exportModal") closeExportModal();
  });

  renderGrid();
}

document.addEventListener("DOMContentLoaded", init);
