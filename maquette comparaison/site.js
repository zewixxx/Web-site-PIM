const IMG = "../maquette%20v2/medias/images/";
const ZOOM_KEY = "pim-compare-zoom";
const FULL_KEY = "pim-compare-fullsite";

const prestations = [
  {
    id: "claviers-membrane",
    name: "Claviers à membrane",
    short: "Interfaces souples, étanches, conçues sur mesure pour vos équipements.",
    photo: "dsc_0560.jpg",
    lead: "En Lexan ou en polyester, dès 0,5 mm. Une interface souple, étanche, branchée directement sur l’électronique.",
    facts: ["Sur mesure", "Étanche IP65", "Limande intégrée"]
  },
  {
    id: "claviers-etanches",
    name: "Claviers étanches IP65",
    short: "Protection poussière et jets d’eau pour les environnements exigeants.",
    photo: "dsc_0506.jpg",
    lead: "Toute la gamme de claviers est étanche IP65 : hermétique à la poussière, protégée contre les jets d’eau.",
    facts: ["IP65", "Environnements humides", "Contrôle unitaire"]
  },
  {
    id: "circuits-souples",
    name: "Circuits souples",
    short: "Circuits imprimés souples, encre argent, connexion par limande.",
    photo: "circuit_souples3.jpg",
    lead: "Circuit imprimé sur polyester ou polycarbonate. Encre argent, pistes fines, connexion par limande.",
    facts: ["Polyester / PC", "Encre argent", "CMS et LED"]
  },
  {
    id: "faces-avant",
    name: "Faces avant plastique",
    short: "Décor sérigraphié, teintes Pantone, RAL ou NCS contrôlées.",
    photo: "facade_plastique_habillage_boitier_geolocalisation3.jpg",
    lead: "Décor sérigraphié sur support ou circuit. Teintes analysées par spectrométrie pour rester fidèles d’une série à l’autre.",
    facts: ["Sérigraphie", "Spectrométrie", "Sur boîtier"]
  },
  {
    id: "facades-metal",
    name: "Façades et inserts métal",
    short: "Identification machine et produit, découpe laser à ± 0,3 mm.",
    photo: "dsc_0549.jpg",
    lead: "Identification d’un produit, d’une machine ou d’un équipement. Découpe laser précise et marquage durable.",
    facts: ["± 0,3 mm", "Métal", "Traçabilité"]
  },
  {
    id: "etiquettes-luxe",
    name: "Étiquettes et décoration luxe",
    short: "Métal, résine et inserts pour vins, spiritueux, parfums et cosmétiques.",
    photo: "etiquette_metal_courvoisier.jpg",
    lead: "Étiquettes métal, dômage résine et inserts pour sublimer un flacon, un coffret ou un packaging haut de gamme.",
    facts: ["Métal", "Dômage", "Sur mesure"]
  },
  {
    id: "plv-presentoirs",
    name: "PLV et présentoirs",
    short: "PLV lumineuse, signalétique et présentoirs plexiglas.",
    photo: "plv_presentoir_goldkenn1.jpg",
    lead: "Présentoirs, signalétique lumineuse et PLV pour le point de vente, conçus et fabriqués dans le même atelier.",
    facts: ["PLV LED", "Plexiglas", "Point de vente"]
  },
  {
    id: "controle-serie",
    name: "Contrôle et série",
    short: "De l’idée à la série : tests électriques et contrôle esthétique.",
    photo: "fond_decoupe_laser6.jpg",
    lead: "Chaque pièce expédiée est testée électriquement, puis contrôlée esthétiquement. Atelier ISO 9001 à Marckolsheim.",
    facts: ["100 % contrôlé", "ISO 9001", "4 500 m²"]
  }
];

const realisations = [
  ["dsc_0560.jpg", "Clavier à membrane"],
  ["industrie_claviers_coupelles.jpg", "Clavier à coupelles"],
  ["circuit_souples3.jpg", "Circuit souple"],
  ["dsc_0549.jpg", "Façade métallique"],
  ["etiquette_metal_courvoisier.jpg", "Étiquette métal"],
  ["visuel_pim_parfum_web.jpg", "Décoration luxe"],
  ["plv_presentoir_goldkenn1.jpg", "Présentoir PLV"],
  ["copie_de_coffret_led_roederer_low.jpg", "PLV lumineuse"],
  ["fond_decoupe_laser6.jpg", "Découpe laser"]
];

