addPage({
  id: "technologies",
  group: "Industrie",
  name: "Industrie",
  html: [
    '<div class="wrap page">',
    crumb([["Accueil", "accueil"], ["Industrie"]]),
    '<p class="kicker">Industrie</p>',
    "<h1>Une vaste gamme au service de l’industrie</h1>",
    '<p class="lead">Expert en sérigraphie, PIM Industrie conçoit des solutions d’électronique imprimée sur surfaces souples ou rigides, adaptées aux exigences du secteur industriel.</p>',
    "<p>Ces technologies trouvent leur place au cœur des applications industrielles : fiabilité, précision et performance. Un parc de machines conventionnelles et numériques permet de réaliser inserts et façades en métal et en plastique, circuits techniques et claviers à membrane.</p>",
    '<div class="grid-4">',
    '<a class="card" href="#clavier-membrane"><h3>Clavier à membrane</h3><p>Interface homme-machine souple, étanche et sur mesure.</p></a>',
    '<a class="card" href="#circuit-flexible"><h3>Circuit souple</h3><p>Circuit imprimé sur polyester ou polycarbonate.</p></a>',
    '<a class="card" href="#face-avant-plastique"><h3>Face avant plastique</h3><p>Décor sérigraphié sur un support ou un circuit.</p></a>',
    '<a class="card" href="#facade-metallique"><h3>Façade et insert métallique</h3><p>Identification d’un produit, d’une machine, d’un équipement.</p></a>',
    "</div>",
    '<div style="margin-top:28px">' + photos(["bandeau_industrie.jpg", "circuit_souples3.jpg", "facade_plastique_habillage_boitier_geolocalisation3.jpg", "dsc_0549.jpg", "fond_decoupe_laser6.jpg", "dsc_0560.jpg"]) + "</div>",
    "<h2>Les claviers à membrane</h2>",
    chips([
      ["Plat", "clavier-plat"],
      ["Coupelles", "clavier-coupelles"],
      ["Gaufré", "clavier-gaufre"],
      ["Rétroéclairé", "clavier-retro"],
      ["Électroluminescent", "clavier-electro"],
      ["Afficheurs 7 segments", "clavier-7s"],
      ["Capacitif", "clavier-capacitif"],
      ["Élastomère", "clavier-elastomere"],
      ["Étanche IP65", "clavier-etanche"]
    ]),
    '<h2 style="margin-top:36px">Ils nous font confiance</h2>',
    logos(CLIENTS_INDUSTRIE),
    "</div>"
  ].join("")
});

const relatedKeys = [
  ["Clavier à membrane", "clavier-membrane"],
  ["Plat", "clavier-plat"],
  ["Coupelles", "clavier-coupelles"],
  ["Gaufré", "clavier-gaufre"],
  ["Rétroéclairé", "clavier-retro"],
  ["Électroluminescent", "clavier-electro"],
  ["Afficheur 7 segments", "clavier-7s"],
  ["Capacitif", "clavier-capacitif"],
  ["Élastomère", "clavier-elastomere"],
  ["Étanche", "clavier-etanche"]
];

function keyboardCrumb(name) {
  return [["Accueil", "accueil"], ["Industrie", "technologies"], ["Clavier à membrane", "clavier-membrane"], [name]];
}

function othersThan(id) {
  return relatedKeys.filter((item) => item[1] !== id);
}

productPage({
  id: "clavier-membrane",
  group: "Industrie",
  name: "Clavier à membrane",
  kicker: "Industrie",
  title: "Le clavier à membrane",
  lead: "En Lexan® ou en polyester, à partir de 0,5 mm d’épaisseur : une interface homme-machine souple, étanche et conçue sur mesure.",
  crumb: [["Accueil", "accueil"], ["Industrie", "technologies"], ["Clavier à membrane"]],
  what: [
    "<p>Le clavier à membrane est obtenu par assemblage de feuilles de polyester ou de polycarbonate et d’adhésif. Une languette souple, la limande, permet une connexion directe sur l’équipement électronique.</p>",
    "<p>Contrairement à un clavier électromécanique standard, il combine finesse, étanchéité et liberté de forme. La face supérieure porte le décor ; en dessous, les circuits souples assurent le contact électrique.</p>"
  ].join(""),
  why: [
    "<p>Utilisé depuis longtemps dans de nombreuses applications électroniques, le clavier à membrane se démarque par des qualités techniques, opérationnelles et esthétiques difficiles à obtenir avec un clavier classique.</p>",
    "<p>Souple et étanche, il s’adapte à tout type de support, quelle que soit sa forme. Fort de son expérience, PIM Industrie propose une gamme complète : du clavier plat le plus simple jusqu’à l’intégration de composants CMS, au blindage et aux options d’éclairage.</p>"
  ].join(""),
  extra: "<h2>Options pouvant être incorporées</h2><ul class=\"clean\"><li>LED</li><li>Micro-switch</li><li>Blindage électromagnétique et/ou électrostatique, indépendant ou non</li><li>Guide-doigt</li><li>Composant CMS intégré ou non</li><li>Circuit chauffant</li></ul>",
  related: othersThan("clavier-membrane")
});

