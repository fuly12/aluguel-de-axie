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

const COLLECTIBLE_SORT_ORDER = [
  "Mystic",
  "ORIGIN",
  "MEO",
  "MEO II",
  "NightmareShiny",
  "SummerShiny2022",
  "Xmas2019",
  "Xmas2018",
  "Japan",
  "Nightmare",
  "Summer2022",
];

function collectibleSortRank(axie) {
  const tags = [...(axie.specialGenes || [])];
  if (axie.genesisTitle) tags.push(axie.genesisTitle);
  let best = COLLECTIBLE_SORT_ORDER.length;
  tags.forEach((tag) => {
    const idx = COLLECTIBLE_SORT_ORDER.indexOf(tag);
    if (idx !== -1 && idx < best) best = idx;
  });
  return best;
}

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
    title: "🐾 Aluguel de Axies do Fuly",
    discordContact: "Discord para contato:",
    associatesLabel: "🤝 Associados",
    associatesInstructions: "Interessados em alugar? Procure o dono do Axie — o Discord dele aparece logo abaixo da imagem de cada um.",
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
    discordLabel: "Discord",
    discordBtnLabel: "Falar no Discord",
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
    filterAvailableBtn: "✅ Apenas Axies disponíveis para aluguel",
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
    seasonLabel: "Temporada",
    updatedAtLabel: "Atualizado em",
    top100SeasonSelectLabel: "Ver temporada/era",
    promoTicketTitle: "🎫 Tiquete de Morph",
    promoTicketSubtitle: "Garanta o seu por apenas US$ 1",
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
    title: "🐾 Fuly's Axie Rentals",
    discordContact: "Discord contact:",
    associatesLabel: "🤝 Associates",
    associatesInstructions: "Interested in renting? Look for the Axie's owner — their Discord shows up right below each Axie's image.",
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
    discordLabel: "Discord",
    discordBtnLabel: "Chat on Discord",
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
    filterAvailableBtn: "✅ Only Axies available to rent",
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
    seasonLabel: "Season",
    updatedAtLabel: "Updated on",
    top100SeasonSelectLabel: "View season/era",
    promoTicketTitle: "🎫 Morph Ticket",
    promoTicketSubtitle: "Get yours for just US$ 1",
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
    title: "🐾 Alquiler de Axies de Fuly",
    discordContact: "Contacto de Discord:",
    associatesLabel: "🤝 Asociados",
    associatesInstructions: "¿Interesado en alquilar? Busca al dueño del Axie — su Discord aparece justo debajo de la imagen de cada uno.",
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
    discordLabel: "Discord",
    discordBtnLabel: "Hablar por Discord",
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
    filterAvailableBtn: "✅ Solo Axies disponibles para alquilar",
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
    seasonLabel: "Temporada",
    updatedAtLabel: "Actualizado el",
    top100SeasonSelectLabel: "Ver temporada/era",
    promoTicketTitle: "🎫 Ticket de Morph",
    promoTicketSubtitle: "Consigue el tuyo por solo US$ 1",
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
    title: "🐾 Pag-arkila ng Axies ni Fuly",
    discordContact: "Discord para sa kontak:",
    associatesLabel: "🤝 Mga Kasosyo",
    associatesInstructions: "Interesado mag-arkila? Hanapin ang may-ari ng Axie — makikita ang Discord niya sa ibaba mismo ng larawan ng bawat Axie.",
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
    discordLabel: "Discord",
    discordBtnLabel: "Mag-chat sa Discord",
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
    filterAvailableBtn: "✅ Axies lang na pwedeng arkilahin",
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
    seasonLabel: "Season",
    updatedAtLabel: "Na-update noong",
    top100SeasonSelectLabel: "Tingnan ang season/era",
    promoTicketTitle: "🎫 Morph Ticket",
    promoTicketSubtitle: "Kunin ang sa'yo sa US$ 1 lang",
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

