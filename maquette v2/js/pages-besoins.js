/* Électronique imprimée = produit de la gamme (plus de branche « Par besoin »).
   Médical et aéro : contenus fusionnés dans les pages Domaines + alias d’URL dans app.js. */

addPage({
  id: "besoin-electronique-imprimee",
  group: "Industrie",
  name: "Électronique imprimée",
  html: [
    '<div class="wrap page">',
    crumb([["Accueil", "accueil"], ["Interfaces industrielles", "technologies"], ["Gamme", "gamme"], ["Électronique imprimée"]]),
    '<p class="kicker">Interfaces industrielles · Gamme</p>',
    "<h1>Électronique imprimée sur support souple</h1>",
    '<p class="lead">Des circuits en encre argent, imprimés sur film souple, pour la batterie, le chauffage ou les capteurs de vos produits.</p>',
    '<div class="answers">',
    '<div class="answer"><h3>Est-ce possible ?</h3><p>Oui. PIM imprime des circuits sur polyester ou polycarbonate et pose les composants CMS et LED par robot.</p></div>',
    '<div class="answer"><h3>En combien de temps ?</h3><p>Prototypage rapide, puis industrialisation. Délai de prototype : ' + TBC + "</p></div>",
    '<div class="answer"><h3>Qui l’a déjà fait ?</h3><p>PIM développe l’électronique imprimée sur support souple depuis 2016, et le clavier capacitif depuis 2013.</p></div>',
    "</div>",
    photos(["printed_electronics.jpg", "circuit_souples3.jpg", "_MG_3984.jpg"]),
    '<div class="split">',
    "<section><h2>Ce que PIM propose</h2><ul class=\"clean\"><li>Circuit flexible : piste en encre argent sur film polyester ou polycarbonate.</li><li>Applications : batterie, circuit chauffant, capteur souple.</li><li>Report automatisé de CMS et de LED.</li><li>Sérigraphie conductrice en continu, séchage thermique ou UV.</li></ul></section>",
    "<section><h2>À définir ensemble</h2><ul class=\"clean\"><li>La fonction du circuit : chauffer, détecter, alimenter, éclairer.</li><li>La forme et la souplesse nécessaires.</li><li>Les composants à reporter.</li><li>La série visée.</li></ul></section>",
    "</div>",
    "<h2>Produits liés</h2>",
    chips([
      ["Circuit flexible", "circuit-flexible"],
      ["Clavier capacitif", "clavier-capacitif"],
      ["Reports de composants", "process-composants"],
      ["Signalétique lumineuse", "signaletique"]
    ]),
    reassurance(false),
    "</div>"
  ].join("")
});
