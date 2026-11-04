/* Photo et réponses propres à chaque couple produit × domaine.
   Une fiche, une adresse. Le domaine ne change que la photo et les réponses. */

const DOMAIN_QA = {
  medical: [
    "Peut-on désinfecter la face ?",
    "Est-elle étanche au nettoyage ?",
    "Peut-elle suivre mon boîtier ?"
  ],
  nautique: [
    "Résiste-t-elle aux embruns et aux jets d’eau ?",
    "Reste-t-elle utilisable dehors ?",
    "Comment se raccorde-t-elle au bord ?"
  ],
  aeronautique: [
    "Reste-t-elle lisible si le poste est sombre ?",
    "Tient-elle un environnement exigeant ?",
    "Chaque pièce est-elle contrôlée ?"
  ],
  automobile: [
    "S’intègre-t-elle à un équipement automobile ?",
    "Le marquage tient-il ?",
    "Peut-on l’adapter à la forme du boîtier ?"
  ],
  automatisation: [
    "L’opérateur a-t-il un retour clair ?",
    "La face reste-t-elle lisible sur le pupitre ?",
    "Peut-on y ajouter éclairage ou afficheur ?"
  ],
  machines: [
    "La commande tient-elle l’atelier ?",
    "S’associe-t-elle à la plaque constructeur ?",
    "La face est-elle fermée aux projections ?"
  ],
  electronique: [
    "Le circuit fait-il partie de la pièce ?",
    "Peut-on y reporter des LED ou des CMS ?",
    "Comment se connecte-t-elle à la carte ?"
  ],
  transports: [
    "La face tient-elle les lavages ?",
    "Reste-t-elle lisible en cabine ?",
    "L’identification de l’équipement est-elle à part ?"
  ]
};

function row(file, caption, lead, answers, points, questions) {
  return { file: file, caption: caption, lead: lead, answers: answers, points: points, questions: questions || null };
}

/* Questions propres à certains produits (circuit, façade, etc.), quand celles du domaine ne tombent pas juste. */
const Q_CIRCUIT = ["Peut-il épouser la forme du boîtier ?", "Peut-on y reporter des LED ou des CMS ?", "Comment se raccorde-t-il à l’équipement ?"];
const Q_FACE = ["Peut-on la marquer et la colorer sur mesure ?", "Peut-elle recevoir une fenêtre ou un relief ?", "Comment se pose-t-elle ?"];
const Q_FACADE = ["Quels métaux et quelles finitions ?", "Le marquage tient-il dans le temps ?", "Comment se fixe-t-elle ?"];
const Q_RETRO = ["Reste-t-il lisible dans un poste sombre ?", "L’éclairage change-t-il l’étanchéité ?", "Peut-on choisir les zones éclairées ?"];

