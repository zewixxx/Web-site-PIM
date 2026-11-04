addPage({
  id: "decoration",
  group: "Décoration",
  name: "Luxe & PLV",
  html: [
    '<div class="wrap page">',
    crumb([["Accueil", "accueil"], ["Luxe & PLV"]]),
    '<p class="kicker">Luxe &amp; PLV</p>',
    "<h1>La pièce qui porte la marque.</h1>",
    '<p class="lead">Derrière l’étiquette, le même atelier que pour la machine. Marckolsheim, depuis 1961.</p>',
    '<div class="text-photo">',
    "<div>",
    "<h2>L’histoire derrière.</h2>",
    "<p>PIM naît en 1961 dans la découpe et la déformation du métal. La sérigraphie arrive en 1972. En 2010, l’encre miroir donne aux étiquettes le reflet que demandent les maisons du vin et du parfum.</p>",
    "<p>Aujourd’hui, les 4 500 m² tiennent les deux : le clavier qui fait parler la machine, et la pièce qui habille la bouteille, le flacon ou le lieu de vente. Étiquette métal, dômage, PLV, présentoir. Chaque pièce est contrôlée avant de partir.</p>",
    "</div>",
    '<img src="medias/images/etiquette_metal_courvoisier.jpg" alt="Étiquette métal fabriquée pour une maison de spiritueux">',
    "</div>",
    "<h2>Le parcours.</h2>",
    '<ol class="tl2">',
    "<li><b>1961</b><span>Création à Marckolsheim : découpe et déformation du métal, sous le nom Plaquettes Industrielles.</span></li>",
    "<li><b>1972</b><span>Début de la sérigraphie sur polyester. Le décor peut enfin se poser sur un film, puis sur le métal.</span></li>",
    "<li><b>2010</b><span>Arrivée de l’encre miroir. Les étiquettes prennent le reflet des flacons et des coffrets.</span></li>",
    "<li><b>Aujourd’hui</b><span>Étiquettes, dômage, PLV et présentoirs sortent du même atelier que les interfaces industrielles. ISO 9001, 100 % des pièces contrôlées.</span></li>",
    "</ol>",
    '<p class="lux-cta"><a class="btn" href="references.html#luxe">Voir les produits</a></p>',
    "</div>"
  ].join("")
});

function labelCrumb(name) {
  return [["Accueil", "accueil"], ["Luxe & PLV", "decoration"], [name]];
}

productPage({
  id: "etiquette-3d",
  group: "Décoration",
  name: "Étiquette 3D",
  kicker: "Étiquette",
  title: "Le dômage résine",
  lead: "Aussi appelé adhésif en relief, étiquette 3D ou étiquette dômée.",
  crumb: labelCrumb("Étiquette 3D"),
  what: "<p>Une résine transparente est déposée sur une étiquette imprimée, adhésive ou non. En séchant, elle prend la forme d’un dôme. On parle aussi de doming ou de bossing.</p>",
  why: "<p>Pour les logos et signatures de marque : brillance et volume, avec une résistance aux chocs, aux intempéries et aux rayures, en intérieur comme en extérieur.</p>",
  related: [["Étiquette plastique", "etiquette-plastique"], ["Vins et spiritueux", "etiquette-vins"], ["PLV", "plv"]]
});

productPage({
  id: "etiquette-vins",
  group: "Décoration",
  name: "Vins et spiritueux",
  kicker: "Étiquette métal",
  title: "L’étiquette métal pour vins et spiritueux",
  lead: "Médaille ou insert métal, pour mettre un produit en valeur.",
  crumb: labelCrumb("Vins et spiritueux"),
  what: "<p>Une surface adhésivée ou non, imprimée et découpée. Découpe laser et sérigraphie, encres couleur et miroir, sur un métal souple ou rigide.</p>",
  why: "<p>Habiller une bouteille de champagne, de cognac ou de spiritueux : étiquette alu champagne, étiquette alu cognac, médaillon.</p>",
  related: [["Cosmétiques et parfums", "etiquette-cosmetiques"], ["Étiquette 3D", "etiquette-3d"], ["Façade et insert métallique", "facade-metallique"]]
});

