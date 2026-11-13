<?php
/*
 * PIM Industrie — traitement sécurisé du formulaire de contact (sans dépendance externe).
 * Chargé uniquement par /contact-envoi.php. Ne pas rendre ce fichier accessible depuis le web.
 */
declare(strict_types=1);

if (!defined('PIM_PRIVE')) { http_response_code(404); exit; }

ini_set('display_errors', '0');
ini_set('log_errors', '1');
@mkdir(PIM_PRIVE . '/logs', 0700, true);
@mkdir(PIM_PRIVE . '/data', 0700, true);
ini_set('error_log', PIM_PRIVE . '/logs/php-erreurs.log');

$CFG = require PIM_PRIVE . '/config.php';
date_default_timezone_set('Europe/Paris');

/* ---------- En-têtes de sécurité de la réponse ---------- */
header_remove('X-Powered-By');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header("Content-Security-Policy: default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
header('Referrer-Policy: same-origin');
header('Permissions-Policy: interest-cohort=(), camera=(), microphone=(), geolocation=()');
header('Cache-Control: no-store, max-age=0');
header('Cross-Origin-Resource-Policy: same-origin');
header('X-Robots-Tag: noindex, nofollow');

/* ---------- Outils ---------- */
function pim_journal(string $niveau, string $msg): void
{
    $ligne = sprintf("%s [%s] ip=%s %s\n", date('c'), $niveau, pim_ip_hash(), preg_replace('/[\x00-\x1F\x7F]+/', ' ', $msg));
    $journal = PIM_PRIVE . '/logs/contact.log';
    // Rotation : au-delà de 512 Ko, l'ancien journal remplace contact.log.1 (taille et durée de conservation limitées)
    if (@filesize($journal) > 524288) @rename($journal, $journal . '.1');
    @file_put_contents($journal, $ligne, FILE_APPEND | LOCK_EX);
    @chmod($journal, 0600);
}

function pim_secret(): string
{
    static $s = null;
    if ($s !== null) return $s;
    global $CFG;
    if (is_string($CFG['secret'] ?? null) && strlen($CFG['secret']) >= 32) return $s = $CFG['secret'];
    $f = PIM_PRIVE . '/data/cle-secrete.key';
    $h = @fopen($f, 'c+');
    if ($h === false) throw new RuntimeException('cle secrete inaccessible');
    flock($h, LOCK_EX);
    $k = trim((string)stream_get_contents($h));
    if (strlen($k) < 64) {
        $k = bin2hex(random_bytes(32));
        ftruncate($h, 0); rewind($h); fwrite($h, $k); fflush($h);
        @chmod($f, 0600);
    }
    flock($h, LOCK_UN); fclose($h);
    return $s = $k;
}

function pim_ip(): string
{
    // Seule REMOTE_ADDR est fiable (X-Forwarded-For est falsifiable par le client).
    $ip = (string)($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
    return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : '0.0.0.0';
}

function pim_ip_hash(): string
{
    // L'adresse IP n'est jamais stockée en clair (RGPD) : empreinte tronquée.
    try { return substr(hash_hmac('sha256', pim_ip(), pim_secret()), 0, 16); }
    catch (Throwable $e) { return 'inconnue'; }
}

function pim_est_https(): bool
{
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (int)($_SERVER['SERVER_PORT'] ?? 0) === 443;
}

function pim_veut_json(): bool
{
    return ($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'fetch';
}

/** Réponse finale : JSON pour le JavaScript, redirection 303 sinon. */
function pim_repondre(bool $ok, string $message, int $code = 200, string $champ = ''): void
{
    global $CFG;
    if (pim_veut_json()) {
        http_response_code($code);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'message' => $message, 'champ' => $champ], JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP);
    } else {
        $page = $ok ? $CFG['page_merci'] : $CFG['page_erreur'];
        // Chemin interne fixe uniquement (pas de redirection ouverte)
        if (!is_string($page) || !preg_match('#^/pages/(?:contact|entreprise|industrie|luxe|ressources|savoir-faire|legal|systeme)(?:/[a-z0-9-]+)*/[a-z0-9-]+\.html$#', $page)) $page = '/pages/contact/contact.html';
        http_response_code(303);
        header('Location: ' . $page);
        header('Content-Type: text/plain; charset=utf-8');
        echo $ok ? 'Merci.' : 'Erreur.';
    }
    exit;
}

/** Texte sur une ligne : UTF-8 valide, sans caractères de contrôle (donc sans CR/LF). */
function pim_ligne($v, int $max): ?string
{
    if (!is_string($v)) return null;
    if (!mb_check_encoding($v, 'UTF-8')) return null;
    $v = preg_replace('/[\x00-\x1F\x7F\x{2028}\x{2029}\x{200B}-\x{200F}\x{202A}-\x{202E}\x{2066}-\x{2069}]+/u', ' ', $v);
    $v = trim(preg_replace('/\s{2,}/u', ' ', (string)$v));
    if (mb_strlen($v, 'UTF-8') > $max) return null;
    return $v;
}

/** Texte multiligne : garde les retours à la ligne, supprime les autres caractères de contrôle. */
function pim_texte($v, int $max): ?string
{
    if (!is_string($v)) return null;
    if (!mb_check_encoding($v, 'UTF-8')) return null;
    $v = str_replace(["\r\n", "\r"], "\n", $v);
    $v = preg_replace('/[\x00-\x08\x0B-\x1F\x7F\x{2028}\x{2029}\x{202A}-\x{202E}\x{2066}-\x{2069}]/u', '', $v);
    $v = preg_replace("/\n{4,}/", "\n\n\n", (string)$v);
    $v = trim((string)$v);
    if (mb_strlen($v, 'UTF-8') > $max) return null;
    return $v;
}

/** Fichier JSON verrouillé (limitation de débit, jetons déjà utilisés). */
function pim_etat(string $nom, callable $fn)
{
    $f = PIM_PRIVE . '/data/' . $nom . '.json';
    $h = @fopen($f, 'c+');
    if ($h === false) throw new RuntimeException('etat inaccessible: ' . $nom);
    if (!flock($h, LOCK_EX)) { fclose($h); throw new RuntimeException('verrou impossible'); }
    $brut = stream_get_contents($h);
    $data = json_decode($brut ?: '[]', true);
    if (!is_array($data)) $data = [];
    $res = $fn($data); // $data modifié par référence
    $json = json_encode($data);
    ftruncate($h, 0); rewind($h); fwrite($h, $json === false ? '[]' : $json); fflush($h);
    flock($h, LOCK_UN); fclose($h);
    @chmod($f, 0600);
    return $res;
}

function pim_signer(string $donnees): string
{
    return rtrim(strtr(base64_encode(hash_hmac('sha256', $donnees, pim_secret(), true)), '+/', '-_'), '=');
}

function pim_nom_cookie(): string
{
    return pim_est_https() ? '__Host-pim_cf' : 'pim_cf';
}

/* ---------- Méthode HTTP ---------- */
$methode = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    /* ===== GET ?jeton=1 : délivrance d'un jeton signé ===== */
    if ($methode === 'GET' && isset($_GET['jeton'])) {
        $nonce = rtrim(strtr(base64_encode(random_bytes(18)), '+/', '-_'), '=');
        $ts = (string)time();
        $jeton = $ts . '.' . $nonce . '.' . pim_signer('jeton|' . $ts . '|' . $nonce);
        // Cookie lié au jeton (double vérification type CSRF) : HttpOnly, SameSite=Strict, Secure en HTTPS
        setcookie(pim_nom_cookie(), pim_signer('cookie|' . $nonce), [
            'expires'  => time() + (int)$CFG['delai_max'],
            'path'     => '/',
            'secure'   => pim_est_https(),
            'httponly' => true,
            'samesite' => 'Strict',
        ]);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['jeton' => $jeton]);
        exit;
    }

    if ($methode !== 'POST') {
        header('Allow: POST, GET');
        http_response_code(405);
        header('Content-Type: text/plain; charset=utf-8');
        echo 'Méthode non autorisée.';
        exit;
    }

    /* ===== POST : contrôles d'origine et de taille ===== */
    $tailleMax = (int)$CFG['pj_max_octets'] + 1024 * 1024; // pièce jointe + 1 Mo de texte
    $longueur = (int)($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($longueur <= 0 || $longueur > $tailleMax || empty($_POST)) {
        pim_journal('refus', 'taille requete ' . $longueur);
        pim_repondre(false, 'Votre envoi est trop volumineux (fichier de 5 Mo maximum).', 413, 'file');
    }

    $hotes = array_map('strtolower', (array)$CFG['hotes']);
    $origine = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
    $hoteOrigine = strtolower((string)parse_url((string)$origine, PHP_URL_HOST));
    $portOrigine = parse_url((string)$origine, PHP_URL_PORT);
    if ($portOrigine) $hoteOrigine .= ':' . $portOrigine;
    if ($origine === '' || !in_array($hoteOrigine, $hotes, true)) {
        pim_journal('refus', 'origine ' . substr((string)$origine, 0, 100));
        pim_repondre(false, 'Envoi refusé. Merci d’utiliser le formulaire du site.', 403);
    }
    $sfs = $_SERVER['HTTP_SEC_FETCH_SITE'] ?? '';
    if ($sfs !== '' && !in_array($sfs, ['same-origin', 'none'], true)) {
        pim_journal('refus', 'sec-fetch-site ' . $sfs);
        pim_repondre(false, 'Envoi refusé. Merci d’utiliser le formulaire du site.', 403);
    }

    // Champs attendus uniquement
    $autorises = ['name', 'company', 'email', 'tel', 'world', 'message', 'echantillon', 'nda', 'website', 'jeton'];
    foreach ($_POST as $cle => $_v) {
        if (!in_array($cle, $autorises, true)) {
            pim_journal('refus', 'champ inattendu');
            pim_repondre(false, 'Le formulaire envoyé n’est pas valide. Rechargez la page et réessayez.', 400);
        }
    }

    /* ===== Pot de miel : un humain ne voit pas ce champ ===== */
    if (($_POST['website'] ?? '') !== '') {
        pim_journal('spam', 'pot de miel rempli');
        pim_repondre(true, 'Merci, votre message a bien été envoyé. Nous vous répondons sous 48 h ouvrées.'); // faux succès
    }

    /* ===== Jeton signé : délai minimum, expiration, cookie lié, usage unique ===== */
    $jeton = $_POST['jeton'] ?? '';
    $parts = is_string($jeton) ? explode('.', $jeton) : [];
    $cookie = $_COOKIE[pim_nom_cookie()] ?? '';
    if (count($parts) !== 3 || !ctype_digit($parts[0]) || !preg_match('/^[A-Za-z0-9_-]{24}$/', $parts[1])
        || !hash_equals(pim_signer('jeton|' . $parts[0] . '|' . $parts[1]), $parts[2])
        || !is_string($cookie) || !hash_equals(pim_signer('cookie|' . $parts[1]), $cookie)) {
        pim_journal('refus', 'jeton invalide ou cookie absent');
        pim_repondre(false, 'La page a expiré. Rechargez-la (touche F5) puis renvoyez votre message.', 400);
    }
    $age = time() - (int)$parts[0];
    if ($age < (int)$CFG['delai_min']) {
        pim_journal('spam', 'envoi trop rapide ' . $age . 's');
        pim_repondre(false, 'Envoi trop rapide. Patientez quelques secondes puis réessayez.', 429);
    }
    if ($age > (int)$CFG['delai_max']) {
        pim_journal('refus', 'jeton expire');
        pim_repondre(false, 'La page a expiré. Rechargez-la (touche F5) puis renvoyez votre message.', 400);
    }

    /* ===== Limitation de débit (par IP + globale) ===== */
    $ipKey = pim_ip_hash();
    $maintenant = time();
    $limite = pim_etat('limites', function (array &$d) use ($ipKey, $maintenant, $CFG) {
        foreach ($d as $k => $liste) {
            $d[$k] = array_values(array_filter((array)$liste, fn($t) => is_int($t) && $t > $maintenant - 86400));
            if (!$d[$k]) unset($d[$k]);
        }
        // Toutes les tentatives (même refusées) sont comptées : 20 max par IP sur 10 minutes
        $essais = array_values(array_filter($d['essai:' . $ipKey] ?? [], fn($t) => $t > $maintenant - 600));
        $essais[] = $maintenant;
        $d['essai:' . $ipKey] = $essais;
        if (count($essais) > 20) return 'essais';
        $ipListe = $d[$ipKey] ?? [];
        $glob = $d['_global'] ?? [];
        $dix = count(array_filter($ipListe, fn($t) => $t > $maintenant - 600));
        if ($dix >= (int)$CFG['limite_ip_10min'] || count($ipListe) >= (int)$CFG['limite_ip_jour']) return 'ip';
        if (count($glob) >= (int)$CFG['limite_globale_jour']) return 'global';
        return '';
    });
    if ($limite !== '') {
        pim_journal('limite', 'depassement ' . $limite);
        pim_repondre(false, 'Trop d’envois en peu de temps. Réessayez plus tard, ou écrivez directement à info@pim-industrie.com.', 429);
    }

    /* ===== Validation des champs ===== */
    $err = function (string $msg, string $champ) { pim_repondre(false, $msg, 422, $champ); };

    $nom = pim_ligne($_POST['name'] ?? null, 100);
    if ($nom === null || mb_strlen($nom) < 2) $err('Indiquez votre nom et prénom (2 à 100 caractères).', 'name');
    if (preg_match('#https?:|www\.|[<>{}\[\]\\\\@]#iu', $nom)) $err('Le nom contient des caractères non autorisés.', 'name');

    $societe = pim_ligne($_POST['company'] ?? '', 120);
    if ($societe === null) $err('Le nom de société est trop long (120 caractères maximum).', 'company');
    if (preg_match('#https?:|[<>{}]#iu', $societe)) $err('Le nom de société contient des caractères non autorisés.', 'company');

    $emailBrut = $_POST['email'] ?? null;
    $email = is_string($emailBrut) ? trim($emailBrut) : '';
    if ($email === '' || strlen($email) > 254 || preg_match('/[\x00-\x20\x7F,;:<>"\\\\]/', $email)
        || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        $err('Indiquez une adresse e-mail valide.', 'email');
    }

    $tel = pim_ligne($_POST['tel'] ?? '', 30);
    if ($tel === null || ($tel !== '' && !preg_match('#^[0-9+().\s/-]{6,30}$#', $tel))) $err('Le numéro de téléphone n’est pas valide.', 'tel');

    $sujets = [
        'industrie'   => 'Industrie : clavier, circuit, face avant, plaque métal',
        'luxe-plv'    => 'Luxe & PLV : étiquette, insert, présentoir',
        'particulier' => 'Une demande de particulier',
        'candidature' => 'Une candidature',
        'autre'       => 'Autre demande',
    ];
    $world = $_POST['world'] ?? 'autre';
    if (!is_string($world) || !array_key_exists($world, $sujets)) $err('Choisissez le type de projet dans la liste.', 'world');

    $message = pim_texte($_POST['message'] ?? null, 5000);
    if ($message === null || mb_strlen($message) < 10) $err('Votre message doit faire entre 10 et 5 000 caractères.', 'message');
    $nbLiens = preg_match_all('#(https?://|www\.)#i', $message);
    if ($nbLiens > (int)$CFG['max_liens']) {
        pim_journal('spam', 'trop de liens ' . $nbLiens);
        $err('Votre message contient trop de liens. Retirez-les ou envoyez-les par e-mail.', 'message');
    }
    if (preg_match('#<\s*(a|script|iframe|img)\b|\[url[=\]]#i', $message)) {
        pim_journal('spam', 'balises dans le message');
        $err('Le message ne doit pas contenir de code HTML.', 'message');
    }

    $echantillon = isset($_POST['echantillon']) && $_POST['echantillon'] === 'on';
    $nda = isset($_POST['nda']) && $_POST['nda'] === 'on';

    /* ===== Pièce jointe (facultative) ===== */
    $pj = null;
    if (isset($_FILES['file']) && is_array($_FILES['file'])) {
        $f = $_FILES['file'];
        if (is_array($f['error'] ?? null)) $err('Un seul fichier est accepté.', 'file');
        $code = (int)($f['error'] ?? UPLOAD_ERR_NO_FILE);
        if ($code !== UPLOAD_ERR_NO_FILE) {
            if ($code === UPLOAD_ERR_INI_SIZE || $code === UPLOAD_ERR_FORM_SIZE) $err('Le fichier dépasse 5 Mo.', 'file');
            if ($code !== UPLOAD_ERR_OK) { pim_journal('erreur', 'upload code ' . $code); $err('Le fichier n’a pas pu être reçu. Réessayez.', 'file'); }
            $tmp = (string)$f['tmp_name'];
            if (!is_uploaded_file($tmp)) { pim_journal('refus', 'fichier non televerse'); $err('Le fichier n’a pas pu être reçu.', 'file'); }
            $taille = (int)filesize($tmp);
            if ($taille <= 0 || $taille > (int)$CFG['pj_max_octets']) { @unlink($tmp); $err('Le fichier doit faire moins de 5 Mo.', 'file'); }

            $ext = strtolower(pathinfo((string)$f['name'], PATHINFO_EXTENSION));
            if ($ext === 'jpeg') $ext = 'jpg';
            $mimes = [
                'pdf' => ['application/pdf'],
                'jpg' => ['image/jpeg'],
                'png' => ['image/png'],
                'ai'  => ['application/pdf', 'application/postscript', 'application/illustrator'],
                'dxf' => ['text/plain', 'image/vnd.dxf', 'application/dxf', 'image/x-dxf', 'application/octet-stream'],
                'dwg' => ['image/vnd.dwg', 'application/acad', 'image/x-dwg', 'application/octet-stream'],
            ];
            if (!isset($mimes[$ext])) { @unlink($tmp); $err('Type de fichier non accepté (PDF, DXF, DWG, AI, JPG ou PNG).', 'file'); }

            $fi = new finfo(FILEINFO_MIME_TYPE);
            $mime = (string)$fi->file($tmp);
            $debut = (string)file_get_contents($tmp, false, null, 0, 4096);
            $signatureOk = match ($ext) {
                'pdf'   => str_starts_with($debut, '%PDF-'),
                'jpg'   => str_starts_with($debut, "\xFF\xD8\xFF") && @getimagesize($tmp) !== false,
                'png'   => str_starts_with($debut, "\x89PNG\r\n\x1A\n") && @getimagesize($tmp) !== false,
                'ai'    => str_starts_with($debut, '%PDF-') || str_starts_with($debut, '%!PS'),
                'dwg'   => (bool)preg_match('/^AC10[0-9]{2}/', $debut),
                'dxf'   => !str_contains($debut, "\0") && (bool)preg_match('/^\s*0\s*\r?\n\s*(SECTION|\$?[A-Z])/', $debut) || str_starts_with($debut, 'AutoCAD Binary DXF'),
                default => false,
            };
            // Aucun fichier contenant du code exécutable côté serveur ou navigateur
            $suspect = (bool)preg_match('/<\?php|<\?=|<script\b/i', $debut);
            if (!in_array($mime, $mimes[$ext], true) || !$signatureOk || $suspect) {
                pim_journal('refus', 'fichier refuse ext=' . $ext . ' mime=' . $mime);
                @unlink($tmp);
                $err('Le contenu du fichier ne correspond pas à son type (PDF, DXF, DWG, AI, JPG ou PNG).', 'file');
            }
            $contenu = (string)file_get_contents($tmp);
            @unlink($tmp); // jamais conservé sur le serveur
            $types = ['pdf' => 'application/pdf', 'jpg' => 'image/jpeg', 'png' => 'image/png', 'ai' => 'application/pdf', 'dxf' => 'application/dxf', 'dwg' => 'application/acad'];
            $pj = [
                'nom'     => 'piece-jointe-' . date('Ymd-His') . '-' . bin2hex(random_bytes(4)) . '.' . $ext,
                'type'    => $types[$ext],
                'contenu' => $contenu,
                'taille'  => $taille,
            ];
        }
    }

    /* ===== Usage unique du jeton (anti-rejeu) ===== */
    $dejaUtilise = pim_etat('jetons-utilises', function (array &$d) use ($parts, $maintenant, $CFG) {
        foreach ($d as $k => $t) if (!is_int($t) || $t < $maintenant - (int)$CFG['delai_max']) unset($d[$k]);
        $id = hash('sha256', $parts[1]);
        if (isset($d[$id])) return true;
        $d[$id] = $maintenant;
        return false;
    });
    if ($dejaUtilise) {
        pim_journal('refus', 'jeton deja utilise');
        pim_repondre(false, 'Ce formulaire a déjà été envoyé. Rechargez la page pour envoyer un nouveau message.', 400);
    }

    /* ===== Construction de l'e-mail (texte brut UTF-8, MIME écrit à la main) ===== */
    $from = (string)$CFG['from'];
    $to = (string)$CFG['to'];
    if (!filter_var($from, FILTER_VALIDATE_EMAIL) || !filter_var($to, FILTER_VALIDATE_EMAIL)) throw new RuntimeException('config e-mail invalide');
    $domaineFrom = substr($from, strpos($from, '@') + 1);

    $oui = fn(bool $b) => $b ? 'oui' : 'non';
    $corps = "Nouvelle demande envoyée depuis le formulaire de contact du site www.pim-industrie.com\n"
        . str_repeat('-', 60) . "\n"
        . "Nom        : " . $nom . "\n"
        . "Société    : " . ($societe !== '' ? $societe : '(non renseignée)') . "\n"
        . "E-mail     : " . $email . "\n"
        . "Téléphone  : " . ($tel !== '' ? $tel : '(non renseigné)') . "\n"
        . "Projet     : " . $sujets[$world] . "\n"
        . "Échantillon souhaité          : " . $oui($echantillon) . "\n"
        . "Accord de confidentialité (NDA) : " . $oui($nda) . "\n"
        . "Pièce jointe : " . ($pj ? $pj['nom'] . ' (' . number_format(max(1, (int)ceil($pj['taille'] / 1024)), 0, ',', ' ') . ' Ko)' : 'aucune') . "\n"
        . str_repeat('-', 60) . "\n"
        . "Message :\n\n" . $message . "\n\n"
        . str_repeat('-', 60) . "\n"
        . "Pour répondre, utilisez simplement « Répondre » : la réponse ira à " . $email . ".\n"
        . "Envoyé le " . date('d/m/Y à H:i') . ". Ne communiquez jamais de mot de passe ou de coordonnées bancaires en réponse à un message non vérifié.\n";
    $corps = str_replace("\n", "\r\n", $corps);

    // Encodage RFC 2047 en mots de 30 caractères max (chaque mot encodé reste sous 75 octets)
    $enc = fn(string $s) => implode(' ', array_map(fn($m) => '=?UTF-8?B?' . base64_encode($m) . '?=', mb_str_split($s, 30, 'UTF-8')));
    $sujet = $enc('[Site web] Demande de contact - ' . $sujets[$world]);
    $limiteMime = '=_pim_' . bin2hex(random_bytes(16));

    $entetes = [
        'From'         => $enc((string)$CFG['from_name']) . ' <' . $from . '>',
        'Reply-To'     => str_replace(["\r", "\n"], '', $email),
        'MIME-Version' => '1.0',
        'Message-ID'   => '<' . bin2hex(random_bytes(16)) . '@' . $domaineFrom . '>',
        'Date'         => date('r'),
        'X-Auto-Response-Suppress' => 'All',
        'Auto-Submitted' => 'auto-generated',
    ];
    if ($pj === null) {
        $entetes['Content-Type'] = 'text/plain; charset=UTF-8';
        $entetes['Content-Transfer-Encoding'] = 'base64';
        $contenuMail = chunk_split(base64_encode($corps), 76, "\r\n");
    } else {
        $entetes['Content-Type'] = 'multipart/mixed; boundary="' . $limiteMime . '"';
        $contenuMail = "Ce message est au format MIME.\r\n\r\n"
            . '--' . $limiteMime . "\r\n"
            . "Content-Type: text/plain; charset=UTF-8\r\n"
            . "Content-Transfer-Encoding: base64\r\n\r\n"
            . chunk_split(base64_encode($corps), 76, "\r\n")
            . '--' . $limiteMime . "\r\n"
            . 'Content-Type: ' . $pj['type'] . '; name="' . $pj['nom'] . "\"\r\n"
            . "Content-Transfer-Encoding: base64\r\n"
            . 'Content-Disposition: attachment; filename="' . $pj['nom'] . "\"\r\n\r\n"
            . chunk_split(base64_encode($pj['contenu']), 76, "\r\n")
            . '--' . $limiteMime . "--\r\n";
    }
    // Dernière barrière anti-injection : aucun en-tête ne doit contenir CR ou LF
    foreach ($entetes as $k => $v) {
        if (preg_match('/[\r\n]/', $k . $v)) throw new RuntimeException('injection en-tete detectee');
    }

    if (($CFG['mode'] ?? 'mail') === 'fichier') {
        $dossier = PIM_PRIVE . '/data/boite-test';
        @mkdir($dossier, 0700, true);
        $brut = 'To: ' . $to . "\r\nSubject: " . $sujet . "\r\n";
        foreach ($entetes as $k => $v) $brut .= $k . ': ' . $v . "\r\n";
        $fichierTest = $dossier . '/' . date('Ymd-His') . '-' . bin2hex(random_bytes(3)) . '.eml';
        $envoye = file_put_contents($fichierTest, $brut . "\r\n" . $contenuMail, LOCK_EX) !== false;
        @chmod($fichierTest, 0600);
    } else {
        $params = !empty($CFG['envelope_f']) ? '-f' . $from : '';
        $envoye = mail($to, $sujet, $contenuMail, $entetes, $params);
    }

    if (!$envoye) {
        pim_journal('erreur', 'echec de la fonction mail()');
        pim_repondre(false, 'Le message n’a pas pu être envoyé pour une raison technique. Appelez-nous au 03 88 58 62 00 ou écrivez à info@pim-industrie.com.', 500);
    }

    pim_etat('limites', function (array &$d) use ($ipKey, $maintenant) {
        $d[$ipKey][] = $maintenant;
        $d['_global'][] = $maintenant;
        return null;
    });
    pim_journal('ok', 'message envoye' . ($pj ? ' avec piece jointe' : ''));
    pim_repondre(true, 'Merci, votre message a bien été envoyé. Nous vous répondons sous 48 h ouvrées.');

} catch (Throwable $e) {
    error_log('[contact] ' . get_class($e) . ': ' . $e->getMessage() . ' @' . basename($e->getFile()) . ':' . $e->getLine());
    pim_journal('erreur', 'exception ' . get_class($e));
    pim_repondre(false, 'Le message n’a pas pu être envoyé pour une raison technique. Appelez-nous au 03 88 58 62 00 ou écrivez à info@pim-industrie.com.', 500);
}
