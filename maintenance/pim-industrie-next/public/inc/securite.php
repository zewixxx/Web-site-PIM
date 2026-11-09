<?php
declare(strict_types=1);

// Ce fichier est une bibliothèque : l'ouvrir directement renvoie une erreur 404.
if (realpath((string) ($_SERVER['SCRIPT_FILENAME'] ?? '')) === __FILE__) {
    http_response_code(404);
    exit;
}

/* ------------------------------------------------------------------------- */
/* Configuration                                                             */
/* ------------------------------------------------------------------------- */

// Adresse qui reçoit les messages du formulaire.
const DESTINATAIRE = 'info@pim-industrie.com';

// Adresse d'expédition : elle doit exister chez OVH (boîte mail du domaine).
const EXPEDITEUR = 'info@pim-industrie.com';

// Nombre maximum de messages par adresse IP et par heure.
const MESSAGES_PAR_HEURE = 5;

// Sujets du formulaire (clé envoyée par le site => libellé français dans l'e-mail).
const SUJETS = [
    'quote' => 'Demande de devis',
    'tech'  => 'Question technique',
    'keys'  => 'Claviers et faces avant',
    'pos'   => 'Étiquettes et PLV',
    'other' => 'Autre',
];

// Langue de la page depuis laquelle le visiteur a écrit.
const LANGUES = [
    'fr' => 'français',
    'en' => 'anglais',
    'de' => 'allemand',
];

// Noms de domaine autorisés pour envoyer le formulaire.
const HOTES_AUTORISES = [
    'pim-industrie.com',
    'www.pim-industrie.com',
    'pim-industrie.de',
    'www.pim-industrie.de',
];

/* ------------------------------------------------------------------------- */
/* Session et jeton anti-robot                                               */
/* ------------------------------------------------------------------------- */

function demarrer_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || ((int) ($_SERVER['SERVER_PORT'] ?? 0) === 443)
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
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

/* ------------------------------------------------------------------------- */
/* Limitation du nombre d'envois (anti-spam)                                 */
/* ------------------------------------------------------------------------- */

function dossier_prive(): string
{
    return dirname(__DIR__) . DIRECTORY_SEPARATOR . 'prive';
}

function trop_de_messages(string $ip): bool
{
    $chemin = fichier_limite($ip);
    if ($chemin === null) {
        return false;
    }
    $fh = @fopen($chemin, 'c+');
    if ($fh === false) {
        return false;
    }
    try {
        if (!flock($fh, LOCK_SH)) {
            return false;
        }
        $brut = stream_get_contents($fh);
        return count(heures_recentes($brut === false ? '' : $brut)) >= MESSAGES_PAR_HEURE;
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
    $fh = @fopen($chemin, 'c+');
    if ($fh === false) {
        return;
    }
    try {
        if (!flock($fh, LOCK_EX)) {
            return;
        }
        $brut = stream_get_contents($fh);
        $heures = heures_recentes($brut === false ? '' : $brut);
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
        @file_put_contents($sel, random_bytes(32), LOCK_EX);
    }
    $secret = (string) @file_get_contents($sel);
    if (strlen($secret) < 16) {
        return null;
    }
    return $dossier . DIRECTORY_SEPARATOR . hash('sha256', $secret . '|' . $ip) . '.bin';
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

/* ------------------------------------------------------------------------- */
/* Contrôles de la requête                                                   */
/* ------------------------------------------------------------------------- */

/** Coupe un texte UTF-8 à $max caractères (fonctionne même sans l'extension mbstring). */
function couper(string $texte, int $max): string
{
    if (function_exists('mb_substr')) {
        return mb_substr($texte, 0, $max, 'UTF-8');
    }
    return preg_match('/^.{0,' . $max . '}/us', $texte, $m) === 1 ? $m[0] : substr($texte, 0, $max);
}

function hote_courant(): string
{
    $hote = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
    return (string) preg_replace('/:\d+$/', '', $hote);
}

function origine_acceptable(): bool
{
    $hote = hote_courant();
    if ($hote === '') {
        return false;
    }
    // Hors serveur local, seuls les domaines de PIM Industrie sont acceptés.
    $local = in_array($hote, ['localhost', '127.0.0.1', '[::1]'], true);
    if (!$local && !in_array($hote, HOTES_AUTORISES, true)) {
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