productPage({
  id: "etiquette-cosmetiques",
  group: "Décoration",
  name: "Cosmétiques et parfums",
  kicker: "Étiquette métal",
  title: "L’insert pour parfums et cosmétiques",
  lead: "Une surface adhésivée ou non, créée pour mettre un produit en valeur.",
  crumb: labelCrumb("Cosmétiques et parfums"),
  what: "<p>Une étiquette imprimée et découpée. Découpe laser, sérigraphie en encres couleur et miroir, sur un métal souple ou rigide.</p>",
  why: "<p>Flacons de parfum, coffrets et produits cosmétiques, mais aussi spiritueux.</p>",
  related: [["Vins et spiritueux", "etiquette-vins"], ["Étiquette 3D", "etiquette-3d"], ["Présentoir plexiglas", "presentoir"]]
});

productPage({
  id: "etiquette-plastique",
  group: "Décoration",
  name: "Étiquette plastique",
  kicker: "Étiquette",
  title: "L’étiquette plastique",
  lead: "Façades et étiquettes plastique sur mesure, pour la visibilité des produits.",
  crumb: labelCrumb("Étiquette plastique"),
  what: "<p>Aussi appelée top, sticker ou face avant plastique : une surface adhésive ou non, imprimée et découpée. Découpe laser et sérigraphie.</p>",
  why: "<p>Un support de communication en teintes Pantone ou RAL, avec encres miroir, de l’unité à la grande série. La résistance dépend de la matière et du traitement.</p>",
  related: [["Face avant plastique", "face-avant-plastique"], ["Étiquette 3D", "etiquette-3d"]]
});

productPage({
  id: "plv",
  group: "Décoration",
  name: "PLV",
  kicker: "Signalétique luxe",
  title: "La publicité sur le lieu de vente",
  lead: "La signalétique luxe met en scène les produits et crée un environnement qui les révèle.",
  crumb: [["Accueil", "accueil"], ["Luxe & PLV", "decoration"], ["PLV"]],
  what: "<p>Présentoirs, chevalets, fourreaux, éléments de packaging ou de communication. Marquage par gravure chimique, mécanique ou laser, et par sérigraphie, sur aluminium, plexiglas ou plastique, en encres classiques, mates ou miroir.</p>",
  why: "<p>Ajouter du prestige à l’image de marque, en s’adaptant au produit comme au lieu de présentation.</p>",
  related: [["Signalétique lumineuse", "signaletique"], ["Présentoir plexiglas", "presentoir"], ["Vins et spiritueux", "etiquette-vins"]]
});

productPage({
  id: "signaletique",
  group: "Décoration",
  name: "Signalétique lumineuse",
  kicker: "Signalétique luxe",
  title: "La PLV lumineuse",
  lead: "Le mariage de la lumière et de la signalétique révèle les produits.",
  crumb: [["Accueil", "accueil"], ["Luxe & PLV", "decoration"], ["Signalétique lumineuse"]],
  what: "<p>Un circuit souple lumineux est inséré dans un coffret ou un présentoir. LED de toutes les couleurs et de différentes intensités. Matières, polices et tailles de lettres personnalisables.</p>",
  why: "<p>Attirer l’œil, valoriser la marque et habiller le produit : la lumière s’échappe du coffret.</p>",
  related: [["PLV", "plv"], ["Présentoir plexiglas", "presentoir"], ["Circuit flexible", "circuit-flexible"]]
});

productPage({
  id: "presentoir",
  group: "Décoration",
  name: "Présentoir plexiglas",
  kicker: "Signalétique luxe",
  title: "Le présentoir en plexiglas",
  lead: "Plexiglas, Altuglas, méthacrylate, PMMA, verre acrylique : un même matériau.",
  crumb: [["Accueil", "accueil"], ["Luxe & PLV", "decoration"], ["Présentoir plexiglas"]],
  what: "<p>Découpe laser, gravure et sérigraphie sur plexiglas.</p>",
  why: "<p>Attirer le regard et révéler le produit sans lui voler la vedette, grâce à la limpidité et à la transparence du matériau.</p>",
  related: [["PLV", "plv"], ["Signalétique lumineuse", "signaletique"]]
});
