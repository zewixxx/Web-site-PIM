/* Domaines = uniquement sous Interfaces industrielles.
   Médical et aéro vivent ici (plus de branche « Par besoin » parallèle). */

const secteursIndustrie = [
  {
    id: "secteur-medical",
    name: "Industrie médicale",
    image: "industrie_industrie_medicale.jpg",
    short: "Claviers étanches et faces avant pour les appareils médicaux.",
    intro: "Les appareils médicaux demandent des interfaces fiables, lisibles et protégées. Les claviers PIM sont étanches IP65, et chaque pièce est testée avant expédition.",
    facts: ["IP65", "Test électrique de chaque pièce", "Traçabilité ISO 9001"],
    detail: [
      '<div class="answers">',
      '<div class="answer"><h3>Est-ce possible ?</h3><p>Oui. Tous les claviers à membrane PIM sont étanches IP65 et réalisés sur mesure, de la forme aux options d’éclairage.</p></div>',
      '<div class="answer"><h3>En combien de temps ?</h3><p>Prototypage rapide, puis industrialisation. Délai de prototype : ' + TBC + "</p></div>",
      '<div class="answer"><h3>Qui l’a déjà fait ?</h3><p>Parmi nos références industrielles : Bosch, Siemens, Honeywell, Mettler Toledo, Stago.</p></div>',
      "</div>"
    ].join(""),
    links: [["Clavier à membrane", "clavier-membrane"], ["Clavier étanche IP65", "clavier-etanche"], ["Clavier capacitif", "clavier-capacitif"], ["Face avant plastique", "face-avant-plastique"], ["Circuit flexible", "circuit-flexible"]]
  },
  {
    id: "secteur-aeronautique",
    name: "Aéronautique et défense",
    image: "industire_aeronautique_defense.jpg",
    short: "Claviers, faces avant et plaques d’identification pour des équipements exigeants.",
    intro: "Ces équipements travaillent dans des environnements hostiles. PIM fabrique des claviers rétroéclairés ou électroluminescents, des façades métal, et contrôle 100 % des pièces.",
    facts: ["Rétroéclairé ou électroluminescent", "Insert métal sur mesure", "Contrôle à 100 %"],
    detail: [
      '<div class="answers">',
      '<div class="answer"><h3>Est-ce possible ?</h3><p>Oui. Claviers sur mesure, rétroéclairés ou électroluminescents, et façades métalliques.</p></div>',
      '<div class="answer"><h3>En combien de temps ?</h3><p>Prototypage rapide, puis industrialisation. Délai de prototype : ' + TBC + "</p></div>",
      '<div class="answer"><h3>Qui l’a déjà fait ?</h3><p>Atelier ISO 9001, traçabilité et contrôle de chaque pièce.</p></div>',
      "</div>"
    ].join(""),
    links: [["Clavier à membrane", "clavier-membrane"], ["Clavier rétroéclairé", "clavier-retro"], ["Clavier électroluminescent", "clavier-electro"], ["Façade et insert métallique", "facade-metallique"], ["Test et contrôle", "process-controle"]]
  },
  {
    id: "secteur-automobile",
    name: "Automobile",
    image: "industrie_auromobile.jpg",
    short: "Plaques d’identification, faces avant et circuits souples.",
    intro: "Identification des pièces, habillage et commandes : plaques métalliques, faces avant plastique et circuits souples, sur mesure.",
    facts: ["Plaques métal", "Faces avant plastique", "Circuits souples"],
    links: [["Façade et insert métallique", "facade-metallique"], ["Face avant plastique", "face-avant-plastique"], ["Circuit flexible", "circuit-flexible"], ["Clavier à membrane", "clavier-membrane"]]
  },
  {
    id: "secteur-automatisation",
    name: "Automatisation",
    image: "fanuc_6_axis_welding_robots.jpg",
    short: "Claviers et faces avant pour pupitres et machines automatisées.",
    intro: "Les pupitres demandent des interfaces lisibles et robustes : coupelles, rétroéclairage, afficheurs et faces avant sur mesure.",
    facts: ["Clic à coupelles", "Afficheurs 7 segments", "Rétroéclairage"],
    links: [["Clavier à membrane", "clavier-membrane"], ["Clavier à coupelles", "clavier-coupelles"], ["Clavier rétroéclairé", "clavier-retro"], ["Afficheur 7 segments", "clavier-7s"], ["Face avant plastique", "face-avant-plastique"]]
  },
  {
    id: "secteur-machines",
    name: "Machine-outils",
    image: "cnc_press.jpg",
    short: "Claviers de commande, plaques constructeur et façades métalliques.",
    intro: "Plaque constructeur, plaque d’outillage, plaque de conformité : l’identification de la machine, et le clavier qui la pilote.",
    facts: ["Plaque constructeur", "Clavier élastomère", "IP65"],
    links: [["Façade et insert métallique", "facade-metallique"], ["Clavier à membrane", "clavier-membrane"], ["Clavier élastomère", "clavier-elastomere"], ["Clavier étanche IP65", "clavier-etanche"]]
  },
  {
    id: "secteur-nautique",
    name: "Nautique",
    image: "drops.jpg",
    short: "Claviers étanches pour les environnements humides.",
    intro: "Sur l’eau, l’humidité impose des interfaces étanches. Les claviers PIM sont certifiés IP65 : poussière et jets d’eau.",
    facts: ["IP65", "Protégé des jets d’eau", "Clavier élastomère"],
    links: [["Clavier à membrane", "clavier-membrane"], ["Clavier étanche IP65", "clavier-etanche"], ["Clavier élastomère", "clavier-elastomere"], ["Clavier rétroéclairé", "clavier-retro"], ["Façade et insert métallique", "facade-metallique"]]
  },
  {
    id: "secteur-electronique",
    name: "Électronique",
    image: "printed_electronics.jpg",
    short: "Circuits souples, électronique imprimée et composants CMS.",
    intro: "Encre argent, report robotisé de CMS et de LED, intégrés au clavier ou au circuit souple.",
    facts: ["Encre argent", "CMS et LED posés par robot", "Électronique imprimée"],
    links: [["Électronique imprimée", "besoin-electronique-imprimee"], ["Circuit flexible", "circuit-flexible"], ["Clavier capacitif", "clavier-capacitif"], ["Reports de composants", "process-composants"], ["Clavier à membrane", "clavier-membrane"]]
  },
  {
    id: "secteur-transports",
    name: "Transports",
    image: "dsc_0560.jpg",
    short: "Claviers étanches et plaques d’identification.",
    intro: "Claviers IP65 et plaques de conformité pour les équipements de transport.",
    facts: ["IP65", "Plaques d’identification", "Faces avant"],
    links: [["Clavier à membrane", "clavier-membrane"], ["Clavier étanche IP65", "clavier-etanche"], ["Façade et insert métallique", "facade-metallique"], ["Clavier rétroéclairé", "clavier-retro"], ["Face avant plastique", "face-avant-plastique"]]
  }
];

