addPage({
  id: "decoration",
  group: "Décoration",
  name: "Luxe & PLV",
  html: [
    '<div class="wrap page">',
    crumb([["Accueil", "accueil"], ["Décoration"]]),
    '<p class="kicker">Luxe &amp; PLV</p>',
    "<h1>La touche déco qu’il vous faut</h1>",
    '<p class="lead">Dans l’industrie du luxe, la qualité du produit est primordiale, et PIM Industrie y porte une attention toute particulière. Les artisans du beau depuis plus de 60 ans.</p>',
    photos(["visuel_pim_parfum_web.jpg", "copie_de_coffret_led_roederer_low.jpg", "plv_boucheron_copie2.jpg", "plv_presentoir.jpg", "cosmet.jpg", "copie_de_p1010019.jpg"]),
    "<h2>Choisissez votre univers</h2>",
    '<div class="grid-3">',
    '<a class="card" href="#etiquette-vins"><img class="card-visual" src="medias/images/etiquette_metal_courvoisier.jpg" alt=""><h3>Vins et spiritueux</h3><p>Étiquettes et inserts métal pour cognac, champagne, spiritueux.</p></a>',
    '<a class="card" href="#etiquette-cosmetiques"><img class="card-visual" src="medias/images/bg_guerlain_tonkaimperiale.jpg" alt=""><h3>Parfums et cosmétiques</h3><p>Inserts métal et dômage résine pour flacons et coffrets.</p></a>',
    '<a class="card" href="#plv"><img class="card-visual" src="medias/images/plv_presentoir_goldkenn1.jpg" alt=""><h3>Points de vente</h3><p>PLV, signalétique lumineuse et présentoirs plexiglas.</p></a>',
    "</div>",
    '<h2 style="margin-top:36px">Ou par le produit</h2>',
    '<div class="grid-2">',
    '<a class="card" href="#etiquettes"><h3>Étiquette personnalisable</h3><p>Étiquettes métal, plastique ou dômées, pour embellir un produit.</p></a>',
    '<a class="card" href="#plv"><h3>Publicité sur le lieu de vente</h3><p>Présentoirs, chevalets et fourreaux.</p></a>',
    '<a class="card" href="#signaletique"><h3>Signalétique lumineuse</h3><p>La lumière intégrée au coffret ou au présentoir.</p></a>',
    '<a class="card" href="#presentoir"><h3>Présentoir en plexiglas</h3><p>Découpe, gravure et sérigraphie sur plexiglas.</p></a>',
    "</div>",
    reassurance(true),
    "</div>"
  ].join("")
});

addPage({
  id: "etiquettes",
  group: "Décoration",
  name: "Étiquettes",
  html: [
    '<div class="wrap page">',
    crumb([["Accueil", "accueil"], ["Décoration", "decoration"], ["Étiquettes"]]),
    '<p class="kicker">Étiquette personnalisable</p>',
    "<h1>Des étiquettes sur mesure</h1>",
    '<p class="lead">Métal, plastique ou résine : une décoration sur mesure pour embellir un produit. Les artisans du beau depuis plus de 60 ans.</p>',
    photos(["decoration_plv_texte_43.jpg", "domes3.jpg", "medaillon_napoleon3.jpg", "thumb_marquage_metal.jpg", "etiquette_metal_courvoisier.jpg", "dome_resine_01.jpg"]),
    '<div class="grid-2">',
    '<a class="card" href="#etiquette-vins"><h3>Vins et spiritueux</h3><p>Insert décoratif en métal sur mesure.</p></a>',
    '<a class="card" href="#etiquette-cosmetiques"><h3>Cosmétiques et parfums</h3><p>Décoration en métal pour valoriser un produit.</p></a>',
    '<a class="card" href="#etiquette-plastique"><h3>Étiquette plastique</h3><p>Parachèvement plastique d’un support ou d’un produit.</p></a>',
    '<a class="card" href="#etiquette-3d"><h3>Étiquette 3D</h3><p>Étiquettes avec dômage en résine.</p></a>',
    "</div>",
    reassurance(true),
    "</div>"
  ].join("")
});

function labelCrumb(name) {
  return [["Accueil", "accueil"], ["Décoration", "decoration"], ["Étiquettes", "etiquettes"], [name]];
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
  crumb: [["Accueil", "accueil"], ["Décoration", "decoration"], ["PLV"]],
  what: "<p>Présentoirs, chevalets, fourreaux, éléments de packaging ou de communication. Marquage par gravure chimique, mécanique ou laser, et par sérigraphie, sur aluminium, plexiglas ou plastique, en encres classiques, mates ou miroir.</p>",
  why: "<p>Ajouter du prestige à l’image de marque, en s’adaptant au produit comme au lieu de présentation.</p>",
  related: [["Signalétique lumineuse", "signaletique"], ["Présentoir plexiglas", "presentoir"], ["Étiquettes", "etiquettes"]]
});

productPage({
  id: "signaletique",
  group: "Décoration",
  name: "Signalétique lumineuse",
  kicker: "Signalétique luxe",
  title: "La PLV lumineuse",
  lead: "Le mariage de la lumière et de la signalétique révèle les produits.",
  crumb: [["Accueil", "accueil"], ["Décoration", "decoration"], ["Signalétique lumineuse"]],
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
  crumb: [["Accueil", "accueil"], ["Décoration", "decoration"], ["Présentoir plexiglas"]],
  what: "<p>Découpe laser, gravure et sérigraphie sur plexiglas.</p>",
  why: "<p>Attirer le regard et révéler le produit sans lui voler la vedette, grâce à la limpidité et à la transparence du matériau.</p>",
  related: [["PLV", "plv"], ["Signalétique lumineuse", "signaletique"]]
});