productPage({
  id: "clavier-plat",
  group: "Industrie",
  name: "Clavier plat",
  kicker: "Clavier à membrane",
  title: "Le clavier plat",
  lead: "Aussi appelé clavier Lexan. Idéal pour de nombreuses applications techniques, il s’adapte à tous les supports.",
  crumb: keyboardCrumb("Plat"),
  what: [
    "<p>Le clavier plat est le clavier à membrane classique. Il est obtenu par assemblage de feuilles de polyester ou de polycarbonate et d’adhésif.</p>",
    "<p>Il se compose d’une face supérieure appelée décor ou façade, de circuits souples, et d’entretoises qui séparent les couches. Une limande assure la connexion vers l’équipement électronique.</p>",
    "<p>Souple, étanche et durable, il est réalisé entièrement sur mesure selon vos besoins et vos contraintes d’environnement.</p>"
  ].join(""),
  why: [
    "<p>Le contact se fait par une légère pression sur la touche. On l’utilise surtout là où l’interface doit rester résistante, fine et fiable.</p>",
    "<p>Il peut aussi être personnalisé : certaines fonctions reçoivent une étiquette interchangeable, ce qui simplifie la mise à jour du marquage sans changer tout le clavier. Simple à intégrer, il convient à un large éventail d’applications industrielles.</p>"
  ].join(""),
  related: othersThan("clavier-plat")
});

productPage({
  id: "clavier-coupelles",
  group: "Industrie",
  name: "Clavier à coupelles",
  kicker: "Clavier à membrane",
  title: "Le clavier à coupelles",
  lead: "Le clic qui simplifie la vie. Le best-seller de PIM, avec plus d’un million de coupelles posées par an.",
  crumb: keyboardCrumb("Coupelles"),
  what: [
    "<p>Le clavier à coupelles est un clavier à membrane qui ajoute une vraie sensation tactile. Des coupelles métalliques, disponibles en différentes duretés d’enfoncement, donnent un clic net et identique sur chaque touche.</p>",
    "<p>Ce clic confirme que le contact a bien été établi. Les coupelles peuvent être ajoutées à tous les types de clavier PIM ; elles sont souvent associées à un gaufrage pour guider le doigt et renforcer le relief.</p>"
  ].join(""),
  why: [
    "<p>Le clic confirme l’action ; le relief facilite l’usage. Le clavier reste souple, étanche et fabriqué sur mesure, y compris pour des environnements à fortes contraintes.</p>",
    "<p>On le choisit dès qu’il faut allier résistance et confort d’utilisation. PIM Industrie garantit un million d’actionnements sur les claviers à coupelles.</p>"
  ].join(""),
  related: othersThan("clavier-coupelles")
});

productPage({
  id: "clavier-gaufre",
  group: "Industrie",
  name: "Clavier gaufré",
  kicker: "Clavier à membrane",
  title: "Le clavier gaufré",
  lead: "La praticité du clavier plat, avec le volume en plus.",
  crumb: keyboardCrumb("Gaufré"),
  what: [
    "<p>Dérivé du clavier plat, le clavier gaufré ajoute un décor en volume. Les touches ou d’autres éléments de façade sont formés par une presse, à chaud ou à froid selon le matériau.</p>",
    "<p>Toutes les formes de gaufrage sont possibles : le relief peut servir l’esthétique aussi bien que le confort d’usage. Une couche inférieure avec coupelle peut encore ajouter la sensation tactile du clic.</p>",
    "<p>Comme les autres claviers à membrane PIM, il reste souple, étanche et réalisé sur mesure pour les applications à fortes contraintes.</p>"
  ].join(""),
  why: [
    "<p>Le gaufrage facilite l’utilisation : le doigt trouve plus facilement la touche, même sans regarder. Le contact reste simple à obtenir, avec un aspect plus travaillé qu’un clavier parfaitement plat.</p>",
    "<p>On le choisit lorsque l’interface doit être à la fois résistante, lisible au toucher et soignée visuellement.</p>"
  ].join(""),
  related: othersThan("clavier-gaufre")
});

