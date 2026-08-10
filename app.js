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
    lockBtnLocked: "🔒 Entrar",
    lockBtnUnlocked: "🔓 Sair",
    lockModalTitle: "🔒 Login de parceiro",
    lockModalDesc: "Entre com seu e-mail e senha pra poder alterar o status de aluguel dos seus axies.",
    loginEmailPlaceholder: "E-mail",
    lockPasswordPlaceholder: "Senha",
    lockErrorText: "E-mail ou senha incorretos.",
    cancelBtn: "Cancelar",
    enterBtn: "Entrar",
    myAccountLabel: "Minha conta",
    commissionLabel: "Comissão",
    adminLabel: "Admin",
    ownerLabel: "Dono",
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
    footerText: "O status de aluguel é atualizado em tempo real. Faça login pra alterar o status dos seus próprios axies.",
    toastLockedClick: "Você não tem permissão pra alterar esse axie.",
    toastEditOn: "Login realizado.",
    toastEditOff: "Sessão encerrada.",
    rentedUntilLabel: "Alugado até",
    tierRare: "Rara",
    tierEpic: "Épica",
    tierMystic: "Mística",
    tierFinal: "Final",
    morphPartsTitle: "✨ Partes após o morph",
    partEyes: "Olhos", partEars: "Orelhas", partMouth: "Boca", partHorn: "Chifre", partBack: "Costas", partTail: "Cauda",
    morphGenerating: "Gerando imagem morfada...",
    morphFailed: "Não foi possível gerar a imagem morfada.",
    seasonLabel: "Temporada",
    updatedAtLabel: "Atualizado em",
    top100SeasonSelectLabel: "Ver temporada/era",
    promoTicketTitle: "🎫 Tiquete de Morph",
    promoTicketSubtitle: "Garanta o seu por apenas US$ 1 — fale com fuly_12 no Discord",
    priceTableTitle: "💰 Preços por Era",
    priceTableNote: "Valores em AXS, cobrados por cada era de aluguel.",
    commonLabel: "Axie Comum",
    shinyLabel: "Shiny",
    perEraLabel: "por era",
    slipsLabel: "Fortune Slips à venda:",
    slipsFor: "por",
    renterNamePlaceholder: "Nome do locatário",
  },
  en: {
    title: "🐾 Axie Rentals",
    discordContact: "Discord contact:",
    statTotalLabel: "total",
    statAvailableLabel: "available",
    statRentedLabel: "rented",
    lockBtnLocked: "🔒 Log in",
    lockBtnUnlocked: "🔓 Log out",
    lockModalTitle: "🔒 Partner login",
    lockModalDesc: "Sign in with your email and password to change the rental status of your axies.",
    loginEmailPlaceholder: "Email",
    lockPasswordPlaceholder: "Password",
    lockErrorText: "Incorrect email or password.",
    cancelBtn: "Cancel",
    enterBtn: "Enter",
    myAccountLabel: "My account",
    commissionLabel: "Commission",
    adminLabel: "Admin",
    ownerLabel: "Owner",
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
    footerText: "The rental status shown updates in real time. Log in to change the status of your own axies.",
    toastLockedClick: "You don't have permission to change this axie.",
    toastEditOn: "Logged in.",
    toastEditOff: "Logged out.",
    rentedUntilLabel: "Rented until",
    tierRare: "Rare",
    tierEpic: "Epic",
    tierMystic: "Mystic",
    tierFinal: "Final",
    morphPartsTitle: "✨ Parts after the morph",
    partEyes: "Eyes", partEars: "Ears", partMouth: "Mouth", partHorn: "Horn", partBack: "Back", partTail: "Tail",
    morphGenerating: "Generating morphed image...",
    morphFailed: "Couldn't generate the morphed image.",
    seasonLabel: "Season",
    updatedAtLabel: "Updated on",
    top100SeasonSelectLabel: "View season/era",
    promoTicketTitle: "🎫 Morph Ticket",
    promoTicketSubtitle: "Get yours for just US$ 1 — message fuly_12 on Discord",
    priceTableTitle: "💰 Prices per Era",
    priceTableNote: "Values in AXS, charged per rental era.",
    commonLabel: "Common Axie",
    shinyLabel: "Shiny",
    perEraLabel: "per era",
    slipsLabel: "Fortune Slips for sale:",
    slipsFor: "for",
    renterNamePlaceholder: "Renter name",
  },
  es: {
    title: "🐾 Alquiler de Axies",
    discordContact: "Contacto de Discord:",
    statTotalLabel: "total",
    statAvailableLabel: "disponibles",
    statRentedLabel: "alquilados",
    lockBtnLocked: "🔒 Iniciar sesión",
    lockBtnUnlocked: "🔓 Cerrar sesión",
    lockModalTitle: "🔒 Acceso de socio",
    lockModalDesc: "Ingresa tu correo y contraseña para poder cambiar el estado de alquiler de tus axies.",
    loginEmailPlaceholder: "Correo electrónico",
    lockPasswordPlaceholder: "Contraseña",
    lockErrorText: "Correo o contraseña incorrectos.",
    cancelBtn: "Cancelar",
    enterBtn: "Entrar",
    myAccountLabel: "Mi cuenta",
    commissionLabel: "Comisión",
    adminLabel: "Admin",
    ownerLabel: "Dueño",
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
    footerText: "El estado de alquiler se actualiza en tiempo real. Inicia sesión para cambiar el estado de tus propios axies.",
    toastLockedClick: "No tienes permiso para cambiar este axie.",
    toastEditOn: "Sesión iniciada.",
    toastEditOff: "Sesión cerrada.",
    rentedUntilLabel: "Alquilado hasta",
    tierRare: "Rara",
    tierEpic: "Épica",
    tierMystic: "Mística",
    tierFinal: "Final",
    morphPartsTitle: "✨ Partes después del morph",
    partEyes: "Ojos", partEars: "Orejas", partMouth: "Boca", partHorn: "Cuerno", partBack: "Espalda", partTail: "Cola",
    morphGenerating: "Generando imagen transformada...",
    morphFailed: "No se pudo generar la imagen transformada.",
    seasonLabel: "Temporada",
    updatedAtLabel: "Actualizado el",
    top100SeasonSelectLabel: "Ver temporada/era",
    promoTicketTitle: "🎫 Ticket de Morph",
    promoTicketSubtitle: "Consigue el tuyo por solo US$ 1 — escribe a fuly_12 en Discord",
    priceTableTitle: "💰 Precios por Era",
    priceTableNote: "Valores en AXS, cobrados por cada era de alquiler.",
    commonLabel: "Axie Común",
    shinyLabel: "Shiny",
    perEraLabel: "por era",
    slipsLabel: "Fortune Slips a la venta:",
    slipsFor: "por",
    renterNamePlaceholder: "Nombre del inquilino",
  },
  fil: {
    title: "🐾 Pag-arkila ng Axies",
    discordContact: "Discord para sa kontak:",
    statTotalLabel: "kabuuan",
    statAvailableLabel: "magagamit",
    statRentedLabel: "inuupahan",
    lockBtnLocked: "🔒 Mag-login",
    lockBtnUnlocked: "🔓 Mag-logout",
    lockModalTitle: "🔒 Login ng partner",
    lockModalDesc: "Mag-login gamit ang email at password para mabago ang status ng pag-arkila ng mga axie mo.",
    loginEmailPlaceholder: "Email",
    lockPasswordPlaceholder: "Password",
    lockErrorText: "Mali ang email o password.",
    cancelBtn: "Kanselahin",
    enterBtn: "Pasukin",
    myAccountLabel: "Aking account",
    commissionLabel: "Komisyon",
    adminLabel: "Admin",
    ownerLabel: "May-ari",
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
    footerText: "Real-time ang status ng pag-arkila na ipinapakita. Mag-login para mabago ang status ng sarili mong mga axie.",
    toastLockedClick: "Wala kang pahintulot na baguhin ang axie na ito.",
    toastEditOn: "Naka-login na.",
    toastEditOff: "Naka-logout na.",
    rentedUntilLabel: "Inuupahan hanggang",
    tierRare: "Bihira",
    tierEpic: "Epiko",
    tierMystic: "Mistiko",
    tierFinal: "Final",
    morphPartsTitle: "✨ Mga parte pagkatapos ng morph",
    partEyes: "Mata", partEars: "Tainga", partMouth: "Bibig", partHorn: "Sungay", partBack: "Likod", partTail: "Buntot",
    morphGenerating: "Gumagawa ng na-morph na larawan...",
    morphFailed: "Hindi magawa ang na-morph na larawan.",
    seasonLabel: "Season",
    updatedAtLabel: "Na-update noong",
    top100SeasonSelectLabel: "Tingnan ang season/era",
    promoTicketTitle: "🎫 Morph Ticket",
    promoTicketSubtitle: "Kunin ang sa'yo sa US$ 1 lang — mag-message kay fuly_12 sa Discord",
    priceTableTitle: "💰 Presyo bawat Era",
    priceTableNote: "Halaga sa AXS, sisingilin bawat era ng pag-arkila.",
    commonLabel: "Karaniwang Axie",
    shinyLabel: "Shiny",
    perEraLabel: "bawat era",
    slipsLabel: "Fortune Slips na ibinebenta:",
    slipsFor: "para sa",
    renterNamePlaceholder: "Pangalan ng umuupa",
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
  renderPriceTable();
  switchView();
}

