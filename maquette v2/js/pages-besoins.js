/* Pages « par besoin » : une requête précise = une page.
   Chaque page répond aux trois questions de l'acheteur :
   est-ce possible, en combien de temps, qui l'a déjà fait ? */

function needPage(d) {
  addPage({
    id: d.id,
    group: "Industrie",
    name: d.name,
    html: [
      '<div class="wrap page">',
      crumb([["Accueil", "accueil"], ["Industrie", "technologies"], [d.name]]),
      '<p class="kicker">Interfaces industrielles · Par besoin</p>',
      "<h1>" + d.title + "</h1>",
      '<p class="lead">' + d.lead + "</p>",
      '<div class="answers">',
      '<div class="answer"><h3>Est-ce possible ?</h3><p>' + d.possible + "</p></div>",
      '<div class="answer"><h3>En combien de temps ?</h3><p>Prototypage rapide, puis industrialisation efficace. Délai de prototype : ' + TBC + "</p></div>",
      '<div class="answer"><h3>Qui l’a déjà fait ?</h3><p>' + d.proof + "</p></div>",
      "</div>",
      photos(d.photos),
      '<div class="split">',
      "<section><h2>Ce que PIM propose</h2>" + d.offer + "</section>",
      "<section><h2>À définir ensemble</h2>" + d.define + "</section>",
      "</div>",
      "<h2>Produits concernés</h2>",
      '<div class="grid-3">' + d.products.map((item) => {
        return '<a class="card" href="#' + item[1] + '"><h3>' + item[0] + "</h3><p>" + item[2] + "</p></a>";
      }).join("") + "</div>",
      reassurance(false),
      "</div>"
    ].join("")
  });
}

needPage({
  id: "besoin-medical",
  name: "Clavier pour dispositif médical",
  title: "Un clavier pour dispositif médical",
  lead: "Une interface étanche, lisible et fiable pour vos équipements médicaux, avec un test et un contrôle de chaque pièce avant expédition.",
  possible: "Oui. Tous les claviers à membrane PIM sont étanches IP65 et réalisés sur mesure, de la forme aux options d’éclairage.",
  proof: "Parmi nos références industrielles : Bosch, Siemens, Honeywell, Mettler Toledo, Stago. Les logos ci-dessous sont déjà affichés sur notre site.",
  photos: ["industrie_industrie_medicale.jpg", "dsc_0520.jpg", "dsc_05033.jpg"],
  offer: [
    "<ul class=\"clean\">",
    "<li>Clavier étanche IP65 : hermétique à la poussière et protégé contre les jets d’eau venant de toutes les directions.</li>",
    "<li>Clavier capacitif : zones tactiles sans touche mécanique, donc sans usure mécanique ; façade en verre trempé de 3,0 mm ou plus recommandée.</li>",
    "<li>Rétroéclairage ou afficheur 7 segments pour la lisibilité de l’interface.</li>",
    "<li>Test électrique de chaque pièce expédiée, puis contrôle esthétique à 100 %.</li>",
    "<li>Traçabilité garantie par la certification ISO 9001.</li>",
    "</ul>"
  ].join(""),
  define: [
    "<ul class=\"clean\">",
    "<li>L’environnement réel d’usage : projections, nettoyage, fréquence d’utilisation.</li>",
    "<li>La sensation attendue : clic, relief ou surface tactile.</li>",
    "<li>L’éclairage et l’affichage nécessaires.</li>",
    "<li>La série visée, du prototype à la grande série.</li>",
    "</ul>",
    "<p class=\"note\">Les normes applicables à votre appareil sont à valider avec votre bureau d’études et le nôtre.</p>"
  ].join(""),
  products: [
    ["Clavier étanche IP65", "clavier-etanche", "La base de toute la gamme de claviers à membrane."],
    ["Clavier capacitif", "clavier-capacitif", "Zones tactiles, sans touche mécanique."],
    ["Clavier rétroéclairé", "clavier-retro", "Lisible même dans la pénombre."],
    ["Afficheur 7 segments", "clavier-7s", "Chiffres et lettres dans moins de 2 mm."],
    ["Face avant plastique", "face-avant-plastique", "Décor sérigraphié, dès 150 µm."],
    ["Circuit flexible", "circuit-flexible", "Piste souple pour capteur ou chauffage."]
  ]
});

