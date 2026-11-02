/* Ressources : guide et glossaire. Les trames vides (études de cas, actualités) ne sont pas publiées. */

addPage({
  id: "ressources",
  group: "Ressources",
  name: "Ressources",
  html: [
    '<div class="wrap page">',
    crumb([["Accueil", "accueil"], ["Ressources"]]),
    '<p class="kicker">Ressources</p>',
    "<h1>Pour aller plus loin</h1>",
    '<p class="lead">Deux pages pour préparer un projet : un guide pour choisir son clavier, et les mots du métier.</p>',
    '<div class="grid-2">',
    '<a class="card" href="#guide-clavier-membrane"><h3>Choisir son clavier à membrane</h3><p>Six questions pour décrire votre besoin avant de demander un devis.</p></a>',
    '<a class="card" href="#glossaire"><h3>Glossaire</h3><p>IP65, coupelle, sérigraphie, dômage : les mots du métier.</p></a>',
    "</div></div>"
  ].join("")
});

addPage({
  id: "guide-clavier-membrane",
  group: "Ressources",
  name: "Choisir son clavier à membrane",
  html: [
    '<div class="wrap page">',
    crumb([["Accueil", "accueil"], ["Ressources", "ressources"], ["Choisir son clavier à membrane"]]),
    '<p class="kicker">Guide</p>',
    "<h1>Choisir son clavier à membrane</h1>",
    '<p class="lead">Six questions à se poser avant de décrire votre besoin. Chaque réponse oriente vers un type de clavier et une série d’options, du clavier plat le plus simple au clavier capacitif.</p>',
    '<ol class="guide-steps">',
    '<li><h3>Dans quel environnement le clavier va-t-il vivre ?</h3><p>Poussière, projections, nettoyage. Tous les claviers à membrane PIM sont étanches, classés IP65 par défaut : hermétiques à la poussière et protégés contre les jets d’eau. <a href="#clavier-etanche">Le clavier étanche</a></p></li>',
    '<li><h3>Quelle sensation attendre sous le doigt ?</h3><p>Une légère pression (<a href="#clavier-plat">plat</a>), un clic net (<a href="#clavier-coupelles">coupelles</a>), des touches en relief (<a href="#clavier-gaufre">gaufré</a>), une membrane en silicone (<a href="#clavier-elastomere">élastomère</a>), ou aucune touche mécanique (<a href="#clavier-capacitif">capacitif</a>).</p></li>',
    '<li><h3>Faut-il de la lumière ou un affichage ?</h3><p>LED de puissance (<a href="#clavier-retro">rétroéclairé</a>), lampe imprimée à lumière uniforme (<a href="#clavier-electro">électroluminescent</a>), ou chiffres et lettres par LED (<a href="#clavier-7s">afficheur 7 segments</a>).</p></li>',
    '<li><h3>Quelles options intégrer ?</h3><p>LED, micro-switch, blindage électromagnétique ou électrostatique, guide-doigt, composants CMS, circuit chauffant. Ils s’ajoutent à la plupart des types de claviers.</p></li>',
    '<li><h3>Quelle façade et quels matériaux ?</h3><p>Lexan® ou polyester à partir de 0,5 mm d’épaisseur, décor sérigraphié. Pour un clavier capacitif, une façade non conductrice : verre trempé de 3,0 mm ou plus recommandé.</p></li>',
    '<li><h3>Quelle série, et quel prototype ?</h3><p>De la petite à la grande série, avec prototypage rapide. Quantité et délai de prototype : sur devis.</p></li>',
    "</ol>",
    keyboardTable(),
    '<div class="callout">Pas sûr de votre choix ? Décrivez votre besoin : nos équipes accompagnent vos choix pour définir la solution la plus adaptée. <a href="contact.html"><b>Demander conseil</b></a></div>',
    reassurance(false),
    "</div>"
  ].join("")
});
