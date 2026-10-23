const IMG = "../maquettes/medias/images/";

const sectors = [
  ["medical", "Industrie médicale", "industrie_industrie_medicale.jpg", "Claviers étanches et faces avant pour les appareils médicaux.", "Les appareils médicaux demandent des interfaces fiables, lisibles et protégées. Les claviers PIM sont étanches IP65, et chaque pièce est testée avant expédition.", ["IP65", "Test électrique de chaque pièce", "ISO 9001"], [["besoin-medical", "Clavier pour dispositif médical"], ["membrane", "Clavier à membrane"], ["etanche", "Clavier étanche IP65"]]],
  ["aero", "Aéronautique et défense", "industire_aeronautique_defense.jpg", "Claviers, faces avant et plaques pour des équipements exigeants.", "Ces équipements travaillent dans des environnements hostiles. PIM fabrique des claviers rétroéclairés ou électroluminescents, des façades métal, et contrôle 100 % des pièces.", ["Rétroéclairé", "Insert métal", "Contrôle à 100 %"], [["besoin-aero", "Clavier pour l’aéronautique"], ["retro", "Clavier rétroéclairé"], ["facade", "Façade métal"]]],
  ["auto", "Automobile", "industrie_auromobile.jpg", "Plaques d’identification, faces avant et circuits souples.", "Identification des pièces, habillage et commandes : plaques métalliques, faces avant plastique et circuits souples, sur mesure.", ["Plaques métal", "Faces avant", "Circuits souples"], [["facade", "Façade métal"], ["face", "Face avant plastique"], ["circuit", "Circuit souple"]]],
  ["auto2", "Automatisation", "fanuc_6_axis_welding_robots.jpg", "Claviers et faces avant pour pupitres et machines.", "Les pupitres demandent des interfaces lisibles et robustes : coupelles, rétroéclairage, afficheurs et faces avant sur mesure.", ["Coupelles", "Afficheurs 7 segments", "Rétroéclairage"], [["membrane", "Clavier à membrane"], ["coupelles", "Clavier à coupelles"], ["face", "Face avant plastique"]]],
  ["machines", "Machine-outils", "cnc_press.jpg", "Claviers de commande et plaques constructeur.", "Plaque constructeur, plaque d’outillage, plaque de conformité : l’identification de la machine, et le clavier qui la pilote.", ["Plaque constructeur", "IP65", "Élastomère"], [["facade", "Façade métal"], ["membrane", "Clavier à membrane"], ["etanche", "Clavier étanche IP65"]]],
  ["nautique", "Nautique", "drops.jpg", "Claviers étanches pour les environnements humides.", "Sur l’eau, l’humidité impose des interfaces étanches. Les claviers PIM sont certifiés IP65 : poussière et jets d’eau.", ["IP65", "Jets d’eau", "Élastomère"], [["etanche", "Clavier étanche IP65"], ["retro", "Clavier rétroéclairé"]]],
  ["elec", "Électronique", "printed_electronics.jpg", "Circuits souples, électronique imprimée, composants CMS.", "Encre argent, report robotisé de CMS et de LED, intégrés au clavier ou au circuit souple.", ["Encre argent", "CMS et LED", "Électronique imprimée"], [["imprimee", "Électronique imprimée"], ["circuit", "Circuit souple"], ["capacitif", "Clavier capacitif"]]],
  ["transports", "Transports", "dsc_0549.jpg", "Claviers étanches et plaques d’identification.", "Les claviers IP65 et les plaques de conformité des équipements de transport.", ["IP65", "Plaques", "Faces avant"], [["etanche", "Clavier étanche IP65"], ["facade", "Façade métal"]]]
];

