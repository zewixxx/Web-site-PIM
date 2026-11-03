/* PIM Industrie — comportements seulement.
   Le texte des pages est dans les fichiers HTML (index, a-propos, prestations, impression-numerique, references, contact).
   Ce fichier gère le menu, le formulaire, le défilement Industrie / Luxe,
   et l'affichage des fiches produit reprises de la maquette v2. */
(function () {
  "use strict";

  const SITE = "https://www.pim-industrie.com";
  const MAIL = "mail@pim-industrie.com";
  const PAGE = document.body.dataset.page || "accueil";
  const FILES = {
    accueil: "index.html",
    "a-propos": "a-propos.html",
    prestations: "prestations.html",
    "impression-numerique": "impression-numerique.html",
    references: "references.html",
    contact: "contact.html",
    demande: "demande-devis.html"
  };
  const JUMPS = { industrie: "bloc-industrie", luxe: "bloc-luxe" };
  const ALIASES = {
    "besoin-medical": "secteur-medical",
    "besoin-aeronautique": "secteur-aeronautique",
    "secteur-luxe": "decoration",
    societe: "a-propos",
    process: "prestations",
    "cas-clients": "references",
    actualites: "ressources"
  };
  const LOCAL_SEO = { "a-propos": "societe", references: "references", contact: "contact" };
  const EXTRA_SEO = {
    prestations: [
      "prestations sérigraphie découpe laser",
      "Nos prestations : du conseil à la livraison",
      "Conseil, création graphique, sérigraphie, découpe et gravure, finition, contrôle qualité et livraison : huit étapes dans un seul atelier alsacien."
    ],
    "impression-numerique": [
      "impression numérique petite série",
      "Impression numérique, de l’unité à la petite série",
      "Impression numérique de l’unité à la petite série, quand elle est plus adaptée que la sérigraphie. L’atelier PIM à Marckolsheim vous oriente avant de lancer."
    ],
    contact: [
      "contact PIM Industrie",
      "Nous contacter",
      "Téléphone, e-mail et formulaire pour écrire à l’atelier. Pour un chiffrage, demandez un devis. PIM Industrie, Marckolsheim."
    ],
    demande: [
      "demander un devis PIM Industrie",
      "Demander un devis",
      "Décrivez la pièce, clavier, face avant, étiquette ou PLV. La quantité et le délai sont précisés au devis. Atelier PIM à Marckolsheim."
    ]
  };
  const PAGE_URL = {
    accueil: SITE + "/",
    "a-propos": SITE + "/qui-sommes-nous",
    prestations: SITE + "/nos-prestations",
    "impression-numerique": SITE + "/nos-prestations/impression-numerique",
    references: SITE + "/references",
    contact: SITE + "/contact",
    demande: SITE + "/demande-de-devis",
    acces: SITE + "/acces",
    secteurs: SITE + "/secteurs",
    "secteur-medical": SITE + "/secteurs/industrie-medicale",
    "secteur-aeronautique": SITE + "/secteurs/aeronautique-defense",
    "secteur-automobile": SITE + "/secteurs/automobile",
    "secteur-automatisation": SITE + "/secteurs/automatisation",
    "secteur-machines": SITE + "/secteurs/machine-outils",
    "secteur-nautique": SITE + "/secteurs/nautique",
    "secteur-electronique": SITE + "/secteurs/electronique",
    "secteur-transports": SITE + "/secteurs/transports",
    technologies: SITE + "/industrie",
    "clavier-membrane": SITE + "/industrie/clavier-a-membrane",
    "clavier-retro": SITE + "/industrie/clavier-a-membrane/clavier-retro-eclaire",
    "clavier-coupelles": SITE + "/industrie/clavier-a-membrane/clavier-coupelles",
    "clavier-gaufre": SITE + "/industrie/clavier-a-membrane/clavier-gaufre",
    "clavier-electro": SITE + "/industrie/clavier-a-membrane/clavier-electroluminescent",
    "clavier-7s": SITE + "/industrie/clavier-a-membrane/clavier-afficheurs-7s",
    "clavier-capacitif": SITE + "/industrie/clavier-a-membrane/clavier-capacitif",
    "clavier-plat": SITE + "/industrie/clavier-a-membrane/clavier-plat",
    "clavier-elastomere": SITE + "/industrie/clavier-a-membrane/clavier-elastomere",
    "clavier-etanche": SITE + "/industrie/clavier-etanche",
    "circuit-flexible": SITE + "/industrie/circuit-flexible",
    "face-avant-plastique": SITE + "/industrie/face-avant-plastique",
    "facade-metallique": SITE + "/industrie/facade-et-insert-metallique",
    "besoin-electronique-imprimee": SITE + "/industrie/electronique-imprimee",
    decoration: SITE + "/decoration",
    etiquettes: SITE + "/decoration/etiquette-personnalisable",
    "etiquette-3d": SITE + "/decoration/etiquette-personnalisable/etiquette-3d",
    "etiquette-vins": SITE + "/decoration/etiquette-personnalisable/etiquette-vins-spiritueux",
    "etiquette-cosmetiques": SITE + "/decoration/etiquette-personnalisable/etiquette-cosmetiques",
    "etiquette-plastique": SITE + "/decoration/etiquette-personnalisable/etiquette-plastique",
    plv: SITE + "/decoration/publicite-sur-le-lieu-de-vente",
    signaletique: SITE + "/decoration/signaletique-lumineuse",
    presentoir: SITE + "/decoration/presentoir-plexiglas",
    "process-impression": SITE + "/nos-prestations/impression",
    "process-decoupe": SITE + "/nos-prestations/decoupe-deformation",
    "process-gravure": SITE + "/nos-prestations/gravure",
    "process-laminage": SITE + "/nos-prestations/laminage-assemblage",
    "process-composants": SITE + "/nos-prestations/reports-de-composants",
    "process-controle": SITE + "/nos-prestations/test-electrique-controle-final",
    "guide-clavier-membrane": SITE + "/guides/choisir-son-clavier-a-membrane",
    ressources: SITE + "/ressources",
    glossaire: SITE + "/glossaire",
    mentions: SITE + "/mentions-legales",
    plan: SITE + "/plan-du-site",
    confidentialite: SITE + "/politique-de-protection-des-donnees",
    cgv: SITE + "/conditions-generales-de-vente",
    cga: SITE + "/conditions-generales-d-achat"
  };

  const NAV_HREFS = {
    accueil: ["index.html", "./", "./index.html"],
    "a-propos": ["a-propos.html"],
    prestations: ["prestations.html"],
    references: ["references.html"],
    contact: ["contact.html"],
    industrie: ["#technologies", "index.html#technologies"],
    luxe: ["#decoration", "index.html#decoration"]
  };

  let homeHTML = null;
  let viewing = PAGE;
  let userScrolled = false;

  const pageById = (id) => (window.PAGES || []).find((page) => page.id === id);

  function fixMedia(html) {
    return html
      .replace(/(src|href)="medias\//g, '$1="../maquette%20v2/medias/')
      .replace('<a href="#process">Voir tout le parc machines</a>', '<a href="a-propos.html">Voir tout le parc machines</a>')
      .replace('<a href="#process">Process</a>', '<a href="prestations.html">Nos prestations</a>')
      .replace('<a href="#societe">Qui sommes-nous</a>', '<a href="a-propos.html">À propos</a>');
  }

  function navFor(page) {
    const id = page.id || "";
    const group = page.group || "";
    if (id === "acces") return "a-propos";
    if (id === "cas-clients") return "references";
    if (id === "demande") return "contact";
    if (group === "Process" || id.indexOf("process") === 0) return "prestations";
    if (group === "Décoration") return "luxe";
    if (group === "Industrie" || id === "guide-clavier-membrane") return "industrie";
    return "accueil";
  }

  function esc(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function seoRow(id) {
    if (EXTRA_SEO[id]) return EXTRA_SEO[id];
    if (typeof SEO === "undefined") return null;
    if (SEO[id]) return SEO[id];
    if (LOCAL_SEO[id] && SEO[LOCAL_SEO[id]]) return SEO[LOCAL_SEO[id]];
    return null;
  }

  function setMeta(selector, create, value) {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement(create.tag);
      Object.keys(create.attrs).forEach((key) => el.setAttribute(key, create.attrs[key]));
      document.head.appendChild(el);
    }
    el.setAttribute(create.target, value);
  }

  function applySeo(id, page) {
    const row = seoRow(id);
    const brand = typeof SEO_BRAND !== "undefined" ? SEO_BRAND : " | PIM Industrie";
    const title = row ? row[1] + brand : (page && page.name ? page.name : document.title);
    const description = row ? row[2] : (document.querySelector('meta[name="description"]') || {}).content || "";
    const url = PAGE_URL[id] || "";
    if (row) document.title = title;
    setMeta('meta[name="description"]', { tag: "meta", attrs: { name: "description" }, target: "content" }, description);
    setMeta('meta[property="og:title"]', { tag: "meta", attrs: { property: "og:title" }, target: "content" }, title);
    setMeta('meta[property="og:description"]', { tag: "meta", attrs: { property: "og:description" }, target: "content" }, description);
    setMeta('meta[property="og:type"]', { tag: "meta", attrs: { property: "og:type" }, target: "content" }, "website");
    setMeta('meta[property="og:locale"]', { tag: "meta", attrs: { property: "og:locale" }, target: "content" }, "fr_FR");
    setMeta('meta[property="og:site_name"]', { tag: "meta", attrs: { property: "og:site_name" }, target: "content" }, "PIM Industrie");
    if (url) setMeta('meta[property="og:url"]', { tag: "meta", attrs: { property: "og:url" }, target: "content" }, url);
    const canon = document.querySelector('link[rel="canonical"]');
    if (canon && url) canon.setAttribute("href", url);
    let ld = document.getElementById("ld-org");
    if (id === "accueil") {
      if (!ld) {
        ld = document.createElement("script");
        ld.type = "application/ld+json";
        ld.id = "ld-org";
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "PIM Industrie",
        url: SITE + "/",
        telephone: "+33 3 88 58 62 00",
        email: MAIL,
        foundingDate: "1961",
        address: { "@type": "PostalAddress", streetAddress: "Impasse Kohlgaerten", postalCode: "67390", addressLocality: "Marckolsheim", addressCountry: "FR" }
      });
    } else if (ld) ld.remove();
    updateSeoPanel({ query: row ? row[0] : "", title: title, description: description, url: url });
  }

  function ensureOverlays() {
    if (document.getElementById("seo-btn")) return;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      '<button type="button" class="fab" id="seo-btn" aria-expanded="false" aria-controls="seo-panel" title="Fiche SEO de la page (revue de maquette)">SEO</button>',
      '<aside class="seo-panel" id="seo-panel" aria-label="Fiche SEO de la page" hidden></aside>',
      '<button type="button" class="fab" id="top-btn" aria-label="Retour en haut"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 15l6-6 6 6"/></svg></button>',
      '<div class="toast" id="toast" role="status" aria-live="polite"></div>'
    ].join("");
    while (wrapper.firstChild) document.body.appendChild(wrapper.firstChild);
    const btn = document.getElementById("seo-btn");
    const panel = document.getElementById("seo-panel");
    btn.addEventListener("click", () => {
      const open = panel.hidden;
      panel.hidden = !open;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.getElementById("top-btn").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function updateSeoPanel(info) {
    const panel = document.getElementById("seo-panel");
    if (!panel) return;
    const lenClass = (n, max) => (n <= max ? "ok" : "warn");
    panel.innerHTML = [
      "<h3>Fiche SEO de la page</h3><dl>",
      "<dt>Requête visée</dt><dd>" + (info.query ? esc(info.query) : "à définir") + "</dd>",
      "<dt>URL cible</dt><dd>" + (info.url ? esc(info.url) : "à définir") + "</dd>",
      '<dt>Titre · <span class="' + lenClass(info.title.length, 65) + '">' + info.title.length + " caractères</span></dt><dd>" + esc(info.title) + "</dd>",
      '<dt>Description · <span class="' + lenClass(info.description.length, 160) + '">' + info.description.length + " caractères</span></dt><dd>" + (info.description ? esc(info.description) : "à rédiger") + "</dd>",
      '</dl><p class="hint">Outil de revue de la maquette : il n’existera pas sur le site final.</p>'
    ].join("");
  }

  let toastTimer = null;
  function toast(message) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
  }

  function enhanceV2(root, page) {
    let n = 0;
    root.querySelectorAll("img").forEach((el) => {
      el.setAttribute("loading", "lazy");
      el.setAttribute("decoding", "async");
      if (el.getAttribute("alt")) return;
      const card = el.closest(".card");
      const label = card && card.querySelector("h3") ? card.querySelector("h3").textContent : "";
      if (label) el.setAttribute("alt", label);
      else if (el.closest(".gallery")) {
        n += 1;
        el.setAttribute("alt", page.name + " : exemple de réalisation PIM Industrie (vue " + n + ")");
      } else el.setAttribute("alt", page.name);
    });
    root.querySelectorAll("button.cta, button.btn").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        toast(/PDF/i.test(btn.textContent) ? "Maquette : la fiche PDF sera fournie par PIM." : "Maquette : la demande n’est pas envoyée.");
      });
    });
    root.querySelectorAll("form").forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()));
  }

  function setActive(id) {
    const wanted = NAV_HREFS[id] || [];
    document.querySelectorAll(".nav a:not(.btn)").forEach((link) => {
      link.classList.toggle("on", wanted.indexOf(link.getAttribute("href")) >= 0);
    });
  }

  function closeMenu() {
    const menu = document.getElementById("site-nav");
    const burger = document.getElementById("burger");
    if (menu) menu.classList.remove("open");
    if (burger) burger.setAttribute("aria-expanded", "false");
  }

  function bindChrome() {
    const burger = document.getElementById("burger");
    const menu = document.getElementById("site-nav");
    if (burger && menu && !burger.dataset.bound) {
      burger.dataset.bound = "1";
      burger.addEventListener("click", () => {
        const open = menu.classList.toggle("open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
      menu.addEventListener("click", (event) => {
        if (event.target.closest("a")) closeMenu();
      });
    }
    document.querySelectorAll("form[data-mock]").forEach((form) => {
      if (form.dataset.bound) return;
      form.dataset.bound = "1";
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const ok = form.previousElementSibling;
        if (ok && ok.classList.contains("form-ok")) {
          ok.hidden = false;
          ok.scrollIntoView({ block: "center" });
        }
        form.reset();
      });
    });
  }

  function rememberHome() {
    if (PAGE !== "accueil" || homeHTML) return;
    const main = document.getElementById("main");
    if (main && main.dataset.mode !== "fiche") homeHTML = main.innerHTML;
  }

  function restoreHome() {
    const main = document.getElementById("main");
    if (main && homeHTML && main.dataset.mode === "fiche") {
      main.innerHTML = homeHTML;
      delete main.dataset.mode;
    }
    viewing = "accueil";
    document.body.classList.remove("is-fiche");
  }

  function showFiche(id) {
    if (PAGE !== "accueil") {
      location.href = "index.html#" + id;
      return;
    }
    rememberHome();
    const page = pageById(id);
    const main = document.getElementById("main");
    if (!page) {
      main.innerHTML = '<section class="pagehead"><div class="wrap"><p class="kicker">Erreur 404</p><h1>Cette page n’existe pas.</h1><p class="lead"><a href="index.html">Retour à l’accueil</a></p></div></section>';
      applySeo("introuvable", { id: "introuvable", name: "Page introuvable" });
      setActive("accueil");
    } else {
      main.innerHTML = '<article class="v2-page" data-page="' + page.id + '">' + fixMedia(page.html) + "</article>";
      enhanceV2(main, page);
      applySeo(id, page);
      setActive(navFor(page));
    }
    main.dataset.mode = "fiche";
    viewing = id;
    document.body.classList.add("is-fiche");
    window.scrollTo(0, 0);
  }

  function jumpTo(blockId, navId) {
    const el = document.getElementById(blockId);
    userScrolled = false;
    setActive(navId);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = el.getBoundingClientRect().top + window.scrollY - 12;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }

  const FOLIO_GROUPS = {
    industrie: ["claviers", "circuits", "faces", "facades"],
    luxe: ["etiquettes", "plv"]
  };

  function applyFolio(filter) {
    const buttons = Array.prototype.slice.call(document.querySelectorAll(".folio-filters button"));
    if (!buttons.length) return;
    const known = buttons.some((button) => button.getAttribute("data-filter") === filter);
    const active = known ? filter : "tout";
    const domains = ["medical", "aeronautique", "automobile", "automatisation", "machines", "nautique", "electronique", "transports"];
    buttons.forEach((button) => button.classList.toggle("on", button.getAttribute("data-filter") === active));
    const drop = document.querySelector(".folio-drop");
    const dropBtn = drop && drop.querySelector(".folio-drop-btn");
    if (dropBtn) {
      const chosen = document.querySelector('.folio-drop-panel button[data-filter="' + active + '"]');
      dropBtn.textContent = chosen ? chosen.textContent : "Domaines";
      dropBtn.classList.toggle("on", !!chosen);
      if (chosen) drop.classList.remove("is-open");
    }
    const group = FOLIO_GROUPS[active];
    document.querySelectorAll(".folio-card").forEach((card) => {
      const cat = card.getAttribute("data-cat");
      const tags = (card.getAttribute("data-domaine") || "").split(" ");
      let hide = false;
      if (active === "tout") hide = false;
      else if (group) hide = group.indexOf(cat) === -1;
      else if (domains.indexOf(active) >= 0) hide = tags.indexOf(active) === -1;
      else hide = cat !== active;
      card.classList.toggle("is-off", hide);
    });
  }

  function route() {
    const raw = (location.hash || "").replace(/^#/, "");
    if (PAGE === "references") {
      applyFolio(raw || "tout");
      return;
    }
    const hops = {
      gamme: "references.html#industrie",
      etiquettes: "references.html#etiquettes",
      demande: "demande-devis.html",
      societe: "a-propos.html",
      process: "prestations.html",
      references: "references.html",
      contact: "contact.html"
    };
    if (hops[raw]) {
      location.replace(hops[raw]);
      return;
    }
    if (!raw || raw === "accueil") {
      if (PAGE !== "accueil") {
        location.replace("index.html");
        return;
      }
      restoreHome();
      setActive("accueil");
      applySeo("accueil", { id: "accueil", name: "Accueil" });
      if (raw === "accueil") window.scrollTo(0, 0);
      return;
    }
    if (ALIASES[raw]) {
      const dest = ALIASES[raw];
      location.replace(FILES[dest] || ("index.html#" + dest));
      return;
    }
    if (FILES[raw]) {
      location.href = FILES[raw];
      return;
    }
    if (JUMPS[raw]) {
      if (PAGE !== "accueil") {
        location.href = "index.html#" + raw;
        return;
      }
      restoreHome();
      closeMenu();
      jumpTo(JUMPS[raw], raw);
      return;
    }
    if (PAGE !== "accueil") return;
    if (pageById(raw)) showFiche(raw);
    else if (!document.getElementById(raw)) showFiche(raw);
  }

  let spyTick = false;
  function onScroll() {
    const top = document.getElementById("top-btn");
    if (top) top.classList.toggle("show", window.scrollY > 700);
    const bar = document.querySelector(".top");
    if (bar && PAGE === "accueil" && !document.body.classList.contains("is-fiche")) {
      bar.classList.toggle("is-solid", window.scrollY > 24);
    }
    if (PAGE !== "accueil" || viewing !== "accueil" || spyTick) return;
    spyTick = true;
    requestAnimationFrame(() => {
      spyTick = false;
      const marks = document.querySelectorAll("main [data-nav]");
      let active = "accueil";
      marks.forEach((el) => {
        if (el.getBoundingClientRect().top <= 140) active = el.getAttribute("data-nav");
      });
      setActive(active);
    });
  }

  rememberHome();
  ensureOverlays();
  bindChrome();
  ["wheel", "touchstart", "keydown"].forEach((name) => window.addEventListener(name, () => { userScrolled = true; }, { passive: true }));
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("hashchange", route);
  if (PAGE !== "accueil") applySeo(PAGE, { id: PAGE, name: PAGE });
  if (location.hash) route();
  else if (PAGE === "accueil") applySeo("accueil", { id: "accueil", name: "Accueil" });

  document.querySelectorAll(".folio-filters").forEach((folioFilters) => {
    folioFilters.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button || !folioFilters.contains(button)) return;
      if (button.classList.contains("folio-drop-btn")) {
        const drop = button.parentElement;
        const open = drop.classList.toggle("is-open");
        button.setAttribute("aria-expanded", open ? "true" : "false");
        return;
      }
      const filter = button.getAttribute("data-filter");
      applyFolio(filter);
      if (filter === "tout") history.replaceState(null, "", location.pathname + location.search);
      else if (location.hash !== "#" + filter) location.hash = filter;
    });
  });
  if (document.querySelector(".folio-filters")) {
    applyFolio((location.hash || "").replace(/^#/, "") || "tout");
  }
})();