/* Textes d’usage : une seule fois, affichés sur la fiche produit.
   ?domaine= choisit le bloc mis en avant. Ce n’est pas une seconde URL indexée. */
const DOMAIN_USES = {
  "clavier-membrane": {
    medical: ["Sur un appareil médical, le clavier se nettoie, épouse le boîtier et reste étanche. Il est réalisé sur mesure, en IP65, et chaque pièce est testée avant expédition.", ["IP65", "Face nettoyable", "Test électrique de chaque pièce"]],
    aeronautique: ["Pour un équipement exposé, le clavier reste fin et lisible. Le rétroéclairage ou l’électroluminescence s’ajoutent quand le poste manque de lumière.", ["Rétroéclairé ou électroluminescent", "Façade lisible", "Contrôle à 100 %"]],
    automobile: ["Le clavier habille une commande d’équipement ou d’atelier : faible épaisseur, forme libre, décor imprimé sur la face.", ["Faible épaisseur", "Forme libre", "Décor imprimé"]],
    automatisation: ["Sur un pupitre, le clavier porte le clic des coupelles, un afficheur ou un rétroéclairage, selon le geste de l’opérateur.", ["Coupelles", "Afficheur 7 segments", "Rétroéclairage"]],
    machines: ["Le clavier pilote la machine. Il voisine souvent avec la plaque constructeur et une face étanche IP65.", ["Commande machine", "IP65", "À côté de la plaque constructeur"]],
    nautique: ["En milieu humide, ce clavier se ferme en version étanche : poussière et jets d’eau, lisible sur un pupitre de bord.", ["IP65", "Protégé des jets d’eau", "Limande vers l’électronique"]],
    electronique: ["Le clavier et le circuit souple forment un seul ensemble. Des LED ou des CMS peuvent être reportés dans l’interface.", ["Circuit souple intégré", "CMS et LED", "Encre argent"]],
    transports: ["Sur un équipement de transport, le clavier reste étanche et lisible. La plaque d’identification complète la traçabilité.", ["IP65", "Lisibilité", "Plaque d’identification"]]
  },
  "clavier-etanche": {
    medical: ["Les appareils qui se désinfectent demandent une face close. L’IP65 limite les infiltrations au nettoyage.", ["IP65", "Face close", "Test de chaque pièce"]],
    machines: ["Huile, poussière, nettoyage : la face étanche protège la commande de la machine.", ["IP65", "Face fermée", "Commande machine"]],
    nautique: ["C’est la pièce retenue dès que le poste prend les embruns ou les jets d’eau.", ["IP65", "Jets d’eau", "Pupitre de bord"]],
    transports: ["La face étanche tient les lavages et les projections sur les équipements de transport.", ["IP65", "Face fermée", "Équipement de transport"]]
  },
  "clavier-capacitif": {
    medical: ["Sans pièce mobile, la face reste lisse et simple à nettoyer sur un appareil médical.", ["Face lisse", "Sans pièce mobile", "Nettoyage"]],
    electronique: ["La commande capacitive s’intègre au circuit souple, sans coupelle ni contact mécanique.", ["Sans contact mécanique", "Circuit souple", "Face continue"]]
  },
  "face-avant-plastique": {
    medical: ["La face avant ferme l’appareil, porte le décor et laisse passer affichage et commandes.", ["Décor imprimé", "Fenêtres d’affichage", "Boîtier médical"]],
    automobile: ["Habillage plastique d’une commande ou d’un équipement : forme, couleur et marquage sur mesure.", ["Marquage", "Forme sur mesure", "Habillage"]],
    automatisation: ["La face avant du pupitre aligne touches, voyants et fenêtre d’afficheur.", ["Pupitre", "Fenêtre d’afficheur", "Repères de touches"]],
    transports: ["Face avant résistante pour un équipement de transport, avec le marquage utile à l’opérateur.", ["Marquage", "Équipement de transport", "Sur mesure"]]
  },
  "circuit-flexible": {
    medical: ["Le circuit souple relie le clavier à l’électronique de l’appareil, dans l’épaisseur disponible.", ["Faible épaisseur", "Limande", "Appareil médical"]],
    automobile: ["Un circuit souple suit la forme du boîtier quand une carte rigide ne passe pas.", ["Forme libre", "Faible épaisseur", "Connexion directe"]],
    electronique: ["Encre argent, puis CMS et LED reportés : le circuit souple porte l’électronique de l’interface.", ["Encre argent", "CMS et LED", "Électronique imprimée"]]
  },
  "clavier-retro": {
    aeronautique: ["Les touches restent lisibles dans un poste sombre, sans quitter la construction du clavier à membrane.", ["LED de puissance", "Postes sombres", "Touches lisibles"]],
    automatisation: ["Le rétroéclairage guide l’opérateur sur le pupitre quand l’atelier est peu éclairé.", ["Guidage des touches", "Pupitre", "LED"]],
    nautique: ["De nuit, sur un pupitre de bord, symboles et touches restent visibles.", ["Usage de nuit", "Pupitre de bord", "Symboles lisibles"]],
    transports: ["Le rétroéclairage garde la commande lisible dans une cabine ou un local technique.", ["Cabine", "Symboles lisibles", "LED"]]
  },
  "clavier-electro": {
    aeronautique: ["La lampe électroluminescente, sérigraphiée par PIM, éclaire la face de façon uniforme, plane ou courbe.", ["Lumière froide", "Faible consommation", "Forme libre"]]
  },
  "facade-metallique": {
    aeronautique: ["Façade ou insert métal pour identifier un équipement et habiller une face exposée.", ["Insert métal", "Identification", "Sur mesure"]],
    automobile: ["Plaque d’identification ou habillage métal d’une pièce automobile.", ["Plaque d’identification", "Métal", "Marquage durable"]],
    machines: ["Plaque constructeur, plaque d’outillage ou plaque de conformité : l’identité de la machine.", ["Plaque constructeur", "Plaque de conformité", "Outillage"]],
    nautique: ["Plaque métal pour identifier un équipement exposé à l’humidité.", ["Identification", "Métal", "Marquage durable"]],
    transports: ["Plaque de conformité ou d’identification pour un équipement de transport.", ["Plaque de conformité", "Identification", "Métal"]]
  },
  "clavier-coupelles": {
    automatisation: ["Le clic confirme la touche sur un pupitre, même avec des gants ou sans regarder l’écran.", ["Clic net", "Pupitre", "Un million d’actionnements"]]
  },
  "clavier-7s": {
    automatisation: ["L’afficheur 7 segments, dans moins de 2 mm, donne une valeur lue directement sur le clavier.", ["Moins de 2 mm", "Chiffres lisibles", "Intégré au clavier"]]
  },
  "clavier-elastomere": {
    machines: ["Le clavier élastomère encaisse les sollicitations d’une commande de machine.", ["Touches en relief", "Commande machine", "Sur mesure"]],
    nautique: ["Les touches en élastomère restent utilisables quand le poste est humide.", ["Relief", "Milieu humide", "Sur mesure"]]
  },
  "besoin-electronique-imprimee": {
    electronique: ["L’encre argent et le report de CMS ou de LED construisent la fonction électronique dans l’interface, pas à côté.", ["Encre argent", "CMS et LED", "Intégré à l’interface"]]
  },
  "process-composants": {
    electronique: ["Le robot pose CMS et LED sur le circuit souple ou le clavier, à l’emplacement prévu au plan.", ["Pose robotisée", "CMS", "LED"]]
  },
  "process-controle": {
    aeronautique: ["Chaque pièce est contrôlée avant expédition. L’exigence du secteur passe par ce contrôle, sur la même fiche.", ["Contrôle à 100 %", "Avant expédition", "Traçabilité ISO 9001"]]
  }
};

