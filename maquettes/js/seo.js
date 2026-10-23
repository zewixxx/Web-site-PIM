/* Carte « 1 requête principale = 1 page ».
   Titres d'environ 60 caractères : le besoin d'abord, la marque ensuite.
   Descriptions : 150 caractères environ, orientées besoin.
   Format : id de page -> [requête principale, titre sans la marque, description]. */

const SEO_BRAND = " | PIM Industrie";

const SEO = {
  accueil: ["fabricant clavier à membrane et PLV luxe", "Claviers à membrane et PLV luxe sur mesure", "Claviers à membrane, circuits souples, étiquettes métal et PLV sur mesure. Atelier de 4 500 m² à Marckolsheim, certifié ISO 9001, depuis 1961."],
  secteurs: ["domaines industriels", "Domaines : médical, aéronautique, automobile", "Huit domaines : médical, aéronautique, automobile, automatisation, machines, nautique, électronique, transports. Claviers, faces avant, plaques métal."],
  ressources: ["ressources", "Guides, études de cas et actualités", "Choisir un clavier à membrane, lire une étude de cas ou suivre l’actualité de l’atelier PIM Industrie."],
  "secteur-medical": ["clavier pour appareil médical", "Clavier étanche pour appareil médical", "Clavier à membrane étanche IP65 pour appareils médicaux, fabriqué sur mesure en Alsace. Chaque pièce est testée avant expédition."],
  "secteur-aeronautique": ["clavier aéronautique défense", "Clavier et plaque métal pour l’aéronautique", "Claviers rétroéclairés ou électroluminescents, façades et inserts métal pour l’aéronautique et la défense. Contrôle de 100 % des pièces."],
  "secteur-automobile": ["plaque d’identification automobile", "Plaques d’identification et faces avant auto", "Plaques métal d’identification, faces avant plastique, circuits souples et claviers sur mesure pour l’automobile. Fabrication en Alsace."],
  "secteur-automatisation": ["clavier pupitre automatisation", "Clavier de pupitre pour l’automatisation", "Claviers à membrane, à coupelles ou rétroéclairés, afficheurs 7 segments et faces avant sur mesure pour pupitres et machines automatisées."],
  "secteur-machines": ["plaque constructeur machine-outil", "Plaque constructeur et clavier machine-outil", "Plaques constructeur, d’outillage et de conformité, claviers élastomère ou IP65 pour machine-outils. Fabrication sur mesure en Alsace."],
  "secteur-nautique": ["clavier étanche nautique", "Clavier étanche IP65 pour le nautique", "Claviers à membrane IP65, hermétiques à la poussière et protégés des jets d’eau, pour les environnements humides du nautique."],
  "secteur-electronique": ["circuit souple électronique imprimée", "Circuit souple et électronique imprimée", "Circuits en encre argent sur film souple, électronique imprimée, report automatisé de composants CMS et de LED. Prototype et série."],
  "secteur-transports": ["clavier étanche transport", "Clavier étanche et plaque pour les transports", "Claviers étanches IP65 et plaques d’identification ou de conformité pour équipements de transport. Fabrication sur mesure en Alsace."],
  "secteur-luxe": ["étiquette métal luxe PLV", "Étiquette métal et PLV pour le luxe", "Étiquettes et inserts métal, dômage résine, PLV lumineuse et présentoirs plexiglas pour vins, spiritueux, parfums et cosmétiques."],
  "besoin-medical": ["clavier dispositif médical", "Clavier pour dispositif médical sur mesure", "Clavier étanche IP65, capacitif ou rétroéclairé pour dispositif médical. Chaque pièce testée, traçabilité ISO 9001, atelier en Alsace."],
  "besoin-aeronautique": ["clavier aéronautique", "Clavier pour l’aéronautique et la défense", "Clavier rétroéclairé ou électroluminescent et plaque métal pour environnements hostiles. Test de chaque pièce, ISO 9001, atelier en Alsace."],
  "besoin-electronique-imprimee": ["électronique imprimée", "Électronique imprimée sur film souple", "Circuits en encre argent pour batterie, chauffage ou capteur, imprimés sur polyester ou polycarbonate. Composants CMS et LED posés par robot."],
  "guide-clavier-membrane": ["choisir clavier à membrane", "Choisir son clavier à membrane : le guide", "Six questions pour choisir un clavier à membrane : environnement, sensation, éclairage, options, matériaux, série. Tableau comparatif des 8 types."],
  technologies: ["interface industrielle sur mesure", "Interfaces industrielles sur mesure, Alsace", "Claviers à membrane, circuits souples, faces avant et façades métal sur mesure. IP65, ISO 9001, contrôle de chaque pièce. Atelier à Marckolsheim."],
  "clavier-membrane": ["clavier à membrane sur mesure", "Clavier à membrane sur mesure, fabriqué en Alsace", "Clavier à membrane en Lexan ou polyester dès 0,5 mm, étanche IP65, avec LED, blindage ou CMS en option. Demandez un devis, atelier en Alsace."],
  "clavier-plat": ["clavier plat lexan", "Clavier plat (Lexan) étanche sur mesure", "Clavier plat à membrane, aussi appelé clavier Lexan : fin, étanche IP65, résistant. Réalisé sur mesure en Alsace. Demandez un devis."],
  "clavier-coupelles": ["clavier à coupelles", "Clavier à coupelles avec clic net, sur mesure", "Clavier à coupelles métalliques : clic net, 1 million d’actionnements garantis. Plus d’un million de coupelles posées par an par robot."],
  "clavier-gaufre": ["clavier gaufré", "Clavier gaufré à touches en relief", "Clavier gaufré : touches en relief pour guider le doigt, avec ou sans clic. Étanche IP65, réalisé sur mesure en Alsace."],
  "clavier-retro": ["clavier rétroéclairé", "Clavier à membrane rétroéclairé LED", "Clavier rétroéclairé par LED de puissance, lisible dans la pénombre. Étanche IP65, sur mesure, fabriqué en Alsace. Demandez un devis."],
  "clavier-electro": ["clavier électroluminescent", "Clavier électroluminescent à lumière uniforme", "Clavier à lampe électroluminescente développée par PIM : lumière froide et uniforme, plane ou courbe, faible consommation."],
  "clavier-7s": ["clavier afficheur 7 segments", "Clavier avec afficheur 7 segments intégré", "Clavier à membrane avec afficheur 7 segments intégré : chiffres et lettres par LED dans moins de 2 mm d’épaisseur. Sur mesure."],
  "clavier-capacitif": ["clavier capacitif", "Clavier capacitif à zones tactiles, sur mesure", "Clavier capacitif sans touche mécanique, façade en verre trempé de 3 mm recommandée. Sensibilité paramétrée, rétroéclairage possible."],
  "clavier-elastomere": ["clavier élastomère silicone", "Clavier élastomère en silicone sur mesure", "Clavier à membrane silicone robuste et isolant, couleurs, reliefs et marquage sur mesure. Sérigraphie ou gravure laser."],
  "clavier-etanche": ["clavier étanche IP65", "Clavier étanche IP65 sur mesure", "Tous nos claviers à membrane sont étanches IP65 : hermétiques à la poussière, protégés contre les jets d’eau. Fabriqués en Alsace."],
  "circuit-flexible": ["circuit imprimé souple", "Circuit imprimé souple en encre argent", "Circuit flexible imprimé sur polyester ou polycarbonate pour chauffage, batterie ou capteur. Raccord par limande, composants CMS en option."],
  "face-avant-plastique": ["face avant plastique", "Face avant plastique sérigraphiée dès 150 µm", "Face avant plastique sérigraphiée sur polyester ou polycarbonate, dès 150 µm, avec reliefs et fenêtres. Adhésif arrière, sur mesure."],
  "facade-metallique": ["plaque constructeur métal", "Plaque constructeur et insert métallique", "Plaques constructeur, d’identification et de conformité en aluminium, inox ou laiton. Embossage jusqu’à 1 mm, fixation adhésive ou perforée."],
  decoration: ["PLV luxe, étiquettes, présentoirs", "PLV, étiquettes et présentoirs pour le luxe", "Étiquettes métal et plastique, dômage résine, PLV, signalétique lumineuse et présentoirs plexiglas. Les artisans du beau depuis plus de 60 ans."],
  etiquettes: ["étiquette métal personnalisée", "Étiquettes métal, plastique et dômées", "Étiquettes sur mesure en métal, plastique ou résine pour embellir un produit : vins, spiritueux, parfums, cosmétiques. De l’unité à la série."],
  "etiquette-3d": ["étiquette 3D dômée", "Étiquette 3D dômée en résine", "Étiquette 3D avec dôme en résine transparente : brillance, volume et résistance aux chocs, rayures et intempéries. Intérieur et extérieur."],
  "etiquette-vins": ["étiquette métal cognac champagne", "Étiquette métal pour cognac et champagne", "Étiquette alu pour champagne ou cognac, médaillon et insert métal pour spiritueux. Découpe laser, encres miroir, sur mesure."],
  "etiquette-cosmetiques": ["insert métal parfum cosmétique", "Insert métal pour parfum et cosmétique", "Insert métal imprimé et découpé pour flacons de parfum, coffrets et produits cosmétiques. Découpe laser, sérigraphie, encres miroir."],
  "etiquette-plastique": ["étiquette plastique sur mesure", "Étiquette plastique de l’unité à la série", "Étiquette ou face avant plastique adhésive, imprimée et découpée au laser, en teintes Pantone ou RAL, de l’unité à la grande série."],
  plv: ["PLV luxe sur mesure", "PLV luxe sur mesure : présentoir, chevalet", "Présentoirs, chevalets, fourreaux et packaging en aluminium, plexiglas ou plastique. Gravure, sérigraphie, encres mates ou miroir."],
  signaletique: ["PLV lumineuse", "PLV lumineuse pour champagne et parfum", "Signalétique lumineuse : circuit souple et LED intégrés à un coffret ou un présentoir, lettrage personnalisable. Sur mesure."],
  presentoir: ["présentoir plexiglas", "Présentoir plexiglas découpé, gravé, imprimé", "Présentoir en plexiglas (PMMA, Altuglas) découpé au laser, gravé et sérigraphié sur mesure pour révéler vos produits."],
  process: ["process de fabrication", "Nos process : sérigraphie, découpe, contrôle", "De la teinte au contrôle final : clicherie, sérigraphie, découpe laser, gravure, laminage, report de composants et test électrique."],
  "process-impression": ["sérigraphie industrielle", "Sérigraphie industrielle et teintes Pantone", "Sérigraphie en continu et feuille à feuille, teintes Pantone, RAL et NCS analysées par spectrométrie, cadres réalisés sur place."],
  "process-decoupe": ["découpe laser plastique", "Découpe laser et gaufrage sur mesure", "Deux lasers de découpe, tolérance inférieure à ± 0,3 mm, presses, gaufrage, thermoformage et emboutissage pour plastique et métal."],
  "process-gravure": ["gravure mécanique métal", "Gravure mécanique sur métal et plexiglas", "Marquage définitif par gravure mécanique : textes, formes et logos sur laiton, aluminium, inox, plexiglas, bois, verre ou cuir."],
  "process-laminage": ["laminage assemblage multicouche", "Laminage et assemblage multicouche", "Jusqu’à trois matières complexées en une passe, tables de laminage semi-automatiques, reports manuels de limande et de renforts."],
  "process-composants": ["report de composants CMS LED", "Report de composants CMS et LED par robot", "Pose robotisée : plus d’un million de coupelles et 350 000 LED par an, composants CMS reportés sur circuits souples et claviers."],
  "process-controle": ["test électrique contrôle final", "Test électrique et contrôle à 100 %", "Test final de chaque pièce expédiée : touches, LED, résistances de boucle, courts-circuits. Contrôle esthétique à 100 % avant envoi."],
  societe: ["fabricant alsacien depuis 1961", "Fabricant alsacien depuis 1961, ISO 9001", "PIM Industrie, Marckolsheim : claviers à membrane, faces avant, marquage métal et décoration luxe. Atelier de 4 500 m², certifié ISO 9001."],
  references: ["références clients", "Références : Bosch, Siemens, Chanel, Hennessy", "Industriels et grandes maisons du luxe qui font confiance à PIM Industrie : Bosch, Siemens, Honeywell, Chanel, Guerlain, Hennessy, Moët & Chandon."],
  "cas-clients": ["études de cas", "Études de cas : du besoin au résultat", "Des projets de claviers, circuits, étiquettes et PLV racontés en trois temps : le besoin, la solution, le résultat."],
  actualites: ["actualités", "Actualités de l’atelier PIM Industrie", "Une publication par mois : nouveautés techniques, vie de l’atelier et réalisations de PIM Industrie, à Marckolsheim."],
  glossaire: ["glossaire", "Glossaire : IP65, coupelle, sérigraphie, dômage", "Les mots du métier expliqués simplement : IP65, limande, coupelle, CMS, gaufrage, dômage, sérigraphie, PMMA, Lexan."],
  contact: ["contact PIM Industrie", "Contactez PIM Industrie à Marckolsheim", "Formulaire, téléphone et e-mail pour un devis ou une question. PIM Industrie, Impasse Kohlgaerten, 67390 Marckolsheim."],
  acces: ["accès", "Accès à l’atelier de Marckolsheim", "Impasse Kohlgaerten, 67390 Marckolsheim. À 1 h de Strasbourg et de Bâle, 20 min de Sélestat, autoroute A35."],
  mentions: ["mentions légales", "Mentions légales", "Mentions légales du site de PIM Industrie, Marckolsheim."],
  confidentialite: ["protection des données", "Protection des données personnelles", "Politique de protection des données personnelles de PIM Industrie : usage, droits d’accès, de correction et de suppression."],
  cgv: ["conditions de vente", "Conditions générales de vente", "Conditions générales de vente de PIM Industrie."],
  cga: ["conditions d’achat", "Conditions générales d’achat", "Conditions générales d’achat de PIM Industrie."],
  plan: ["plan du site", "Plan du site", "Toutes les pages du site de PIM Industrie : interfaces industrielles, luxe et PLV, process, ressources, société."]
};

