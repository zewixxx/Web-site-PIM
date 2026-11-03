<?php
declare(strict_types=1);

require __DIR__ . '/securite.php';

demarrer_session();
if (empty($_SESSION['ouvert'])) {
    $_SESSION['ouvert'] = time();
}
$nonce = bin2hex(random_bytes(16));
$jeton = htmlspecialchars(jeton(), ENT_QUOTES, 'UTF-8');
$ouvert = (string) (int) $_SESSION['ouvert'];

header('Content-Type: text/html; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Permissions-Policy: geolocation=(), microphone=(), camera=()');
header(
    "Content-Security-Policy: default-src 'self'; "
    . "script-src 'self' 'nonce-{$nonce}'; "
    . "style-src 'self' 'nonce-{$nonce}' https://fonts.googleapis.com; "
    . "font-src https://fonts.gstatic.com; "
    . "img-src 'self'; form-action 'self'; base-uri 'self'; "
    . "frame-ancestors 'self'; object-src 'none'"
);
header('Cache-Control: no-store');

$modele = file_get_contents(__DIR__ . '/modele-contact.html');
if ($modele === false) {
    http_response_code(500);
    echo 'Page indisponible.';
    exit;
}

echo str_replace(
    ['__NONCE__', '__JETON__', '__OUVERT__'],
    [htmlspecialchars($nonce, ENT_QUOTES, 'UTF-8'), $jeton, $ouvert],
    $modele
);
