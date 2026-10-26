const ZOOM_KEY = "pim-maquette-zoom";
const FULL_KEY = "pim-fullsite";

function fullsiteOn() {
  try { return sessionStorage.getItem(FULL_KEY) === "1"; } catch (error) { return false; }
}

function setFullsite(on) {
  try { sessionStorage.setItem(FULL_KEY, on ? "1" : "0"); } catch (error) { /* ignore */ }
}

function enterFullsite(id) {
  setFullsite(true);
  const root = document.documentElement;
  if (root.requestFullscreen && !document.fullscreenElement) {
    root.requestFullscreen().catch(() => {});
  }
  if ((location.hash || "").slice(1) === id) route();
  else location.hash = id;
  
}

function exitFullsite() {
  setFullsite(false);
  if (document.fullscreenElement && document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }
  route();
}

function nav(activeGroup) {
  const tab = (id, label, group, extra) => {
    const classes = [];
    if (group === activeGroup) classes.push("on");
    if (extra) classes.push(extra);
    return '<a href="#' + id + '"' + (classes.length ? ' class="' + classes.join(" ") + '"' : "") + ">" + label + "</a>";
  };
  return [
    '<div class="util">',
    '<a href="tel:+33388586200">03 88 58 62 00</a>',
    '<div class="util-right">',
    '<a href="https://www.pim-industrie.com/" target="_blank" rel="noreferrer">FR</a><span>|</span>',
    '<a href="https://www.pim-industrie.com/en/" target="_blank" rel="noreferrer">EN</a><span>|</span>',
    '<a href="https://www.pim-industrie.com/de/" target="_blank" rel="noreferrer">DE</a><span>|</span>',
    '<a href="https://www.youtube.com/channel/UCV6IFc3xGXDkXyLOE_SY3Ag" target="_blank" rel="noreferrer">YouTube</a>',
    "</div></div>",
    '<header class="nav">',
    '<a class="logo" href="#accueil"><img src="medias/images/logo_pim_industrie_aplat.png" alt="PIM Industrie"></a>',
    '<nav class="menu">',
    tab("secteurs", "Domaines", "Domaines"),
    tab("technologies", "Industrie", "Industrie"),
    tab("decoration", "Luxe &amp; PLV", "Décoration"),
    tab("process", "Process", "Process"),
    tab("ressources", "Ressources", "Ressources"),
    tab("societe", "Société", "Société"),
    "</nav>",
    '<a class="cta cta-devis" href="#contact">Nous contacter</a>',
    "</header>"
  ].join("");
}

function footer() {
  const col = (title, links) => {
    return "<div><h3>" + title + "</h3>" + links.map((link) => {
      return '<a href="#' + link[1] + '">' + link[0] + "</a>";
    }).join("") + "</div>";
  };
  return [
    '<footer class="footer"><div class="footer-grid">',
    '<div><h3>Coordonnées</h3>',
    "<p>Impasse Kohlgaerten<br>67390 Marckolsheim<br>France</p>",
    "<p>Tél. : 03 88 58 62 00<br>Fax : 03 88 58 62 10<br>mail@pim-industrie.com</p>",
    '<a href="#acces">Accès</a></div>',
    col("Savoir-faire", [
      ["Domaines", "secteurs"],
      ["Industrie", "technologies"],
      ["Luxe &amp; PLV", "decoration"],
      ["Process", "process"],
      ["Ressources", "ressources"]
    ]),
    col("Société", [
      ["Qui sommes-nous", "societe"],
      ["Références", "references"],
      ["Études de cas", "cas-clients"],
      ["Actualités", "actualites"],
      ["Glossaire", "glossaire"],
      ["Demander un devis", "demande"]
    ]),
    col("Informations", [
      ["Mentions légales", "mentions"],
      ["Protection des données", "confidentialite"],
      ["Plan du site", "plan"],
      ["Conditions de vente", "cgv"],
      ["Conditions d’achat", "cga"]
    ]),
    "</div>",
    '<p class="legal-line">© PIM Industrie · Marckolsheim, depuis 1961</p>',
    "</footer>"
  ].join("");
}

