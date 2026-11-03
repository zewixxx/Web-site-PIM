addPage({
  id: "glossaire",
  group: "Ressources",
  name: "Glossaire",
  html: [
    '<div class="wrap page">',
    crumb([["Accueil", "accueil"], ["Glossaire"]]),
    '<p class="kicker">Glossaire</p>',
    "<h1>Les mots du métier</h1>",
    '<p class="lead">Les termes que nous employons, expliqués simplement.</p>',
    '<div class="glossary">',
    glossary([
      ["Afficheur 7 segments", "Sept segments lumineux, chacun relié à une LED, pour former des chiffres, des lettres et des caractères simples.", "clavier-7s"],
      ["Clavier à membrane", "Assemblage de feuilles de polyester ou de polycarbonate et d’adhésif, relié à l’équipement par une limande.", "clavier-membrane"],
      ["CMS", "Composant monté en surface, posé par robot sur le circuit du clavier.", "process-composants"],
      ["Coupelle", "Dôme métallique qui donne le clic et confirme le contact, avec plusieurs duretés d’enfoncement.", "clavier-coupelles"],
      ["Dômage", "Dépôt de résine transparente sur une étiquette, qui lui donne du volume. Aussi appelé doming, bossing ou étiquette 3D.", "etiquette-3d"],
      ["Électroluminescent", "Lampe imprimée qui produit une lumière froide et uniforme, intégrée au clavier.", "clavier-electro"],
      ["Gaufrage", "Mise en relief des touches ou du décor par une presse, à chaud ou à froid.", "clavier-gaufre"],
      ["IP65", "Indice de protection : hermétique à la poussière et protégé contre les jets d’eau venant de toutes les directions.", "clavier-etanche"],
      ["Lexan", "Film en polycarbonate utilisé comme face décor. Le clavier plat est aussi appelé clavier Lexan.", "clavier-plat"],
      ["Limande", "Languette souple qui relie le clavier ou le circuit à l’équipement électronique.", "clavier-membrane"],
      ["PLV", "Publicité sur le lieu de vente : présentoir, chevalet, fourreau, packaging.", "plv"],
      ["PMMA", "Le plexiglas, aussi appelé Altuglas, méthacrylate ou verre acrylique.", "presentoir"],
      ["Sérigraphie", "Impression à fort dépôt d’encre : couleurs intenses, durables et opaques, sur papier, carton, bois, plastiques et métal.", "process-impression"]
    ]),
    "</div></div>"
  ].join("")
});

function glossary(rows) {
  return rows.map((row) => {
    return '<div class="term"><h2>' + row[0] + "</h2><p>" + row[1] + '</p><a class="btn" href="#' + row[2] + '">En savoir plus</a></div>';
  }).join("");
}

addPage({
  id: "acces",
  group: "Contact",
  name: "Accès",
  html: [
    '<div class="wrap page">',
    crumb([["Accueil", "accueil"], ["Contact", "contact"], ["Accès"]]),
    '<p class="kicker">Accès</p>',
    "<h1>Venir chez PIM Industrie</h1>",
    '<p class="lead">Impasse Kohlgaerten, 67390 Marckolsheim, France. Au cœur de l’Alsace, entre Strasbourg, Colmar et Bâle.</p>',
    '<div class="grid-3">',
    '<div class="card"><img class="access-icon" src="medias/images/icon_plane.svg" alt=""><h3>En avion</h3><p>Aéroport de Strasbourg-Entzheim : 1 h<br>EuroAirport Bâle-Mulhouse : 1 h</p></div>',
    '<div class="card"><img class="access-icon" src="medias/images/icon_train.svg" alt=""><h3>En train</h3><p>Gare TGV de Strasbourg : 45 min<br>Gare de Colmar : 30 min<br>Gare de Sélestat : 20 min</p></div>',
    '<div class="card"><img class="access-icon" src="medias/images/icon_car.svg" alt=""><h3>En voiture</h3><p>Autoroute A35, direction Sélestat, puis Marckolsheim.</p></div>',
    "</div>",
    '<p class="note" style="margin-top:16px">Temps de trajet estimés en voiture.</p>',
    "</div>"
  ].join("")
});
