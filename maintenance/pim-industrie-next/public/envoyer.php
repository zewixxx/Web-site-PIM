<?php
declare(strict_types=1);

require __DIR__ . '/inc/securite.php';

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');
header('Cache-Control: no-store');

function reponse(bool $ok, int $statut = 200): never
{
    http_response_code($ok ? 200 : $statut);
    echo json_encode(['ok' => $ok], JSON_UNESCAPED_UNICODE);
    exit;
}

/** Texte sur une seule ligne, sans caractère de contrôle (protège contre l'injection d'en-têtes). */
function ligne(string $cle, int $max): string
{
    $valeur = (string) ($_POST[$cle] ?? '');
    $valeur = (string) preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $valeur);
    $valeur = trim($valeur);
    return couper($valeur, $max);
}

function echapper(string $texte): string
{
    return htmlspecialchars($texte, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** Encode un en-tête contenant des accents (RFC 2047). */
function entete_utf8(string $texte): string
{
    if (preg_match('/^[\x20-\x7E]*$/', $texte) === 1) {
        return $texte;
    }
    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($texte, 'UTF-8', 'B', "\r\n");
    }
    // Sans mbstring : mots encodés courts (20 caractères maximum chacun), séparés par un repli de ligne.
    $morceaux = preg_split('/(.{20})/us', $texte, -1, PREG_SPLIT_DELIM_CAPTURE | PREG_SPLIT_NO_EMPTY) ?: [$texte];
    return implode("\r\n ", array_map(static fn (string $m): string => '=?UTF-8?B?' . base64_encode($m) . '?=', $morceaux));
}

function bloc_base64(string $contenu): string
{
    return chunk_split(base64_encode($contenu), 76, "\r\n");
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    reponse(false, 405);
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 20000) {
    reponse(false, 413);
}

demarrer_session();

// Champ piège : un robot le remplit, un humain ne le voit pas. On répond "ok" sans rien envoyer.
if (trim((string) ($_POST['societe_web'] ?? '')) !== '') {
    reponse(true);
}

if (!origine_acceptable() || !verifier_jeton((string) ($_POST['jeton'] ?? ''))) {
    reponse(false, 403);
}

$age = time() - (int) ($_SESSION['ouvert'] ?? 0);
if ($age < 2 || $age > 7200) {
    // Envoi trop rapide (robot) ou formulaire resté ouvert trop longtemps : on renouvelle le jeton.
    renouveler_session_formulaire();
    reponse(false, 400);
}

$nom = ligne('nom', 120);
$email = ligne('email', 180);
$societe = ligne('societe', 160);
$telephone = ligne('telephone', 40);
$cleSujet = ligne('sujet', 20);
$cleLangue = ligne('langue', 2);

$message = (string) ($_POST['message'] ?? '');
$message = str_replace(["\0", "\r\n", "\r"], ['', "\n", "\n"], $message);
$message = couper(trim($message), 4000);

$liens = preg_match_all('/https?:\/\/|www\./i', $message);
if (
    $nom === ''
    || $message === ''
    || filter_var($email, FILTER_VALIDATE_EMAIL) === false
    || !array_key_exists($cleSujet, SUJETS)
    || $liens > 3
) {
    reponse(false, 400);
}

$sujet = SUJETS[$cleSujet];
$langue = LANGUES[$cleLangue] ?? 'non précisée';

if (trop_de_messages(adresse_ip())) {
    reponse(false, 429);
}
noter_message(adresse_ip());

// Informations sur l'envoi
$hote = hote_courant();
$site = in_array($hote, HOTES_AUTORISES, true) ? $hote : 'www.pim-industrie.com';
$maintenant = new DateTimeImmutable('now', new DateTimeZone('Europe/Paris'));
$recu = $maintenant->format('d/m/Y') . ' à ' . $maintenant->format('H:i') . ' (heure de Paris)';

$vide = static fn (string $v, string $defaut): string => $v === '' ? $defaut : $v;
$societeAff = $vide($societe, '(non renseignée)');
$telephoneAff = $vide($telephone, '(non renseigné)');

// ---------------------------------------------------------------- Texte brut
$sep = str_repeat('-', 60);
$texte = "Bonjour,\n\n"
    . "Un visiteur vient de vous écrire depuis le formulaire de contact du site internet de PIM Industrie.\n\n"
    . "Pour lui répondre, cliquez simplement sur « Répondre » dans votre messagerie :\n"
    . "votre réponse sera envoyée directement à l'adresse e-mail du visiteur (indiquée ci-dessous).\n\n"
    . $sep . "\nCOORDONNÉES DU VISITEUR\n" . $sep . "\n"
    . "Nom        : {$nom}\n"
    . "Société    : {$societeAff}\n"
    . "E-mail     : {$email}\n"
    . "Téléphone  : {$telephoneAff}\n\n"
    . $sep . "\nSUJET DE LA DEMANDE\n" . $sep . "\n"
    . "{$sujet}\n\n"
    . $sep . "\nMESSAGE DU VISITEUR\n" . $sep . "\n"
    . "{$message}\n\n"
    . $sep . "\nINFORMATIONS SUR L'ENVOI\n" . $sep . "\n"
    . "Reçu le           : {$recu}\n"
    . "Site d'origine    : {$site}\n"
    . "Langue de la page : {$langue}\n\n"
    . "Ce message automatique a été généré par le site PIM Industrie. Les informations ci-dessus ne doivent\n"
    . "être utilisées que pour répondre à la demande du visiteur.\n";

// ---------------------------------------------------------------------- HTML
$ligneHtml = static function (string $libelle, string $valeur): string {
    return '<tr><td style="padding:6px 16px 6px 0;color:#6a6064;white-space:nowrap;vertical-align:top">'
        . echapper($libelle) . '</td><td style="padding:6px 0;color:#1c1c1c">' . $valeur . '</td></tr>';
};
$emailHtml = '<a href="mailto:' . echapper($email) . '" style="color:#970232">' . echapper($email) . '</a>';

$html = '<!DOCTYPE html><html lang="fr"><body style="margin:0;padding:0;background:#f4f0f1;font-family:Arial,Helvetica,sans-serif">'
    . '<div style="max-width:640px;margin:0 auto;background:#ffffff">'
    . '<div style="background:#970232;color:#ffffff;padding:18px 24px;font-size:18px;font-weight:bold">'
    . 'Nouveau message du site PIM Industrie</div>'
    . '<div style="padding:24px;font-size:15px;line-height:1.55;color:#1c1c1c">'
    . '<p style="margin:0 0 12px">Bonjour,</p>'
    . '<p style="margin:0 0 12px">Un visiteur vient de vous écrire depuis le <strong>formulaire de contact</strong> du site internet de PIM Industrie.</p>'
    . '<p style="margin:0 0 20px">Pour lui répondre, cliquez simplement sur <strong>« Répondre »</strong> dans votre messagerie : '
    . 'votre réponse sera envoyée directement à l\'adresse e-mail du visiteur.</p>'
    . '<h2 style="margin:0 0 8px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#970232">Coordonnées du visiteur</h2>'
    . '<table style="border-collapse:collapse;margin:0 0 20px;font-size:15px">'
    . $ligneHtml('Nom', '<strong>' . echapper($nom) . '</strong>')
    . $ligneHtml('Société', echapper($societeAff))
    . $ligneHtml('E-mail', $emailHtml)
    . $ligneHtml('Téléphone', echapper($telephoneAff))
    . '</table>'
    . '<h2 style="margin:0 0 8px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#970232">Sujet de la demande</h2>'
    . '<p style="margin:0 0 20px"><strong>' . echapper($sujet) . '</strong></p>'
    . '<h2 style="margin:0 0 8px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#970232">Message du visiteur</h2>'
    . '<div style="margin:0 0 24px;padding:14px 16px;background:#faf7f8;border-left:3px solid #970232">'
    . nl2br(echapper($message), false) . '</div>'
    . '<h2 style="margin:0 0 8px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#970232">Informations sur l\'envoi</h2>'
    . '<table style="border-collapse:collapse;font-size:13px;color:#6a6064">'
    . $ligneHtml('Reçu le', echapper($recu))
    . $ligneHtml('Site d\'origine', echapper($site))
    . $ligneHtml('Langue de la page', echapper($langue))
    . '</table>'
    . '</div>'
    . '<div style="padding:14px 24px;background:#f4f0f1;color:#6a6064;font-size:12px">'
    . 'Message automatique généré par le site PIM Industrie. À utiliser uniquement pour répondre à la demande du visiteur.'
    . '</div></div></body></html>';

// ------------------------------------------------------------------ Message
$objet = 'Message du site PIM Industrie – ' . $sujet . ' – ' . couper($nom, 60);
$frontiere = 'pim_' . bin2hex(random_bytes(12));

$entetes = implode("\r\n", [
    'MIME-Version: 1.0',
    'From: ' . entete_utf8('Site PIM Industrie') . ' <' . EXPEDITEUR . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PIM-Industrie-Site',
    'Content-Type: multipart/alternative; boundary="' . $frontiere . '"',
]);

$corps = '--' . $frontiere . "\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
    . bloc_base64($texte)
    . '--' . $frontiere . "\r\n"
    . "Content-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
    . bloc_base64($html)
    . '--' . $frontiere . "--\r\n";

$envoye = mail(DESTINATAIRE, entete_utf8($objet), $corps, $entetes, '-f' . EXPEDITEUR);
if ($envoye !== true) {
    reponse(false, 500);
}

renouveler_session_formulaire();
reponse(true);
