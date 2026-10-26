window.PAGES = [];

// Deux mondes : « industrie » (par défaut) et « luxe » (Décoration + domaine Luxe)
function isLuxePage(page) {
  return page.group === "Décoration" || page.id === "secteur-luxe";
}

function addPage(page) {
  window.PAGES.push(page);
}

// Valeur chiffrée que PIM doit encore fournir (affichée en ambre dans la maquette)
const TBC = '<span class="tbc">À chiffrer</span>';

// Délai de réponse annoncé aux demandes de devis. Valeur proposée : à valider par la direction.
const REPLY_DELAY = "2 jours ouvrés";

// Noms des deux portes d’entrée (compte rendu du 22 octobre 2026)
const WORLD_LABEL = { "Industrie": "Interfaces industrielles", "Décoration": "Luxe & PLV" };

function crumb(parts) {
  const html = parts.map((part, index) => {
    const label = WORLD_LABEL[part[0]] || part[0];
    if (index === parts.length - 1 || !part[1]) return label;
    return '<a href="#' + part[1] + '">' + label + "</a>";
  }).join(" / ");
  return '<p class="crumbs">' + html + "</p>";
}

function chips(links) {
  return '<div class="chips">' + links.map((link) => {
    return '<a class="chip" href="#' + link[1] + '">' + link[0] + "</a>";
  }).join("") + "</div>";
}

function photos(files) {
  if (!files || !files.length) return "";
  return '<div class="gallery">' + files.map((file) => {
    return '<img src="medias/images/' + file + '" alt="">';
  }).join("") + "</div>";
}

const CLIENTS_INDUSTRIE = [
  ["logo_bosch.jpg", "Bosch"],
  ["maxresdefault.jpg", "Siemens"],
  ["brand.gif", "Honeywell"],
  ["brand_1.gif", "Gaggenau"],
  ["logo_168365.gif", "Mettler Toledo"],
  ["saia_burgess.jpg", "Saia-Burgess"],
  ["meiko_logosvg.jpg", "Meiko"],
  ["stago.jpg", "Stago"],
  ["logo_rafi.jpg", "Rafi"],
  ["drinkotec.jpg", "Drinkotec"]
];

const CLIENTS_DECORATION = [
  ["9f6aae72ff064c4dffbc7fc35e9edfb1.jpg", "Chanel"],
  ["guerlain.jpg", "Guerlain"],
  ["hennessy_logo.png", "Hennessy"],
  ["logo_moet_et_chandon.jpg", "Moët & Chandon"],
  ["remy_cointreau.jpg", "Rémy Cointreau"],
  ["thierry_mugler.jpg", "Thierry Mugler"],
  ["logo_devaux.jpg", "Devaux"],
  ["logo_controle_age2.jpg", "Père Magloire"],
  ["logo_boulard.jpg", "Calvados Boulard"],
  ["salomon_001_900.jpg", "Salomon"]
];

function logos(clients) {
  if (!clients || !clients.length) return "";
  return '<div class="logo-row">' + clients.map((client) => {
    return '<img src="medias/images/' + client[0] + '" alt="' + client[1] + '" title="' + client[1] + '">';
  }).join("") + "</div>";
}

