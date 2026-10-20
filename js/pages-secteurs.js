const secteurs = [
  {
    id: "secteur-medical",
    name: "Industrie médicale",
    image: "industrie_industrie_medicale.jpg",
    short: "Claviers étanches et faces avant pour les appareils médicaux.",
    intro: "Les appareils médicaux demandent des interfaces fiables, lisibles et protégées. Les claviers PIM sont étanches, fabriqués avec des procédés certifiés IP65, et chaque pièce est testée avant expédition.",
    links: [["Clavier à membrane", "clavier-membrane"], ["Clavier étanche IP65", "clavier-etanche"], ["Clavier capacitif", "clavier-capacitif"], ["Face avant plastique", "face-avant-plastique"], ["Circuit flexible", "circuit-flexible"]]
  },
  {
    id: "secteur-aeronautique",
    name: "Aéronautique et défense",
    image: "industire_aeronautique_defense.jpg",
    short: "Claviers, faces avant et plaques d’identification pour des équipements exigeants.",
    intro: "Ces équipements travaillent dans des environnements hostiles. PIM fabrique des claviers sur mesure, rétroéclairés ou électroluminescents, des façades et inserts métalliques, et contrôle 100 % des pièces.",
    links: [["Clavier à membrane", "clavier-membrane"], ["Clavier rétroéclairé", "clavier-retro"], ["Clavier électroluminescent", "clavier-electro"], ["Façade et insert métallique", "facade-metallique"], ["Test et contrôle", "process-controle"]]
  },
  {
    id: "secteur-automobile",
    name: "Automobile",
    image: "industrie_auromobile.jpg",
    short: "Plaques d’identification, faces avant et circuits souples.",
    intro: "Identification des pièces, habillage et commandes : plaques métalliques, faces avant plastique, circuits souples et claviers réalisés sur mesure.",
    links: [["Façade et insert métallique", "facade-metallique"], ["Face avant plastique", "face-avant-plastique"], ["Circuit flexible", "circuit-flexible"], ["Clavier à membrane", "clavier-membrane"]]
  },
  {
    id: "secteur-automatisation",
    name: "Automatisation",
    image: "fanuc_6_axis_welding_robots.jpg",
    short: "Claviers et faces avant pour pupitres et machines automatisées.",
    intro: "Les pupitres de commande demandent des interfaces lisibles et robustes : claviers à membrane, à coupelles ou rétroéclairés, afficheurs intégrés et faces avant sur mesure.",
    links: [["Clavier à membrane", "clavier-membrane"], ["Clavier à coupelles", "clavier-coupelles"], ["Clavier rétroéclairé", "clavier-retro"], ["Afficheur 7 segments", "clavier-7s"], ["Face avant plastique", "face-avant-plastique"]]
  },
  {
    id: "secteur-machines",
    name: "Machine-outils",
    image: "cnc_press.jpg",
    short: "Claviers de commande, plaques constructeur et façades métalliques.",
    intro: "Plaque constructeur, plaque d’outillage, plaque de conformité : l’identification de la machine, et le clavier qui la pilote.",
    links: [["Façade et insert métallique", "facade-metallique"], ["Clavier à membrane", "clavier-membrane"], ["Clavier élastomère", "clavier-elastomere"], ["Clavier étanche IP65", "clavier-etanche"]]
  },
  {
    id: "secteur-nautique",
    name: "Nautique",
    image: "drops.jpg",
    short: "Claviers étanches pour les environnements humides.",
    intro: "Sur l’eau, l’humidité et les projections imposent des interfaces étanches. Les claviers PIM sont fabriqués avec des procédés certifiés IP65 : hermétiques à la poussière et protégés contre les jets d’eau.",
    links: [["Clavier étanche IP65", "clavier-etanche"], ["Clavier élastomère", "clavier-elastomere"], ["Clavier rétroéclairé", "clavier-retro"], ["Façade et insert métallique", "facade-metallique"]]
  },
  {
    id: "secteur-electronique",
    name: "Électronique",
    image: "printed_electronics.jpg",
    short: "Circuits souples, électronique imprimée et composants CMS.",
    intro: "Électronique imprimée sur support souple, circuits en encre argent, report automatisé de composants CMS et de LED, intégrés au clavier ou au circuit.",
    links: [["Circuit flexible", "circuit-flexible"], ["Clavier capacitif", "clavier-capacitif"], ["Reports de composants", "process-composants"], ["Clavier à membrane", "clavier-membrane"]]
  },
  {
    id: "secteur-transports",
    name: "Transports",
    image: "dsc_0549.jpg",
    short: "Claviers étanches et plaques d’identification.",
    intro: "Le transport fait partie des secteurs pour lesquels les claviers étanches IP65 sont conçus. PIM fabrique aussi les plaques d’identification et de conformité des équipements.",
    links: [["Clavier étanche IP65", "clavier-etanche"], ["Façade et insert métallique", "facade-metallique"], ["Clavier rétroéclairé", "clavier-retro"], ["Face avant plastique", "face-avant-plastique"]]
  },
  {
    id: "secteur-luxe",
    name: "Luxe",
    image: "visuel_pim_parfum_web.jpg",
    short: "Vins, spiritueux, parfums et cosmétiques.",
    intro: "Étiquettes et inserts métal, dômage résine, PLV, signalétique lumineuse et présentoirs en plexiglas, pour mettre les produits en valeur.",
    links: [["Étiquettes", "etiquettes"], ["Vins et spiritueux", "etiquette-vins"], ["Cosmétiques", "etiquette-cosmetiques"], ["PLV", "plv"], ["Signalétique lumineuse", "signaletique"], ["Présentoir plexiglas", "presentoir"]]
  }
];

addPage({
  id: "secteurs",
  group: "Domaines",
  name: "Domaines",
  html: [
    '<div class="wrap page">',
    crumb([["Accueil", "accueil"], ["Domaines"]]),
    '<p class="kicker">Domaines d’intervention</p>',
    "<h1>Des environnements exigeants</h1>",
    '<p class="lead">Ces secteurs impliquent des environnements matériels particulièrement hostiles et de forts niveaux d’exigence. PIM Industrie met à disposition de ses clients un savoir-faire, une technicité et une qualité de prestations qui permettent de servir des produits d’une extrême fiabilité.</p>',
    '<div class="grid-3">',
    secteurs.map((item) => {
      return '<a class="card" href="#' + item.id + '"><img class="card-visual" src="medias/images/' + item.image + '" alt=""><h3>' + item.name + "</h3><p>" + item.short + "</p></a>";
    }).join(""),
    "</div></div>"
  ].join("")
});

secteurs.forEach((item) => {
  const luxe = item.id === "secteur-luxe";
  addPage({
    id: item.id,
    group: "Domaines",
    name: item.name,
    html: [
      '<div class="wrap page">',
      crumb([["Accueil", "accueil"], ["Domaines", "secteurs"], [item.name]]),
      '<p class="kicker">Domaine</p>',
      "<h1>" + item.name + "</h1>",
      '<p class="lead">' + item.intro + "</p>",
      photos([item.image]),
      luxe
        ? "<p>Les artisans du beau depuis plus de 60 ans. Dans l’industrie du luxe, la qualité du produit est primordiale, et PIM Industrie y porte une attention toute particulière.</p>"
        : "<p>Depuis plus de 60 ans, PIM Industrie se consacre à la sérigraphie industrielle, à la découpe et au montage de matériaux plastique et métal de haute performance, pour un produit adapté et fiable à long terme.</p>",
      "<h2>Solutions pour ce secteur</h2>",
      chips(item.links),
      "</div>"
    ].join("")
  });
});