function switchView() {
  const filtersEl = document.querySelector(".filters");
  const gridEl = document.getElementById("grid");
  const top100El = document.getElementById("top100");
  if (currentView === "top100") {
    filtersEl.style.display = "none";
    gridEl.style.display = "none";
    top100El.style.display = "block";
    renderTop100();
  } else {
    filtersEl.style.display = "flex";
    gridEl.style.display = "grid";
    top100El.style.display = "none";
    renderGrid();
  }
}

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function parseSeasonEra(name) {
  const match = /(?:Season|Temporada)\s+(\d+)\s+(.+)/i.exec(name || "");
  if (!match) return { season: null, eraKey: null };
  const season = match[1];
  const eraRaw = match[2].trim().toLowerCase();
  let eraKey = null;
  if (eraRaw.startsWith("rar")) eraKey = "tierRare";
  else if (eraRaw.startsWith("ep") || eraRaw.startsWith("ép")) eraKey = "tierEpic";
  else if (eraRaw.startsWith("mist") || eraRaw.startsWith("míst")) eraKey = "tierMystic";
  else if (eraRaw.startsWith("final")) eraKey = "tierFinal";
  return { season, eraKey };
}

const PRICE_TABLE = [
  { labelKey: "ORIGIN", price: 6 },
  { labelKey: "shinyLabel", price: 4 },
  { labelKey: "Xmas2019", price: 4 },
  { labelKey: "Japan", price: 4 },
  { labelKey: "MEO", price: 4 },
  { labelKey: "Nightmare", price: 3 },
  { labelKey: "commonLabel", price: 1 },
];