productPage({
  id: "clavier-retro",
  group: "Industrie",
  name: "Clavier rétroéclairé",
  kicker: "Clavier à membrane",
  title: "Le clavier rétroéclairé",
  lead: "Illuminez votre produit et facilitez son utilisation, même dans un environnement sombre.",
  crumb: keyboardCrumb("Rétroéclairé"),
  what: [
    "<p>Le clavier rétroéclairé est un clavier à membrane éclairé par l’arrière. PIM Industrie intègre une LED de puissance : une diode de petite taille qui diffuse une lumière forte.</p>",
    "<p>Cette LED peut être secondée d’une coupelle spéciale perforée, qui homogénéise l’éclairage sur les zones à illuminer. La lumière passe ensuite par des fenêtres ou des afficheurs découpés dans le support.</p>"
  ].join(""),
  why: [
    "<p>Le rétroéclairage guide l’utilisateur : les touches et symboles restent visibles dans la pénombre, tout en apportant un vrai atout de design.</p>",
    "<p>Pratique et esthétique, cette solution ajoute une touche de lumière au produit sans renoncer à la souplesse et à l’étanchéité du clavier à membrane.</p>"
  ].join(""),
  related: othersThan("clavier-retro")
});

productPage({
  id: "clavier-electro",
  group: "Industrie",
  name: "Clavier électroluminescent",
  kicker: "Clavier à membrane",
  title: "Le clavier électroluminescent",
  lead: "Une lampe électroluminescente développée par PIM, intégrée derrière une face graphique imprimée.",
  crumb: keyboardCrumb("Électroluminescent"),
  what: [
    "<p>Ce clavier combine une lampe électroluminescente et une face graphique imprimée, le décor. La lampe est fabriquée par sérigraphie sur un film polyester souple (Lexan®).</p>",
    "<p>Le phosphore est déposé sur une couche diélectrique, entre deux couches conductrices. Un courant de faible intensité déclenche l’émission de photons : l’énergie électrique devient une lumière froide, uniforme, aussi bien sur surface plane que courbe.</p>",
    "<p>La lampe est développée et fabriquée par PIM, puis incorporée dans le clavier à membrane.</p>"
  ].join(""),
  why: [
    "<p>L’électroluminescence offre un éclairage économique (faible consommation), souple, fin, sans limite de forme ni de couleur.</p>",
    "<p>Aussi lumineux que fonctionnel, le clavier électroluminescent ouvre des possibilités d’esthétique très larges, tout en restant intégré dans une interface industriellement fiable.</p>"
  ].join(""),
  related: othersThan("clavier-electro")
});

productPage({
  id: "clavier-7s",
  group: "Industrie",
  name: "Afficheur 7 segments",
  kicker: "Clavier à membrane",
  title: "Le clavier à afficheur 7 segments",
  lead: "Sept segments, chacun relié à une LED, pour former chiffres, lettres et caractères simples — dans moins de 2 mm d’épaisseur.",
  crumb: keyboardCrumb("Afficheur 7 segments"),
  what: [
    "<p>Un afficheur 7 segments comporte sept segments distincts. Chaque segment correspond à une LED que l’on allume ou éteint pour former des chiffres, des lettres et des caractères simples.</p>",
    "<p>Cette technologie, simple et efficace, est familière : radios-réveils, montres, calculatrices, fours à micro-ondes… PIM l’intègre directement dans ses claviers à membrane, réalisés sur mesure.</p>"
  ].join(""),
  why: [
    "<p>L’afficheur 7 segments améliore nettement la lisibilité de l’interface. Il peut être intégré à tous les claviers à membrane PIM, sans contrainte de taille, de forme ou de couleur.</p>",
    "<p>Résultat : une solution d’affichage pratique, claire et fiable, dans moins de 2 mm d’épaisseur, au plus près des touches.</p>"
  ].join(""),
  related: othersThan("clavier-7s")
});