const PRODUCT_DOMAIN = {
  "clavier-plat": {
    medical: row("domaine-medical-plat.jpg", "Clavier plat essuyé sur un appareil de laboratoire.", "En médical, le clavier plat est la face la plus simple à désinfecter : rien ne dépasse.", [
      "Oui. La face est plane, sans relief ni bord de touche. Le chiffon passe d’un geste, sans zone où le liquide resterait.",
      "Oui. Il est annoncé IP65, comme les autres claviers à membrane PIM : poussière et jets d’eau, y compris au lavage de l’appareil.",
      "Oui. Polyester ou polycarbonate, dès 0,5 mm, découpé à la forme du boîtier. La limande rejoint l’électronique de l’appareil."
    ], ["Face lisse", "IP65", "Découpe à la forme du boîtier"]),
    nautique: row("domaine-nautique-plat.jpg", "Clavier plat affleurant sur une console de bord.", "Sur une console de bord, le clavier plat ferme la face : l’eau ne trouve pas de relief où rester.", [
      "Oui. Face scellée, IP65. Il n’y a pas de touche en volume : embruns et jets d’eau restent en surface.",
      "Le décor est imprimé sur la face, lisible de jour. Pour un poste de nuit, la variante rétroéclairée est plus adaptée.",
      "Une limande souple sort du clavier et se connecte à l’électronique de bord."
    ], ["Face affleurante", "IP65", "Limande"]),
    aeronautique: row("domaine-aeronautique-plat.jpg", "Clavier plat fin sur un pupitre d’équipement.", "Le clavier plat reste fin là où chaque millimètre compte. S’il faut lire dans le noir, une autre variante éclaire la face.", [
      "La face elle-même n’éclaire pas. Pour un poste sombre, partez du clavier rétroéclairé ou électroluminescent, sur la même base membrane.",
      "Il est étanche IP65 et fabriqué sur mesure. Il ne remplace pas une façade métal quand il faut une plaque d’identification.",
      "Oui. Chaque pièce est testée électriquement avant expédition, dans un atelier ISO 9001."
    ], ["Faible épaisseur", "IP65", "Test de chaque pièce"]),
    automobile: row("domaine-automobile-plat.jpg", "Clavier plat sur un boîtier d’équipement automobile.", "Le clavier plat habille une commande : faible épaisseur, forme libre, décor imprimé. La plaque métal, elle, est une autre pièce.", [
      "Oui. Il se pose sur le boîtier, sans ajouter de mécanique ni de course de touche.",
      "Le décor est imprimé sur polyester ou polycarbonate. Pour une plaque constructeur gravée, il faut la façade métallique.",
      "Oui. Découpe à la forme du boîtier, limande vers l’électronique."
    ], ["Faible épaisseur", "Décor imprimé", "Forme du boîtier"]),
    automatisation: row("domaine-automatisation-plat.jpg", "Clavier plat sur un pupitre de machine.", "Sur un pupitre, le clavier plat convient quand il faut une face résistante et un contact par simple pression, sans clic.", [
      "Le contact se fait par une légère pression. Il n’y a pas le clic des coupelles. Si l’opérateur doit sentir la touche, même avec des gants, prenez le clavier à coupelles.",
      "Le décor porte les repères. S’il faut lire dans un atelier sombre, le rétroéclairage se prévoit sur la variante éclairée.",
      "L’afficheur 7 segments est une autre construction. Le plat reste la face simple et fine."
    ], ["Pression légère", "Sans clic", "Face fine"]),
    machines: row("domaine-machines-plat.jpg", "Clavier plat à côté d’une plaque machine.", "Le clavier plat commande la machine quand la face doit rester fine, fermée et sans pièce mobile.", [
      "Oui. Face IP65 : poussière et projections d’atelier ne passent pas sous des touches, puisqu’il n’y en a pas en volume.",
      "Il se pose à côté de la plaque constructeur. La plaque est une pièce métal séparée.",
      "Oui. Face fermée, annoncée IP65, testée avant expédition."
    ], ["IP65", "Sans pièce mobile", "À côté de la plaque"]),
    electronique: row("domaine-electronique-plat.jpg", "Clavier plat et sa limande, sur un poste électronique.", "Le clavier plat emporte son circuit : la face imprimée et la limande forment une seule pièce.", [
      "Oui. Les circuits souples sont sous le décor. La limande sort vers la carte.",
      "Des LED ou des CMS peuvent être prévus au plan. La pose robotisée est décrite sur la fiche Reports de composants.",
      "Par la limande, en connexion directe sur l’équipement."
    ], ["Circuit intégré", "Limande", "LED possibles"]),
    transports: row("domaine-transports-plat.jpg", "Clavier plat affleurant sur un poste de conduite.", "En cabine, le clavier plat offre une face fermée, simple à laver, sans touche qui accroche.", [
      "Oui. Face plane, IP65, compatible avec les lavages du poste.",
      "Le décor imprimé se lit en cabine éclairée. Si la cabine est sombre, le rétroéclairage est l’option à demander.",
      "Oui. La plaque d’identification est une pièce métal à part. Le clavier porte la commande."
    ], ["Face plane", "IP65", "Plaque à part"])
  },
  "clavier-etanche": {
    medical: row("domaine-medical-etanche.jpg", "Clavier étanche : l’eau perle sur l’appareil de laboratoire.", "Quand l’appareil se lave vraiment, c’est la construction étanche que l’on retient : la face reste close.", [
      "Oui. La face est fermée. On l’essuie ; le liquide ne s’infiltre pas au joint de la commande.",
      "Oui. IP65 : poussière et jets d’eau. C’est le point de cette variante, au-delà du simple clavier plat.",
      "Oui. Elle se découpe à la forme du boîtier et se raccorde par limande."
    ], ["IP65", "Jets d’eau", "Face close"]),
    nautique: row("domaine-nautique-etanche.jpg", "Clavier étanche sur une console exposée aux embruns.", "Dès que le poste prend les embruns, cette variante est celle qu’on ouvre : la face est faite pour les jets d’eau.", [
      "Oui. IP65, face fermée. Les embruns perlent, ils ne passent pas dans la commande.",
      "Le décor reste celui que vous définissez. De nuit, associez un rétroéclairage si le barreur ne doit pas allumer la cabine.",
      "Limande souple vers l’électronique de bord."
    ], ["IP65", "Embruns", "Face fermée"]),
    machines: row("domaine-machines-etanche.jpg", "Clavier étanche sur un pupitre d’atelier.", "Huile, poussière, nettoyage de la machine : la face étanche protège la commande.", [
      "Elle encaisse les projections d’atelier. La face est fermée, annoncée IP65.",
      "Elle se place à côté de la plaque constructeur, qui reste une pièce métal.",
      "Oui. Rien n’est ouvert vers l’intérieur du pupitre au niveau de la commande."
    ], ["IP65", "Atelier", "Face fermée"]),
    transports: row("domaine-transports-etanche.jpg", "Clavier étanche essuyé sur un poste de conduite.", "Les lavages de cabine et les projections imposent une face close, pas une commande ouverte.", [
      "Oui. IP65, face fermée, compatible avec le lavage du poste.",
      "Le décor imprimé porte les repères. Le rétroéclairage se demande si la cabine travaille de nuit.",
      "La plaque de conformité est une autre pièce. Le clavier ne la remplace pas."
    ], ["IP65", "Lavage", "Face fermée"])
  },
  "clavier-coupelles": {
    medical: row("domaine-medical-coupelles.jpg", "Clavier à coupelles sur un appareil : le doigt sent le clic.", "Le clic confirme la touche, même avec un gant. Si le lavage est la contrainte principale, la face plate reste plus directe.", [
      "On l’essuie, et l’ensemble est IP65. Le relief des coupelles retient davantage qu’une face parfaitement plane : pour un lavage très fréquent, comparez avec le clavier plat.",
      "Oui, IP65. L’étanchéité ne dépend pas du clic : la face membrane reste fermée.",
      "Oui. Forme du boîtier sur mesure, limande vers l’appareil. PIM garantit un million d’actionnements sur les claviers à coupelles."
    ], ["Clic", "IP65", "Un million d’actionnements"]),
    nautique: row("domaine-nautique-coupelles.jpg", "Clavier à coupelles sur une console de bord.", "En mer, le clic évite de quitter des yeux le cap : le doigt confirme la touche.", [
      "Oui. La construction reste IP65. Le clic est sous la face, l’eau ne rentre pas par la coupelle.",
      "Le relief aide à trouver la touche sans la regarder. De nuit, ajoutez le rétroéclairage si besoin.",
      "Limande vers l’électronique de bord."
    ], ["Clic", "IP65", "Touche trouvable au doigt"]),
    automatisation: row("domaine-automatisation-coupelles.jpg", "Clavier à coupelles sur un pupitre : le clic confirme la touche.", "C’est la variante du pupitre : le clic dit à l’opérateur que la commande est prise.", [
      "Oui. Coupelle métallique, clic net, y compris avec des gants. Un million d’actionnements garantis.",
      "Le décor et le relief guident la main. Le rétroéclairage peut s’ajouter si le poste est sombre.",
      "L’afficheur 7 segments est une option distincte, souvent sur le même pupitre."
    ], ["Clic net", "Gants", "Un million d’actionnements"]),
    machines: row("domaine-machines-coupelles.jpg", "Clavier à coupelles sur un pupitre de machine.", "En atelier, le clic confirme la commande, même avec des gants et sans quitter la machine des yeux.", [
      "Oui. Coupelle métallique, clic net, face annoncée IP65. Les projections d’atelier restent en surface.",
      "Il se pose à côté de la plaque constructeur. La plaque est une pièce métal séparée.",
      "Oui. La face membrane est fermée. Le clic est sous la face, ce n’est pas une ouverture."
    ], ["Clic net", "IP65", "À côté de la plaque"])
  },
  "clavier-gaufre": {
    medical: row("domaine-medical-gaufre.jpg", "Clavier gaufré : le doigt trouve la touche sur l’appareil.", "Le gaufrage guide le doigt. La face reste fermée, mais le relief se nettoie moins vite qu’un clavier parfaitement plat.", [
      "Oui, on l’essuie. Le relief aide le toucher et retient un peu plus le liquide qu’une face plane. Si la désinfection prime, le clavier plat est le bon réflexe.",
      "Oui, IP65. Le gaufrage est formé dans la face, ce n’est pas une ouverture.",
      "Oui. La forme du relief se définit avec le boîtier : touche, fenêtre, repère."
    ], ["Relief au doigt", "IP65", "Face toujours fermée"]),
    nautique: row("domaine-nautique-gaufre.jpg", "Clavier gaufré sur une console : la touche se trouve sans la regarder.", "Le relief permet de trouver la commande sans quitter le plan d’eau des yeux.", [
      "Oui. Face fermée IP65. Le gaufrage ne crée pas d’entrée d’eau.",
      "On trouve la touche au toucher, utile par mer formée. De nuit, le rétroéclairage complète le relief.",
      "Limande souple vers l’électronique de bord."
    ], ["Repère au toucher", "IP65", "Limande"]),
    automatisation: row("domaine-automatisation-gaufre.jpg", "Clavier gaufré sur un pupitre : le doigt trouve la touche.", "Le relief guide la main sur le pupitre. Le clic des coupelles, lui, est une autre variante.", [
      "Le gaufrage se sent au doigt. Il n’y a pas le clic des coupelles. S’il faut un retour franc, prenez le clavier à coupelles.",
      "Le décor et le relief portent les repères. Le rétroéclairage peut s’ajouter si le poste est sombre.",
      "L’afficheur 7 segments est une autre construction. Le gaufrage reste un repère dans la face."
    ], ["Relief au doigt", "Pupitre", "Face fermée"]),
    machines: row("domaine-machines-gaufre.jpg", "Clavier gaufré sur un pupitre de machine.", "Le relief permet de trouver la commande sans la regarder, sur une face qui reste fermée.", [
      "Oui. Face IP65, relief formé dans la membrane. La poussière ne passe pas sous des touches ouvertes.",
      "Il se pose à côté de la plaque constructeur, qui reste une pièce métal.",
      "Oui. Le gaufrage n’ouvre pas la face. Elle est annoncée IP65."
    ], ["Relief au doigt", "IP65", "À côté de la plaque"])
  },
  "clavier-capacitif": {
    medical: row("domaine-medical-capacitif.jpg", "Face capacitive lisse sur un appareil médical.", "Aucune pièce mobile : la face est continue, donc simple à désinfecter.", [
      "Oui. Il n’y a ni coupelle ni bord de touche. C’est une face continue, faite pour être essuyée.",
      "La face est close. On la spécifie selon l’environnement de l’appareil ; le principe reste une surface sans ouverture.",
      "Oui. Elle suit le boîtier. Le circuit est dans la pièce, pas à côté."
    ], ["Face continue", "Sans pièce mobile", "Essuyage"]),
    electronique: row("domaine-electronique-capacitif.jpg", "Clavier capacitif et son circuit, sans contact mécanique.", "La commande capacitive se passe de coupelle : le circuit souple porte la fonction.", [
      "Oui. Pas de contact mécanique. Le circuit souple est dans la face.",
      "Des LED peuvent jalonner la face. Les CMS se prévoient au plan, posés à part si le dossier le demande.",
      "Par la limande ou le circuit qui sort de la face, vers la carte."
    ], ["Sans contact mécanique", "Circuit souple", "Face continue"])
  },
  "clavier-retro": {
    medical: row("domaine-medical-retro.jpg", "Clavier rétroéclairé sur un appareil en lumière faible.", "On le choisit quand l’appareil se règle dans une pièce peu éclairée : les symboles restent lisibles.", [
      "Oui. La face membrane s’essuie. L’éclairage est derrière, il ne crée pas de trou dans la face.",
      "Oui, IP65. Le rétroéclairage ne change pas l’étanchéité de la construction membrane.",
      "Oui. LED de puissance intégrée, forme du boîtier sur mesure, zones éclairées définies au plan."
    ], ["Symboles lisibles", "IP65", "LED derrière la face"]),
    nautique: row("domaine-nautique-retro.jpg", "Clavier rétroéclairé sur une console de bord, de nuit.", "De nuit, au poste de barre, les symboles doivent se lire sans éblouir le barreur.", [
      "Oui. Même construction fermée IP65. La lumière vient de l’arrière de la face.",
      "C’est la variante faite pour ça : symboles éclairés, poste sombre, mer noire autour.",
      "Limande vers l’électronique de bord. Les zones éclairées se dessinent avec vous."
    ], ["Usage de nuit", "IP65", "Symboles éclairés"])
  },
  "clavier-elastomere": {
    nautique: row("domaine-nautique-elastomere.jpg", "Touches élastomère en relief sur une console de bord.", "Les touches en élastomère ont un vrai relief. On les choisit pour une commande franche, pas pour une face parfaitement lisse.", [
      "La face membrane autour peut être IP65. Le relief élastomère est plus exposé qu’un clavier plat : s’il faut essuyer d’un seul geste, le plat est plus simple.",
      "Le relief se trouve à la main, par mer agitée. C’est son intérêt.",
      "La pièce se raccorde à l’électronique du bord selon le plan de connexion."
    ], ["Touches en relief", "Commande franche", "Milieu humide"])
  },
  "face-avant-plastique": {
    medical: row("domaine-medical-face.jpg", "Face avant plastique sur un appareil de laboratoire.", "La face avant ferme l’appareil : décor, fenêtre d’affichage, et parfois les commandes dans la même pièce.", [
      "Oui. C’est une face imprimée continue, essuyable, qui habille le boîtier.",
      "Elle ferme l’appareil. L’étanchéité de la commande, si une commande membrane y est associée, se traite avec le clavier.",
      "Oui. Découpe à la forme, fenêtres pour l’écran, marquage lisible."
    ], ["Décor imprimé", "Fenêtre d’affichage", "Boîtier"]),
    automobile: row("domaine-automobile-face.jpg", "Face avant plastique sur un équipement automobile.", "Habillage plastique d’une commande ou d’un équipement : forme, couleur et marquage sur mesure.", [
      "Oui. Couleurs, formes et marquage sont personnalisables, en sérigraphie sur polyester ou polycarbonate.",
      "Oui. Fenêtre pour un afficheur, relief de type cloquage ou guide-doigt, selon le plan.",
      "Un adhésif à l’arrière permet de la poser sur le support, sans autre fixation."
    ], ["Marquage", "Forme sur mesure", "Habillage"], Q_FACE),
    automatisation: row("domaine-automatisation-face.jpg", "Face avant plastique d’un pupitre de machine.", "La face avant du pupitre aligne touches, voyants et fenêtre d’afficheur.", [
      "Oui. Repères de touches, voyants et zones de couleur sont imprimés sur la face, aux cotes du pupitre.",
      "Oui. Fenêtre pour l’afficheur, guide-doigt ou cloquage pour repérer les touches au doigt.",
      "Par adhésif arrière sur le pupitre. La face avant habille : la commande elle-même relève du clavier à membrane."
    ], ["Pupitre", "Fenêtre d’afficheur", "Repères de touches"], Q_FACE),
    transports: row("domaine-transports-face.jpg", "Face avant plastique sur un équipement de transport.", "Face avant pour un équipement de transport, avec le marquage utile à l’opérateur.", [
      "Oui. Marquage et couleurs sur mesure, imprimés en sérigraphie.",
      "Oui. Fenêtre ou relief selon l’équipement.",
      "Par adhésif arrière. La plaque de conformité métal reste une pièce à part."
    ], ["Marquage", "Équipement de transport", "Sur mesure"], Q_FACE)
  },
  "circuit-flexible": {
    medical: row("domaine-medical-circuit.jpg", "Circuit souple qui sort d’un appareil médical.", "Le circuit souple relie la face à l’électronique, dans l’épaisseur qu’il reste dans l’appareil.", [
      "Le circuit est sous la face ou en sort par la limande. Ce n’est pas lui qu’on désinfecte : c’est la face au-dessus.",
      "Il se loge dans le boîtier. L’étanchéité visible, c’est celle de la face membrane IP65.",
      "Oui. Il épouse le volume disponible et se connecte directement à la carte."
    ], ["Faible épaisseur", "Limande", "Sous la face"], ["Est-ce lui qu’on désinfecte ?", "Reste-t-il étanche dans l’appareil ?", "Peut-il épouser le volume disponible ?"]),
    automobile: row("domaine-automobile-circuit.jpg", "Circuit souple qui épouse un boîtier automobile.", "Un circuit souple suit la forme du boîtier quand une carte rigide ne passe pas.", [
      "Oui. Piste en encre argent sur film polyester ou polycarbonate : il suit le volume là où une carte rigide ne passe pas.",
      "Oui. Il peut recevoir un contact touche ; LED et CMS se prévoient au plan, avec pose robotisée.",
      "Par une limande souple, en connexion directe sur l’équipement."
    ], ["Forme libre", "Faible épaisseur", "Connexion directe"], Q_CIRCUIT),
    electronique: row("domaine-electronique-circuit.jpg", "Circuit souple et ses composants, sur un poste électronique.", "Encre argent sur film, puis CMS et LED reportés : le circuit porte l’électronique de l’interface.", [
      "Oui. Il se substitue à la carte rigide partout où la forme, le poids ou la flexibilité comptent.",
      "Oui. LED et CMS se reportent au plan. La pose robotisée est décrite sur la fiche Reports de composants.",
      "Par une limande souple vers la carte électronique."
    ], ["Encre argent", "CMS et LED", "Électronique imprimée"], Q_CIRCUIT)
  }
};

