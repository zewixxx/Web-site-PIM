# Formulaire de contact : mise en service sur OVH

Le formulaire de `contact.html` envoie maintenant un vrai e-mail à **info@pim-industrie.com**, via le script PHP sécurisé `contact-envoi.php`. Aucune bibliothèque externe n'est utilisée : il n'y a rien à mettre à jour en dehors de PHP lui-même.

## 1. Fichiers à mettre en ligne (dossier `www` d'OVH)

| Fichier ou dossier | Rôle |
|---|---|
| `contact-envoi.php` | Le seul script PHP du site. Il délivre le jeton anti-robot et envoie le message. |
| `_prive/` | Configuration (`config.php`), traitement (`contact-traitement.php`), données anti-spam (`data/`) et journaux (`logs/`). **Ce dossier doit être mis en ligne**, mais il est bloqué pour le web (double protection `.htaccess`). |
| `contact-merci.html`, `contact-erreur.html` | Pages de retour quand le navigateur n'utilise pas JavaScript. Elles sont en noindex et absentes du sitemap. |
| `contact.html`, `site.js`, `style.css`, `confidentialite.html` | Le formulaire mis à jour, son script, son style et la mention de confidentialité. |
| `.htaccess` et `img/.htaccess` | Règles de sécurité ajoutées (voir le point 5). |

**Ne pas mettre en ligne `_outils-dev/`.** Il est bloqué par le `.htaccess`, mais il n'a rien à faire sur le serveur.