const products = {
  membrane: ["Clavier à membrane", "dsc_0560.jpg", "En Lexan ou en polyester, dès 0,5 mm. Une interface souple, étanche, sur mesure. La limande se branche directement sur l’électronique."],
  etanche: ["Clavier étanche IP65", "dsc_0506.jpg", "Toute la gamme de claviers est étanche IP65 : hermétique à la poussière, protégée contre les jets d’eau."],
  circuit: ["Circuit souple", "circuit_souples3.jpg", "Circuit imprimé sur polyester ou polycarbonate. Encre argent, pistes fines, connexion par limande."],
  face: ["Face avant plastique", "facade_plastique_habillage_boitier_geolocalisation3.jpg", "Décor sérigraphié sur un support ou un circuit. Teintes Pantone, RAL ou NCS, analysées par spectrométrie."],
  facade: ["Façade et insert métal", "dsc_0549.jpg", "Identification d’un produit, d’une machine, d’un équipement. Découpe laser à ± 0,3 mm."],
  retro: ["Clavier rétroéclairé", "dsc_0515.jpg", "LED de puissance derrière les touches, pour lire l’interface dans le noir."],
  coupelles: ["Clavier à coupelles", "industrie_claviers_coupelles.jpg", "Un clic net sous le doigt. Plus d’un million de coupelles posées par an."],
  capacitif: ["Clavier capacitif", "clavier_plat_relegendable.jpg", "Aucune pièce mécanique. Façade non conductrice : verre trempé de 3 mm ou plus recommandé."],
  "besoin-medical": ["Clavier pour dispositif médical", "industrie_industrie_medicale.jpg", "Étanche, lisible, tracé. IP65, test électrique de chaque pièce, ISO 9001."],
  "besoin-aero": ["Clavier pour l’aéronautique", "industire_aeronautique_defense.jpg", "Rétroéclairage ou électroluminescence, insert métal, contrôle de chaque pièce."],
  imprimee: ["Électronique imprimée", "printed_electronics.jpg", "Pistes, chauffage, capteur ou antenne imprimés sur film souple, à la place d’une carte rigide."]
};

const luxeItems = [
  ["vins", "Vins et spiritueux", "etiquette_metal_courvoisier.jpg", "Étiquettes et inserts métal pour cognac, champagne, spiritueux."],
  ["cosmetiques", "Parfums et cosmétiques", "bg_guerlain_tonkaimperiale.jpg", "Inserts métal et dômage résine pour flacons et coffrets."],
  ["plv", "Points de vente", "plv_presentoir_goldkenn1.jpg", "PLV, signalétique lumineuse et présentoirs."],
  ["etiquettes", "Étiquettes", "decoration_plv_texte_43.jpg", "Métal, plastique ou résine, pour embellir un produit."],
  ["signaletique", "Signalétique lumineuse", "copie_de_coffret_led_roederer_low.jpg", "La lumière intégrée au coffret ou au présentoir."],
  ["presentoir", "Présentoir plexiglas", "plv_presentoir.jpg", "Découpe, gravure et sérigraphie sur plexiglas."]
];

function img(file) { return IMG + file; }

function rows(list) {
  return '<div class="rows">' + list.map((item, i) => {
    const n = String(i + 1).padStart(2, "0");
    const desc = item[2] ? "<span>" + item[2] + "</span>" : "";
    return '<a class="row" href="#' + item[0] + '"><span class="num">' + n + '</span><div><b>' + item[1] + "</b>" + desc + "</div><i>→</i></a>";
  }).join("") + "</div>";
}

function shell(section, inner) {
  const link = (href, label, key) => '<a href="' + href + '"' + (section === key ? ' class="on"' : "") + ">" + label + "</a>";
  return [
    '<header class="top">',
    '<a class="top-brand" href="#accueil">PIM <span>Industrie</span></a>',
    "<nav>",
    link("#industrie", "Industrie", "industrie"),
    link("#luxe", "Luxe & PLV", "luxe"),
    link("#process", "Process", "process"),
    link("#ressources", "Ressources", "ressources"),
    link("#societe", "Société", "societe"),
    "</nav>",
    '<div class="top-end">',
    '<a class="phone" href="tel:+33388586200">03 88 58 62 00</a>',
    '<a class="devis" href="#contact">Demander un devis</a>',
    "</div></header>",
    '<main class="stage">' + inner + "</main>",
    '<footer class="foot">',
    "<div><b>PIM Industrie</b><span>Impasse Kohlgaerten<br>67390 Marckolsheim</span><a href=\"tel:+33388586200\">03 88 58 62 00</a></div>",
    "<div><a href=\"#industrie\">Industrie</a><a href=\"#luxe\">Luxe & PLV</a><a href=\"#process\">Process</a><a href=\"#contact\">Contact</a></div>",
    "<div><span>Depuis 1961 · ISO 9001</span><span><a href=\"#mentions\">Mentions légales</a> · <a href=\"#confidentialite\">Données</a></span></div>",
    "</footer>"
  ].join("");
}