/* Domaines ajoutés pour couvrir toutes les fiches (sans photo dédiée pour l’instant). */
const PRODUCT_DOMAIN_MORE = {
  "facade-metallique": {
    aeronautique: row("domaine-aeronautique-facade.jpg", "Plaque métal sur un équipement d’aéronautique.", "Façade ou insert métal pour identifier un équipement et habiller une face exposée.", [
      "Aluminium, acier inox ou laiton, avec diverses finitions. Couleur, forme et épaisseur sont sur mesure.",
      "Elle porte l’identification et les mentions obligatoires, donc elle doit résister. Gravure ou embossage (jusqu’à 1 mm) selon le marquage voulu.",
      "Par adhésif arrière ou par perforation, sur tout support."
    ], ["Insert métal", "Identification", "Sur mesure"], Q_FACADE),
    automobile: row("domaine-automobile-facade.jpg", "Plaque métal gravée sur une pièce automobile.", "Plaque d’identification ou habillage métal d’une pièce automobile.", [
      "Aluminium, acier inox ou laiton, avec diverses finitions, sur mesure.",
      "Le marquage est gravé ou embossé dans le métal : il sert à identifier la pièce dans la durée.",
      "Par adhésif arrière ou par perforation, sur tout support."
    ], ["Plaque d’identification", "Métal", "Marquage durable"], Q_FACADE),
    machines: row("domaine-machines-facade.jpg", "Plaque constructeur rivetée sur une machine.", "Plaque constructeur, plaque d’outillage ou plaque de conformité : l’identité de la machine.", [
      "Aluminium, acier inox ou laiton, avec diverses finitions. Couleur, forme et épaisseur sur mesure.",
      "La plaque constructeur assure la traçabilité légale et doit résister à des conditions difficiles : on choisit le procédé avec vous.",
      "Par adhésif arrière ou par perforation (rivet, vis), sur tout support. Elle se pose à côté du clavier, qui est une autre pièce."
    ], ["Plaque constructeur", "Plaque de conformité", "Outillage"], Q_FACADE),
    nautique: row("", "", "Plaque métal pour identifier un équipement exposé à l’humidité.", [
      "Aluminium, acier inox ou laiton. Pour un milieu humide, le métal et la finition se définissent selon l’exposition.",
      "Le marquage est gravé ou embossé dans le métal, plus durable qu’une impression de surface.",
      "Par adhésif arrière ou par perforation, sur tout support."
    ], ["Identification", "Métal", "Marquage durable"], Q_FACADE),
    transports: row("domaine-transports-facade.jpg", "Plaque métal dans un équipement de transport.", "Plaque de conformité ou d’identification pour un équipement de transport.", [
      "Aluminium, acier inox ou laiton, avec diverses finitions, sur mesure.",
      "Plaque de conformité électrique, de certification (type CE) ou d’identification : elle doit durer autant que l’équipement.",
      "Par adhésif arrière ou par perforation. Elle reste distincte du clavier."
    ], ["Plaque de conformité", "Identification", "Métal"], Q_FACADE)
  },
  "clavier-retro": {
    aeronautique: row("domaine-aeronautique-retro.jpg", "Clavier rétroéclairé dans un poste sombre.", "Les touches restent lisibles dans un poste sombre, sans quitter la construction du clavier à membrane.", [
      "Oui. Des LED de puissance éclairent les symboles par l’arrière.",
      "Non. L’éclairage est derrière la face : la construction membrane reste fermée, IP65.",
      "Oui. Les zones éclairées se définissent au plan, avec vous."
    ], ["LED de puissance", "Postes sombres", "Touches lisibles"], Q_RETRO),
    automatisation: row("domaine-automatisation-retro.jpg", "Clavier rétroéclairé sur un pupitre peu éclairé.", "Le rétroéclairage guide l’opérateur sur le pupitre quand l’atelier est peu éclairé.", [
      "Oui. Les symboles restent visibles quand l’éclairage de l’atelier baisse.",
      "Non. Le rétroéclairage est derrière la face, la construction reste IP65.",
      "Oui. Seules les touches utiles à l’opérateur peuvent être éclairées."
    ], ["Guidage des touches", "Pupitre", "LED"], Q_RETRO),
    transports: row("domaine-transports-retro.jpg", "Clavier rétroéclairé dans une cabine de nuit.", "Le rétroéclairage garde la commande lisible dans une cabine ou un local technique.", [
      "Oui. Les symboles s’éclairent par l’arrière, utile pour une cabine de nuit.",
      "Non. La lumière est derrière la face, qui reste fermée, IP65.",
      "Oui. Les zones éclairées sont définies avec vous, au plan."
    ], ["Cabine", "Symboles lisibles", "LED"], Q_RETRO)
  },
  "clavier-elastomere": {
    machines: row("", "", "Le clavier élastomère encaisse les sollicitations d’une commande de machine.", [
      "Oui. La membrane silicone est extrêmement résistante et isolante, avec une durée de vie exceptionnelle.",
      "Oui. Couleur teintée dans la masse ou surmoulée, forme des touches, reliefs et creux ; textes en sérigraphie ou gravure laser.",
      "Une limande souple assure la connexion vers l’équipement électronique."
    ], ["Touches en relief", "Commande machine", "Sur mesure"], ["Tient-il une commande de machine ?", "Peut-on choisir couleur et relief ?", "Comment se raccorde-t-il ?"])
  },
  "clavier-electro": {
    aeronautique: row("", "", "La lampe électroluminescente, sérigraphiée par PIM, éclaire la face de façon uniforme, plane ou courbe.", [
      "Oui. La lampe éclaire la face de façon uniforme, en lumière froide.",
      "Oui. L’éclairage se réalise sur une forme plane ou courbe.",
      "La consommation est faible. Le dimensionnement précis se voit avec votre équipement."
    ], ["Lumière froide", "Faible consommation", "Forme libre"], ["Est-il lisible dans le noir ?", "S’adapte-t-il à une face courbe ?", "Quelle consommation ?"])
  },
  "clavier-7s": {
    automatisation: row("", "", "L’afficheur 7 segments, dans moins de 2 mm, donne une valeur lue directement sur le clavier.", [
      "Oui. Chaque segment est relié à une LED : chiffres, lettres et caractères simples s’affichent sur le clavier.",
      "Moins de 2 mm, au plus près des touches.",
      "Il s’intègre à tous les claviers à membrane PIM, sans contrainte de taille, de forme ou de couleur."
    ], ["Moins de 2 mm", "Chiffres lisibles", "Intégré au clavier"], ["L’opérateur lit-il une valeur directement ?", "Quelle épaisseur ?", "S’intègre-t-il à n’importe quel clavier ?"])
  }
};