needPage({
  id: "besoin-aeronautique",
  name: "Clavier pour l’aéronautique",
  title: "Un clavier pour l’aéronautique et la défense",
  lead: "Des claviers rétroéclairés ou électroluminescents et des plaques métal pour des équipements qui travaillent en environnements hostiles.",
  possible: "Oui. PIM fabrique des claviers sur mesure, rétroéclairés ou électroluminescents, ainsi que des façades et inserts métalliques.",
  proof: "Un atelier certifié ISO 9001, avec traçabilité et contrôle de chaque pièce. Les logos ci-dessous sont déjà affichés sur notre site.",
  photos: ["industire_aeronautique_defense.jpg", "mg_48542.jpg", "dsc_0549.jpg"],
  offer: [
    "<ul class=\"clean\">",
    "<li>Clavier rétroéclairé : LED de puissance, lumière par fenêtres ou afficheurs découpés.</li>",
    "<li>Clavier électroluminescent : lampe développée et fabriquée par PIM, lumière froide et uniforme, sur surface plane ou courbe.</li>",
    "<li>Façade et insert métallique : aluminium, acier inox ou laiton, embossage jusqu’à 1 mm.</li>",
    "<li>Test final de chaque pièce : touches, LED, résistances de boucle, courts-circuits.</li>",
    "</ul>"
  ].join(""),
  define: [
    "<ul class=\"clean\">",
    "<li>Les conditions d’environnement de l’équipement.</li>",
    "<li>Le type d’éclairage et la lisibilité visée.</li>",
    "<li>Le métal et la finition des plaques d’identification.</li>",
    "<li>Les exigences de traçabilité de votre cahier des charges.</li>",
    "</ul>",
    "<p class=\"note\">Les exigences spécifiques à votre programme sont à valider avec votre bureau d’études et le nôtre.</p>"
  ].join(""),
  products: [
    ["Clavier rétroéclairé", "clavier-retro", "Éclairé par l’arrière avec une LED."],
    ["Clavier électroluminescent", "clavier-electro", "Lumière uniforme, fabriquée par PIM."],
    ["Façade et insert métallique", "facade-metallique", "Plaques d’identification et de conformité."],
    ["Clavier à membrane", "clavier-membrane", "La famille complète, à partir de 0,5 mm."],
    ["Test et contrôle", "process-controle", "Chaque pièce expédiée est testée."]
  ]
});

needPage({
  id: "besoin-electronique-imprimee",
  name: "Électronique imprimée",
  title: "Électronique imprimée sur support souple",
  lead: "Des circuits en encre argent, imprimés sur film souple, pour la batterie, le chauffage ou les capteurs de vos produits.",
  possible: "Oui. PIM imprime des circuits sur polyester ou polycarbonate, y compris pour des applications d’électronique imprimée, et pose les composants CMS et LED par robot.",
  proof: "PIM développe l’électronique imprimée sur support souple depuis 2016, et le clavier capacitif depuis 2013.",
  photos: ["printed_electronics.jpg", "circuit_souples3.jpg", "_MG_3984.jpg"],
  offer: [
    "<ul class=\"clean\">",
    "<li>Circuit flexible : piste en encre argent sur film polyester ou polycarbonate, raccordé par une limande.</li>",
    "<li>Applications : batterie, circuit chauffant, capteur souple.</li>",
    "<li>Report automatisé de composants CMS et de LED : plus de 350 000 LED déposées par an.</li>",
    "<li>Sérigraphie conductrice en continu sur rouleau, séchage thermique ou UV intégré.</li>",
    "</ul>"
  ].join(""),
  define: [
    "<ul class=\"clean\">",
    "<li>La fonction du circuit : chauffer, détecter, alimenter, éclairer.</li>",
    "<li>La forme et la souplesse nécessaires.</li>",
    "<li>Les composants à reporter.</li>",
    "<li>La série visée, du prototype à la grande série.</li>",
    "</ul>"
  ].join(""),
  products: [
    ["Circuit flexible", "circuit-flexible", "Un circuit imprimé souple en encre argent."],
    ["Clavier capacitif", "clavier-capacitif", "Électrodes sérigraphiées sur circuit souple."],
    ["Reports de composants", "process-composants", "Robots CMS, coupelles et LED."],
    ["Signalétique lumineuse", "signaletique", "Circuit lumineux dans un coffret."]
  ]
});
