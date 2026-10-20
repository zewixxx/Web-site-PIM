addPage({
  id: "technologies",
  group: "Industrie",
  name: "Industrie",
  html: [
    '<div class="wrap page">',
    crumb([["Accueil", "accueil"], ["Industrie"]]),
    '<p class="kicker">Industrie</p>',
    "<h1>Une vaste gamme au service de l’industrie</h1>",
    '<p class="lead">Expert en sérigraphie, PIM Industrie conçoit des solutions d’électronique imprimée sur surfaces souples ou rigides, adaptées aux exigences du secteur industriel.</p>',
    "<p>Ces technologies trouvent leur place au cœur des applications industrielles : fiabilité, précision et performance. Un parc de machines conventionnelles et numériques permet de réaliser inserts et façades en métal et en plastique, circuits techniques et claviers à membrane.</p>",
    '<div class="grid-4">',
    '<a class="card" href="#clavier-membrane"><h3>Clavier à membrane</h3><p>Interface homme-machine souple, étanche et sur mesure.</p></a>',
    '<a class="card" href="#circuit-flexible"><h3>Circuit souple</h3><p>Circuit imprimé sur polyester ou polycarbonate.</p></a>',
    '<a class="card" href="#face-avant-plastique"><h3>Face avant plastique</h3><p>Décor sérigraphié sur un support ou un circuit.</p></a>',
    '<a class="card" href="#facade-metallique"><h3>Façade et insert métallique</h3><p>Identification d’un produit, d’une machine, d’un équipement.</p></a>',
    "</div>",
    '<div style="margin-top:28px">' + photos(["bandeau_industrie.jpg", "circuit_souples3.jpg", "facade_plastique_habillage_boitier_geolocalisation3.jpg", "dsc_0549.jpg", "fond_decoupe_laser6.jpg", "dsc_0560.jpg"]) + "</div>",
    "<h2>Les claviers à membrane</h2>",
    chips([
      ["Plat", "clavier-plat"],
      ["Coupelles", "clavier-coupelles"],
      ["Gaufré", "clavier-gaufre"],
      ["Rétroéclairé", "clavier-retro"],
      ["Électroluminescent", "clavier-electro"],
      ["Afficheurs 7 segments", "clavier-7s"],
      ["Capacitif", "clavier-capacitif"],
      ["Élastomère", "clavier-elastomere"],
      ["Étanche IP65", "clavier-etanche"]
    ]),
    '<h2 style="margin-top:36px">Ils nous font confiance</h2>',
    logos(CLIENTS_INDUSTRIE),
    "</div>"
  ].join("")
});

const relatedKeys = [
  ["Clavier à membrane", "clavier-membrane"],
  ["Plat", "clavier-plat"],
  ["Coupelles", "clavier-coupelles"],
  ["Gaufré", "clavier-gaufre"],
  ["Rétroéclairé", "clavier-retro"],
  ["Électroluminescent", "clavier-electro"],
  ["Afficheur 7 segments", "clavier-7s"],
  ["Capacitif", "clavier-capacitif"],
  ["Élastomère", "clavier-elastomere"],
  ["Étanche", "clavier-etanche"]
];

function keyboardCrumb(name) {
  return [["Accueil", "accueil"], ["Industrie", "technologies"], ["Clavier à membrane", "clavier-membrane"], [name]];
}

function othersThan(id) {
  return relatedKeys.filter((item) => item[1] !== id);
}

productPage({
  id: "clavier-membrane",
  group: "Industrie",
  name: "Clavier à membrane",
  kicker: "Industrie",
  title: "Le clavier à membrane",
  lead: "En Lexan ou en polyester, à partir de 0,5 mm d’épaisseur.",
  crumb: [["Accueil", "accueil"], ["Industrie", "technologies"], ["Clavier à membrane"]],
  what: "<p>Le clavier à membrane est obtenu par assemblage de feuilles de polyester ou de polycarbonate et d’adhésif. Une languette souple, la limande, permet une connexion directe sur l’équipement électronique.</p>",
  why: "<p>Souple et étanche, il s’adapte à tout type de support, quelle que soit sa forme. La gamme va du clavier plat à l’intégration de composants CMS et au blindage.</p>",
  extra: "<h2>Options pouvant être incorporées</h2><ul class=\"clean\"><li>LED</li><li>Micro-switch</li><li>Blindage électromagnétique et/ou électrostatique, indépendant ou non</li><li>Guide-doigt</li><li>Composant CMS intégré ou non</li><li>Circuit chauffant</li></ul>",
  related: othersThan("clavier-membrane")
});