function priceRowLabel(labelKey) {
  if (labelKey === "commonLabel" || labelKey === "shinyLabel") return t(labelKey);
  return tagLabel(labelKey);
}

function renderPriceTable() {
  const el = document.getElementById("priceTable");
  el.innerHTML = PRICE_TABLE.map(
    (row) => `
    <div class="price-row">
      <span class="price-row-label">${priceRowLabel(row.labelKey)}</span>
      <span class="price-row-value">${row.price} AXS <small>/ ${t("perEraLabel")}</small></span>
    </div>`
  ).join("");
}

let currentTop100Key = null;

function top100Label(dataset) {
  const { season, eraKey } = parseSeasonEra(dataset.name);
  const eraLabel = eraKey ? t(eraKey) : dataset.name || "";
  return season ? `${t("seasonLabel")} ${season} — ${eraLabel}` : dataset.name || "?";
}

function populateTop100Selector() {
  const select = document.getElementById("top100SeasonSelect");
  if (typeof TOP100_DATASETS === "undefined") return;
  select.innerHTML = "";
  TOP100_DATASETS.forEach((dataset) => {
    const opt = document.createElement("option");
    opt.value = dataset.key;
    opt.textContent = top100Label(dataset);
    select.appendChild(opt);
  });
  if (!currentTop100Key && TOP100_DATASETS.length > 0) {
    currentTop100Key = TOP100_DATASETS[0].key;
  }
  select.value = currentTop100Key;
}