const IMAGES = {
  "clavier-membrane": ["fonddroite_membrane.jpg", "dsc_05033.jpg", "dsc_0506.jpg", "dsc_05343.jpg", "dsc_0560.jpg", "industrie_claviers_bulle1.jpg"],
  "clavier-retro": ["dsc_0515.jpg"],
  "clavier-coupelles": ["industrie_claviers_coupelles.jpg", "domes.jpg"],
  "clavier-gaufre": ["industrie_claviers_domage.jpg"],
  "clavier-electro": ["mg_48542.jpg"],
  "clavier-7s": ["7s.jpg"],
  "clavier-capacitif": ["dsc_0520.jpg"],
  "clavier-plat": ["clavier_plat_relegendable.jpg"],
  "clavier-elastomere": ["dsc_0534.jpg"],
  "clavier-etanche": ["drops.jpg", "tabip.jpg"],
  "circuit-flexible": ["circuit_souples.jpg", "circuit_souples3.jpg", "printed_electronics.jpg", "3dprintinglighting_printed_electronics.jpg", "_MG_3984.jpg", "images.jpg"],
  "face-avant-plastique": ["dsc_0628.jpg", "dsc_0633.jpg", "facade_plastique_habillage_boitier_geolocalisation3.jpg", "fapi.jpg"],
  "facade-metallique": ["dsc_0549.jpg", "dsc_0527.jpg", "dsc_0529.jpg", "dsc_05473.jpg", "dsc_0550.jpg", "dsc_0552.jpg", "dsc_0553.jpg", "identification_boite_de_vitesse_copie2.jpg"],
  "etiquette-3d": ["dome_resine_01.jpg", "dome_resine_02.jpg", "domes.jpg", "impression_doming.jpg"],
  "etiquette-vins": ["bouteille_cognac.jpg", "etiquette_metal_courvoisier.jpg", "180_ans_de_creations_guerlain2.jpg", "fond_top_plv_lumineuse.jpg"],
  "etiquette-cosmetiques": ["bg_guerlain_tonkaimperiale.jpg", "_mg_4912.jpg", "image6.png", "image12.png", "image16.png"],
  "etiquette-plastique": ["insert_plastique3.jpg", "decoration_plv_texte_5.jpg", "sans_titre.png"],
  "plv": ["bandeau_decoration_plv.jpg", "decoration_plv_texte_1.jpg", "plv_boucheron3.jpg", "plv_presentoir_goldkenn1.jpg", "dsc_0522.jpg", "dsc_0523.jpg", "dsc_05263.jpg", "dsc_0540.jpg", "dsc_0543.jpg"],
  "signaletique": ["plv_led_bouteille_marie2.jpg", "fond_top_plv_lumineuse.jpg"],
  "presentoir": ["plv_presentoir.jpg", "fond_top_plv_lumineuse.jpg"],
  "process-gravure": ["gravure_mecanique_de_plaques_metalliques_product_slide.jpg", "thumb_marquage_metal.jpg"],
  "process-decoupe": ["fond_decoupe_laser6.jpg", "cnc_press.jpg"]
};

/* ------------------------------------------------------------------
   Spécifications (une ligne = [libellé, valeur]).
   Seuls des faits déjà publiés sur le site PIM sont repris.
   Quantité minimale et délai : TBC = à chiffrer par PIM.
------------------------------------------------------------------ */
const SPEC_END_INDUSTRIE = [
  ["Séries", "De la petite à la grande série"],
  ["Quantité minimale", TBC],
  ["Délai de prototype", TBC]
];
const SPEC_END_LUXE = [
  ["Séries", "De la petite à la grande série"],
  ["Quantité minimale", TBC],
  ["Délai avant lancement", TBC]
];

