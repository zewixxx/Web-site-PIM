addPage({
  id: "societe",
  group: "Société",
  name: "Qui sommes-nous",
  html: [
    '<div class="wrap page">',
    crumb([["Accueil", "accueil"], ["Qui sommes-nous"]]),
    '<p class="kicker">Qui sommes-nous</p>',
    "<h1>PIM Industrie, depuis 1961</h1>",
    '<p class="lead">Fondée en 1961 à Marckolsheim sous le nom Plaquettes Industrielles, l’entreprise a débuté dans l’industrialisation et la transformation du métal.</p>',
    chips([["Qui sommes-nous", "societe"], ["Références", "references"], ["Accès", "acces"], ["Demander un devis", "contact"]]),
    "<p>Spécialisée dans le marquage sur métal et les interfaces homme-machine, PIM Industrie conçoit et fabrique des claviers à membrane, des faces avant et des pièces usinées sur mesure. Pour la décoration et le luxe, elle réalise étiquettes, PLV, signalétique lumineuse et présentoirs.</p>",
    "<p>Animée par une équipe dynamique et à l’écoute, PIM Industrie propose des solutions personnalisées et innovantes, alliant qualité, performance et durabilité, pour répondre aux exigences des industriels les plus ambitieux.</p>",
    '<div class="split">',
    "<section><h2>Notre philosophie</h2><p>Nos équipes accompagnent vos choix pour définir la solution la plus adaptée : type de clavier, mode de marquage, techniques de collage et d’assemblage. Étude, prototypage rapide et industrialisation efficace : vos projets deviennent des solutions concrètes.</p><p>Toutes les pièces sont contrôlées dimensionnellement et esthétiquement à 100 %, avec des conditionnements personnalisables : vrac, plateau thermoformé, chargeur pour chaîne de montage automatique.</p></section>",
    "<section><h2>Certification ISO 9001</h2><p>Notre système de management est certifié ISO 9001 : traçabilité, fiabilité, contrôles rigoureux. Cette certification confirme notre engagement qualité à chaque étape.</p><h2>Développement durable</h2><p>Plus de 4 500 m² d’installations, une approche écoresponsable continue, et des solutions adaptées aux besoins de nos clients.</p>" + chips([["Une industrie éco-sensibilisée (PDF)", "societe"]]) + "</section>",
    "</div>",
    photos(["fond_decoupe_laser6.jpg", "dsc_0560.jpg", "dsc_0549.jpg"]),
    '<h2 style="margin-top:36px">Historique</h2>',
    '<div class="timeline">',
    [
      ["1961", "Création sous le nom Plaquettes Industrielles de Marckolsheim. Découpe et déformation du métal."],
      ["1970", "Fabrication des premières pièces décoratives en métal."],
      ["1972", "Début de la sérigraphie sur polyester, alors commercialisé pour la première fois sous forme de film."],
      ["1980", "Premiers claviers à membrane plats : PIM Sensor."],
      ["1982", "Premiers dômes et guide-doigts."],
      ["1985", "Claviers à coupelles plats : Clic Sensor. Premiers claviers en PET. Plaquettes Industrielles devient PIM Industrie."],
      ["1986", "Clic décor et clic polyester. Premières LED intégrées dans les claviers."],
      ["1992", "Automatisation de la pose des coupelles."],
      ["1995", "Premiers robots de pose de LED dédiés aux claviers à membrane."],
      ["1996", "Premiers logiciels de dessin assisté par ordinateur."],
      ["1998", "Premier robot de pose mixte : LED et coupelles."],
      ["2000", "Première certification ISO 9001."],
      ["2001", "Sensation tactile par aimants, et potentiomètres rotatifs."],
      ["2003", "Tenue à haute température du clic décor."],
      ["2005", "Acquisition d’un laser de découpe."],
      ["2009", "Aluminium malléable. Premiers claviers électroluminescents."],
      ["2010", "Arrivée de l’encre miroir."],
      ["2011", "Acquisition d’un deuxième laser de découpe."],
      ["2013", "Certification ISO 14001. Premier clavier capacitif."],
      ["2014", "Solutions totalement intégrées."],
      ["2016", "Électronique imprimée sur support souple."],
      ["2020", "Découpe laser du métal."],
      ["2025", "Certification ISO 9001."],
      ["2026", "Engage Gaëtan qui va rebooster l'entreprise."]

    ].map((row) => '<div class="tl"><b>' + row[0] + "</b>" + row[1] + "</div>").join(""),
    "</div></div>"
  ].join("")
});