function renderAssociatesBanner() {
  const el = document.getElementById("associatesBanner");
  if (!el || typeof PARTNER_NAMES === "undefined") return;
  const names = Object.values(PARTNER_NAMES).join(", ");
  el.innerHTML = `
    <div class="associates-names">${t("associatesLabel")}: <strong>${escapeHtml(names)}</strong></div>
    <div class="associates-instructions">${t("associatesInstructions")}</div>
  `;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  translateStaticUI();
  updateLockUI();
  populateCollectibleFilter();
  renderPriceTable();
  renderAssociatesBanner();
  renderPromoDiscordButtons();
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
  { labelKey: "MEO", price: 5 },
  { labelKey: "Nightmare", price: 3.5 },
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
        if (
          myToken === top100RenderToken &&
          dataUrl &&
          dataUrl.length > 100 &&
          !(await isBlankImage(dataUrl))
        ) {
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

let currentView = "standard";

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

const DISCORD_ICON_SVG = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23.077.077 0 0 0-.079-.036c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.246.195.373.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028ZM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38Zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38Z"/></svg>';

function discordProfileUrl(userId) {
  return `https://discord.com/users/${userId}`;
}

function discordButtonHtml(wallet, handle, variant) {
  if (!handle) return "";
  const userId = typeof PARTNER_DISCORD_ID !== "undefined" ? PARTNER_DISCORD_ID[normalizeWallet(wallet)] : null;
  const label = variant === "promo" ? `${t("discordBtnLabel")}: ${escapeHtml(handle)}` : `${t("discordLabel")}: ${escapeHtml(handle)}`;
  const inner = `${DISCORD_ICON_SVG}<span>${label}</span>`;
  if (!userId) {
    return `<span class="discord-tag discord-tag-${variant}">${inner}</span>`;
  }
  return `<a class="discord-btn discord-btn-${variant}" href="${discordProfileUrl(userId)}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
}

function renderPromoDiscordButtons() {
  const fulyWallet = "0x7f8d45d28cda0e4ada4b6780a7a33a3f52d5fef8";
  const handle = typeof PARTNER_DISCORD !== "undefined" ? PARTNER_DISCORD[fulyWallet] : null;
  const html = discordButtonHtml(fulyWallet, handle, "promo");
  const ticketEl = document.getElementById("promoTicketDiscord");
  const slipsEl = document.getElementById("slipsDiscord");
  if (ticketEl) ticketEl.innerHTML = html;
  if (slipsEl) slipsEl.innerHTML = html;
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
        axieStatus[change.doc.id] = {
          rentedTiers: Array.isArray(data.rentedTiers) ? data.rentedTiers : [],
          renterName: typeof data.renterName === "string" ? data.renterName : "",
        };
      });
      if (currentView !== "top100") renderGrid();
    },
    (err) => console.error("Erro ao ler status dos axies", err)
  );
}

async function migrateLegacyRenterNames() {
  let legacyState;
  try {
    legacyState = JSON.parse(localStorage.getItem("aluguelAxieState_v1"));
  } catch (e) {
    legacyState = null;
  }
  if (!legacyState || typeof legacyState !== "object") return;

  const entries = Object.entries(legacyState).filter(([, v]) => v && v.renterName);
  for (const [axieId, v] of entries) {
    const axie = AXIE_BY_ID[axieId];
    if (!axie || !canEditAxie(axie)) continue;
    if (getRenterName(axieId)) continue;
    await setRenterName(axie, v.renterName);
  }
  localStorage.removeItem("aluguelAxieState_v1");
}

auth.onAuthStateChanged(async (user) => {
  currentUser = user;
  if (user) {
    await loadPartnerProfile(user);
    await migrateLegacyRenterNames();
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
  return axieStatus[id] || { rentedTiers: [], renterName: "" };
}

function isRented(status) {
  return !!(status.rentedTiers && status.rentedTiers.length > 0);
}

function getRenterName(id) {
  return getStatus(id).renterName || "";
}

async function setRenterName(axie, name) {
  if (!canEditAxie(axie)) return false;
  try {
    await db.collection("axieStatus").doc(axie.id).update({ renterName: name });
    axieStatus[axie.id] = { ...getStatus(axie.id), renterName: name };
    return true;
  } catch (e) {
    console.error("Erro ao salvar nome do locatário", e);
    return false;
  }
}

async function setRentalStatus(axie, rentedTiers) {
  if (!canEditAxie(axie)) {
    showToast(t("toastLockedClick"));
    return false;
  }
  try {
    await db.collection("axieStatus").doc(axie.id).update({ rentedTiers });
    axieStatus[axie.id] = { rentedTiers };
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

function morphImageUrl(id) {
  return `morph-images/${id}.png`;
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
  const filterOwner = document.getElementById("filterOwner").value;
  const showAll = document.getElementById("filterShowAll").checked;

  document.getElementById("filterAvailableBtn").classList.toggle("active", filterStatus === "disponivel");

  let items = AXIE_DATA.filter((axie) => {
    const status = getStatus(axie.id);
    if (!showAll && !axie.collectible) return false;
    if (searchId && !axie.id.includes(searchId)) return false;
    if (filterClass && axie.class !== filterClass) return false;
    if (filterStatus === "disponivel" && isRented(status)) return false;
    if (filterStatus === "alugado" && !isRented(status)) return false;
    if (filterCollectibleTag && !axieHasCollectibleTag(axie, filterCollectibleTag)) return false;
    if (filterOwner && normalizeWallet(axie.ownerWallet) !== normalizeWallet(filterOwner)) return false;
    return true;
  });

  items.sort((a, b) => {
    const levelDiff = (b.level ?? -1) - (a.level ?? -1);
    if (levelDiff !== 0) return levelDiff;
    return collectibleSortRank(a) - collectibleSortRank(b);
  });

  if (items.length === 0) {
    grid.innerHTML = `<div class="empty">${t("emptyMsg")}</div>`;
  }

  items.forEach((axie) => {
    grid.appendChild(buildCard(axie));
  });

  updateStats();
}

function isBlankImage(dataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        if (!canvas.width || !canvas.height) {
          resolve(true);
          return;
        }
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const stride = 4 * 37;
        let visibleSamples = 0;
        let totalSamples = 0;
        for (let i = 0; i < data.length; i += stride) {
          totalSamples++;
          const alpha = data[i + 3];
          const brightness = data[i] + data[i + 1] + data[i + 2];
          if (alpha > 20 && brightness > 15) visibleSamples++;
        }
        resolve(totalSamples === 0 || visibleSamples / totalSamples < 0.02);
      } catch (e) {
        resolve(false);
      }
    };
    img.onerror = () => resolve(true);
    img.src = dataUrl;
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

function populateOwnerFilter() {
  const select = document.getElementById("filterOwner");
  if (typeof PARTNER_NAMES === "undefined") return;
  Object.entries(PARTNER_NAMES).forEach(([wallet, name]) => {
    const opt = document.createElement("option");
    opt.value = wallet;
    opt.textContent = name;
    select.appendChild(opt);
  });
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
    const filled = (status.rentedTiers || []).includes(tier);
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
  const rented = isRented(status);

  const card = document.createElement("div");
  card.className = "card " + (rented ? "alugado" : "disponivel");

  const badgeClass = CLASS_CLASS_MAP[axie.class] || "c-mech";

  const isMorphView = currentView === "morph" && axie.isMorphed;

  const ownerName = typeof PARTNER_NAMES !== "undefined" ? PARTNER_NAMES[normalizeWallet(axie.ownerWallet)] : null;
  const showOwnerBadge = typeof PARTNER_NAMES !== "undefined" && Object.keys(PARTNER_NAMES).length > 1 && ownerName;
  const discordHandle = typeof PARTNER_DISCORD !== "undefined" ? PARTNER_DISCORD[normalizeWallet(axie.ownerWallet)] : null;

  const photoSrc = isMorphView ? morphImageUrl(axie.id) : imageUrl(axie.id);
  card.innerHTML = `
    <div class="card-photo">
      <img id="axie-img-${axie.id}" src="${photoSrc}" alt="Axie ${axie.id}" loading="lazy" title="${partsSummary(axie.parts)}"
           data-fallback="${imageUrl(axie.id)}"
           onerror="if (this.src !== this.dataset.fallback) { this.src = this.dataset.fallback; } else { this.style.visibility='hidden'; }">
      ${isMorphView ? `<span class="morph-ribbon">${t("tabMorph")}</span>` : ""}
      ${axie.level != null ? `<span class="level-badge">Lv. ${axie.level}</span>` : ""}
    </div>
    <div class="card-info">
      <div class="card-id">#${axie.id}</div>
      <span class="class-badge" style="background: var(--${badgeClass})">${axie.class || "?"}</span>
    </div>
    ${showOwnerBadge ? `<div class="owner-badge">${t("ownerLabel")}: ${escapeHtml(ownerName)}${discordButtonHtml(axie.ownerWallet, discordHandle, "badge")}</div>` : ""}
    ${collectibleTagsHtml(axie)}
    ${currentView === "morph" ? morphPartsHtml(axie) : ""}

    <div class="status-toggle ${rented ? "alugado" : "disponivel"}">
      <span class="dot"></span>
      <span class="status-label">${rented ? t("optRented") : t("optAvailable")}</span>
    </div>

    ${tierRowHtml(axie, status)}
  `;

  const renterInput = card.querySelector(".renter-input");
  if (renterInput) {
    renterInput.addEventListener("change", (e) => {
      setRenterName(axie, e.target.value);
    });
  }

  function refreshCardVisual() {
    const s = getStatus(axie.id);
    const r = isRented(s);
    card.className = "card " + (r ? "alugado" : "disponivel");
    const toggleEl = card.querySelector(".status-toggle");
    toggleEl.className = "status-toggle " + (r ? "alugado" : "disponivel");
    toggleEl.querySelector(".status-label").textContent = r ? t("optRented") : t("optAvailable");
    card.querySelectorAll(".tier-item").forEach((item) => {
      const tier = Number(item.dataset.tier);
      item.classList.toggle("filled", (s.rentedTiers || []).includes(tier));
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
    const newTiers = isRented(s) ? [] : [1, 2, 3, 4];
    const ok = await setRentalStatus(axie, newTiers);
    if (ok) refreshCardVisual();
  });

  card.querySelectorAll(".tier-item").forEach((item) => {
    item.addEventListener("click", async () => {
      if (!canEditAxie(axie)) {
        showToast(t("toastLockedClick"));
        return;
      }
      const tier = Number(item.dataset.tier);
      const s = getStatus(axie.id);
      const current = s.rentedTiers || [];
      const newTiers = current.includes(tier)
        ? current.filter((tItem) => tItem !== tier)
        : [...current, tier].sort((a, b) => a - b);
      const ok = await setRentalStatus(axie, newTiers);
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
  const rentedByOwner = {};
  visibleAxies.forEach((axie) => {
    if (isRented(getStatus(axie.id))) {
      alugados++;
      const wallet = normalizeWallet(axie.ownerWallet);
      rentedByOwner[wallet] = (rentedByOwner[wallet] || 0) + 1;
    }
  });
  document.getElementById("statTotal").textContent = total;
  document.getElementById("statAlugado").textContent = alugados;
  document.getElementById("statDisponivel").textContent = total - alugados;
  updateStatsByOwner(rentedByOwner);
}

function updateStatsByOwner(rentedByOwner) {
  const el = document.getElementById("statsByOwner");
  if (!el || typeof PARTNER_NAMES === "undefined") return;
  const parts = Object.entries(PARTNER_NAMES).map(([wallet, name]) => {
    const count = rentedByOwner[normalizeWallet(wallet)] || 0;
    return `${escapeHtml(name)}: <strong>${count}</strong> ${t("statRentedLabel")}`;
  });
  el.innerHTML = parts.join(" &middot; ");
}

function init() {
  translateStaticUI();
  populateClassFilter();
  populateCollectibleFilter();
  populateOwnerFilter();
  renderPriceTable();
  renderAssociatesBanner();
  renderPromoDiscordButtons();

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  ["searchId", "filterClass", "filterStatus", "filterCollectibleTag", "filterOwner", "filterShowAll"].forEach((id) => {
    document.getElementById(id).addEventListener("input", renderGrid);
    document.getElementById(id).addEventListener("change", renderGrid);
  });

  document.getElementById("filterAvailableBtn").addEventListener("click", () => {
    const statusSelect = document.getElementById("filterStatus");
    statusSelect.value = statusSelect.value === "disponivel" ? "" : "disponivel";
    renderGrid();
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