const SPECS = {
  "clavier-membrane": [
    ["Matériaux", "Lexan® (polycarbonate) ou polyester, adhésif, circuits souples"],
    ["Épaisseur", "À partir de 0,5 mm"],
    ["Étanchéité", "IP65 par défaut"],
    ["Connexion", "Limande souple vers l’équipement"],
    ["Options", "LED, micro-switch, blindage électromagnétique ou électrostatique, guide-doigt, composants CMS, circuit chauffant"]
  ],
  "clavier-plat": [
    ["Matériaux", "Polyester ou polycarbonate (Lexan®), adhésif"],
    ["Épaisseur", "Famille membrane : à partir de 0,5 mm"],
    ["Étanchéité", "IP65 par défaut"],
    ["Options", "Étiquette interchangeable pour certaines fonctions"]
  ],
  "clavier-coupelles": [
    ["Sensation", "Clic net, coupelles métalliques en plusieurs duretés d’enfoncement"],
    ["Durée de vie", "1 million d’actionnements garantis"],
    ["Fabrication", "Pose robotisée : plus d’un million de coupelles par an"],
    ["Étanchéité", "IP65 par défaut"],
    ["Associations", "Compatible avec tous les types de claviers PIM, souvent associé au gaufrage"]
  ],
  "clavier-gaufre": [
    ["Relief", "Toutes formes de gaufrage, à chaud ou à froid selon le matériau"],
    ["Sensation", "Clic possible avec une couche à coupelle"],
    ["Base", "Dérivé du clavier plat"],
    ["Étanchéité", "IP65 par défaut"]
  ],
  "clavier-retro": [
    ["Éclairage", "LED de puissance intégrée"],
    ["Diffusion", "Coupelle perforée en option pour homogénéiser la lumière"],
    ["Fenêtres", "Lumière par des fenêtres ou afficheurs découpés dans le support"],
    ["Étanchéité", "IP65 par défaut"]
  ],
  "clavier-electro": [
    ["Technologie", "Lampe électroluminescente sérigraphiée sur film polyester (Lexan®)"],
    ["Fabrication", "Lampe développée et fabriquée par PIM"],
    ["Lumière", "Froide et uniforme, sur surface plane ou courbe"],
    ["Consommation", "Faible"],
    ["Étanchéité", "IP65 par défaut"]
  ],
  "clavier-7s": [
    ["Affichage", "7 segments, chacun relié à une LED : chiffres, lettres et caractères simples"],
    ["Épaisseur", "Moins de 2 mm"],
    ["Personnalisation", "Taille, forme et couleur sans contrainte"],
    ["Étanchéité", "IP65 par défaut"]
  ],
  "clavier-capacitif": [
    ["Principe", "Zones tactiles prédéfinies, sans touche mécanique"],
    ["Façade", "Non conductrice : verre, polyester ou polycarbonate"],
    ["Recommandation", "Verre trempé de 3,0 mm ou plus pour un usage intensif"],
    ["Retour utilisateur", "Beeper conseillé pour confirmer l’activation"],
    ["Réglages", "Temps de réponse et sensibilité paramétrés selon l’environnement"],
    ["Éclairage", "Rétroéclairage possible"]
  ],
  "clavier-elastomere": [
    ["Matériaux", "Nappe de silicone sur feuille de Lexan® imprimée"],
    ["Couleur", "Teinte dans la masse ou surmoulée"],
    ["Marquage", "Sérigraphie ou gravure laser"],
    ["Formes", "Reliefs et creux sur mesure"],
    ["Étanchéité", "IP65 par défaut"]
  ],
  "clavier-etanche": [
    ["Indice", "IP65 : hermétique à la poussière, protégé des jets d’eau de toutes directions"],
    ["Portée", "Tous les claviers à membrane PIM"],
    ["Secteurs", "Industriel, médical, logistique, transport, nautique"]
  ],
  "circuit-flexible": [
    ["Matériaux", "Piste en encre argent sur film polyester ou polycarbonate"],
    ["Connexion", "Limande"],
    ["Usages", "Batterie, circuit chauffant, capteur souple"],
    ["Composants", "Report automatisé de composants CMS et de LED"]
  ],
  "face-avant-plastique": [
    ["Matériaux", "Polyester ou polycarbonate sérigraphié"],
    ["Épaisseur", "À partir de 150 µm"],
    ["Fixation", "Adhésif à l’arrière"],
    ["Options", "Reliefs (cloquage, guide-doigt) et fenêtres"]
  ],
  "facade-metallique": [
    ["Matériaux", "Aluminium, acier inox ou laiton, avec diverses finitions"],
    ["Embossage", "Jusqu’à 1 mm"],
    ["Fixation", "Adhésif arrière ou perforation"],
    ["Usages", "Plaque constructeur, d’identification, de conformité, de tare, de certification (type CE)"]
  ],
  "etiquette-3d": [
    ["Matière", "Résine transparente déposée sur une étiquette imprimée"],
    ["Tenue", "Chocs, intempéries, rayures : intérieur comme extérieur"],
    ["Aspect", "Brillance et volume"],
    ["Support", "Étiquette adhésive ou non"]
  ],
  "etiquette-vins": [
    ["Matière", "Métal souple ou rigide"],
    ["Procédés", "Découpe laser, sérigraphie"],
    ["Encres", "Couleur et miroir"],
    ["Formats", "Étiquette alu champagne, étiquette alu cognac, médaillon"]
  ],
  "etiquette-cosmetiques": [
    ["Matière", "Métal souple ou rigide"],
    ["Procédés", "Découpe laser, sérigraphie"],
    ["Encres", "Couleur et miroir"],
    ["Supports", "Flacons de parfum, coffrets, produits cosmétiques"]
  ],
  "etiquette-plastique": [
    ["Procédés", "Découpe laser, sérigraphie"],
    ["Teintes", "Pantone ou RAL, encres miroir"],
    ["Séries", "De l’unité à la grande série"],
    ["Support", "Surface adhésive ou non"]
  ],
  "plv": [
    ["Marquage", "Gravure chimique, mécanique ou laser ; sérigraphie"],
    ["Supports", "Aluminium, plexiglas, plastique"],
    ["Encres", "Classiques, mates ou miroir"],
    ["Formes", "Présentoirs, chevalets, fourreaux, éléments de packaging"]
  ],
  "signaletique": [
    ["Technologie", "Circuit souple lumineux inséré dans un coffret ou un présentoir"],
    ["LED", "Toutes couleurs, différentes intensités"],
    ["Lettrage", "Matières, polices et tailles personnalisables"]
  ],
  "presentoir": [
    ["Matière", "Plexiglas (PMMA, Altuglas, verre acrylique)"],
    ["Procédés", "Découpe laser, gravure, sérigraphie"],
    ["Atout", "Limpidité et transparence du matériau"]
  ]
};