function renderTop100() {
  const titleEl = document.getElementById("top100Title");
  const updatedEl = document.getElementById("top100Updated");
  const listEl = document.getElementById("top100List");

  if (typeof TOP100_DATASETS === "undefined" || TOP100_DATASETS.length === 0) {
    titleEl.textContent = "🏆 Top 100";
    updatedEl.textContent = "";
    listEl.innerHTML = "";
    return;
  }

  populateTop100Selector();
  const dataset = TOP100_DATASETS.find((d) => d.key === currentTop100Key) || TOP100_DATASETS[0];

  titleEl.textContent = `🏆 ${top100Label(dataset)}`;
  updatedEl.textContent = dataset.saved_at ? `${t("updatedAtLabel")} ${dataset.saved_at}` : "";

  listEl.innerHTML = (dataset.players || [])
    .map(
      (p) => `
    <div class="top100-row">
      <div class="top100-team">
        ${(p.team || [])
          .map(
            (axie, idx) => `
          <a class="top100-axie" href="https://app.axieinfinity.com/marketplace/axies/${axie.id}/" target="_blank" rel="noopener" title="Axie ${axie.id}">
            <img id="top100-img-${dataset.key}-${p.rank}-${idx}" src="${axie.static_img}" alt="Axie ${axie.id}">
            ${axie.rune_img ? `<img class="rune-badge" src="${axie.rune_img}" alt="rune" loading="lazy">` : ""}
          </a>`
          )
          .join("")}
      </div>
      <div class="top100-info">
        <div class="top100-rank">#${p.rank}</div>
        <div class="top100-name">${escapeHtml(p.name)}</div>
        <div class="top100-stars">⭐ ${p.stars}</div>
      </div>
    </div>`
    )
    .join("");

  queueTop100Renders(dataset);
}

let top100RenderToken = 0;

async function queueTop100Renders(dataset) {
  const myToken = ++top100RenderToken;
  if (!window.AxieRenderer) {
    console.warn("AxieRenderer não carregado — mostrando fotos atuais dos axies.");
    return;
  }
  for (const p of dataset.players || []) {
    for (let idx = 0; idx < (p.team || []).length; idx++) {
      if (myToken !== top100RenderToken) return;
      const axie = p.team[idx];
      if (!axie.genes) continue;
      const imgEl = document.getElementById(`top100-img-${dataset.key}-${p.rank}-${idx}`);
      if (!imgEl) continue;
      await renderTop100AxieImage(axie.genes, imgEl, myToken);
    }
  }
}

function renderTop100AxieImage(genesHex, imgEl, myToken) {
  return new Promise((resolve) => {
    const tempId = `top100-temp-${Math.random().toString(36).slice(2)}`;
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
        const renderer = new window.AxieRenderer(tempId);
        await renderer.render(genesHex, 0.3, 95);
        await new Promise((r) => setTimeout(r, 150));
        const dataUrl = renderer.extractImage();
        renderer.destroy();
        if (myToken === top100RenderToken && dataUrl && dataUrl.length > 100) {
          imgEl.src = dataUrl;
        }
      } catch (err) {
        console.error("Erro ao renderizar axie do Top 100", err);
      } finally {
        cleanup();
      }
    })();
  });
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

let renterState = loadState();
let currentView = "standard";
let morphRenderToken = 0;

const AXIE_BY_ID = {};
AXIE_DATA.forEach((axie) => {
  AXIE_BY_ID[axie.id] = axie;
});

const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;
let currentPartner = null;
let isAdmin = false;
let axieStatus = {};
let statusUnsubscribe = null;

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.style.display = "block";
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.style.display = "none";
  }, 2500);
}

function normalizeWallet(w) {
  return (w || "").toLowerCase();
}

function canEditAxie(axie) {
  if (!currentUser) return false;
  if (isAdmin) return true;
  if (!currentPartner) return false;
  return normalizeWallet(currentPartner.walletAddress) === normalizeWallet(axie.ownerWallet);
}

function updateLockUI() {
  const lockBtn = document.getElementById("lockBtn");
  const accountInfo = document.getElementById("accountInfo");
  lockBtn.textContent = currentUser ? t("lockBtnUnlocked") : t("lockBtnLocked");
  lockBtn.classList.toggle("unlocked", !!currentUser);
  document.body.classList.toggle("edit-locked", !currentUser);
  if (currentUser) {
    const name = currentPartner ? currentPartner.displayName : currentUser.email;
    const roleLabel = isAdmin
      ? t("adminLabel")
      : `${t("commissionLabel")}: ${currentPartner ? currentPartner.commissionPercent : 0}%`;
    accountInfo.textContent = `👤 ${name} · ${roleLabel}`;
    accountInfo.style.display = "inline-block";
  } else {
    accountInfo.style.display = "none";
  }
}