productPage({
  id: "clavier-capacitif",
  group: "Industrie",
  name: "Clavier capacitif",
  kicker: "Clavier à membrane",
  title: "Le clavier capacitif",
  lead: "Une interface à zones sensibles, à ne pas confondre avec l’écran tactile capacitif (dalle).",
  crumb: keyboardCrumb("Capacitif"),
  what: [
    "<p>Il faut distinguer deux types d’interfaces : l’écran tactile capacitif (dalle) et le clavier capacitif. PIM conçoit le second.</p>",
    "<p>Le clavier capacitif est un clavier à membrane qui utilise une technologie semi-conductrice. Il n’y a pas de touches mécaniques : des zones définies à l’avance réagissent au faible courant électrique du doigt.</p>",
    "<p>Comme un clavier à membrane classique, il comporte une face décor et un circuit. La face avant doit être non conductrice (verre, polyester ou polycarbonate) et peut être sérigraphiée. Derrière, un circuit souple sérigraphié porte les électrodes qui forment les « touches ».</p>"
  ].join(""),
  why: [
    "<p>PIM recommande une façade en verre trempé de 3,0 mm ou plus : elle résiste à une utilisation intensive. Sans usure mécanique des touches, le rendement de cette technologie tactile ne se dégrade pas avec le temps.</p>",
    "<p>Des solutions de rétroéclairage peuvent être ajoutées. Les touches n’offrent pas de sensation mécanique : un beeper (bip sonore) est essentiel pour confirmer l’activation.</p>",
    "<p>Le clavier doit être paramétré selon l’environnement : temps de réponse, sensibilité d’activation, etc. PIM vous accompagne dans le choix du capteur capacitif adapté à vos besoins et contraintes.</p>"
  ].join(""),
  related: othersThan("clavier-capacitif")
});

productPage({
  id: "clavier-elastomere",
  group: "Industrie",
  name: "Clavier élastomère",
  kicker: "Clavier à membrane",
  title: "Le clavier élastomère",
  lead: "Une membrane en silicone, aussi appelée clavier en silicone : robuste, isolante et entièrement personnalisable.",
  crumb: keyboardCrumb("Élastomère"),
  what: [
    "<p>Le clavier élastomère est formé d’une nappe de silicone déposée sur une feuille de Lexan imprimée (circuit souple). Une limande souple assure la connexion vers l’équipement électronique.</p>",
    "<p>Tout est sur mesure : couleurs, formes de clavier et de touches, reliefs et creux dans la matière. La couleur peut être teintée dans la masse ou surmoulée ; les textes et logos sont réalisés en sérigraphie ou par gravure laser.</p>",
    "<p>La membrane silicone, extrêmement résistante, offre une durée de vie exceptionnelle à l’interface.</p>"
  ].join(""),
  why: [
    "<p>On le choisit pour des applications qui demandent une interface très robuste et isolante, ou lorsque l’esthétique compte autant que la fonction.</p>",
    "<p>Souple, résistant et personnalisable (couleur, forme, taille des caractères ou logos), le clavier élastomère s’intègre là où un clavier à membrane classique ne suffit pas.</p>"
  ].join(""),
  related: othersThan("clavier-elastomere")
});

productPage({
  id: "clavier-etanche",
  group: "Industrie",
  name: "Clavier étanche",
  kicker: "Industrie",
  title: "Le clavier étanche",
  lead: "Tous nos claviers sont étanches, grâce à des procédés certifiés IP65.",
  crumb: [["Accueil", "accueil"], ["Industrie", "technologies"], ["Clavier étanche"]],
  what: [
    "<p>L’indice de protection (IP) indique le niveau d’étanchéité du matériel face aux solides et aux liquides. La norme couvre une large échelle : il faut donc bien analyser les conditions d’usage et l’environnement réel.</p>",
    "<p>Les claviers PIM sont construits sur mesure pour répondre aux exigences demandées. Par défaut, ils sont classés IP65.</p>"
  ].join(""),
  why: [
    "<p>Quel que soit le secteur — industriel, médical, logistique, transport… — un équipement doit rester efficace face à la poussière et aux projections d’eau.</p>",
    "<p>IP65 signifie : hermétique à la poussière et protégé contre les jets d’eau venant de toutes les directions. C’est la base commune de la gamme de claviers à membrane PIM.</p>"
  ].join(""),
  related: othersThan("clavier-etanche")
});