productPage({
  id: "clavier-plat",
  group: "Industrie",
  name: "Clavier plat",
  kicker: "Clavier à membrane",
  title: "Le clavier plat",
  lead: "Aussi appelé clavier Lexan. Idéal pour de nombreuses applications techniques, il s’adapte à tous les supports.",
  crumb: keyboardCrumb("Plat"),
  what: "<p>Assemblage de feuilles de polyester ou de polycarbonate et d’adhésif : une face supérieure appelée décor ou façade, des circuits souples, des entretoises entre les couches et une limande de connexion.</p>",
  why: "<p>Le contact se fait par une légère pression. Le clavier est souple, étanche, réalisé sur mesure, et certaines fonctions peuvent recevoir une étiquette interchangeable.</p>",
  related: othersThan("clavier-plat")
});

productPage({
  id: "clavier-coupelles",
  group: "Industrie",
  name: "Clavier à coupelles",
  kicker: "Clavier à membrane",
  title: "Le clavier à coupelles",
  lead: "Le clic qui simplifie la vie. Le best-seller de PIM, avec plus d’un million de coupelles posées par an.",
  crumb: keyboardCrumb("Coupelles"),
  what: "<p>Des coupelles métalliques de différentes duretés d’enfoncement donnent une sensation tactile nette et identique sur chaque touche. Elles s’ajoutent à tous les types de clavier, souvent avec un gaufrage.</p>",
  why: "<p>Le clic confirme le contact et le relief guide le doigt. Le clavier reste souple, étanche et sur mesure. PIM garantit un million d’actionnements.</p>",
  related: othersThan("clavier-coupelles")
});

productPage({
  id: "clavier-gaufre",
  group: "Industrie",
  name: "Clavier gaufré",
  kicker: "Clavier à membrane",
  title: "Le clavier gaufré",
  lead: "La praticité du clavier plat, le volume en plus.",
  crumb: keyboardCrumb("Gaufré"),
  what: "<p>Les touches ou d’autres éléments de façade sont formés par une presse, à chaud ou à froid selon le matériau. Toutes les formes de gaufrage sont possibles. Une coupelle peut ajouter la sensation tactile.</p>",
  why: "<p>Le relief facilite l’usage et renforce l’aspect. Le clavier reste souple, étanche et réalisé sur mesure.</p>",
  related: othersThan("clavier-gaufre")
});

productPage({
  id: "clavier-retro",
  group: "Industrie",
  name: "Clavier rétroéclairé",
  kicker: "Clavier à membrane",
  title: "Le clavier rétroéclairé",
  lead: "Illuminez votre produit et facilitez son utilisation.",
  crumb: keyboardCrumb("Rétroéclairé"),
  what: "<p>Clavier à membrane éclairé par l’arrière grâce à une LED de puissance. Une coupelle spéciale, perforée, peut homogénéiser la lumière.</p>",
  why: "<p>La lumière guide l’utilisateur à travers les fenêtres et les afficheurs découpés dans le support. Utile dans un environnement sombre, c’est aussi un atout de design.</p>",
  related: othersThan("clavier-retro")
});

productPage({
  id: "clavier-electro",
  group: "Industrie",
  name: "Clavier électroluminescent",
  kicker: "Clavier à membrane",
  title: "Le clavier électroluminescent",
  lead: "Une lampe électroluminescente et une face graphique imprimée, le décor.",
  crumb: keyboardCrumb("Électroluminescent"),
  what: "<p>Le phosphore est appliqué sur une couche diélectrique, entre deux couches conductrices, le tout sérigraphié sur un film souple. Un courant de faible intensité produit une lumière froide et uniforme, sur surface plane ou courbe.</p>",
  why: "<p>Un éclairage économique, souple et fin, sans limite de forme ni de couleur. La lampe est développée et fabriquée par PIM, puis intégrée au clavier.</p>",
  related: othersThan("clavier-electro")
});

productPage({
  id: "clavier-7s",
  group: "Industrie",
  name: "Afficheur 7 segments",
  kicker: "Clavier à membrane",
  title: "Le clavier à afficheur 7 segments",
  lead: "Sept segments, chacun relié à une LED, pour former chiffres, lettres et caractères simples.",
  crumb: keyboardCrumb("Afficheur 7 segments"),
  what: "<p>La technologie des radios-réveils, montres, calculatrices et micro-ondes, intégrée à tous les claviers à membrane PIM. Sans contrainte de taille, de forme ou de couleur, dans moins de 2 mm d’épaisseur.</p>",
  why: "<p>Un affichage pratique, clair et fiable, directement dans l’interface.</p>",
  related: othersThan("clavier-7s")
});

productPage({
  id: "clavier-capacitif",
  group: "Industrie",
  name: "Clavier capacitif",
  kicker: "Clavier à membrane",
  title: "Le clavier capacitif",
  lead: "Une interface à zones sensibles, à ne pas confondre avec l’écran tactile capacitif.",
  crumb: keyboardCrumb("Capacitif"),
  what: "<p>Pas de touches mécaniques : des zones définies à l’avance réagissent au faible courant du doigt. La face décor, non conductrice, est en verre, polyester ou polycarbonate sérigraphié. Derrière, un circuit souple porte les électrodes.</p>",
  why: "<p>Aucune usure mécanique des touches. PIM recommande une façade en verre trempé de 3,0 mm ou plus. Le rétroéclairage peut s’ajouter, un beeper confirme l’action, et le temps de réponse comme la pression d’activation se règlent selon l’environnement.</p>",
  related: othersThan("clavier-capacitif")
});

