# Mise en ligne du site PIM Industrie sur OVH

Le dossier **`out/`** contient le site terminé (Next.js exporté en statique + formulaire PHP).
Il suffit d'en déposer **le contenu** sur l'hébergement OVH.

## Adresses du site

| Adresse | Contenu |
|---|---|
| `https://www.pim-industrie.com/` | redirige vers `/fr/` (ou `/en/`, ou le `.de`) selon la langue du navigateur |
| `https://www.pim-industrie.com/fr/` | site en français |
| `https://www.pim-industrie.com/en/` | site en anglais |
| `https://www.pim-industrie.de/` | site en allemand |

Le sélecteur de langue (FR / EN / DE) renvoie toujours vers la bonne adresse, y compris vers l'autre domaine.
Les redirections automatiques (dans `.htaccess`) :

- `http://` vers `https://`
- `pim-industrie.com` / `pim-industrie.de` (sans www) vers `www.…`
- `www.pim-industrie.com/de/...` vers `www.pim-industrie.de/...`
- `www.pim-industrie.de/fr/...` et `/en/...` vers `www.pim-industrie.com/fr/...` et `/en/...`
- anciennes adresses `contact.html` / `index.html` de la page de maintenance

## Étapes chez OVH

1. **Espace client OVH > Hébergements > Multisite** : les deux domaines
   (`pim-industrie.com` et `pim-industrie.de`) doivent avoir **le même dossier racine** (par exemple `www`).
   Pour chaque domaine : cocher **SSL** (certificat Let's Encrypt) et **CDN désactivé** si proposé.
2. **FTP / Gestionnaire de fichiers** : vider l'ancien contenu du dossier racine (ancienne page de maintenance),
   puis déposer **tout le contenu de `out/`**, y compris les fichiers cachés `.htaccess`, `.ovhconfig`, `.user.ini`
   et le dossier `_next/`.
3. Vérifier que l'adresse `info@pim-industrie.com` **existe bien** comme boîte e-mail OVH
   (c'est l'expéditeur et le destinataire des messages du formulaire).
4. Tester :
   - `http://pim-industrie.de` arrive sur `https://www.pim-industrie.de/` (allemand)
   - `https://www.pim-industrie.com/` arrive sur `/fr/` ou `/en/`
   - changer de langue avec le bouton en haut à droite
   - envoyer un message depuis la page Contact et vérifier la réception.

> En cas de message « trop de redirections » : l'hébergement OVH ne transmet pas l'information HTTPS.
> Dans `.htaccess`, supprimer le bloc « 2. HTTP -> HTTPS » (le SSL forcé peut aussi se régler dans
> Multisite > domaine > « Forcer le HTTPS »).

## E-mail reçu à chaque message

Objet : `Message du site PIM Industrie – <sujet> – <nom>`
Le corps est **toujours en français** (même si le visiteur écrit depuis la page allemande ou anglaise) et explique :
qu'il s'agit d'un message du formulaire de contact, comment répondre (bouton « Répondre » = réponse directe au visiteur),
les coordonnées, le sujet, le message, la date, le site d'origine et la langue de la page.

## Sécurité en place

- HTTPS forcé, HSTS, Content-Security-Policy, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy.
- Formulaire : jeton de session, vérification de l'origine, champ piège anti-robot, délai minimum, limite de
  5 messages/heure/IP (IP stockée uniquement sous forme hachée), liste blanche des sujets, protection contre
  l'injection d'en-têtes e-mail, aucune donnée affichée sans échappement.
- Dossiers `inc/` et `prive/` interdits d'accès depuis Internet ; fichiers `.ini`, `.log`, `.bin`, `.ovhconfig` bloqués.
- Aucun cookie publicitaire ni outil de statistiques (pas de bandeau cookies nécessaire).
- Polices hébergées sur le site (aucune requête vers Google).

## Réglages possibles

| Fichier source | Réglage |
|---|---|
| `lib/site.ts` | `COMPANY.legal` : SIRET, TVA, forme juridique, directeur de publication (affichés sur la page Mentions légales / Impressum dès qu'ils sont remplis) ; `INDEXABLE` pour autoriser ou non Google |
| `lib/i18n.ts` | tous les textes en FR / EN / DE |
| `public/inc/securite.php` | adresse de réception du formulaire, limite par heure, libellés des sujets |

## Modifier le site puis régénérer `out/`

Prérequis : Node.js 20 ou plus récent.

```bash
npm install
npm run build
```

Le dossier `out/` est recréé : redéposer son contenu chez OVH.
Test local (sans le PHP) : `npm run dev` puis http://localhost:3000/fr/.

## Pourquoi un export statique ?

L'hébergement OVH mutualisé de PIM Industrie fonctionne avec PHP (`.ovhconfig`). Un export statique Next.js
se dépose directement, sans serveur Node.js à maintenir, et le formulaire d'envoi utilise le PHP d'OVH.