const MEMBRANE_QA = {
  medical: row("", "", "Le clavier à membrane se nettoie et reste étanche. S’il faut une face sans aucun relief, demandez la version plate.", [
    "Oui. Face polyester ou polycarbonate, essuyable. La version plate est la plus simple à désinfecter ; les coupelles ajoutent un relief.",
    "Oui. Tous les claviers à membrane PIM sont annoncés IP65.",
    "Oui. Forme du boîtier, décor et limande sont sur mesure. Chaque pièce est testée avant expédition."
  ], ["IP65", "Face nettoyable", "Test de chaque pièce"]),
  nautique: row("", "", "La même pièce se ferme pour le bord : l’eau reste dehors, la limande rejoint l’électronique.", [
    "Oui. IP65 : embruns et jets d’eau. La version étanche est celle qu’on ouvre si le poste est vraiment exposé.",
    "De jour, le décor imprimé suffit. De nuit, passez au rétroéclairé.",
    "Par une limande souple, vers l’électronique de bord."
  ], ["IP65", "Embruns", "Limande"]),
  aeronautique: row("", "", "Le clavier reste fin. L’éclairage et le contrôle se précisent selon le poste.", [
    "Pas dans la version simple. Rétroéclairé ou électroluminescent si le poste manque de lumière.",
    "IP65, forme sur mesure. La plaque d’identification métal est une autre pièce.",
    "Oui. Contrôle de chaque pièce avant expédition, atelier ISO 9001."
  ], ["IP65", "Sur mesure", "Contrôle à 100 %"]),
  automobile: row("", "", "Il habille une commande d’équipement. Il ne remplace pas une plaque métal.", [
    "Oui. Faible épaisseur, collage ou assemblage sur le boîtier.",
    "Décor imprimé sur la face plastique. La plaque gravée, c’est la façade métallique.",
    "Oui. Découpe à la forme, limande vers l’électronique."
  ], ["Faible épaisseur", "Décor imprimé", "Forme libre"]),
  automatisation: row("", "", "Sur le pupitre, on choisit ensuite le clic, l’éclairage ou l’afficheur.", [
    "La version à coupelles donne le clic. Le plat se contente d’une pression.",
    "Le décor porte les repères. Le rétroéclairage s’ajoute si le poste est sombre.",
    "Oui : coupelles, LED, afficheur 7 segments, selon le geste de l’opérateur."
  ], ["Pupitre", "Coupelles possibles", "Rétroéclairage possible"]),
  machines: row("", "", "Il commande la machine. La plaque constructeur reste une pièce métal à côté.", [
    "Oui. Version étanche IP65 si l’atelier projette huile ou poussière.",
    "Le clavier et la plaque ne sont pas la même pièce. On les prévoit ensemble.",
    "Oui sur la version étanche : face fermée, IP65."
  ], ["Commande machine", "IP65", "Plaque à part"]),
  electronique: row("", "", "Face et circuit souple forment un seul ensemble.", [
    "Oui. Circuit sous le décor, limande vers la carte.",
    "Oui, LED et CMS se prévoient au plan. La pose robotisée a sa propre fiche.",
    "Par la limande, en direct sur l’équipement."
  ], ["Circuit intégré", "Limande", "LED et CMS"]),
  transports: row("", "", "Face fermée pour la cabine. La plaque d’identification est à côté.", [
    "Oui. IP65, face qui se lave.",
    "Décor imprimé. Rétroéclairage si la cabine est sombre.",
    "Oui. La plaque de conformité est métallique, distincte du clavier."
  ], ["IP65", "Cabine", "Plaque à part"])
};

