<?php
declare(strict_types=1);

require __DIR__ . '/inc/securite.php';

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

demarrer_session();

// "ouvert" = moment où le formulaire a été ouvert (un envoi trop rapide est refusé).
$ouvert = (int) ($_SESSION['ouvert'] ?? 0);
if ($ouvert < 1 || (time() - $ouvert) > 3600) {
    $_SESSION['ouvert'] = time();
}

echo json_encode(['jeton' => jeton()], JSON_UNESCAPED_UNICODE);