function img(file) { return IMG + file; }

function fullsiteOn() {
  try { return sessionStorage.getItem(FULL_KEY) === "1"; } catch (error) { return false; }
}
function setFullsite(on) {
  try { sessionStorage.setItem(FULL_KEY, on ? "1" : "0"); } catch (error) { /* ignore */ }
}
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function nav(active) {
  const item = (id, label) =>
    '<a href="#' + id + '"' + (active === id ? ' class="on"' : "") + ">" + label + "</a>";
  return [
    '<header class="site-top"><div class="site-top-inner">',
    '<a class="brand" href="#accueil"><img src="' + img("logo_pim_industrie_aplat.png") + '" alt="PIM Industrie"></a>',
    '<nav class="site-nav">',
    item("accueil", "Accueil"),
    item("a-propos", "À propos"),
    item("prestations", "Nos prestations"),
    item("realisations", "Réalisations"),
    item("contact", "Contact"),
    "</nav>",
    '<div class="site-top-end"><a class="btn" href="#contact">Contactez-nous</a></div>',
    "</div></header>"
  ].join("");
}

function foot() {
  return [
    '<footer class="site-foot"><div class="wrap">',
    '<div class="foot-grid">',
    "<div><b>PIM Industrie</b><span>Impasse Kohlgaerten<br>67390 Marckolsheim<br><a href=\"tel:+33388586200\">03 88 58 62 00</a><br><a href=\"mailto:mail@pim-industrie.com\">mail@pim-industrie.com</a></span></div>",
    '<div class="cols"><b>Navigation</b><a href="#accueil">Accueil</a><a href="#a-propos">À propos</a><a href="#prestations">Nos prestations</a><a href="#realisations">Réalisations</a><a href="#contact">Contact</a></div>',
    '<div class="cols"><b>Prestations</b>' +
      prestations.slice(0, 5).map((p) => '<a href="#' + p.id + '">' + escapeHtml(p.name) + "</a>").join("") +
      "</div>",
    "</div>",
    '<div class="foot-bottom"><span>Depuis 1961 · ISO 9001 · Marckolsheim</span><span><a href="#mentions">Mentions légales</a> · <a href="#confidentialite">Données personnelles</a></span></div>',
    "</div></footer>"
  ].join("");
}

function ctaProject() {
  return [
    '<section class="band dark"><div class="wrap cta-block">',
    "<h2>Vous avez un projet ? Nous pouvons le réaliser.</h2>",
    '<p class="muted">Ensemble, nous étudions votre besoin et vous proposons une solution sur mesure. Devis gratuit.</p>',
    '<a class="btn" href="#contact">Contactez-nous</a>',
    "</div></section>"
  ].join("");
}

function serviceGrid(limit) {
  const list = typeof limit === "number" ? prestations.slice(0, limit) : prestations;
  return '<div class="service-grid">' + list.map((p) => [
    '<a class="service-card" href="#' + p.id + '">',
    '<div class="thumb"><img src="' + img(p.photo) + '" alt=""></div>',
    '<div class="body"><h3>' + escapeHtml(p.name) + "</h3>",
    "<p>" + escapeHtml(p.short) + "</p>",
    '<span class="more">En savoir +</span></div></a>'
  ].join("")).join("") + "</div>";
}

function shell(active, inner) {
  return nav(active) + inner + foot();
}

function prestationPage(p) {
  document.title = p.name + " — PIM Industrie";
  return shell("prestations", [
    '<section class="band"><div class="wrap">',
    '<p class="crumbs"><a href="#accueil">Accueil</a> / <a href="#prestations">Nos prestations</a> / ' + escapeHtml(p.name) + "</p>",
    '<div class="detail-hero">',
    "<div>",
    '<p class="kicker">Prestation</p>',
    "<h1>" + escapeHtml(p.name) + "</h1>",
    '<p class="lead">' + escapeHtml(p.lead) + "</p>",
    '<a class="btn" href="#contact">Demander un devis</a>',
    '<ul class="facts">' + p.facts.map((f) => "<li>" + escapeHtml(f) + "</li>").join("") + "</ul>",
    "</div>",
    '<img src="' + img(p.photo) + '" alt="">',
    "</div></div></section>",
    ctaProject()
  ].join(""));
}