function specBlock(id, luxe) {
  const rows = SPECS[id];
  if (!rows) return "";
  const all = rows.concat(luxe ? SPEC_END_LUXE : SPEC_END_INDUSTRIE);
  return [
    '<aside class="specs">',
    '<div class="specs-main"><h2>' + (luxe ? "Finitions et réalisation" : "Spécifications") + "</h2><dl>",
    all.map((row) => '<div class="spec-row"><dt>' + row[0] + "</dt><dd>" + row[1] + "</dd></div>").join(""),
    "</dl></div>",
    '<div class="specs-side">',
    "<h3>" + (luxe ? "Pour votre lancement" : "Pour votre étude") + "</h3>",
    "<p>" + (luxe
      ? "Finitions, quantités et délai avant lancement : décrivez-nous votre projet."
      : "Matériaux, options, séries et délai de prototype : décrivez-nous votre besoin.") + "</p>",
    '<a class="cta" href="#demande">Demander un devis</a>',
    '<button type="button" class="cta line">Télécharger la fiche PDF</button>',
    "</div></aside>"
  ].join("");
}

/* Tableau comparatif des 8 types de claviers à membrane */
const KEYBOARD_ROWS = [
  ["Plat", "clavier-plat", "Contact par légère pression", "LED possible en option", "Fin et résistant ; étiquette interchangeable"],
  ["Coupelles", "clavier-coupelles", "Clic net, plusieurs duretés", "Associable à tous les types", "1 million d’actionnements garantis"],
  ["Gaufré", "clavier-gaufre", "Touches en relief ; clic possible avec coupelle", "Selon option", "Le doigt trouve la touche sans regarder"],
  ["Rétroéclairé", "clavier-retro", "Selon le clavier de base", "LED de puissance, lumière par fenêtres", "Lisible dans la pénombre"],
  ["Électroluminescent", "clavier-electro", "Selon le clavier de base", "Lampe imprimée, lumière froide et uniforme", "Surface plane ou courbe, faible consommation"],
  ["Afficheur 7 segments", "clavier-7s", "Selon le clavier de base", "Chiffres et lettres par LED", "Moins de 2 mm d’épaisseur"],
  ["Capacitif", "clavier-capacitif", "Aucune touche mécanique (beeper conseillé)", "Rétroéclairage possible", "Pas d’usure mécanique ; verre trempé ≥ 3,0 mm conseillé"],
  ["Élastomère", "clavier-elastomere", "Relief et creux dans le silicone", "Selon option", "Très robuste, isolant, personnalisable"]
];