// Un seul geste suivant, sur toutes les pages : demander un devis.
function ctaBand() {
  return [
    '<section class="cta-band"><div class="wrap cta-band-inner">',
    "<div><h2>Un projet ? Demandez un devis</h2>",
    "<p>Étude, prototypage rapide et industrialisation efficace. Décrivez votre projet, nous vous répondons.</p></div>",
    '<div class="cta-band-actions"><a class="cta ghost" href="#demande">Demander un devis</a>',
    '<p>ou par téléphone : <a href="tel:+33388586200">03 88 58 62 00</a></p></div>',
    "</div></section>"
  ].join("");
}

const PAGE_URL = {
  accueil: "https://www.pim-industrie.com/",
  secteurs: "https://www.pim-industrie.com/secteurs",
  "secteur-medical": "https://www.pim-industrie.com/secteurs/industrie-medicale",
  "secteur-aeronautique": "https://www.pim-industrie.com/secteurs/aeronautique-defense",
  "secteur-automobile": "https://www.pim-industrie.com/secteurs/automobile",
  "secteur-automatisation": "https://www.pim-industrie.com/secteurs/automatisation",
  "secteur-machines": "https://www.pim-industrie.com/secteurs/machine-outils",
  "secteur-nautique": "https://www.pim-industrie.com/secteurs/nautique",
  "secteur-electronique": "https://www.pim-industrie.com/secteurs/electronique",
  "secteur-transports": "https://www.pim-industrie.com/secteurs/transports",
  "secteur-luxe": "https://www.pim-industrie.com/secteurs/luxe",
  technologies: "https://www.pim-industrie.com/industrie",
  "clavier-membrane": "https://www.pim-industrie.com/industrie/clavier-a-membrane",
  "clavier-retro": "https://www.pim-industrie.com/industrie/clavier-a-membrane/clavier-retro-eclaire",
  "clavier-coupelles": "https://www.pim-industrie.com/industrie/clavier-a-membrane/clavier-coupelles",
  "clavier-gaufre": "https://www.pim-industrie.com/industrie/clavier-a-membrane/clavier-gaufre",
  "clavier-electro": "https://www.pim-industrie.com/industrie/clavier-a-membrane/clavier-electroluminescent",
  "clavier-7s": "https://www.pim-industrie.com/industrie/clavier-a-membrane/clavier-afficheurs-7s",
  "clavier-capacitif": "https://www.pim-industrie.com/industrie/clavier-a-membrane/clavier-capacitif",
  "clavier-plat": "https://www.pim-industrie.com/industrie/clavier-a-membrane/clavier-plat",
  "clavier-elastomere": "https://www.pim-industrie.com/industrie/clavier-a-membrane/clavier-elastomere",
  "clavier-etanche": "https://www.pim-industrie.com/industrie/clavier-etanche",
  "circuit-flexible": "https://www.pim-industrie.com/industrie/circuit-flexible",
  "face-avant-plastique": "https://www.pim-industrie.com/industrie/face-avant-plastique",
  "facade-metallique": "https://www.pim-industrie.com/industrie/facade-et-insert-metallique",
  decoration: "https://www.pim-industrie.com/decoration",
  etiquettes: "https://www.pim-industrie.com/decoration/etiquette-personnalisable",
  "etiquette-3d": "https://www.pim-industrie.com/decoration/etiquette-personnalisable/etiquette-3d",
  "etiquette-vins": "https://www.pim-industrie.com/decoration/etiquette-personnalisable/etiquette-vins-spiritueux",
  "etiquette-cosmetiques": "https://www.pim-industrie.com/decoration/etiquette-personnalisable/etiquette-cosmetiques",
  "etiquette-plastique": "https://www.pim-industrie.com/decoration/etiquette-personnalisable/etiquette-plastique",
  plv: "https://www.pim-industrie.com/decoration/publicite-sur-le-lieu-de-vente",
  signaletique: "https://www.pim-industrie.com/decoration/signaletique-lumineuse",
  presentoir: "https://www.pim-industrie.com/decoration/presentoir-plexiglas",
  process: "https://www.pim-industrie.com/nos-process",
  "process-impression": "https://www.pim-industrie.com/nos-process/impression",
  "process-decoupe": "https://www.pim-industrie.com/nos-process/decoupe-deformation",
  "process-gravure": "https://www.pim-industrie.com/nos-process/gravure",
  "process-laminage": "https://www.pim-industrie.com/nos-process/laminage-assemblage",
  "process-composants": "https://www.pim-industrie.com/nos-process/reports-de-composants",
  "process-controle": "https://www.pim-industrie.com/nos-process/test-electrique-controle-final",
  societe: "https://www.pim-industrie.com/qui-sommes-nous",
  references: "https://www.pim-industrie.com/references",
  "besoin-medical": "https://www.pim-industrie.com/besoins/clavier-dispositif-medical",
  "besoin-aeronautique": "https://www.pim-industrie.com/besoins/clavier-aeronautique",
  "besoin-electronique-imprimee": "https://www.pim-industrie.com/besoins/electronique-imprimee",
  "guide-clavier-membrane": "https://www.pim-industrie.com/guides/choisir-son-clavier-a-membrane",
  "cas-clients": "https://www.pim-industrie.com/cas-clients",
  actualites: "https://www.pim-industrie.com/actualites",
  contact: "https://www.pim-industrie.com/contact",
  demande: "https://www.pim-industrie.com/demande-de-devis",
  acces: "https://www.pim-industrie.com/acces",
  glossaire: "https://www.pim-industrie.com/glossaire",
  mentions: "https://www.pim-industrie.com/mentions-legales",
  plan: "https://www.pim-industrie.com/plan-du-site",
  confidentialite: "https://www.pim-industrie.com/politique-de-protection-des-donnees",
  cgv: "https://www.pim-industrie.com/conditions-generales-de-vente",
  cga: "https://www.pim-industrie.com/conditions-generales-d-achat"
};