productPage({
  id: "circuit-flexible",
  group: "Industrie",
  name: "Circuit flexible",
  kicker: "Industrie",
  title: "Le circuit flexible",
  lead: "Un circuit imprimé souple, pour le chauffage, les batteries, les résistances ou les capteurs.",
  crumb: [["Accueil", "accueil"], ["Industrie", "technologies"], ["Circuit flexible"]],
  what: [
    "<p>Le circuit flexible (ou circuit imprimé souple) est un composant technique : une piste en encre argent est imprimée sur un film polyester ou polycarbonate.</p>",
    "<p>Ce circuit souple peut recevoir un contact touche et se raccorde facilement grâce à une limande. Il se substitue à la carte imprimée rigide partout où la forme, le poids ou la flexibilité comptent.</p>"
  ].join(""),
  why: [
    "<p>Plus pratique à intégrer qu’un circuit rigide, il épouse les équipements et répond aux exigences de robustesse et de souplesse des nouvelles technologies.</p>",
    "<p>Applications typiques de l’électronique imprimée : batteries, circuits chauffants, capteurs souples — et, plus largement, tout produit où le circuit doit rester léger et adaptable.</p>"
  ].join(""),
  extra: "<h2>Applications de l’électronique imprimée</h2><ul class=\"clean\"><li>Batterie</li><li>Circuit chauffant</li><li>Capteur souple</li></ul>",
  related: [["Clavier à membrane", "clavier-membrane"], ["Clavier capacitif", "clavier-capacitif"], ["Face avant plastique", "face-avant-plastique"], ["Signalétique lumineuse", "signaletique"]]
});

productPage({
  id: "face-avant-plastique",
  group: "Industrie",
  name: "Face avant plastique",
  kicker: "Industrie",
  title: "La face avant plastique",
  lead: "Aussi appelée insert plastique : un décor sérigraphié qui joue le rôle d’étiquette ou de façade du produit.",
  crumb: [["Accueil", "accueil"], ["Industrie", "technologies"], ["Face avant plastique"]],
  what: [
    "<p>La face avant plastique est un décor souple sérigraphié sur une feuille de polyester ou de polycarbonate. Un adhésif à l’arrière permet de l’appliquer sur tout support.</p>",
    "<p>Tout est personnalisable : couleurs, formes, marquage. Disponible à partir de 150 µm d’épaisseur, elle peut aussi recevoir des reliefs (cloquage, guide-doigt…) et des fenêtres pour faciliter l’usage du décor.</p>"
  ].join(""),
  why: [
    "<p>On l’utilise pour l’esthétique, mais aussi pour informer (étiquetage) et pour protéger le support.</p>",
    "<p>Souplesse, robustesse et facilité d’intégration : la face avant plastique habille le produit tout en restant simple à poser en production.</p>"
  ].join(""),
  related: [["Étiquette plastique", "etiquette-plastique"], ["Clavier plat", "clavier-plat"], ["Façade et insert métallique", "facade-metallique"]]
});

productPage({
  id: "facade-metallique",
  group: "Industrie",
  name: "Façade et insert métallique",
  kicker: "Industrie",
  title: "La façade et l’insert métallique",
  lead: "Plaque constructeur, plaque d’identification ou de conformité : l’insert métal a une place centrale dans l’industrie.",
  crumb: [["Accueil", "accueil"], ["Industrie", "technologies"], ["Façade et insert métallique"]],
  what: [
    "<p>La face avant métallique est une étiquette imprimée, fixée par adhésif arrière ou par perforation, applicable sur tout support.</p>",
    "<p>Elle est réalisée sur mesure selon vos contraintes : couleur, forme, épaisseur. Supports disponibles : aluminium, acier inox ou laiton, avec diverses finitions. Un embossage jusqu’à 1 mm permet une mise en relief nette.</p>"
  ].join(""),
  why: [
    "<p>Son rôle principal est l’information : identifier un produit, une machine, un équipement ou une marque, ou porter des mentions obligatoires.</p>",
    "<p>La plaque constructeur, par exemple, assure la traçabilité légale et doit résister à des conditions difficiles. Autres usages : plaque d’identification d’équipement ou d’outillage, plaque de tare, plaque de conformité électrique, plaque de certification (type CE).</p>",
    "<p>Elle peut aussi servir à des fins esthétiques — voir la gamme d’étiquettes décoratives PIM.</p>"
  ].join(""),
  related: [["Face avant plastique", "face-avant-plastique"], ["Gravure", "process-gravure"], ["Étiquette métal vins", "etiquette-vins"]]
});
