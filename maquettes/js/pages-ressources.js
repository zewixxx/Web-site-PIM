/* Ressources : guide pilier, études de cas, actualités. */

addPage({
  id: "ressources",
  group: "Ressources",
  name: "Ressources",
  html: [
    '<div class="wrap page">',
    crumb([["Accueil", "accueil"], ["Ressources"]]),
    '<p class="kicker">Ressources</p>',
    "<h1>Pour aller plus loin</h1>",
    '<p class="lead">Quatre pages, un sujet chacune. Choisissez celle qui correspond à votre question.</p>',
    '<div class="grid-2" style="margin-top:8px">',
    '<a class="card" href="#guide-clavier-membrane"><h3>Choisir son clavier à membrane</h3><p>Six questions pour décrire votre besoin avant de demander un devis.</p></a>',
    '<a class="card" href="#cas-clients"><h3>Études de cas</h3><p>Le besoin, la solution, le résultat.</p></a>',
    '<a class="card" href="#actualites"><h3>Actualités</h3><p>La vie de l’atelier, une publication par mois.</p></a>',
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
    '<li><h3>Quelle série, et quel prototype ?</h3><p>De la petite à la grande série, avec prototypage rapide. Quantité minimale : ' + TBC + " Délai de prototype : " + TBC + "</p></li>",
    "</ol>",
    keyboardTable(),
    '<div class="callout">Pas sûr de votre choix ? Décrivez votre besoin : nos équipes accompagnent vos choix pour définir la solution la plus adaptée. <a href="#contact"><b>Demander un devis</b></a></div>',
    reassurance(false),
    "</div>"
  ].join("")
});

addPage({
  id: "cas-clients",
  group: "Ressources",
  name: "Études de cas",
  html: [
    '<div class="wrap page">',
    crumb([["Accueil", "accueil"], ["Ressources", "ressources"], ["Études de cas"]]),
    '<p class="kicker">Études de cas</p>',
    "<h1>Des projets réalisés, racontés simplement</h1>",
    '<p class="lead">Chaque étude suit le même fil : le besoin du client, la solution retenue, le résultat obtenu. Elles répondent à la question de l’acheteur : qui l’a déjà fait ?</p>',
    '<div class="case-flow"><div><b>1</b><span>Le besoin</span></div><div><b>2</b><span>La solution</span></div><div><b>3</b><span>Le résultat</span></div></div>',
    '<p class="draft-note"><span class="tbc">Trame</span> Les cartes ci-dessous montrent la mise en page. Elles seront remplacées par 4 à 6 cas clients validés par les équipes et par les clients concernés.</p>',
    '<div class="grid-2">',
    '<article class="card case"><p class="case-tag">Interfaces industrielles</p><h3>Titre du cas <span class="tbc">à rédiger</span></h3><dl><dt>Besoin</dt><dd>Exemple : un clavier étanche pour un appareil médical.</dd><dt>Solution</dt><dd>Type de clavier, matériaux, options.</dd><dt>Résultat</dt><dd>Série, délai, bénéfice pour le client.</dd></dl></article>',
    '<article class="card case"><p class="case-tag">Interfaces industrielles</p><h3>Titre du cas <span class="tbc">à rédiger</span></h3><dl><dt>Besoin</dt><dd>Exemple : une plaque constructeur pour une machine-outil.</dd><dt>Solution</dt><dd>Métal, finition, fixation.</dd><dt>Résultat</dt><dd>Série, délai, bénéfice pour le client.</dd></dl></article>',
    '<article class="card case"><p class="case-tag">Luxe &amp; PLV</p><h3>Titre du cas <span class="tbc">à rédiger</span></h3><dl><dt>Besoin</dt><dd>Exemple : une étiquette métal pour un cognac.</dd><dt>Solution</dt><dd>Métal, encres, finition, découpe laser.</dd><dt>Résultat</dt><dd>Quantité, délai avant lancement.</dd></dl></article>',
    '<article class="card case"><p class="case-tag">Luxe &amp; PLV</p><h3>Titre du cas <span class="tbc">à rédiger</span></h3><dl><dt>Besoin</dt><dd>Exemple : une PLV lumineuse pour un champagne.</dd><dt>Solution</dt><dd>Circuit lumineux, coffret, lettrage.</dd><dt>Résultat</dt><dd>Quantité, délai avant lancement.</dd></dl></article>',
    "</div>",
    "</div>"
  ].join("")
});

addPage({
  id: "actualites",
  group: "Ressources",
  name: "Actualités",
  html: [
    '<div class="wrap page">',
    crumb([["Accueil", "accueil"], ["Ressources", "ressources"], ["Actualités"]]),
    '<p class="kicker">Actualités</p>',
    "<h1>L’actualité de l’atelier</h1>",
    '<p class="lead">Une publication par mois : technique, atelier, réalisations.</p>',
    '<p class="draft-note"><span class="tbc">Trame</span> Sujets proposés à partir de savoir-faire déjà documentés. Les articles restent à rédiger et à dater.</p>',
    '<div class="grid-2">',
    '<a class="card news" href="#clavier-capacitif"><p class="case-tag">Technique</p><h3>Clavier capacitif : pourquoi une façade en verre trempé de 3 mm ?</h3><p>Usage intensif, absence d’usure mécanique, réglage de la sensibilité.</p></a>',
    '<a class="card news" href="#besoin-electronique-imprimee"><p class="case-tag">Technique</p><h3>Électronique imprimée : batterie, chauffage et capteur sur film souple</h3><p>Ce que l’encre argent permet de remplacer sur une carte rigide.</p></a>',
    '<a class="card news" href="#process-composants"><p class="case-tag">Atelier</p><h3>Un million de coupelles par an : la pose robotisée</h3><p>Comment les robots posent coupelles, CMS et LED.</p></a>',
    '<a class="card news" href="#process-impression"><p class="case-tag">Atelier</p><h3>Pantone, RAL, NCS : la spectrométrie au service de vos teintes</h3><p>De l’échantillon client à la teinte validée.</p></a>',
    "</div>",
    "</div>"
  ].join("")
});