function article(world, crumb, kicker, title, lead, photo, body, next) {
  document.title = title + " — PIM Industrie";
  return shell(world, [
    '<p class="crumbs">' + crumb + "</p>",
    '<p class="kicker">' + kicker + "</p>",
    "<h1>" + title + "</h1>",
    '<p class="lead">' + lead + "</p>",
    photo ? '<img class="hero-photo" src="' + img(photo) + '" alt="">' : "",
    body || "",
    next ? rows(next) : ""
  ].join(""));
}

const views = {
  accueil() {
    document.title = "PIM Industrie — De l’idée à la série";
    return shell("home", [
      '<p class="kicker">Marckolsheim · depuis 1961</p>',
      "<h1>De l’idée à la série, sur mesure.</h1>",
      '<p class="lead">Deux savoir-faire, un seul atelier. Choisissez le vôtre : la suite ne montre que ce qui vous concerne.</p>',
      '<div class="choices">',
      '<a class="choice" href="#industrie">',
      '<img src="' + img("dsc_0560.jpg") + '" alt="Clavier à membrane">',
      "<div><b>Interfaces industrielles</b><span>Claviers à membrane, circuits souples, faces avant et façades métal. Étanchéité IP65.</span><em>Voir les 8 domaines</em></div>",
      "</a>",
      '<a class="choice" href="#luxe">',
      '<img src="' + img("visuel_pim_parfum_web.jpg") + '" alt="Médaillon pour le luxe">',
      "<div><b>Luxe & PLV</b><span>Étiquettes métal, PLV lumineuse et présentoirs, pour les vins, spiritueux, parfums et cosmétiques.</span><em>Voir les univers</em></div>",
      "</a>",
      "</div>",
      '<ul class="proof"><li><b>1961</b><span>Création à Marckolsheim</span></li><li><b>4 500 m²</b><span>D’atelier</span></li><li><b>ISO 9001</b><span>Traçabilité et contrôles</span></li><li><b>100 %</b><span>Des pièces contrôlées</span></li></ul>'
    ].join(""));
  },

  industrie() {
    document.title = "Interfaces industrielles — PIM Industrie";
    return shell("industrie", [
      '<p class="kicker">Interfaces industrielles</p>',
      "<h1>Choisissez votre domaine</h1>",
      '<p class="lead">Huit secteurs. Ouvrez le vôtre. Si vous connaissez déjà la pièce, la gamme est en fin de liste.</p>',
      rows(sectors.map((s) => [s[0], s[1], s[3]]).concat([["gamme", "La gamme", "Claviers, circuits souples, faces avant, façades métal."]])),
    ].join(""));
  },

  gamme() {
    const list = [
      ["membrane", "Clavier à membrane", "Dès 0,5 mm, étanche, sur mesure."],
      ["etanche", "Étanche IP65", "Poussière et jets d’eau."],
      ["circuit", "Circuit souple", "Polyester ou polycarbonate."],
      ["face", "Face avant plastique", "Sérigraphie, teintes au spectromètre."],
      ["facade", "Façade et insert métal", "Découpe laser, ± 0,3 mm."],
      ["retro", "Rétroéclairé", "Lire l’interface dans le noir."],
      ["coupelles", "À coupelles", "Un clic net. Un million de coupelles par an."],
      ["capacitif", "Capacitif", "Sans pièce mécanique."]
    ];
    return article("industrie", '<a href="#industrie">Industrie</a> / Gamme', "La gamme", "La gamme", "Huit familles. Ouvrez celle qui correspond à la pièce que vous cherchez.", "bandeau_industrie.jpg", "", list);
  },

  luxe() {
    document.title = "Luxe & PLV — PIM Industrie";
    return shell("luxe", [
      '<p class="kicker">Luxe & PLV</p>',
      "<h1>Choisissez votre univers</h1>",
      '<p class="lead">Trois univers, puis les produits. Chaque ligne mène à une seule page.</p>',
      '<img class="hero-photo" src="' + img("visuel_pim_parfum_web.jpg") + '" alt="Médaillon et étiquettes métal">',
      rows(luxeItems.map((item) => [item[0], item[1], item[3]]))
    ].join(""));
  },

  process() {
    return article("process", '<a href="#industrie">Industrie</a> / Process', "L’atelier", "Le process", "Impression, découpe, pose des composants, puis le test de chaque pièce expédiée.", "fond_decoupe_laser6.jpg",
      '<ul class="facts"><li>2 lignes de sérigraphie</li><li>4 tables feuille à feuille</li><li>± 0,3 mm</li><li>100 % contrôlé</li></ul>',
      [["impression", "Impression", "Teintes, cadres, sérigraphie."], ["decoupe", "Découpe", "Lasers, presses, gaufrage."], ["composants", "Composants", "Coupelles, CMS, LED."], ["controle", "Contrôle", "Test électrique, puis contrôle esthétique."]]);
  },

  impression() { return article("process", '<a href="#process">Process</a>', "Impression", "Impression", "Sérigraphie en continu et feuille à feuille. Teintes Pantone, RAL et NCS, lues au spectromètre.", "dsc_0560.jpg"); },
  decoupe() { return article("process", '<a href="#process">Process</a>', "Découpe", "Découpe", "Lasers CO2, presses, gaufrage, thermoformage, emboutissage. Tolérance de la découpe laser : ± 0,3 mm.", "fond_decoupe_laser6.jpg"); },
  composants() { return article("process", '<a href="#process">Process</a>', "Composants", "Composants", "Plus d’un million de coupelles et 350 000 LED par an, plus les CMS.", "industrie_claviers_coupelles.jpg"); },
  controle() { return article("process", '<a href="#process">Process</a>', "Contrôle", "Contrôle", "Test électrique de chaque pièce expédiée, puis contrôle esthétique à 100 %. ISO 9001.", "dsc_0549.jpg"); },

  ressources() {
    return article("ressources", "Ressources", "Ressources", "Quatre pages pour aller plus loin", "Un sujet chacune. Ouvrez celle qui répond à votre question.", "", "", [
      ["guide", "Choisir son clavier", "Six questions avant le devis."],
      ["cas", "Études de cas", "Besoin, solution, résultat."],
      ["actus", "Actualités", "L’atelier, une fois par mois."],
      ["glossaire", "Glossaire", "IP65, coupelle, sérigraphie, dômage."]
    ]);
  },
  guide() {
    return article("ressources", '<a href="#ressources">Ressources</a>', "Guide", "Choisir son clavier à membrane", "Six questions. Chaque réponse oriente vers un type de clavier.", "dsc_0560.jpg",
      '<div class="prose"><p>1. Quel environnement : poussière, projections, nettoyage. Toute la gamme est IP65.</p><p>2. Quelle sensation : plat, coupelles, gaufré, élastomère, ou capacitif.</p><p>3. Faut-il de la lumière : rétroéclairage, électroluminescence, afficheur 7 segments.</p><p>4. Quelles options : LED, blindage, guide-doigt, CMS, circuit chauffant.</p><p>5. Quelle façade : Lexan ou polyester dès 0,5 mm. En capacitif, verre trempé dès 3 mm.</p><p>6. Quelle série : de la petite à la grande série, avec prototypage rapide.</p></div>');
  },
  cas() {
    return article("ressources", '<a href="#ressources">Ressources</a>', "Études de cas", "Études de cas", "Les cas clients restent à rédiger avec les équipes et les clients concernés. La trame est prête : besoin, solution, résultat.", "",
      '<div class="prose"><p>Un clavier étanche pour un appareil médical. Un insert métal pour un cognac. Une PLV lumineuse pour un champagne.</p><p>Aucun client ni aucun chiffre n’est inventé ici.</p></div>');
  },
  actus() {
    return article("ressources", '<a href="#ressources">Ressources</a>', "Actualités", "L’actualité de l’atelier", "Une publication par mois. Les articles restent à rédiger.", "", "", [
      ["capacitif", "Façade en verre de 3 mm", "Pourquoi le capacitif s’use moins."],
      ["imprimee", "Électronique imprimée", "Ce que l’encre remplace sur une carte rigide."],
      ["composants", "Un million de coupelles", "La pose robotisée."]
    ]);
  },
  glossaire() {
    return article("ressources", '<a href="#ressources">Ressources</a>', "Glossaire", "Glossaire", "Quatre définitions, pour commencer.", "",
      '<div class="prose"><p><b>IP65.</b> Étanche à la poussière, protégé contre les jets d’eau.</p><p><b>Coupelle.</b> Dôme métallique qui donne le clic sous le doigt.</p><p><b>Sérigraphie.</b> Impression à fort dépôt d’encre, opaque et durable.</p><p><b>Dômage.</b> Goutte de résine qui donne du relief à une étiquette.</p></div>');
  },

  societe() {
    return article("societe", "Société", "Depuis 1961", "PIM Industrie", "Fondée à Marckolsheim sous le nom Plaquettes Industrielles. Marquage sur métal, puis interfaces homme-machine, puis le luxe.", "fond_decoupe_laser6.jpg",
      '<ul class="facts"><li>1961</li><li>4 500 m²</li><li>ISO 9001</li><li>100 % contrôlé</li></ul>',
      [["references", "Références", "Industriels et maisons du luxe."], ["acces", "Accès", "Impasse Kohlgaerten, Marckolsheim."], ["contact", "Écrire", "Le formulaire."]]);
  },
  references() {
    return article("societe", '<a href="#societe">Société</a>', "Références", "Ils nous font confiance", "Des industriels et des maisons du luxe, en France et à l’international.", "",
      '<div class="prose"><p>Bosch, Siemens, Honeywell, d’un côté. Chanel, Guerlain, Hennessy, Moët & Chandon, de l’autre.</p></div>');
  },
  acces() {
    return article("societe", '<a href="#societe">Société</a>', "Accès", "Venir à Marckolsheim", "Impasse Kohlgaerten, 67390 Marckolsheim. Entre Strasbourg, Colmar et Bâle.", "",
      '<div class="prose"><p>Avion : Strasbourg-Entzheim ou Bâle-Mulhouse, environ 1 h.</p><p>Train : Sélestat 20 min, Colmar 30 min, Strasbourg 45 min.</p><p>Voiture : A35, direction Sélestat, puis Marckolsheim.</p></div>');
  },

  contact() {
    document.title = "Contact — PIM Industrie";
    return shell("societe", [
      '<p class="kicker">Contact</p>',
      "<h1>Contactez-nous</h1>",
      '<p class="lead">Pour des solutions adaptées à vos envies et à vos besoins, PIM Industrie s’engage.</p>',
      '<form class="form" action="#">',
      field("Nom", "text"), field("Prénom", "text"),
      field("Société", "text"), field("E-mail", "email"),
      field("Téléphone", "tel"),
      '<div class="field"><span>Échéance</span><select><option>Moins d’un mois</option><option>2 à 6 mois</option><option>Plus de 6 mois</option></select></div>',
      '<div class="field wide"><span>Votre demande</span><textarea id="demande"></textarea></div>',
      '<p class="note">Vos informations servent uniquement à répondre. Écrire à mail@pim-industrie.com pour y accéder, les corriger ou les faire supprimer.</p>',
      '<button type="button">Envoyer</button>',
      "</form>"
    ].join(""));
  },

  mentions() {
    return article("home", "Informations", "Mentions", "Mentions légales", "PIM Industrie, Impasse Kohlgaerten, 67390 Marckolsheim. Tél. 03 88 58 62 00. mail@pim-industrie.com.", "");
  },
  confidentialite() {
    return article("home", "Informations", "Données", "Protection des données", "Le formulaire recueille nom, prénom, société, e-mail, téléphone et votre demande, pour y répondre.", "");
  }
};

