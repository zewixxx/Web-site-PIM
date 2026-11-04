<?php
declare(strict_types=1);

require __DIR__ . '/securite.php';

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

demarrer_session();
if (empty($_SESSION['ouvert'])) {
    $_SESSION['ouvert'] = time();
}

echo json_encode([
    'jeton' => jeton(),
    'ouvert' => (int) $_SESSION['ouvert'],
], JSON_UNESCAPED_UNICODE);