function domainBySlug(slug) {
  return secteursIndustrie.find((item) => item.id === "secteur-" + slug) || null;
}

function domainLabel(slug) {
  const sector = domainBySlug(slug);
  return sector ? sector.name : "";
}

const DOMAIN_PHOTOS = {
  medical: ["domaine-medical-clavier.jpg", "Clavier à membrane sur un appareil de laboratoire."],
  aeronautique: ["domaine-aeronautique-clavier.jpg", "Clavier à membrane sur un pupitre d’équipement."],
  automobile: ["domaine-automobile-clavier.jpg", "Clavier à membrane sur un poste d’atelier automobile."],
  automatisation: ["domaine-automatisation-clavier.jpg", "Clavier à membrane sur un pupitre de machine."],
  machines: ["domaine-machines-clavier.jpg", "Clavier à membrane à côté de la plaque machine."],
  nautique: ["domaine-nautique-clavier.jpg", "Clavier à membrane sur une console de bord."],
  electronique: ["domaine-electronique-clavier.jpg", "Clavier à membrane et son circuit souple."],
  transports: ["domaine-transports-clavier.jpg", "Clavier à membrane sur un poste de conduite."]
};

function domainPhoto(slug) {
  const row = DOMAIN_PHOTOS[slug];
  return row ? row[0] : "";
}

