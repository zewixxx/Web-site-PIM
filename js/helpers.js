window.PAGES = [];

function addPage(page) {
  window.PAGES.push(page);
}

function crumb(parts) {
  const html = parts.map((part, index) => {
    if (index === parts.length - 1) return part[0];
    return '<a href="#' + part[1] + '">' + part[0] + "</a>";
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

function productPage(data) {
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
      photos(IMAGES[data.id]),
      '<div class="split">',
      "<section><h2>Qu’est-ce que c’est ?</h2>" + data.what + "</section>",
      "<section><h2>Pour quoi faire ?</h2>" + data.why + "</section>",
      "</div>",
      data.extra || "",
      data.related ? "<h2>Dans la même gamme</h2>" + chips(data.related) : "",
      "</div>"
    ].join("")
  });
}