function productDomainRecord(productId, slug) {
  const own = (PRODUCT_DOMAIN[productId] && PRODUCT_DOMAIN[productId][slug])
    || (PRODUCT_DOMAIN_MORE[productId] && PRODUCT_DOMAIN_MORE[productId][slug]);
  if (own) return own;
  if (productId === "clavier-membrane") return MEMBRANE_QA[slug] || null;
  return null;
}

function productDomainPhoto(productId, slug) {
  const record = productDomainRecord(productId, slug);
  if (record && record.file) return record.file;
  if (productId === "clavier-membrane" && typeof DOMAIN_PHOTOS !== "undefined" && DOMAIN_PHOTOS[slug]) return DOMAIN_PHOTOS[slug][0];
  return "";
}

function productDomainCaption(productId, slug) {
  const record = productDomainRecord(productId, slug);
  if (record && record.caption) return record.caption;
  if (productId === "clavier-membrane" && typeof DOMAIN_PHOTOS !== "undefined" && DOMAIN_PHOTOS[slug]) return DOMAIN_PHOTOS[slug][1];
  return "";
}

function domainEntry(productId, slug) {
  const record = productDomainRecord(productId, slug);
  if (record && record.answers && record.answers.length) return record;
  const basic = (typeof DOMAIN_USES !== "undefined" && DOMAIN_USES[productId]) ? DOMAIN_USES[productId][slug] : null;
  if (!basic) return null;
  return { lead: basic[0], points: basic[1] || [], answers: basic[2] || [], file: "", caption: "" };
}

