<?php
/*
 * Configuration du formulaire de contact — PIM Industrie
 * Ce fichier n'est jamais servi par le web (dossier _prive protégé).
 * Option plus sûre encore : déplacer le dossier _prive HORS du dossier "www" d'OVH
 * et le renommer "pim-contact-prive" (voir _outils-dev/FORMULAIRE-CONTACT-LISEZMOI.md).
 */
return [
    // Destinataire des demandes
    'to'          => 'info@pim-industrie.com',

    // Expéditeur technique : adresse du domaine, gérée par OVH (SPF/DKIM). Ne JAMAIS mettre l'e-mail du visiteur ici.
    'from'        => 'no-reply@pim-industrie.com',
    'from_name'   => 'Site web PIM Industrie',

    // Ajoute "-f no-reply@..." à mail() (adresse de retour technique). Mettre false si l'hébergeur le refuse.
    'envelope_f'  => true,

    // 'mail' = envoi réel ; 'fichier' = test : le message est écrit dans _prive/data/boite-test/ au lieu d'être envoyé
    'mode'        => 'mail',

    // Domaines autorisés à soumettre le formulaire (contrôle Origin/Referer)
    'hotes'       => ['www.pim-industrie.com', 'pim-industrie.com'],

    // Clé secrète HMAC. Laisser vide : elle est générée automatiquement (fichier _prive/data/cle-secrete.key).
    'secret'      => '',

    // Anti-spam
    'delai_min'   => 4,       // secondes minimum entre l'affichage du formulaire et l'envoi
    'delai_max'   => 7200,    // jeton valable 2 h
    'max_liens'   => 3,       // au-delà, message refusé
    'limite_ip_10min' => 3,   // envois max par adresse IP sur 10 minutes
    'limite_ip_jour'  => 10,  // envois max par adresse IP sur 24 h
    'limite_globale_jour' => 100, // envois max au total sur 24 h (anti-inondation de la boîte)

    // Pièce jointe
    'pj_max_octets' => 5 * 1024 * 1024,

    // Pages de retour (navigateurs sans JavaScript)
    'page_merci'  => '/pages/contact/contact-merci.html',
    'page_erreur' => '/pages/contact/contact-erreur.html',
];