function keyboardTable() {
  return [
    '<h2 class="compare-title">Comparer les 8 types de claviers à membrane</h2>',
    '<div class="table-wrap"><table class="compare">',
    "<thead><tr><th>Type</th><th>Sensation</th><th>Lumière / affichage</th><th>Atout principal</th></tr></thead><tbody>",
    KEYBOARD_ROWS.map((row) => {
      return '<tr><th scope="row"><a href="#' + row[1] + '">' + row[0] + "</a></th><td>" + row[2] + "</td><td>" + row[3] + "</td><td>" + row[4] + "</td></tr>";
    }).join(""),
    "</tbody></table></div>",
    '<p class="note">Tous les claviers à membrane PIM sont annoncés IP65. Pas sûr du type à choisir ? <a href="#guide-clavier-membrane">Lire le guide « Choisir son clavier à membrane »</a>.</p>'
  ].join("");
}

/* Extrait du parc machines (déjà publié dans « Nos process ») */
function parcExtract() {
  return [
    '<div class="parc">',
    '<div class="parc-item"><b>2</b><span>lignes de sérigraphie en continu</span></div>',
    '<div class="parc-item"><b>4</b><span>tables feuille à feuille, métal et plastique</span></div>',
    '<div class="parc-item"><b>Pantone · RAL · NCS</b><span>teintes analysées par spectrométrie</span></div>',
    '<div class="parc-item"><b>± 0,3 mm</b><span>tolérance de la découpe laser</span></div>',
    "</div>"
  ].join("");
}

/* Bandeau de réassurance : certification, contrôle, parc machines, références */
function reassurance(luxe) {
  return [
    '<section class="proof' + (luxe ? " proof-luxe" : "") + '">',
    '<div class="proof-head">',
    "<h2>" + (luxe ? "Les artisans du beau, depuis plus de 60 ans" : "Qui l’a déjà fait ? Ils nous font confiance") + "</h2>",
    '<div class="proof-badges">',
    '<span class="badge"><b>ISO 9001</b> traçabilité, fiabilité, contrôles</span>',
    '<span class="badge"><b>100 %</b> des pièces contrôlées avant expédition</span>',
    '<span class="badge"><b>4 500 m²</b> d’atelier à Marckolsheim</span>',
    "</div></div>",
    logos(luxe ? CLIENTS_DECORATION : CLIENTS_INDUSTRIE),
    '<div class="proof-parc"><h3>Un atelier équipé pour tenir vos séries</h3>' + parcExtract() + '<a href="#process">Voir tout le parc machines</a></div>',
    "</section>"
  ].join("");
}

function productPage(data) {
  const luxe = data.group === "Décoration";
  addPage({
    id: data.id,
    group: data.group,
    name: data.name,
    html: [
      '<div class="wrap page">',
      crumb(data.crumb),
      '<p class="kicker">' + data.kicker + "</p>",
      "<h1>" + data.title + "</h1>",
      '<p class="lead">' + data.lead + "</p>",
      specBlock(data.id, luxe),
      photos(IMAGES[data.id]),
      '<div class="split">',
      "<section><h2>Qu’est-ce que c’est ?</h2>" + data.what + "</section>",
      "<section><h2>Pour quoi faire ?</h2>" + data.why + "</section>",
      "</div>",
      data.extra || "",
      data.id === "clavier-membrane" ? keyboardTable() : "",
      data.related ? "<h2>Dans la même gamme</h2>" + chips(data.related) : "",
      reassurance(luxe),
      "</div>"
    ].join("")
  });
}
