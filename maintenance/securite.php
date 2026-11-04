<?php
declare(strict_types=1);

if (realpath((string) ($_SERVER['SCRIPT_FILENAME'] ?? '')) === __FILE__) {
    http_response_code(404);
    exit;
}

const DESTINATAIRE = 'info@pim-industrie.com';
const EXPEDITEUR = 'info@pim-industrie.com';
const SUJETS_AUTORISES = [
    'Demande de devis',
    'Question technique',
    'Claviers et faces avant',
    'Étiquettes et PLV',
    'Autre',
];

function demarrer_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || ((int) ($_SERVER['SERVER_PORT'] ?? 0) === 443);
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $https,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    session_start();
}

function jeton(): string
{
    if (empty($_SESSION['jeton']) || !is_string($_SESSION['jeton'])) {
        $_SESSION['jeton'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['jeton'];
}

function verifier_jeton(string $recu): bool
{
    $attendu = $_SESSION['jeton'] ?? '';
    return is_string($attendu) && $attendu !== '' && hash_equals($attendu, $recu);
}

function renouveler_session_formulaire(): void
{
    $_SESSION['jeton'] = bin2hex(random_bytes(32));
    $_SESSION['ouvert'] = time();
}

function dossier_prive(): string
{
    return __DIR__ . DIRECTORY_SEPARATOR . 'prive';
}

function trop_de_messages(string $ip): bool
{
    $chemin = fichier_limite($ip);
    if ($chemin === null) {
        return false;
    }
    $fh = fopen($chemin, 'c+');
    if ($fh === false) {
        return false;
    }
    try {
        if (!flock($fh, LOCK_SH)) {
            return false;
        }
        $brut = stream_get_contents($fh);
        return count(heures_recentes($brut)) >= 5;
    } finally {
        flock($fh, LOCK_UN);
        fclose($fh);
    }
}

function noter_message(string $ip): void
{
    $chemin = fichier_limite($ip);
    if ($chemin === null) {
        return;
    }
    $fh = fopen($chemin, 'c+');
    if ($fh === false) {
        return;
    }
    try {
        if (!flock($fh, LOCK_EX)) {
            return;
        }
        $brut = stream_get_contents($fh);
        $heures = heures_recentes($brut);
        $heures[] = time();
        ftruncate($fh, 0);
        rewind($fh);
        fwrite($fh, json_encode($heures));
        fflush($fh);
    } finally {
        flock($fh, LOCK_UN);
        fclose($fh);
    }
}

function fichier_limite(string $ip): ?string
{
    $dossier = dossier_prive();
    if (!is_dir($dossier) && !@mkdir($dossier, 0700, true) && !is_dir($dossier)) {
        return null;
    }
    $sel = $dossier . DIRECTORY_SEPARATOR . 'sel.bin';
    if (!is_file($sel)) {
        file_put_contents($sel, random_bytes(32), LOCK_EX);
    }
    $secret = (string) @file_get_contents($sel);
    if (strlen($secret) < 16) {
        return null;
    }
    return $dossier . DIRECTORY_SEPARATOR . hash('sha256', $secret . '|' . $ip);
}

function heures_recentes(string $brut): array
{
    $liste = json_decode($brut !== '' ? $brut : '[]', true);
    if (!is_array($liste)) {
        return [];
    }
    $seuil = time() - 3600;
    $propres = [];
    foreach ($liste as $moment) {
        if (is_numeric($moment) && (int) $moment > $seuil) {
            $propres[] = (int) $moment;
        }
    }
    return $propres;
}

function origine_acceptable(): bool
{
    $hote = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
    $hote = (string) preg_replace('/:\d+$/', '', $hote);
    if ($hote === '') {
        return false;
    }
    foreach (['HTTP_ORIGIN', 'HTTP_REFERER'] as $cle) {
        if (empty($_SERVER[$cle]) || !is_string($_SERVER[$cle])) {
            continue;
        }
        $recu = parse_url($_SERVER[$cle], PHP_URL_HOST);
        if (!is_string($recu) || strtolower($recu) !== $hote) {
            return false;
        }
    }
    return true;
}

function adresse_ip(): string
{
    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
    return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : '0.0.0.0';
}
