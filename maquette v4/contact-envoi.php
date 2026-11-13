<?php
/*
 * PIM Industrie — point d'entrée du formulaire de contact.
 * GET  ?jeton=1 : délivre un jeton anti-robot signé (JSON)
 * POST          : vérifie et envoie la demande à info@pim-industrie.com
 * Toute la logique et la configuration sont dans un dossier privé, jamais servi par le web.
 */
declare(strict_types=1);
ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

// PHP 8.1 minimum (versions plus anciennes : plus de correctifs de sécurité)
if (PHP_VERSION_ID < 80100) {
    error_log('[contact] PHP trop ancien : ' . PHP_VERSION . ' (8.1 minimum requis)');
    http_response_code(503);
    header('Content-Type: text/plain; charset=utf-8');
    header('Cache-Control: no-store');
    echo 'Service momentanément indisponible.';
    exit;
}

$prive = null;
foreach ([dirname(__DIR__) . '/pim-contact-prive', __DIR__ . '/_prive'] as $d) {
    if (is_file($d . '/contact-traitement.php') && is_file($d . '/config.php')) { $prive = $d; break; }
}
if ($prive === null) {
    http_response_code(503);
    header('Content-Type: text/plain; charset=utf-8');
    header('Cache-Control: no-store');
    echo 'Service momentanément indisponible.';
    exit;
}
define('PIM_PRIVE', $prive);
require $prive . '/contact-traitement.php';
