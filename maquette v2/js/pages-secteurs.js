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
    links: [["Clavier étanche IP65", "clavier-etanche"], ["Clavier élastomère", "clavier-elastomere"], ["Clavier rétroéclairé", "clavier-retro"], ["Façade et insert métallique", "facade-metallique"]]
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
    image: "dsc_0549.jpg",
    short: "Claviers étanches et plaques d’identification.",
    intro: "Claviers IP65 et plaques de conformité pour les équipements de transport.",
    facts: ["IP65", "Plaques d’identification", "Faces avant"],
    links: [["Clavier étanche IP65", "clavier-etanche"], ["Façade et insert métallique", "facade-metallique"], ["Clavier rétroéclairé", "clavier-retro"], ["Face avant plastique", "face-avant-plastique"]]
  }
];

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
      '<p class="lead">' + item.intro + "</p>",
      '<ul class="facts">' + item.facts.map((fact) => "<li>" + fact + "</li>").join("") + "</ul>",
      item.detail || "",
      photos([item.image]),
      "<h2>Solutions pour ce domaine</h2>",
      chips(item.links),
      reassurance(false),
      "</div>"
    ].join("")
  });
});