function pageUrl(page) {
  if (page.id === "couverture") return "";
  return PAGE_URL[page.id] || "";
}

function browserBar(url, note, width) {
  if (!url) return "";
  const badge = note ? '<span class="url-note">' + note + "</span>" : "";
  const style = width ? ' style="width:' + width + 'px"' : "";
  return [
    '<div class="browser"' + style + ">",
    '<span class="browser-dots" aria-hidden="true"><i></i><i></i><i></i></span>',
    '<div class="browser-url">' + url + "</div>",
    badge,
    "</div>"
  ].join("");
}

function shell(page) {
  const saved = adminGet(page.id);
  if (saved) return saved;
  const cls = "site" + (page.theme === "luxe" ? " luxe" : "");
  if (page.bare) return '<div class="' + cls + '">' + page.html + "</div>";
  const band = page.noCta ? "" : ctaBand();
  return '<div class="' + cls + '">' + nav(page.group) + page.html + band + footer() + "</div>";
}

function chatbotHtml() {
  return [
    '<div class="chatbot" id="chatbot">',
    '<button type="button" class="chatbot-toggle" id="chatbot-open" aria-label="Ouvrir l’assistant PIM">',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H13l-4 3.2V16H6.5A2.5 2.5 0 0 1 4 13.5v-7Z"/><path d="M8 9h8M8 12h5"/></svg>',
    "</button>",
    '<div class="chatbot-panel" role="dialog" aria-label="Assistant PIM" aria-modal="false">',
    '<div class="chatbot-head">',
    '<div class="chatbot-avatar" aria-hidden="true">PIM</div>',
    '<div class="chatbot-head-text"><strong>Assistant PIM</strong><span>Conseil produit · maquette visuelle</span></div>',
    '<button type="button" class="chatbot-close" id="chatbot-close" aria-label="Fermer">×</button>',
    "</div>",
    '<div class="chatbot-body">',
    '<div class="chatbot-msg bot"><p>Bonjour, je suis l’assistant PIM. Décrivez votre besoin (secteur, environnement, type d’interface) et je vous orienterai vers une solution.</p></div>',
    '<div class="chatbot-msg user"><p>Je cherche un clavier étanche pour un équipement médical.</p></div>',
    '<div class="chatbot-msg bot"><p>Pour le médical, on privilégie souvent un clavier à membrane IP65, éventuellement capacitif selon l’usage. Voici des pistes à explorer :</p><div class="chatbot-suggestions"><button type="button">Clavier étanche IP65</button><button type="button">Clavier capacitif</button><button type="button">Face avant plastique</button></div></div>',
    "</div>",
    '<div class="chatbot-foot">',
    '<form class="chatbot-compose" id="chatbot-form">',
    '<input type="text" placeholder="Décrire votre projet…" disabled aria-disabled="true">',
    '<button type="submit" disabled>Envoyer</button>',
    "</form>",
    '<p class="chatbot-note">Maquette visuelle — l’IA ne répond pas encore</p>',
    "</div></div></div>"
  ].join("");
}