function domainPhotoCaption(slug) {
  const row = DOMAIN_PHOTOS[slug];
  return row ? row[1] : "";
}

function productShot(id, slug) {
  if (slug && typeof productDomainPhoto === "function") {
    const file = productDomainPhoto(id, slug);
    if (file) return file;
  }
  return "";
}

function sectorProductChips(item) {
  const slug = item.id.replace("secteur-", "");
  const links = (item.links || []).filter((link) => link[1] !== "clavier-membrane" && link[1].indexOf("process") !== 0 && productShot(link[1], slug));
  const withPlat = links.some((link) => link[1] === "clavier-plat") || !productShot("clavier-plat", slug)
    ? links
    : [["Clavier plat", "clavier-plat"]].concat(links);
  if (!withPlat.length) return "";
  return '<div class="domain-products">' + withPlat.map((link) => {
    const shot = productShot(link[1], slug);
    if (!shot) return "";
    return '<a class="domain-product" href="index.html?domaine=' + slug + "#" + link[1] + '">'
      + '<img src="medias/images/' + shot + '" alt="' + escapeText(link[0]) + ", " + escapeText(item.name) + '">'
      + "<span>" + escapeText(link[0]) + "</span></a>";
  }).join("") + "</div>";
}

function domainUsesHtml(productId, activeSlug) {
  if (typeof domainPanelHtml !== "function") return "";
  const order = secteursIndustrie.map((item) => item.id.replace("secteur-", "")).filter((slug) => domainEntry(productId, slug));
  if (!order.length) return "";
  const active = order.indexOf(activeSlug) >= 0 ? activeSlug : "";
  /* Le domaine d’arrivée passe en premier et s’ouvre ; les autres restent fermés. */
  const sorted = active ? [active].concat(order.filter((slug) => slug !== active)) : order;

  return [
    '<section class="domain-uses' + (active ? " has-active" : "") + '" id="usages">',
    active
      ? "<h2>Ce produit dans votre domaine : " + escapeText(domainLabel(active)) + "</h2>"
      : "<h2>Ce produit selon votre domaine</h2>",
    active
      ? '<p class="domain-context">Le volet de votre domaine est ouvert. Ouvrez les autres pour voir les usages ailleurs : la fiche produit reste la même.</p>'
      : '<p class="domain-context">Ouvrez le volet de votre domaine pour voir la photo et les réponses qui vous concernent. La fiche produit reste la même.</p>',
    '<div class="domain-panels">' + sorted.map((slug) => domainPanelHtml(productId, slug, slug === active)).join("") + "</div>",
    "</section>"
  ].join("");
}