function openLockModal() {
  const modal = document.getElementById("lockModal");
  const emailInput = document.getElementById("loginEmailInput");
  const input = document.getElementById("lockPasswordInput");
  const error = document.getElementById("lockError");
  error.style.display = "none";
  emailInput.value = "";
  input.value = "";
  modal.style.display = "flex";
  emailInput.focus();
}

function closeLockModal() {
  document.getElementById("lockModal").style.display = "none";
}

async function tryUnlock() {
  const emailInput = document.getElementById("loginEmailInput");
  const input = document.getElementById("lockPasswordInput");
  const error = document.getElementById("lockError");
  error.style.display = "none";
  try {
    await auth.signInWithEmailAndPassword(emailInput.value.trim(), input.value);
    closeLockModal();
  } catch (e) {
    error.style.display = "block";
  }
}

async function loadPartnerProfile(user) {
  const tokenResult = await user.getIdTokenResult();
  isAdmin = tokenResult.claims.admin === true;
  try {
    const doc = await db.collection("partners").doc(user.uid).get();
    currentPartner = doc.exists ? doc.data() : null;
  } catch (e) {
    currentPartner = null;
  }
}

function subscribeAxieStatus() {
  if (statusUnsubscribe) return;
  statusUnsubscribe = db.collection("axieStatus").onSnapshot(
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        axieStatus[change.doc.id] = { rented: !!data.rented, rentedTier: data.rentedTier || 0 };
      });
      if (currentView !== "top100") renderGrid();
    },
    (err) => console.error("Erro ao ler status dos axies", err)
  );
}

auth.onAuthStateChanged(async (user) => {
  currentUser = user;
  if (user) {
    await loadPartnerProfile(user);
  } else {
    currentPartner = null;
    isAdmin = false;
  }
  updateLockUI();
  if (currentView !== "top100") renderGrid();
});

subscribeAxieStatus();

function tierLabels() {
  return [t("tierRare"), t("tierEpic"), t("tierMystic"), t("tierFinal")];
}

function getStatus(id) {
  return axieStatus[id] || { rented: false, rentedTier: 0 };
}

function getRenterName(id) {
  return (renterState[id] && renterState[id].renterName) || "";
}

function setRenterName(id, name) {
  renterState[id] = { renterName: name };
  saveState(renterState);
}

async function setRentalStatus(axie, rented, rentedTier) {
  if (!canEditAxie(axie)) {
    showToast(t("toastLockedClick"));
    return false;
  }
  try {
    await db.collection("axieStatus").doc(axie.id).update({ rented, rentedTier });
    axieStatus[axie.id] = { rented, rentedTier };
    return true;
  } catch (e) {
    console.error("Erro ao salvar status do axie", e);
    showToast(t("toastLockedClick"));
    return false;
  }
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
    const status = getStatus(axie.id);
    if (!showAll && !axie.collectible) return false;
    if (searchId && !axie.id.includes(searchId)) return false;
    if (filterClass && axie.class !== filterClass) return false;
    if (filterStatus === "disponivel" && status.rented) return false;
    if (filterStatus === "alugado" && !status.rented) return false;
    if (filterCollectibleTag && !axieHasCollectibleTag(axie, filterCollectibleTag)) return false;
    return true;
  });

  items.sort((a, b) => (b.level ?? -1) - (a.level ?? -1));

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

