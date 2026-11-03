<?php
declare(strict_types=1);

function redirect(string $query): void
{
    header('Location: contact.html' . ($query !== '' ? '?' . $query : ''));
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    redirect('');
}

if (trim((string) ($_POST['societe_web'] ?? '')) !== '') {
    redirect('envoye=1');
}

function line(string $key, int $max): string
{
    $value = trim((string) ($_POST[$key] ?? ''));
    $value = str_replace(["\r", "\n", "\0"], ' ', $value);
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $max, 'UTF-8');
    }
    return substr($value, 0, $max);
}

$nom = line('nom', 120);
$email = line('email', 180);
$societe = line('societe', 160);
$telephone = line('telephone', 40);
$sujet = line('sujet', 80);
$message = trim((string) ($_POST['message'] ?? ''));
$message = str_replace("\0", '', $message);
if (function_exists('mb_substr')) {
    $message = mb_substr($message, 0, 4000, 'UTF-8');
} else {
    $message = substr($message, 0, 4000);
}

if ($nom === '' || $message === '' || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    redirect('erreur=1');
}

$to = 'gaetan.salber@pim-industrie.fr';
$subject = 'Contact site — ' . ($sujet !== '' ? $sujet . ' — ' : '') . $nom;
$body = "Message envoyé depuis la page de contact PIM Industrie\n\n"
    . "Nom : {$nom}\n"
    . "Société : {$societe}\n"
    . "E-mail : {$email}\n"
    . "Téléphone : {$telephone}\n"
    . "Sujet : {$sujet}\n\n"
    . "Message :\n{$message}\n";

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Reply-To: ' . $email,
]);

$sent = mail($to, $encodedSubject, $body, $headers);
redirect($sent ? 'envoye=1' : 'erreur=1');