const views = {
  accueil() {
    document.title = "Interfaces et décoration sur mesure | PIM Industrie";
    return shell("accueil", [
      '<section class="hero-cover">',
      '<img src="' + img("fond_decoupe_laser6.jpg") + '" alt="">',
      '<div class="hero-cover-inner">',
      "<h1>Interfaces industrielles et décoration sur mesure</h1>",
      '<a class="btn" href="#contact">Contactez-nous</a>',
      "</div></section>",

      '<section class="band"><div class="wrap center">',
      "<h2>PIM Industrie · Marckolsheim</h2>",
      '<p class="service-list">Claviers à membrane, circuits souples, faces avant, façades métal, étiquettes luxe, PLV</p>',
      '<p class="lead">PIM Industrie conçoit et fabrique des interfaces homme-machine et des pièces de décoration haut de gamme. Un seul atelier, de l’idée à la série, depuis 1961.</p>',
      '<a class="btn line" href="#a-propos">En savoir +</a>',
      "</div></section>",

      '<section class="band wash"><div class="wrap center">',
      "<h2>Nos prestations</h2>",
      '<p class="lead muted">Une offre organisée par savoir-faire, pour trouver rapidement la solution adaptée à votre projet.</p>',
      serviceGrid(),
      "</div></section>",

      '<section class="band"><div class="wrap center">',
      "<h2>Un atelier dédié à vos projets</h2>",
      '<p class="lead">Chez PIM, chaque projet est étudié avec votre contrainte d’usage : étanchéité, rétroéclairage, teinte, série. Les pièces sont fabriquées et contrôlées sur place.</p>',
      '<a class="btn line" href="#realisations">Voir les réalisations</a>',
      "</div></section>",

      ctaProject()
    ].join(""));
  },

  "a-propos"() {
    document.title = "À propos — PIM Industrie";
    return shell("a-propos", [
      '<section class="band"><div class="wrap">',
      '<p class="crumbs"><a href="#accueil">Accueil</a> / À propos</p>',
      '<p class="kicker">L’entreprise</p>',
      "<h1>À propos</h1>",
      '<div class="split">',
      "<div>",
      "<h2>L’expertise PIM Industrie</h2>",
      "<p>Depuis 1961, PIM accompagne les industriels et les marques dans la fabrication d’interfaces et de pièces décoratives sur mesure. L’atelier de Marckolsheim concentre sérigraphie, découpe, assemblage et contrôle.</p>",
      "<p>Claviers à membrane, circuits souples, faces avant, inserts métal, étiquettes et PLV : une chaîne complète pour passer du prototype à la série avec la même exigence.</p>",
      '<a class="btn line" href="#prestations">Découvrez nos prestations</a>',
      "</div>",
      '<img src="' + img("dsc_0560.jpg") + '" alt="Atelier et pièces PIM">',
      "</div>",
      '<div class="values">',
      '<div class="value"><b>Proximité</b><span class="muted">Un interlocuteur technique, de l’étude à la livraison.</span></div>',
      '<div class="value"><b>Maîtrise</b><span class="muted">Impression, découpe laser, composants, contrôle unitaire.</span></div>',
      '<div class="value"><b>Qualité</b><span class="muted">Certification ISO 9001 et traçabilité des séries.</span></div>',
      '<div class="value"><b>Sur mesure</b><span class="muted">Chaque pièce est conçue pour votre usage et votre environnement.</span></div>',
      "</div></div></section>",
      ctaProject()
    ].join(""));
  },

  prestations() {
    document.title = "Nos prestations — PIM Industrie";
    return shell("prestations", [
      '<section class="band"><div class="wrap center">',
      '<p class="crumbs"><a href="#accueil">Accueil</a> / Nos prestations</p>',
      '<p class="kicker">Savoir-faire</p>',
      "<h1>Nos prestations</h1>",
      '<p class="lead">Huit familles de solutions. Ouvrez celle qui correspond à votre besoin : interface, circuit, façade ou décoration.</p>',
      serviceGrid(),
      "</div></section>",
      ctaProject()
    ].join(""));
  },

  realisations() {
    document.title = "Réalisations — PIM Industrie";
    return shell("realisations", [
      '<section class="band"><div class="wrap">',
      '<p class="crumbs"><a href="#accueil">Accueil</a> / Réalisations</p>',
      '<p class="kicker">Atelier</p>',
      "<h1>Réalisations</h1>",
      '<p class="lead">Une sélection de pièces fabriquées à Marckolsheim. Les études de cas chiffrées seront ajoutées après validation client.</p>',
      '<div class="gallery">' + realisations.map((item) =>
        '<a href="#prestations"><img src="' + img(item[0]) + '" alt=""><span class="cap">' + escapeHtml(item[1]) + "</span></a>"
      ).join("") + "</div>",
      "</div></section>",
      ctaProject()
    ].join(""));
  },

  contact() {
    document.title = "Contact — PIM Industrie";
    return shell("contact", [
      '<section class="band"><div class="wrap">',
      '<p class="crumbs"><a href="#accueil">Accueil</a> / Contact</p>',
      '<p class="kicker">Parlons de votre projet</p>',
      "<h1>Contact</h1>",
      '<div class="contact-grid">',
      '<div class="contact-card">',
      "<p><b>PIM Industrie</b></p>",
      "<p>Impasse Kohlgaerten<br>67390 Marckolsheim</p>",
      '<p><a href="tel:+33388586200">03 88 58 62 00</a></p>',
      '<p><a href="mailto:mail@pim-industrie.com">mail@pim-industrie.com</a></p>',
      '<p class="hint">Délai de réponse indicatif : 2 jours ouvrés <em>(à confirmer)</em>.</p>',
      "</div>",
      '<form class="form" onsubmit="return false;">',
      '<label>Nom<input type="text" name="name" autocomplete="name"></label>',
      '<label>Société<input type="text" name="company" autocomplete="organization"></label>',
      '<label>E-mail<input type="email" name="email" autocomplete="email"></label>',
      '<label>Prestation<select name="need"><option value="">À préciser</option>' +
        prestations.map((p) => '<option>' + escapeHtml(p.name) + "</option>").join("") +
        "</select></label>",
      '<label>Message<textarea name="message" placeholder="Décrivez votre pièce, volumes, contraintes…"></textarea></label>',
      '<p class="hint">Formulaire maquette : non envoyé. Sur le site final, le message partira vers PIM.</p>',
      '<button class="btn" type="submit">Envoyer</button>',
      "</form>",
      "</div></div></section>"
    ].join(""));
  },

  mentions() {
    document.title = "Mentions légales — PIM Industrie";
    return shell("accueil", [
      '<section class="band"><div class="wrap">',
      "<h1>Mentions légales</h1>",
      "<p>Page maquette. Le texte juridique définitif reprendra celui validé pour le site public.</p>",
      "</div></section>"
    ].join(""));
  },

  confidentialite() {
    document.title = "Données personnelles — PIM Industrie";
    return shell("accueil", [
      '<section class="band"><div class="wrap">',
      "<h1>Données personnelles</h1>",
      "<p>Page maquette. La politique de confidentialité définitive sera celle validée pour le site public.</p>",
      "</div></section>"
    ].join(""));
  }
};

