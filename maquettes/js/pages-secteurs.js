const secteurs = [
  {
    id: "secteur-medical",
    name: "Industrie médicale",
    image: "industrie_industrie_medicale.jpg",
    short: "Claviers étanches et faces avant pour les appareils médicaux.",
    intro: "Les appareils médicaux demandent des interfaces fiables, lisibles et protégées. Les claviers PIM sont étanches, fabriqués avec des procédés certifiés IP65, et chaque pièce est testée avant expédition.",
    facts: ["IP65", "Test électrique de chaque pièce", "Traçabilité ISO 9001"],
    links: [["Clavier pour dispositif médical", "besoin-medical"], ["Clavier à membrane", "clavier-membrane"], ["Clavier étanche IP65", "clavier-etanche"], ["Clavier capacitif", "clavier-capacitif"], ["Face avant plastique", "face-avant-plastique"], ["Circuit flexible", "circuit-flexible"]]
  },
  {
    id: "secteur-aeronautique",
    name: "Aéronautique et défense",
    image: "industire_aeronautique_defense.jpg",
    short: "Claviers, faces avant et plaques d’identification pour des équipements exigeants.",
    intro: "Ces équipements travaillent dans des environnements hostiles. PIM fabrique des claviers sur mesure, rétroéclairés ou électroluminescents, des façades et inserts métalliques, et contrôle 100 % des pièces.",
    facts: ["Rétroéclairé ou électroluminescent", "Insert métal sur mesure", "Contrôle à 100 %"],
    links: [["Clavier pour l’aéronautique", "besoin-aeronautique"], ["Clavier à membrane", "clavier-membrane"], ["Clavier rétroéclairé", "clavier-retro"], ["Clavier électroluminescent", "clavier-electro"], ["Façade et insert métallique", "facade-metallique"], ["Test et contrôle", "process-controle"]]
  },
  {
    id: "secteur-automobile",
    name: "Automobile",
    image: "industrie_auromobile.jpg",
    short: "Plaques d’identification, faces avant et circuits souples.",
    intro: "Identification des pièces, habillage et commandes : plaques métalliques, faces avant plastique, circuits souples et claviers réalisés sur mesure.",
    facts: ["Plaques métal", "Faces avant plastique", "Circuits souples"],
    links: [["Façade et insert métallique", "facade-metallique"], ["Face avant plastique", "face-avant-plastique"], ["Circuit flexible", "circuit-flexible"], ["Clavier à membrane", "clavier-membrane"]]
  },
  {
    id: "secteur-automatisation",
    name: "Automatisation",
    image: "fanuc_6_axis_welding_robots.jpg",
    short: "Claviers et faces avant pour pupitres et machines automatisées.",
    intro: "Les pupitres de commande demandent des interfaces lisibles et robustes : claviers à membrane, à coupelles ou rétroéclairés, afficheurs intégrés et faces avant sur mesure.",
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
    intro: "Sur l’eau, l’humidité et les projections imposent des interfaces étanches. Les claviers PIM sont fabriqués avec des procédés certifiés IP65 : hermétiques à la poussière et protégés contre les jets d’eau.",
    facts: ["IP65", "Protégé des jets d’eau", "Clavier élastomère"],
    links: [["Clavier étanche IP65", "clavier-etanche"], ["Clavier élastomère", "clavier-elastomere"], ["Clavier rétroéclairé", "clavier-retro"], ["Façade et insert métallique", "facade-metallique"]]
  },
  {
    id: "secteur-electronique",
    name: "Électronique",
    image: "printed_electronics.jpg",
    short: "Circuits souples, électronique imprimée et composants CMS.",
    intro: "Électronique imprimée sur support souple, circuits en encre argent, report automatisé de composants CMS et de LED, intégrés au clavier ou au circuit.",
    facts: ["Encre argent", "CMS et LED posés par robot", "Électronique imprimée"],
    links: [["Électronique imprimée", "besoin-electronique-imprimee"], ["Circuit flexible", "circuit-flexible"], ["Clavier capacitif", "clavier-capacitif"], ["Reports de composants", "process-composants"], ["Clavier à membrane", "clavier-membrane"]]
  },
  {
    id: "secteur-transports",
    name: "Transports",
    image: "dsc_0549.jpg",
    short: "Claviers étanches et plaques d’identification.",
    intro: "Le transport fait partie des secteurs pour lesquels les claviers étanches IP65 sont conçus. PIM fabrique aussi les plaques d’identification et de conformité des équipements.",
    facts: ["IP65", "Plaques d’identification", "Faces avant"],
    links: [["Clavier étanche IP65", "clavier-etanche"], ["Façade et insert métallique", "facade-metallique"], ["Clavier rétroéclairé", "clavier-retro"], ["Face avant plastique", "face-avant-plastique"]]
  },
  {
    id: "secteur-luxe",
    name: "Luxe & PLV",
    image: "visuel_pim_parfum_web.jpg",
    short: "Vins, spiritueux, parfums et cosmétiques.",
    intro: "Étiquettes et inserts métal, dômage résine, PLV, signalétique lumineuse et présentoirs en plexiglas, pour mettre les produits en valeur.",
    links: [["Étiquettes", "etiquettes"], ["Vins et spiritueux", "etiquette-vins"], ["Cosmétiques", "etiquette-cosmetiques"], ["PLV", "plv"], ["Signalétique lumineuse", "signaletique"], ["Présentoir plexiglas", "presentoir"]]
  }
];

const secteursIndustrie = secteurs.filter((item) => item.id !== "secteur-luxe");