function bindChatbot() {
  const root = document.getElementById("chatbot");
  if (!root) return;
  const open = document.getElementById("chatbot-open");
  const close = document.getElementById("chatbot-close");
  if (open) open.addEventListener("click", () => root.classList.add("is-open"));
  if (close) close.addEventListener("click", () => root.classList.remove("is-open"));
}

function escapeHtml(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

function pageSelect(currentId) {
  const groups = [];
  window.PAGES.forEach((page) => {
    let group = groups.find((item) => item.name === page.group);
    if (!group) {
      group = { name: page.group, pages: [] };
      groups.push(group);
    }
    group.pages.push(page);
  });
  return '<select id="page-select" class="page-select" aria-label="Choisir une page">' + groups.map((group) => {
    return '<optgroup label="' + escapeHtml(WORLD_LABEL[group.name] || group.name) + '">' + group.pages.map((page) => {
      return '<option value="' + page.id + '"' + (page.id === currentId ? " selected" : "") + ">" + escapeHtml(page.name) + "</option>";
    }).join("") + "</optgroup>";
  }).join("") + "</select>";
}

function pageNavHtml(currentId) {
  return '<div class="page-nav">' +
    '<button type="button" id="page-prev" title="Page précédente" aria-label="Page précédente">‹</button>' +
    pageSelect(currentId) +
    '<button type="button" id="page-next" title="Page suivante" aria-label="Page suivante">›</button>' +
    "</div>";
}

function bindPageNav(currentId) {
  const select = document.getElementById("page-select");
  const go = (step) => {
    const index = window.PAGES.findIndex((page) => page.id === currentId);
    const target = window.PAGES[(index + step + window.PAGES.length) % window.PAGES.length];
    location.hash = target.id;
  };
  if (select) select.addEventListener("change", () => { location.hash = select.value; });
  const prev = document.getElementById("page-prev");
  const next = document.getElementById("page-next");
  if (prev) prev.addEventListener("click", () => go(-1));
  if (next) next.addEventListener("click", () => go(1));
}

function renderPage(id) {
  const page = window.PAGES.find((item) => item.id === id);
  if (!page) {
    location.hash = "planches";
    return;
  }
  document.title = seoFor(page).title;
  if (fullsiteOn()) {
    document.body.classList.add("is-fullsite");
    document.body.classList.remove("is-admin");
    document.body.innerHTML = shell(page) + chatbotHtml() +
      '<div class="fullsite-tools">' + pageNavHtml(page.id) +
      '<button type="button" id="fullsite-exit" class="fullsite-exit">Quitter · Échap</button></div>';
    const exitBtn = document.getElementById("fullsite-exit");
    if (exitBtn) exitBtn.addEventListener("click", exitFullsite);
    bindPageNav(page.id);
    bindChatbot();
    initHeroCarousels();
    window.scrollTo(0, 0);
    return;
  }
  document.body.classList.remove("is-fullsite");
  const url = pageUrl(page);
  const note = "";
  document.body.innerHTML = [
    '<div class="proto-bar">',
    pageNavHtml(page.id),
    '<div class="admin-actions">',
    '<button type="button" id="fullsite-open">Plein écran</button>',
    '<button type="button" id="admin-reset">Texte d’origine</button>',
    '<a href="#planches">Toutes les planches</a>',
    "</div></div>",
    '<button type="button" id="admin-toggle" class="admin-float">Mode admin</button>',
    '<p class="admin-hint" id="admin-hint" hidden>Cliquez un texte pour le réécrire. Cliquez une image pour la remplacer. Les valeurs « À chiffrer » sont à renseigner par PIM.</p>',
    '<div class="page-stage">',
    browserBar(url, note),
    serpHtml(page, url),
    '<div class="page-viewport">' + shell(page) + "</div>",
    "</div>",
    chatbotHtml()
  ].join("");
  const fullBtn = document.getElementById("fullsite-open");
  if (fullBtn) fullBtn.addEventListener("click", () => enterFullsite(page.id));
  bindPageNav(page.id);
  bindAdmin(page);
  bindChatbot();
  initHeroCarousels();
  window.scrollTo(0, 0);
}

function renderBoards() {
  document.title = "Planches Figma — PIM Industrie";
  let zoom = 0.32;
  try { zoom = Number(localStorage.getItem(ZOOM_KEY) || "0.32"); } catch (error) { zoom = 0.32; }
  const groups = [];
  window.PAGES.forEach((page) => {
    if (!groups.length || groups[groups.length - 1].name !== page.group) {
      groups.push({ name: page.group, pages: [] });
    }
    groups[groups.length - 1].pages.push(page);
  });

  const side = groups.map((group) => {
    return '<div class="side-group">' + (WORLD_LABEL[group.name] || group.name) + "</div>" + group.pages.map((page) => {
      return '<a class="side-link" href="#' + page.id + '">' + page.name + "</a>";
    }).join("");
  }).join("");

  const boards = groups.map((group) => {
    return '<section class="board"><div class="side-group" style="color:#8d8d8d">' + (WORLD_LABEL[group.name] || group.name) + "</div>" + group.pages.map((page) => {
      return [
        '<div class="frame" data-id="' + page.id + '">',
        '<div class="frame-label">' + page.name + (adminGet(page.id) ? " · modifié" : "") + "</div>",
        browserBar(pageUrl(page), "", Math.ceil(1440 * zoom)),
        '<a class="frame-link" href="#' + page.id + '">',
        '<div class="frame-clip">',
        '<div class="frame-scale" style="transform:scale(' + zoom + ')">',
        shell(page),
        "</div></div></a></div>"
      ].join("");
    }).join("") + "</section>";
  }).join("");

  document.body.innerHTML = [
    '<div class="figma">',
    '<aside class="side">',
    "<h1>PIM Industrie</h1>",
    '<p class="sub">Fichier de planches · 1440 px<br>' + window.PAGES.length + ' pages<br>Le bouton bordeaux, en haut à droite, ouvre le mode admin.</p>',
    '<div class="zoom">',
    zoomButton(0.24, zoom),
    zoomButton(0.32, zoom),
    zoomButton(0.45, zoom),
    "</div>",
    '<button type="button" id="fullsite-board" class="side-fullsite">Voir comme le vrai site</button>',
    '<a class="side-link" href="#planches">Vue planches</a>',
    side,
    "</aside>",
    '<div class="canvas">' + boards + "</div>",
    '<button type="button" id="admin-open" class="admin-float">Mode admin</button>',
    "</div>"
  ].join("");
  initHeroCarousels();
  const fullBoard = document.getElementById("fullsite-board");
  if (fullBoard) fullBoard.addEventListener("click", () => enterFullsite("accueil"));
  const openAdmin = document.getElementById("admin-open");
  if (openAdmin) {
    openAdmin.addEventListener("click", () => {
      localStorage.setItem(ADMIN_ON, "1");
      location.hash = "accueil";
    });
  }

  const measure = () => {
    document.querySelectorAll(".frame-scale").forEach((node) => {
      const clip = node.parentElement;
      clip.style.height = Math.ceil(node.scrollHeight * zoom) + "px";
      clip.style.width = Math.ceil(1440 * zoom) + "px";
    });
  };
  requestAnimationFrame(measure);
  setTimeout(measure, 400);
}

function zoomButton(value, current) {
  const on = value === current ? " on" : "";
  return '<button class="' + on + '" data-zoom="' + value + '">' + Math.round(value * 100) + "%</button>";
}

const ADMIN_KEY = "pim-admin-html";
const ADMIN_ON = "pim-admin-on";

function adminAll() {
  try { return JSON.parse(localStorage.getItem(ADMIN_KEY) || "{}"); }
  catch (error) { return {}; }
}

function adminGet(id) {
  return adminAll()[id] || "";
}

function adminSet(id, html) {
  const data = adminAll();
  data[id] = html;
  localStorage.setItem(ADMIN_KEY, JSON.stringify(data));
}

function adminEditing() {
  return localStorage.getItem(ADMIN_ON) === "1";
}

function persistPage(page) {
  const site = document.querySelector(".page-viewport .site");
  if (!site) return;
  const clone = site.cloneNode(true);
  clone.querySelectorAll("[contenteditable]").forEach((el) => el.removeAttribute("contenteditable"));
  clone.querySelectorAll(".admin-only").forEach((el) => el.remove());
  try {
    adminSet(page.id, clone.outerHTML);
    const hint = document.getElementById("admin-hint");
    if (hint) hint.textContent = "Enregistré sur cet ordinateur. Vous pouvez fermer la page et revenir.";
  } catch (error) {
    const hint = document.getElementById("admin-hint");
    if (hint) hint.textContent = "L’image est trop lourde pour être gardée. Choisissez une photo plus petite.";
  }
}

function chooseFile(done) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.addEventListener("change", () => {
    if (input.files && input.files[0]) done(input.files[0]);
  });
  input.click();
}