**Option plus sûre (recommandée) :** placer le dossier privé **hors** du dossier `www`. Sur OVH, déposez `_prive` à côté de `www` (dans le dossier racine de l'hébergement), puis renommez-le `pim-contact-prive`. `contact-envoi.php` le trouve automatiquement : il cherche d'abord `../pim-contact-prive/`, puis `_prive/`. Le dossier n'est alors plus du tout accessible depuis le web, même si un `.htaccess` venait à être supprimé.

## 2. À régler dans l'espace client OVH (une seule fois)

1. **Version de PHP : 8.1 ou plus récente** (8.2 ou 8.3 conseillé). Dans l'espace client, allez dans Hébergements, puis votre hébergement, puis l'onglet « Informations générales » ou « Configuration », et choisissez « Modifier la configuration ». Le script refuse de fonctionner sur une version trop ancienne. Les anciennes versions ne reçoivent plus de correctifs de sécurité : c'est probablement l'origine de la faille de l'ancien site.
2. **Adresse d'expédition `no-reply@pim-industrie.com`** : créez cette adresse e-mail dans l'onglet « E-mails » (le compte peut rester vide), ou utilisez une autre adresse **du domaine pim-industrie.com** et reportez-la dans `_prive/config.php` (ligne `'from'`). Ne mettez jamais une adresse Gmail ou une adresse extérieure : le message serait classé en spam ou rejeté.
3. **Envoi d'e-mails par PHP** : vérifiez qu'il est **actif** dans l'onglet « Informations générales » (ligne « Envoi d'e-mails » ou « Gestion des e-mails / Scripts »). OVH le bloque parfois automatiquement en cas de spam. Ce blocage a pu se produire avec l'ancien site piraté : dans ce cas, il faut le débloquer.
4. **DNS du domaine (délivrabilité)** : vérifiez que l'enregistrement **SPF** autorise OVH (`v=spf1 include:mx.ovh.com ~all`, ou équivalent) et, si possible, activez **DKIM** pour pim-industrie.com dans l'espace client. Si les e-mails de l'entreprise passent par un autre service (Microsoft 365, par exemple), demandez à l'informatique de **fusionner** les deux SPF : il ne faut jamais deux enregistrements SPF.
5. **HTTPS** actif (certificat SSL Let's Encrypt gratuit chez OVH). Le cookie de sécurité du formulaire est alors renforcé automatiquement (attributs `Secure` et `__Host-`).
6. Optionnel : dans le « .ovhconfig » ou la configuration PHP, gardez `upload_max_filesize` à 6 Mo ou plus et `post_max_size` à 8 Mo ou plus (valeurs par défaut d'OVH, suffisantes).

## 3. Réglages possibles dans `_prive/config.php`

- `to` : le destinataire, `info@pim-industrie.com`.
- `from` : l'expéditeur technique, `no-reply@pim-industrie.com`. Il doit être une adresse du domaine.
- `hotes` : les domaines autorisés à envoyer le formulaire. **Pendant un test en préproduction sur une autre adresse (par exemple `xxxx.cluster0xx.hosting.ovh.net`), ajoutez cette adresse ici**, sinon l'envoi est refusé avec « Envoi refusé ».
- `mode` : `'mail'` en production. `'fichier'` sert aux tests : rien n'est envoyé, chaque message est écrit dans `_prive/data/boite-test/`.
- `envelope_f` : passez-le à `false` seulement si les envois échouent alors que tout le reste est correct.
- Limites anti-spam : 3 envois par adresse IP sur 10 minutes, 10 par jour, et 100 au total par jour.
- La clé secrète est générée toute seule au premier usage (`_prive/data/cle-secrete.key`). Ne la partagez pas.

## 4. Procédure de test après la mise en ligne

1. Ouvrez `https://www.pim-industrie.com/contact.html`, remplissez le formulaire avec une vraie adresse (la vôtre), joignez un petit PDF, attendez quelques secondes, puis envoyez.
2. Le message vert « Merci, votre message a bien été envoyé » doit s'afficher, et l'e-mail doit arriver sur info@pim-industrie.com (vérifiez aussi les spams) avec la pièce jointe. Cliquez sur « Répondre » : la réponse doit partir vers l'adresse saisie dans le formulaire.
3. Vérifiez que ces adresses affichent bien une page **interdite (403)** : `https://www.pim-industrie.com/_prive/config.php`, `https://www.pim-industrie.com/_prive/logs/contact.log` et `https://www.pim-industrie.com/_outils-dev/`.
4. Vérifiez que `https://www.pim-industrie.com/contact-envoi.php` ouvert directement répond « Méthode non autorisée » (405).
5. Si un message n'arrive pas, consultez `_prive/logs/contact.log` par FTP. Ligne `ok` : le message est parti, donc le problème vient de la délivrabilité (SPF, spams, envoi bloqué chez OVH). Ligne `erreur ... mail()` : l'envoi d'e-mails est désactivé chez OVH. Les erreurs PHP éventuelles sont dans `_prive/logs/php-erreurs.log`.

## 5. Mesures de sécurité en place

**Script d'envoi**
- Il n'accepte que la méthode POST (le GET sert uniquement à délivrer le jeton). Aucune erreur PHP n'est affichée au visiteur : les messages restent génériques et les détails partent dans le journal du serveur.
- Les envois venant d'un autre site sont refusés (contrôle des en-têtes Origin, Referer et Sec-Fetch-Site).
- Seuls les champs attendus sont acceptés. Chaque champ a une longueur maximale, l'encodage UTF-8 est contrôlé, et les caractères de contrôle sont supprimés.
- L'adresse e-mail est validée avec `filter_var` et les caractères dangereux sont refusés. La liste « Votre projet concerne » n'accepte que ses 5 valeurs prévues.
- **Pas d'injection d'en-têtes e-mail** : aucun retour à la ligne n'est possible dans les en-têtes, avec une vérification finale avant l'envoi. L'objet du message est fixe. L'expéditeur est toujours `no-reply@pim-industrie.com` ; l'adresse du visiteur ne figure que dans « Répondre à », après validation.
- Le message est envoyé en **texte brut**, donc aucun code HTML ne peut s'exécuter dans la messagerie. Le HTML, les balises de lien et les messages avec plus de 3 liens sont refusés.
- **Aucun accusé de réception n'est envoyé au visiteur.** Le formulaire ne peut donc pas servir à envoyer du spam à des tiers.

**Anti-robots**
- Un champ piège (pot de miel) est invisible pour les humains. S'il est rempli, le robot reçoit un faux « merci » et rien n'est envoyé.
- Un jeton signé (HMAC-SHA256) est lié à un cookie de sécurité (HttpOnly, SameSite=Strict). Il fixe un délai minimum de 4 secondes avant l'envoi, expire au bout de 2 heures et ne peut servir qu'une fois.
- Le nombre d'envois est limité par adresse IP et au total. L'adresse IP n'est jamais enregistrée en clair : seule une empreinte chiffrée est gardée, pour respecter le RGPD.

**Pièce jointe**
- Un seul fichier, de 5 Mo au maximum.
- L'extension doit figurer dans la liste autorisée (PDF, DXF, DWG, AI, JPG, PNG). Le type réel du fichier est aussi analysé (`finfo` et signature du fichier) : un fichier `.php` renommé en `.pdf` est refusé.
- Le fichier reçoit un nom aléatoire, il est joint à l'e-mail, puis supprimé immédiatement. **Rien n'est jamais stocké sur le serveur.**

**Serveur (`.htaccess`)**
- **Aucun autre fichier PHP ne peut s'exécuter sur le site** : tout `.php` autre que `contact-envoi.php` répond 403. Les anciennes adresses PHP gardent leur réponse 410.
- Les dossiers commençant par `_` (`_prive`, `_outils-dev`) et les fichiers cachés (`.git`, `.env`, `.user.ini`...) sont bloqués, sauf `/.well-known/`, qui sert au certificat SSL.
- Les fichiers sensibles sont bloqués : sauvegardes, journaux, `.ini`, `.sql`, `.md`, `.csv`, `.json`, `.key`...
- Aucun script ne peut être exécuté dans `/img`.
- La réponse du script porte des en-têtes de sécurité stricts (CSP, X-Frame-Options, nosniff, no-store). Le site entier reçoit en plus X-Frame-Options et Permissions-Policy.

## 6. Ce qui a été testé (12/11/2026, PHP 8.3, serveur local)

Les tests ont été faits en mode `fichier`, en lisant les e-mails générés.
- Envoi valide, sans pièce jointe et avec PDF, PNG ou DXF : l'e-mail est conforme (MIME multipart, accents corrects, pièce jointe intacte, Reply-To correct).
- Les cas suivants sont refusés : rejeu du même jeton, envoi trop rapide, jeton absent ou falsifié, cookie absent, autre site d'origine, injection de retours à la ligne et de `Bcc:` dans l'e-mail et dans le nom, adresse e-mail invalide ou piégée, valeur hors liste, trop de liens, HTML dans le message, champ inattendu, PHP déguisé en PDF, fichier `.php`, double extension, fichier de plus de 5 Mo, PDF renommé en PNG, plusieurs fichiers, téléphone invalide, UTF-8 invalide, méthodes PUT et GET.
- Pot de miel : un faux succès est renvoyé et rien n'est envoyé. Limitation de débit : l'envoi est bloqué au 4e message en 10 minutes.
- Sans JavaScript : redirection vers `contact-merci.html` ou `contact-erreur.html`.
- Dans un vrai navigateur (Chrome) : le jeton est chargé, l'envoi avec pièce jointe fonctionne, le message vert s'affiche, et une erreur affiche un message clair avec le champ en cause surligné.
- Si l'envoi d'e-mails est désactivé : un message d'erreur clair s'affiche et l'incident est inscrit dans le journal.

**Point non testable ici :** les règles Apache du `.htaccess`. Elles sont à vérifier en préproduction OVH avec le point 4.3 (pages qui doivent répondre 403).