prestations.forEach((p) => {
  views[p.id] = () => prestationPage(p);
});

const PAGES = [
  { id: "accueil", name: "Accueil", group: "Site" },
  { id: "a-propos", name: "À propos", group: "Site" },
  { id: "prestations", name: "Nos prestations", group: "Site" },
  ...prestations.map((p) => ({ id: p.id, name: p.name, group: "Prestations" })),
  { id: "realisations", name: "Réalisations", group: "Site" },
  { id: "contact", name: "Contact", group: "Site" },
  { id: "mentions", name: "Mentions légales", group: "Légal" },
  { id: "confidentialite", name: "Données personnelles", group: "Légal" }
];

function pageGroups() {
  const groups = [];
  const map = {};
  PAGES.forEach((page) => {
    if (!map[page.group]) {
      map[page.group] = { name: page.group, pages: [] };
      groups.push(map[page.group]);
    }
    map[page.group].pages.push(page);
  });
  return groups;
}

function pageSelect(currentId) {
  return '<select id="page-select" class="page-select" aria-label="Choisir une page">' + pageGroups().map((group) => {
    return '<optgroup label="' + escapeHtml(group.name) + '">' + group.pages.map((page) => {
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
    const index = PAGES.findIndex((page) => page.id === currentId);
    const target = PAGES[(index + step + PAGES.length) % PAGES.length];
    location.hash = target.id;
  };
  if (select) select.addEventListener("change", () => { location.hash = select.value; });
  const prev = document.getElementById("page-prev");
  const next = document.getElementById("page-next");
  if (prev) prev.addEventListener("click", () => go(-1));
  if (next) next.addEventListener("click", () => go(1));
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
  const was = fullsiteOn();
  setFullsite(false);
  if (document.fullscreenElement && document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }
  if (was) route();
}

function syncChromeOffset() {
  const bar = document.querySelector(".proto-bar");
  document.documentElement.style.setProperty("--proto-h", bar ? bar.offsetHeight + "px" : "0px");
}

function renderPage(id) {
  const page = PAGES.find((item) => item.id === id);
  if (!page || !views[id]) {
    location.hash = "planches";
    return;
  }
  const html = views[id]();
  const full = fullsiteOn();
  document.body.className = "alt" + (full ? " is-fullsite" : "");
  document.getElementById("app").innerHTML = full
    ? html + '<div class="fullsite-tools">' + pageNavHtml(page.id) + '<button type="button" id="fullsite-exit" class="fullsite-exit">Quitter · Échap</button></div>'
    : '<div class="proto-bar">' + pageNavHtml(page.id) + '<div class="admin-actions"><button type="button" id="fullsite-open">Plein écran</button><a href="#planches">Toutes les planches</a></div></div>' + html;
  const open = document.getElementById("fullsite-open");
  if (open) open.addEventListener("click", () => enterFullsite(page.id));
  const exitBtn = document.getElementById("fullsite-exit");
  if (exitBtn) exitBtn.addEventListener("click", exitFullsite);
  bindPageNav(page.id);
  syncChromeOffset();
  window.scrollTo(0, 0);
}

function renderBoards() {
  document.title = "Planches — Comparaison design PIM";
  document.body.className = "is-boards";
  let zoom = 0.32;
  try { zoom = Number(localStorage.getItem(ZOOM_KEY) || "0.32"); } catch (error) { zoom = 0.32; }
  const groups = pageGroups();
  const side = groups.map((group) => {
    return '<div class="side-group">' + escapeHtml(group.name) + "</div>" + group.pages.map((page) => {
      return '<a class="side-link" href="#' + page.id + '">' + escapeHtml(page.name) + "</a>";
    }).join("");
  }).join("");
  const boards = groups.map((group) => {
    return '<section class="board"><div class="side-group">' + escapeHtml(group.name) + "</div>" + group.pages.map((page) => {
      return [
        '<div class="frame" data-id="' + page.id + '">',
        '<div class="frame-label">' + escapeHtml(page.name) + "</div>",
        '<a class="frame-link" href="#' + page.id + '">',
        '<div class="frame-clip"><div class="frame-scale" style="transform:scale(' + zoom + ')">',
        views[page.id](),
        "</div></div></a></div>"
      ].join("");
    }).join("") + "</section>";
  }).join("");
  document.getElementById("app").innerHTML = [
    '<div class="figma">',
    '<aside class="side">',
    "<h1>PIM Industrie</h1>",
    '<p class="sub">Comparaison design · structure type Point Carré · charte PIM<br>' + PAGES.length + " pages</p>",
    '<div class="zoom">',
    [0.24, 0.32, 0.45].map((value) => {
      return '<button type="button" class="' + (value === zoom ? "on" : "") + '" data-zoom="' + value + '">' + Math.round(value * 100) + "%</button>";
    }).join(""),
    "</div>",
    '<button type="button" id="fullsite-board" class="side-fullsite">Voir comme le vrai site</button>',
    '<a class="side-link" href="#planches">Vue planches</a>',
    side,
    "</aside>",
    '<div class="canvas">' + boards + "</div>",
    "</div>"
  ].join("");
  const fullBoard = document.getElementById("fullsite-board");
  if (fullBoard) fullBoard.addEventListener("click", () => enterFullsite("accueil"));
  const measure = () => {
    document.querySelectorAll(".frame-scale").forEach((node) => {
      const clip = node.parentElement;
      clip.style.height = Math.ceil(node.scrollHeight * zoom) + "px";
      clip.style.width = Math.ceil(1440 * zoom) + "px";
    });
  };
  requestAnimationFrame(measure);
  setTimeout(measure, 400);
  setTimeout(measure, 1200);
  window.scrollTo(0, 0);
}

function route() {
  const id = (location.hash || "#accueil").slice(1) || "accueil";
  if (id === "planches") {
    setFullsite(false);
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
  try { localStorage.setItem(ZOOM_KEY, button.getAttribute("data-zoom")); } catch (error) { /* ignore */ }
  renderBoards();
});
window.addEventListener("hashchange", route);
window.addEventListener("resize", syncChromeOffset);
route();
