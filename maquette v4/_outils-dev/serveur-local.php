<?php
/**
 * Prévisualisation locale (le serveur PHP intégré ne lit pas .htaccess).
 * Inutile sur OVH : Apache applique la règle 4b et sert les pages rangées
 * tout en gardant les adresses publiques /nom-de-page.html.
 *
 * Depuis la racine du site :
 *   php -S 127.0.0.1:8765 _outils-dev/serveur-local.php
 */
declare(strict_types=1);

$root = dirname(__DIR__);
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$uri = is_string($uri) ? rawurldecode($uri) : '/';
if ($uri === '' || $uri === '/') {
    header('Content-Type: text/html; charset=utf-8');
    readfile($root . DIRECTORY_SEPARATOR . 'index.html');
    return true;
}

$rel = ltrim(str_replace('\\', '/', $uri), '/');
$direct = $root . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $rel);
if (is_file($direct)) {
    return false;
}

$cible = null;
if (preg_match('#^([^/]+\.html)$#', $rel, $nom)) {
    $echappe = str_replace('.', '\\.', $nom[1]);
    $htaccess = (string) file_get_contents($root . DIRECTORY_SEPARATOR . '.htaccess');
    $motif = '/RewriteRule \^' . preg_quote($echappe, '/') . '\$ (\S+) \[L\]/';
    if (preg_match($motif, $htaccess, $trouve)) {
        $chemin = $root . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $trouve[1]);
        if (is_file($chemin)) {
            $cible = $chemin;
        }
    }
}

if ($cible === null) {
    http_response_code(404);
    header('Content-Type: text/html; charset=utf-8');
    readfile($root . DIRECTORY_SEPARATOR . 'pages' . DIRECTORY_SEPARATOR . 'systeme' . DIRECTORY_SEPARATOR . '404.html');
    return true;
}

header('Content-Type: text/html; charset=utf-8');
readfile($cible);
return true;