function seoFor(page) {
  const row = SEO[page.id];
  if (!row) return { query: "", title: page.name + SEO_BRAND, description: "" };
  return {
    query: row[0],
    title: row[1] + SEO_BRAND,
    description: row[2]
  };
}

// Aperçu du résultat Google (maquette uniquement)
function serpHtml(page, url) {
  const seo = seoFor(page);
  const titleLen = seo.title.length;
  const descLen = seo.description.length;
  const titleOk = titleLen <= 65;
  const descOk = descLen <= 160;
  const shownUrl = (url || "").replace(/^https?:\/\//, "").replace(/\//g, " › ").replace(/ › $/, "");
  return [
    '<div class="serp">',
    '<p class="serp-label">Résultat Google</p>',
    '<p class="serp-url">' + shownUrl + "</p>",
    '<p class="serp-title">' + seo.title + "</p>",
    '<p class="serp-desc">' + (seo.description || "Description à rédiger.") + "</p>",
    '<p class="serp-meta">',
    seo.query ? "Requête principale : <b>" + seo.query + "</b> · " : "",
    '<span class="' + (titleOk ? "ok" : "warn") + '">Titre ' + titleLen + " car.</span> · ",
    '<span class="' + (descOk ? "ok" : "warn") + '">Description ' + descLen + " car.</span>",
    "</p></div>"
  ].join("");
}