function shrinkImage(file, done) {
  const reader = new FileReader();
  reader.onload = () => {
    const image = new Image();
    image.onload = () => {
      const max = 1100;
      const scale = Math.min(1, max / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
      done(canvas.toDataURL("image/jpeg", 0.72));
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function bindAdmin(page) {
  const toggle = document.getElementById("admin-toggle");
  const reset = document.getElementById("admin-reset");
  const hint = document.getElementById("admin-hint");
  const editing = adminEditing();
  if (toggle) {
    toggle.classList.toggle("on", editing);
    toggle.textContent = editing ? "Quitter l’admin" : "Mode admin";
    toggle.addEventListener("click", () => {
      localStorage.setItem(ADMIN_ON, editing ? "0" : "1");
      renderPage(page.id);
    });
  }
  if (reset) {
    reset.hidden = !adminGet(page.id);
    reset.addEventListener("click", () => {
      const data = adminAll();
      delete data[page.id];
      localStorage.setItem(ADMIN_KEY, JSON.stringify(data));
      renderPage(page.id);
    });
  }
  if (!editing) {
    if (hint) hint.hidden = true;
    document.body.classList.remove("is-admin");
    return;
  }
  document.body.classList.add("is-admin");
  if (hint) hint.hidden = false;
  const site = document.querySelector(".page-viewport .site");
  if (!site) return;
  site.addEventListener("click", (event) => {
    if (event.target.closest("a")) event.preventDefault();
  }, true);
  site.querySelectorAll("h1,h2,h3,p,li,button,label,.ref,.kicker,.legal-line,.menu a,.footer a,.util a,.drop > span").forEach((el) => {
    if (el.closest(".admin-only")) return;
    el.setAttribute("contenteditable", "true");
    el.setAttribute("spellcheck", "true");
    el.addEventListener("blur", () => persistPage(page));
  });
  site.querySelectorAll("img").forEach((img) => {
    img.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      chooseFile((file) => {
        shrinkImage(file, (url) => {
          img.src = url;
          persistPage(page);
        });
      });
    });
  });
  const hero = site.querySelector(".hero");
  if (hero && !hero.querySelector("[data-hero-carousel]") && !hero.querySelector(".admin-hero")) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "admin-hero admin-only";
    button.textContent = "Changer la photo de fond";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      chooseFile((file) => {
        shrinkImage(file, (url) => {
          hero.style.backgroundImage = 'url("' + url + '")';
          persistPage(page);
        });
      });
    });
    hero.appendChild(button);
  }
}

