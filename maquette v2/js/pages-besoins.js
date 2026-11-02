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
