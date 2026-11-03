<?php
declare(strict_types=1);

require __DIR__ . '/securite.php';

header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');
header('Cache-Control: no-store');

function reponse(bool $ok, array $extra = []): void
{
    $accepte = (string) ($_SERVER['HTTP_ACCEPT'] ?? '');
    $ajax = (($_POST['ajax'] ?? '') === '1') || strpos($accepte, 'application/json') !== false;
    if ($ajax) {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(array_merge(['ok' => $ok], $extra), JSON_UNESCAPED_UNICODE);
        exit;
    }
    header('Location: contact.php?' . ($ok ? 'envoye=1' : 'erreur=1'));
    exit;
}

function ligne(string $cle, int $max): string
{
    $valeur = trim((string) ($_POST[$cle] ?? ''));
    $valeur = str_replace(["\r", "\n", "\0"], ' ', $valeur);
    if (function_exists('mb_substr')) {
        return mb_substr($valeur, 0, $max, 'UTF-8');
    }
    return substr($valeur, 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: contact.php');
    exit;
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 20000) {
    reponse(false);
}

demarrer_session();

if (trim((string) ($_POST['societe_web'] ?? '')) !== '') {
    reponse(true);
}

if (!origine_acceptable() || !verifier_jeton((string) ($_POST['jeton'] ?? ''))) {
    reponse(false);
}

$ouvert = (int) ($_SESSION['ouvert'] ?? 0);
$age = time() - $ouvert;
if ($ouvert < 1 || $age < 2 || $age > 7200) {
    reponse(false);
}

$nom = ligne('nom', 120);
$email = ligne('email', 180);
$societe = ligne('societe', 160);
$telephone = ligne('telephone', 40);
$sujet = ligne('sujet', 80);
$message = trim((string) ($_POST['message'] ?? ''));
$message = str_replace("\0", '', $message);
if (function_exists('mb_substr')) {
    $message = mb_substr($message, 0, 4000, 'UTF-8');
} else {
    $message = substr($message, 0, 4000);
}

$liens = preg_match_all('/https?:\/\/|www\./i', $message);
if (
    $nom === ''
    || $message === ''
    || filter_var($email, FILTER_VALIDATE_EMAIL) === false
    || !in_array($sujet, SUJETS_AUTORISES, true)
    || $liens > 3
) {
    reponse(false);
}

if (trop_de_messages(adresse_ip())) {
    reponse(false);
}
noter_message(adresse_ip());

$objet = 'Message du site — ' . $sujet . ' — ' . $nom;
$texte = "Bonjour,\n\n"
    . "Vous avez reçu un nouveau message depuis la page de contact de PIM Industrie.\n\n"
    . "Nom : {$nom}\n"
    . "Société : {$societe}\n"
    . "E-mail : {$email}\n"
    . "Téléphone : {$telephone}\n"
    . "Sujet : {$sujet}\n\n"
    . "Message :\n{$message}\n\n"
    . "Ce message sert uniquement à répondre à la demande.\n";

$objetEncode = '=?UTF-8?B?' . base64_encode($objet) . '?=';
$entetes = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: PIM Industrie <' . EXPEDITEUR . '>',
    'Reply-To: ' . $email,
]);

$envoye = mail(DESTINATAIRE, $objetEncode, $texte, $entetes, '-f' . EXPEDITEUR);
if ($envoye !== true) {
    reponse(false);
}

renouveler_session_formulaire();
reponse(true, [
    'jeton' => jeton(),
    'ouvert' => $_SESSION['ouvert'],
]);