function field(label, type) {
  const id = "f-" + label.toLowerCase();
  return '<label class="field" for="' + id + '">' + label + '<input id="' + id + '" type="' + type + '"></label>';
}

sectors.forEach((s) => {
  views[s[0]] = function () {
    return article("industrie", '<a href="#industrie">Industrie</a>', "Domaine", s[1], s[4], s[2],
      '<ul class="facts">' + s[5].map((f) => "<li>" + f + "</li>").join("") + "</ul>",
      s[6]);
  };
});

Object.keys(products).forEach((id) => {
  const p = products[id];
  views[id] = function () {
    return article("industrie", '<a href="#gamme">Gamme</a>', "Produit", p[0], p[2], p[1], "", [["contact", "Demander un devis", "Cinq minutes, un formulaire."], ["gamme", "Retour à la gamme", "Les autres familles."]]);
  };
});

luxeItems.forEach((item) => {
  views[item[0]] = function () {
    return article("luxe", '<a href="#luxe">Luxe</a>', "Luxe & PLV", item[1], item[3], item[2], "", [["contact", "Parler d’un lancement", "Finitions, quantités, délai."], ["luxe", "Les autres univers", "Retour."]]);
  };
});

function catalog() {
  const pages = [
    ["accueil", "Accueil", "Accueil"],
    ["industrie", "Industrie", "Domaines"]
  ];
  sectors.forEach((s) => pages.push([s[0], "Industrie", s[1]]));
  pages.push(["gamme", "Industrie", "La gamme"]);
  Object.keys(products).forEach((id) => pages.push([id, "Industrie", products[id][0]]));
  pages.push(["luxe", "Luxe & PLV", "Univers"]);
  luxeItems.forEach((item) => pages.push([item[0], "Luxe & PLV", item[1]]));
  [
    ["process", "Process", "Le process"],
    ["impression", "Process", "Impression"],
    ["decoupe", "Process", "Découpe"],
    ["composants", "Process", "Composants"],
    ["controle", "Process", "Contrôle"],
    ["ressources", "Ressources", "Pour aller plus loin"],
    ["guide", "Ressources", "Choisir son clavier"],
    ["cas", "Ressources", "Études de cas"],
    ["actus", "Ressources", "Actualités"],
    ["glossaire", "Ressources", "Glossaire"],
    ["societe", "Société", "Qui sommes-nous"],
    ["references", "Société", "Références"],
    ["acces", "Société", "Accès"],
    ["contact", "Société", "Contact"],
    ["mentions", "Légal", "Mentions légales"],
    ["confidentialite", "Légal", "Données"]
  ].forEach((row) => pages.push(row));
  return pages.map((row) => ({ id: row[0], group: row[1], name: row[2] }));
}

const PAGES = catalog();
const FULL_KEY = "pim2-fullsite";
const ZOOM_KEY = "pim2-zoom";

function escapeHtml(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

function fullsiteOn() {
  try { return sessionStorage.getItem(FULL_KEY) === "1"; } catch (error) { return false; }
}

function setFullsite(on) {
  try { sessionStorage.setItem(FULL_KEY, on ? "1" : "0"); } catch (error) { /* ignore */ }
}

function pageGroups() {
  const groups = [];
  PAGES.forEach((page) => {
    let group = groups.find((item) => item.name === page.group);
    if (!group) {
      group = { name: page.group, pages: [] };
      groups.push(group);
    }
    group.pages.push(page);
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
  document.title = "Planches — PIM Industrie";
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
  document.title = "Planches — PIM Industrie";
  document.getElementById("app").innerHTML = [
    '<div class="figma">',
    '<aside class="side">',
    "<h1>PIM Industrie</h1>",
    '<p class="sub">Maquette 2.0 · 1440 px<br>' + PAGES.length + ' pages</p>',
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
  const id = (location.hash || "#planches").slice(1) || "planches";
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