// Page « Domaines » : côté interfaces industrielles de l'arbre
addPage({
  id: "secteurs",
  group: "Industrie",
  name: "Domaines",
  html: [
    '<div class="wrap page page-head">',
    crumb([["Accueil", "accueil"], ["Interfaces industrielles"]]),
    '<p class="kicker">Interfaces industrielles</p>',
    "<h1>Choisissez votre domaine</h1>",
    '<p class="lead">Huit domaines. Ouvrez le vôtre : les solutions proposées, claviers, faces avant ou plaques métal, sont indiquées sur la page.</p>',
    '<div class="grid-4" style="margin-top:24px">',
    secteursIndustrie.map((item) => {
      return '<a class="card" href="#' + item.id + '"><img class="card-visual" src="medias/images/' + item.image + '" alt=""><h3>' + item.name + "</h3><p>" + item.short + '</p><p class="card-facts">' + item.facts.join(" · ") + "</p></a>";
    }).join(""),
    "</div>",
    '<p class="note" style="margin-top:28px">Vous connaissez déjà le produit ? <a href="#technologies">Voir la gamme : claviers, circuits, faces avant</a>.</p>',
    "</div>"
  ].join("")
});

// Pages de domaine : industrie
secteursIndustrie.forEach((item) => {
  addPage({
    id: item.id,
    group: "Industrie",
    name: item.name,
    html: [
      '<div class="wrap page">',
      crumb([["Accueil", "accueil"], ["Interfaces industrielles", "secteurs"], [item.name]]),
      '<p class="kicker">Interfaces industrielles · Domaine</p>',
      "<h1>" + item.name + "</h1>",
      '<p class="lead">' + item.intro + "</p>",
      '<ul class="facts">' + item.facts.map((fact) => "<li>" + fact + "</li>").join("") + "</ul>",
      photos([item.image]),
      "<p>Depuis plus de 60 ans, PIM Industrie se consacre à la sérigraphie industrielle, à la découpe et au montage de matériaux plastique et métal de haute performance, pour un produit adapté et fiable à long terme.</p>",
      "<h2>Solutions pour ce domaine</h2>",
      chips(item.links),
      reassurance(false),
      "</div>"
    ].join("")
  });
});

// Page de domaine : luxe, traitée comme un univers à part
addPage({
  id: "secteur-luxe",
  group: "Décoration",
  name: "Vins, spiritueux, parfums, cosmétiques",
  html: [
    '<div class="wrap page">',
    crumb([["Accueil", "accueil"], ["Décoration", "decoration"], ["Vins, spiritueux, parfums, cosmétiques"]]),
    '<p class="kicker">Luxe &amp; PLV · Pour les marques</p>',
    "<h1>Les artisans du beau</h1>",
    '<p class="lead">Étiquettes et inserts métal, dômage résine, PLV, signalétique lumineuse et présentoirs en plexiglas, pour mettre les produits en valeur. Dans l’industrie du luxe, la qualité du produit est primordiale, et PIM Industrie y porte une attention toute particulière.</p>',
    '<p><a class="cta" href="#contact">Parler de votre lancement</a></p>',
    "<h2>Trois univers</h2>",
    '<div class="grid-3">',
    '<a class="card" href="#etiquette-vins"><img class="card-visual" src="medias/images/etiquette_metal_courvoisier.jpg" alt=""><h3>Vins et spiritueux</h3><p>Étiquette alu champagne, étiquette alu cognac, médaillon.</p></a>',
    '<a class="card" href="#etiquette-cosmetiques"><img class="card-visual" src="medias/images/bg_guerlain_tonkaimperiale.jpg" alt=""><h3>Parfums et cosmétiques</h3><p>Inserts métal et dômage résine pour flacons et coffrets.</p></a>',
    '<a class="card" href="#plv"><img class="card-visual" src="medias/images/plv_presentoir_goldkenn1.jpg" alt=""><h3>Points de vente</h3><p>PLV, signalétique lumineuse et présentoirs plexiglas.</p></a>',
    "</div>",
    '<h2 style="margin-top:36px">Réalisations</h2>',
    photos(["visuel_pim_parfum_web.jpg", "copie_de_coffret_led_roederer_low.jpg", "plv_boucheron_copie2.jpg", "medaillon_napoleon3.jpg", "dome_resine_01.jpg", "plv_led_bouteille_marie2.jpg"]),
    '<aside class="specs"><div class="specs-main"><h2>Pour votre lancement</h2><dl>',
    '<div class="spec-row"><dt>Finitions</dt><dd>Encres couleur et miroir, teintes Pantone ou RAL, dômage résine, gravure, découpe laser</dd></div>',
    '<div class="spec-row"><dt>Matières</dt><dd>Métal souple ou rigide, aluminium, plexiglas, plastique</dd></div>',
    '<div class="spec-row"><dt>Séries</dt><dd>De l’unité à la grande série</dd></div>',
    '<div class="spec-row"><dt>Quantité minimale</dt><dd>' + TBC + "</dd></div>",
    '<div class="spec-row"><dt>Délai avant lancement</dt><dd>' + TBC + "</dd></div>",
    '</dl></div><div class="specs-side"><h3>Un lancement en préparation ?</h3><p>Finitions, quantités, délai : décrivez-nous votre projet.</p><a class="cta" href="#contact">Demander un devis</a></div></aside>',
    "<h2>Toute l’offre luxe &amp; PLV</h2>",
    chips(secteurs[secteurs.length - 1].links),
    reassurance(true),
    "</div>"
  ].join("")
});