addPage({
  id: "references",
  group: "Société",
  name: "Références",
  html: [
    '<div class="wrap page">',
    crumb([["Accueil", "accueil"], ["Qui sommes-nous", "societe"], ["Références"]]),
    '<p class="kicker">Références</p>',
    "<h1>Ils nous font confiance</h1>",
    '<p class="lead">Des industriels et des grandes maisons du luxe, en France et à l’international.</p>',
    logos(CLIENTS_INDUSTRIE.concat(CLIENTS_DECORATION)),
    '<p class="note" style="margin-top:20px">Une étude de cas détaillée ? <a href="#cas-clients">Voir les études de cas</a>.</p>',
    "</div>"
  ].join("")
});

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
    return '<div class="term"><h2>' + row[0] + "</h2><p>" + row[1] + ' <a href="#' + row[2] + '">En savoir plus</a></p></div>';
  }).join("");
}

addPage({
  id: "contact",
  group: "Contact",
  name: "Contact",
  noCta: true,
  html: [
    '<div class="wrap page">',
    crumb([["Accueil", "accueil"], ["Contact"]]),
    '<p class="kicker">Contact</p>',
    "<h1>Contactez-nous</h1>",
    '<p class="lead">Pour des solutions adaptées à vos envies et à vos besoins, PIM Industrie s’engage.</p>',
    '<p class="contact-devis"><a class="cta" href="#demande">Demander un devis</a></p>',
    '<div class="contact-layout">',
    '<form class="form-grid" action="#">',
    field("Nom *", "text"), field("Prénom *", "text"),
    field("Société", "text"), field("Activité", "text"),
    field("Adresse", "text"), field("Code postal *", "text"),
    field("Ville", "text"), field("Pays", "text"),
    field("E-mail *", "email"), field("Téléphone *", "tel"),
    '<div class="field"><p class="field-title">Nombre de salariés</p><div class="checks"><label><input type="radio" name="effectif"><span>moins de 10</span></label><label><input type="radio" name="effectif"><span>de 11 à 50</span></label><label><input type="radio" name="effectif"><span>plus de 50</span></label></div></div>',
    '<div class="field"><p class="field-title">Vous êtes intéressé·e par</p><div class="checks"><label><input type="checkbox"><span>Une étude</span></label><label><input type="checkbox"><span>Une prestation modulaire</span></label><label><input type="checkbox"><span>Une prestation complète</span></label><label><input type="checkbox"><span>Un simple contact</span></label></div></div>',
    '<div class="field"><label for="echeance">Votre projet est à échéance</label><select id="echeance"><option>moins d’un mois</option><option>entre 2 et 6 mois</option><option>plus de 6 mois</option></select></div>',
    '<div class="field" style="grid-column:1 / -1"><label for="demande">Votre demande</label><textarea id="demande"></textarea></div>',
    '<p class="note" style="grid-column:1 / -1">* Champs obligatoires. Vos informations sont destinées à PIM Industrie, uniquement pour répondre à votre demande. Vous pouvez y accéder, les corriger ou les faire supprimer en écrivant à mail@pim-industrie.com. <a href="#confidentialite">Protection des données</a></p>',
    '<p style="grid-column:1 / -1"><button class="cta" type="button">Envoyer</button></p>',
    "</form>",
    '<aside class="contact-card">',
    "<h3>Par téléphone</h3>",
    '<p><a class="phone" href="tel:+33388586200">03 88 58 62 00</a></p>',
    "<h3>Par e-mail</h3>",
    "<p>mail@pim-industrie.com</p>",
    "<h3>Adresse</h3>",
    "<p>Impasse Kohlgaerten<br>67390 Marckolsheim<br>France</p>",
    '<p><a href="#acces">Comment venir</a></p>',
    "</aside>",
    "</div></div>"
  ].join("")
});

function field(label, type) {
  const id = "champ-" + label.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-");
  return '<div class="field"><label for="' + id + '">' + label + '</label><input id="' + id + '" type="' + type + '"></div>';
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