function tierRowHtml(axie, status) {
  const editable = canEditAxie(axie);
  const items = tierLabels().map((label, i) => {
    const tier = i + 1;
    const filled = status.rentedTier >= tier;
    return `<div class="tier-item ${filled ? "filled" : ""}" data-tier="${tier}" title="${label}">
      <span class="tier-dot"></span>
      <span class="tier-label">${label}</span>
    </div>`;
  }).join("");
  const renterField = editable
    ? `<input type="text" class="renter-input" data-axie-id="${axie.id}" placeholder="${t("renterNamePlaceholder")}" value="${escapeHtml(getRenterName(axie.id))}">`
    : "";
  return `
    <div class="card-row tier-row-label">
      <label>${t("rentedUntilLabel")}</label>
      ${renterField}
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
  const status = getStatus(axie.id);

  const card = document.createElement("div");
  card.className = "card " + (status.rented ? "alugado" : "disponivel");

  const badgeClass = CLASS_CLASS_MAP[axie.class] || "c-mech";

  const isMorphView = currentView === "morph" && axie.isMorphed;

  const ownerName = typeof PARTNER_NAMES !== "undefined" ? PARTNER_NAMES[normalizeWallet(axie.ownerWallet)] : null;
  const showOwnerBadge = typeof PARTNER_NAMES !== "undefined" && Object.keys(PARTNER_NAMES).length > 1 && ownerName;

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
    ${showOwnerBadge ? `<div class="owner-badge">${t("ownerLabel")}: ${escapeHtml(ownerName)}</div>` : ""}
    ${collectibleTagsHtml(axie)}
    ${currentView === "morph" ? morphPartsHtml(axie) : ""}

    <div class="status-toggle ${status.rented ? "alugado" : "disponivel"}">
      <span class="dot"></span>
      <span class="status-label">${status.rented ? t("optRented") : t("optAvailable")}</span>
    </div>

    ${tierRowHtml(axie, status)}
  `;

  const renterInput = card.querySelector(".renter-input");
  if (renterInput) {
    renterInput.addEventListener("input", (e) => {
      setRenterName(axie.id, e.target.value);
    });
  }

  function refreshCardVisual() {
    const s = getStatus(axie.id);
    card.className = "card " + (s.rented ? "alugado" : "disponivel");
    const toggleEl = card.querySelector(".status-toggle");
    toggleEl.className = "status-toggle " + (s.rented ? "alugado" : "disponivel");
    toggleEl.querySelector(".status-label").textContent = s.rented ? t("optRented") : t("optAvailable");
    card.querySelectorAll(".tier-item").forEach((item) => {
      const tier = Number(item.dataset.tier);
      item.classList.toggle("filled", s.rentedTier >= tier);
    });
    updateStats();
  }

  const toggle = card.querySelector(".status-toggle");
  toggle.addEventListener("click", async () => {
    if (!canEditAxie(axie)) {
      showToast(t("toastLockedClick"));
      return;
    }
    const s = getStatus(axie.id);
    const ok = s.rented ? await setRentalStatus(axie, false, 0) : await setRentalStatus(axie, true, 1);
    if (ok) refreshCardVisual();
  });

  card.querySelectorAll(".tier-item").forEach((item) => {
    item.addEventListener("click", async () => {
      if (!canEditAxie(axie)) {
        showToast(t("toastLockedClick"));
        return;
      }
      const tier = Number(item.dataset.tier);
      const ok = await setRentalStatus(axie, true, tier);
      if (ok) refreshCardVisual();
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
    if (getStatus(axie.id).rented) alugados++;
  });
  document.getElementById("statTotal").textContent = total;
  document.getElementById("statAlugado").textContent = alugados;
  document.getElementById("statDisponivel").textContent = total - alugados;
}

function init() {
  translateStaticUI();
  populateClassFilter();
  populateCollectibleFilter();
  renderPriceTable();

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  ["searchId", "filterClass", "filterStatus", "filterCollectibleTag", "filterShowAll"].forEach((id) => {
    document.getElementById(id).addEventListener("input", renderGrid);
    document.getElementById(id).addEventListener("change", renderGrid);
  });

  document.getElementById("top100SeasonSelect").addEventListener("change", (e) => {
    currentTop100Key = e.target.value;
    renderTop100();
  });

  document.querySelectorAll(".view-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentView = btn.dataset.view;
      document.querySelectorAll(".view-tab").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      switchView();
    });
  });

  updateLockUI();

  document.getElementById("lockBtn").addEventListener("click", () => {
    if (currentUser) {
      auth.signOut();
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
  document.getElementById("loginEmailInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") tryUnlock();
  });
  document.getElementById("lockModal").addEventListener("click", (e) => {
    if (e.target.id === "lockModal") closeLockModal();
  });

  switchView();
}

document.addEventListener("DOMContentLoaded", init);