/* Un volet par domaine : le domaine d’arrivée est ouvert, les autres sont fermés. */
function domainPanelHtml(productId, slug, open) {
  const entry = domainEntry(productId, slug);
  if (!entry) return "";
  const file = productDomainPhoto(productId, slug);
  const caption = productDomainCaption(productId, slug);
  const questions = entry.questions || DOMAIN_QA[slug] || [];
  const qa = questions.map((question, index) => {
    if (!entry.answers || !entry.answers[index]) return "";
    return '<div class="answer"><h4>' + escapeText(question) + "</h4><p>" + escapeText(entry.answers[index]) + "</p></div>";
  }).join("");
  const points = (entry.points || []).map((point) => "<li>" + escapeText(point) + "</li>").join("");
  const thumb = file
    ? '<img class="dp-thumb" src="medias/images/' + file + '" alt="" loading="lazy">'
    : '<span class="dp-thumb dp-thumb-empty" aria-hidden="true"></span>';
  const figure = file
    ? '<figure class="dp-figure"><img src="medias/images/' + file + '" alt="' + escapeText(caption) + '" loading="lazy">'
      + (caption ? "<figcaption>" + escapeText(caption) + "</figcaption>" : "") + "</figure>"
    : "";
  return [
    '<details class="domain-panel' + (open ? " is-active" : "") + (file ? "" : " no-photo") + '" data-domaine="' + slug + '"' + (open ? " open" : "") + ">",
    "<summary>" + thumb
      + '<span class="dp-title">' + escapeText(domainLabel(slug)) + "</span>"
      + '<span class="dp-hook">' + escapeText(entry.lead) + "</span></summary>",
    '<div class="dp-body">',
    figure,
    '<div class="dp-text">',
    "<p class=\"dp-lead\">" + escapeText(entry.lead) + "</p>",
    points ? '<ul class="dp-points">' + points + "</ul>" : "",
    qa ? '<div class="answers">' + qa + "</div>" : "",
    '<p class="dp-more"><a href="index.html#secteur-' + slug + '">Tout le domaine ' + escapeText(domainLabel(slug)) + " →</a></p>",
    "</div>",
    "</div>",
    "</details>"
  ].join("");
}