addPage({
  id: "secteurs",
  group: "Industrie",
  name: "Domaines",
  html: [
    '<div class="wrap page page-head">',
    crumb([["Accueil", "accueil"], ["Interfaces industrielles", "technologies"], ["Domaines"]]),
    '<p class="kicker">Interfaces industrielles · Domaines</p>',
    "<h1>Choisissez votre domaine</h1>",
    '<p class="lead">Huit secteurs. Ouvrez le vôtre pour voir les solutions adaptées. Si vous connaissez déjà la pièce, passez par la <a href="#technologies">gamme</a>.</p>',
    '<div class="grid-4" style="margin-top:24px">',
    secteursIndustrie.map((item) => {
      return '<a class="card" href="#' + item.id + '"><img class="card-visual" src="medias/images/' + item.image + '" alt=""><h3>' + item.name + "</h3><p>" + item.short + "</p></a>";
    }).join(""),
    "</div></div>"
  ].join("")
});

secteursIndustrie.forEach((item) => {
  addPage({
    id: item.id,
    group: "Industrie",
    name: item.name,
    html: [
      '<div class="wrap page">',
      crumb([["Accueil", "accueil"], ["Interfaces industrielles", "technologies"], ["Domaines", "secteurs"], [item.name]]),
      '<p class="kicker">Interfaces industrielles · Domaine</p>',
      "<h1>" + item.name + "</h1>",
      '<div class="text-photo">',
      "<div>",
      "<p>" + item.intro + "</p>",
      '<ul class="facts">' + item.facts.map((fact) => "<li>" + fact + "</li>").join("") + "</ul>",
      '<p class="lux-cta"><a class="btn" href="index.html?domaine=' + item.id.replace("secteur-", "") + '#clavier-membrane">Voir le clavier à membrane</a></p>',
      "</div>",
      '<figure class="domain-hero">',
      '<img src="medias/images/' + (domainPhoto(item.id.replace("secteur-", "")) || item.image) + '" alt="' + escapeText(domainPhotoCaption(item.id.replace("secteur-", "")) || item.name) + '">',
      "<figcaption>" + escapeText(domainPhotoCaption(item.id.replace("secteur-", ""))) + "</figcaption>",
      "</figure>",
      "</div>",
      "<h2>Également dans ce domaine</h2>",
      sectorProductChips(item),
      item.detail || "",
      reassurance(false),
      "</div>"
    ].join("")
  });
});