productPage({
  id: "clavier-elastomere",
  group: "Industrie",
  name: "Clavier élastomère",
  kicker: "Clavier à membrane",
  title: "Le clavier élastomère",
  lead: "Une membrane en silicone, aussi appelée clavier en silicone.",
  crumb: keyboardCrumb("Élastomère"),
  what: "<p>Une nappe de silicone est déposée sur une feuille de Lexan imprimée, avec une limande de connexion. Toutes couleurs et formes de touches, reliefs et creux possibles, couleur dans la masse ou surmoulée, textes en sérigraphie ou gravure laser.</p>",
  why: "<p>Des interfaces robustes et isolantes, y compris là où l’esthétique compte. La membrane silicone est extrêmement résistante.</p>",
  related: othersThan("clavier-elastomere")
});

productPage({
  id: "clavier-etanche",
  group: "Industrie",
  name: "Clavier étanche",
  kicker: "Industrie",
  title: "Le clavier étanche",
  lead: "Tous nos claviers sont étanches, grâce à des procédés certifiés IP65.",
  crumb: [["Accueil", "accueil"], ["Industrie", "technologies"], ["Clavier étanche"]],
  what: "<p>L’indice IP sert à choisir le matériel selon les conditions d’usage et l’environnement. Les claviers PIM sont construits sur mesure pour répondre aux normes demandées.</p>",
  why: "<p>IP65 : hermétiques à la poussière et protégés contre les jets d’eau venant de toutes les directions. Pour l’industrie, le médical, la logistique et le transport.</p>",
  related: othersThan("clavier-etanche")
});

productPage({
  id: "circuit-flexible",
  group: "Industrie",
  name: "Circuit flexible",
  kicker: "Industrie",
  title: "Le circuit flexible",
  lead: "Un circuit imprimé souple, pour le chauffage, les batteries, les résistances ou les capteurs.",
  crumb: [["Accueil", "accueil"], ["Industrie", "technologies"], ["Circuit flexible"]],
  what: "<p>Une piste en encre argent est imprimée sur un film polyester ou polycarbonate. Le circuit souple reçoit un contact touche et se raccorde par une limande. Il remplace la carte imprimée rigide.</p>",
  why: "<p>Batteries, circuits chauffants, capteurs souples : partout où un circuit doit épouser une forme ou rester léger.</p>",
  related: [["Clavier à membrane", "clavier-membrane"], ["Clavier capacitif", "clavier-capacitif"], ["Face avant plastique", "face-avant-plastique"], ["Signalétique lumineuse", "signaletique"]]
});

productPage({
  id: "face-avant-plastique",
  group: "Industrie",
  name: "Face avant plastique",
  kicker: "Industrie",
  title: "La face avant plastique",
  lead: "La face avant joue le rôle de décor, en étiquette ou en façade du produit.",
  crumb: [["Accueil", "accueil"], ["Industrie", "technologies"], ["Face avant plastique"]],
  what: "<p>Un décor souple sérigraphié sur polyester ou polycarbonate, adhésif à l’arrière, applicable sur tout support. Toutes couleurs et formes, à partir de 150 µm d’épaisseur. Reliefs possibles : cloquage, guide-doigt, fenêtres.</p>",
  why: "<p>Esthétique, information et protection du support, avec souplesse, robustesse et facilité d’intégration.</p>",
  related: [["Étiquette plastique", "etiquette-plastique"], ["Clavier plat", "clavier-plat"], ["Façade et insert métallique", "facade-metallique"]]
});

productPage({
  id: "facade-metallique",
  group: "Industrie",
  name: "Façade et insert métallique",
  kicker: "Industrie",
  title: "La façade et l’insert métallique",
  lead: "Plaque constructeur, plaque d’identification ou de conformité.",
  crumb: [["Accueil", "accueil"], ["Industrie", "technologies"], ["Façade et insert métallique"]],
  what: "<p>Une étiquette imprimée, fixée par adhésif ou par perforation, en aluminium, acier inox ou laiton. Couleur, forme et épaisseur sur mesure, embossage jusqu’à 1 mm.</p>",
  why: "<p>Identifier un produit, une machine, un équipement ou une marque, ou porter une information obligatoire : plaque constructeur, plaque d’outillage, plaque de tare, plaque de conformité électrique, plaque CE.</p>",
  related: [["Face avant plastique", "face-avant-plastique"], ["Gravure", "process-gravure"], ["Étiquette métal vins", "etiquette-vins"]]
});
