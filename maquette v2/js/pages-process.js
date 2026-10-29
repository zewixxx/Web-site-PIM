addPage({
  id: "process",
  group: "Process",
  name: "Nos process",
  html: [
    '<div class="wrap page">',
    crumb([["Accueil", "accueil"], ["Process"]]),
    '<p class="kicker">Atelier</p>',
    "<h1>Nos processus de fabrication</h1>",
    '<p class="lead">Du matériel performant pour une qualité sans failles. Clicherie, sérigraphie, découpe, déformation, gravure, laminage, report de composants, test électrique.</p>',
    photos(["fond_abstrait_pim.jpg"]),
    '<div class="grid-3">',
    '<a class="card" href="#process-impression"><h3>Impression</h3><p>Teintes par spectrométrie, cadres, dégraissage, vernis, sérigraphie.</p></a>',
    '<a class="card" href="#process-decoupe"><h3>Découpe et déformation</h3><p>Lasers, presses, gaufrage, thermoformage, plieuse.</p></a>',
    '<a class="card" href="#process-gravure"><h3>Gravure</h3><p>Marquage mécanique définitif, puis mise en couleur.</p></a>',
    '<a class="card" href="#process-laminage"><h3>Laminage et assemblage</h3><p>Jusqu’à trois matières complexées, reports manuels.</p></a>',
    '<a class="card" href="#process-composants"><h3>Reports de composants</h3><p>Robots CMS, coupelles et robot mixte.</p></a>',
    '<a class="card" href="#process-controle"><h3>Test et contrôle</h3><p>Chaque pièce expédiée est testée, puis contrôlée à 100 %.</p></a>',
    "</div></div>"
  ].join("")
});

function processPage(id, name, title, blocks) {
  addPage({
    id: id,
    group: "Process",
    name: name,
    html: [
      '<div class="wrap page">',
      crumb([["Accueil", "accueil"], ["Process", "process"], [name]]),
      '<p class="kicker">Process</p>',
      "<h1>" + title + "</h1>",
      photos(IMAGES[id]),
      blocks,
      "</div>"
    ].join("")
  });
}

processPage("process-impression", "Impression", "Clicherie, préparation des teintes, sérigraphie", [
  "<h2>Clicherie et teintes</h2>",
  "<ul class=\"clean\"><li>Recherche des teintes par analyse spectrométrique : Pantone, RAL, NCS, ou contretypage d’un échantillon client.</li>",
  "<li>Cadres de sérigraphie réalisés sur place : mise en tension des soies, enduction directe ou film capillaire, flashage, dégravage.</li></ul>",
  "<h2>Dégraissage et vernissage, supports métalliques</h2>",
  "<ul class=\"clean\"><li>2 lignes de dégraissage, dont une avec brossage. Format maxi 700 mm de large, 550 mm pour le brossage.</li>",
  "<li>2 vernisseuses : vernis colorés ou d’accroche pour encre de sérigraphie.</li></ul>",
  "<h2>Sérigraphie</h2>",
  "<ul class=\"clean\"><li>2 machines en continu, matière en rouleau : une pour les encres conductrices, une pour les décors. Séchage thermique ou UV intégré.</li>",
  "<li>4 tables feuille à feuille pour le métal et le plastique, séchage en ligne ou en étuve.</li></ul>"
].join(""));

processPage("process-decoupe", "Découpe et déformation", "Découpe et déformation", [
  "<ul class=\"clean\">",
  "<li>2 lasers de découpe plastique, type CO2 : petites séries, fortes épaisseurs, ou tolérances inférieures à ± 0,3 mm.</li>",
  "<li>4 presses portefeuille, outils à lames, plastiques et adhésifs de moins de 1 mm : polyester, polycarbonate.</li>",
  "<li>Presses mécaniques coup par coup ou à avance bande, outils poinçon-matrice, pour feuilles et bandes métalliques.</li>",
  "<li>2 machines de gaufrage et une presse de thermoformage. Relief et sensation tactile en 3D sur polyester et polycarbonate.</li>",
  "<li>Une presse hydraulique pour l’emboutissage.</li>",
  "<li>Une presse plieuse.</li>",
  "</ul>"
].join(""));

processPage("process-gravure", "Gravure", "La gravure mécanique", [
  "<div class=\"split\"><section><h2>Qu’est-ce que c’est ?</h2>",
  "<p>Marquage définitif. Une fraise creuse la matière selon un parcours programmé en PAO. Textes, formes et logos.</p></section>",
  "<section><h2>Pour quoi faire ?</h2>",
  "<p>Identification, information, communication, personnalisation, valorisation. Supports cités : acrylique, plexiglas, laiton, aluminium anodisé, acier inoxydable, bois, verre, cuir, papier, carton. Profondeur, outil et vitesse sont adaptés au support. Souvent associée à une mise en couleur.</p></section></div>"
].join(""));

processPage("process-laminage", "Laminage et assemblage", "Laminage et assemblage", [
  "<ul class=\"clean\">",
  "<li>Une machine de laminage et de coupe : jusqu’à 3 matières complexées en même temps, puis débit au format.</li>",
  "<li>Tables de laminage semi-automatisées développées pour PIM. Répétabilité de la liaison entre les couches du clavier.</li>",
  "<li>Reports manuels : cale de limande, renfort de limande, assemblage de pièces unitaires de très petites dimensions.</li>",
  "</ul>"
].join(""));

processPage("process-composants", "Reports de composants", "Reports de composants", [
  "<ul class=\"clean\">",
  "<li>Opération totalement automatisée.</li>",
  "<li>1 robot de report de composants CMS.</li>",
  "<li>2 robots de report de coupelles.</li>",
  "<li>1 robot mixte, coupelles et composants CMS.</li>",
  "<li>Plus d’un million de coupelles et 350 000 LED déposées par an.</li>",
  "</ul>"
].join(""));

processPage("process-controle", "Test et contrôle", "Test électrique et contrôle final", [
  "<ul class=\"clean\">",
  "<li>Test final de toutes les pièces envoyées : touches, LED, résistances de boucle, courts-circuits.</li>",
  "<li>Testeur manuel ou automatisé.</li>",
  "<li>Gabarit et câble de test particuliers selon la pièce.</li>",
  "<li>Contrôle esthétique à 100 % avant expédition.</li>",
  "</ul>"
].join(""));