function initHeroCarousels() {
  document.querySelectorAll("[data-hero-carousel]").forEach((root) => {
    if (root.dataset.carouselReady === "1") return;
    root.dataset.carouselReady = "1";
    const slides = Array.from(root.querySelectorAll(".hero-slide"));
    const dots = Array.from(root.querySelectorAll("[data-carousel-dot]"));
    const status = root.querySelector(".hero-carousel-status");
    const captionEl = root.querySelector("[data-carousel-caption]");
    const prevBtn = root.querySelector("[data-carousel-prev]");
    const nextBtn = root.querySelector("[data-carousel-next]");
    if (slides.length < 2) return;
    let index = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));
    if (index < 0) index = 0;
    let timer = null;
    const delay = 5500;
    const alive = () => document.body.contains(root);
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function show(nextIndex) {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const on = i === index;
        slide.classList.toggle("is-active", on);
        slide.setAttribute("aria-hidden", on ? "false" : "true");
      });
      dots.forEach((dot, i) => {
        const on = i === index;
        dot.classList.toggle("is-active", on);
        dot.setAttribute("aria-selected", on ? "true" : "false");
        dot.setAttribute("tabindex", on ? "0" : "-1");
      });
      const caption = slides[index].getAttribute("data-caption") || "";
      if (captionEl) captionEl.textContent = caption;
      if (status) {
        status.textContent = "Diapositive " + (index + 1) + " sur " + slides.length + (caption ? " : " + caption : "");
      }
    }

    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function start() {
      stop();
      if (reduceMotion) return;
      timer = setInterval(() => {
        if (!alive()) { stop(); return; }
        show(index + 1);
      }, delay);
    }

    if (prevBtn) prevBtn.addEventListener("click", () => { show(index - 1); start(); });
    if (nextBtn) nextBtn.addEventListener("click", () => { show(index + 1); start(); });
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const target = Number(dot.getAttribute("data-carousel-dot") || "0");
        show(target);
        start();
      });
    });
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", (event) => {
      if (!root.contains(event.relatedTarget)) start();
    });
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (document.contains(root)) start();
      else document.removeEventListener("visibilitychange", onVisibility);
    };
    document.addEventListener("visibilitychange", onVisibility);
    show(index);
    start();
  });
}

function route() {
  const id = (location.hash || "#planches").slice(1) || "planches";
  if (id === "planches") {
    setFullsite(false);
    document.body.classList.remove("is-fullsite");
    renderBoards();
  } else {
    renderPage(id);
  }
}

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement && fullsiteOn()) exitFullsite();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && fullsiteOn()) exitFullsite();
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-zoom]");
  if (!button) return;
  localStorage.setItem(ZOOM_KEY, button.getAttribute("data-zoom"));
  renderBoards();
});

// Ordre des groupes dans les planches, le sélecteur de page et le plan du site
const GROUP_ORDER = ["Accueil", "Domaines", "Industrie", "Décoration", "Process", "Ressources", "Société", "Contact", "Légal"];
window.PAGES = window.PAGES
  .map((page, index) => ({ page: page, index: index }))
  .sort((a, b) => {
    const ra = GROUP_ORDER.indexOf(a.page.group);
    const rb = GROUP_ORDER.indexOf(b.page.group);
    return (ra - rb) || (a.index - b.index);
  })
  .map((item) => item.page);

window.addEventListener("hashchange", route);
route();
