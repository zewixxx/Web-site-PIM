param([string]$Root)
$ErrorActionPreference = "Stop"
if (-not $Root) { $Root = Split-Path -Parent $MyInvocation.MyCommand.Path }
$project = Split-Path -Parent $Root
$data = [System.IO.File]::ReadAllText((Join-Path $Root "plan-seo-data.json"), [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$pptPath = Join-Path $project "PIM - Presentation responsables.pptx"
$docPath = Join-Path $project "PIM - Compte rendu responsables.docx"

function Rgb($r, $g, $b) { return [int]($r + ($g * 256) + ($b * 65536)) }
$burgundy = Rgb 151 2 50
$ink = Rgb 28 28 28
$muted = Rgb 90 90 90
$white = Rgb 255 255 255
$paper = Rgb 247 244 244
$green = Rgb 226 242 226
$blue = Rgb 226 236 248
$amber = Rgb 253 236 200
$gray = Rgb 238 238 238

function Set-Range($shape, $text, $size, $bold, $color, $align) {
  $tr = $shape.TextFrame.TextRange
  $tr.Text = $text
  $tr.Font.Name = "Calibri"
  $tr.Font.Size = $size
  $tr.Font.Bold = [int]$bold
  $tr.Font.Color.RGB = $color
  $tr.ParagraphFormat.Alignment = $align
  $shape.TextFrame.WordWrap = -1
  $shape.TextFrame.AutoSize = 0
  $shape.Line.Visible = 0
}

function Add-Text($slide, $l, $t, $w, $h, $text, $size, $bold, $color, $align) {
  $shape = $slide.Shapes.AddTextbox(1, $l, $t, $w, $h)
  $shape.Fill.Visible = 0
  Set-Range $shape $text $size $bold $color $align
  return $shape
}

function Add-Card($slide, $l, $t, $w, $h, $fill) {
  $shape = $slide.Shapes.AddShape(1, $l, $t, $w, $h)
  $shape.Fill.Solid()
  $shape.Fill.ForeColor.RGB = $fill
  $shape.Line.Visible = 0
  return $shape
}

function Add-ContentSlide($pres, $title) {
  $slide = $pres.Slides.Add($pres.Slides.Count + 1, 12)
  $slide.FollowMasterBackground = 0
  $slide.Background.Fill.Solid()
  $slide.Background.Fill.ForeColor.RGB = $white
  $bar = $slide.Shapes.AddShape(1, 0, 0, 10, 540)
  $bar.Fill.ForeColor.RGB = $burgundy
  $bar.Line.Visible = 0
  Add-Text $slide 36 22 880 36 $title 26 1 $burgundy 1 | Out-Null
  return $slide
}

function Add-Bullets($slide, $items, $top) {
  $y = $top
  foreach ($item in $items) {
    $dot = $slide.Shapes.AddShape(9, 40, ($y + 8), 8, 8)
    $dot.Fill.ForeColor.RGB = $burgundy
    $dot.Line.Visible = 0
    Add-Text $slide 58 $y 860 42 $item 16 0 $ink 1 | Out-Null
    $y += 46
  }
}

# ---------- PowerPoint ----------
$ppt = New-Object -ComObject PowerPoint.Application
$ppt.Visible = -1
$ppt.DisplayAlerts = 1
$pres = $ppt.Presentations.Add()
$pres.PageSetup.SlideWidth = 960
$pres.PageSetup.SlideHeight = 540

# 1 Couverture
$s = $pres.Slides.Add(1, 12)
$s.FollowMasterBackground = 0
$s.Background.Fill.Solid()
$s.Background.Fill.ForeColor.RGB = $ink
Add-Text $s 48 70 820 24 "PIM INDUSTRIE  ·  MARCKOLSHEIM" 14 1 (Rgb 231 179 196) 1 | Out-Null
Add-Text $s 48 130 840 130 "Rendre le site plus facile à trouver, et plus simple à utiliser." 36 1 $white 1 | Out-Null
Add-Text $s 48 290 780 80 "Ce que nous allons changer pour les clients, et pour être mieux vu sur Google. Sans changer la marque." 20 0 (Rgb 220 220 220) 1 | Out-Null
Add-Text $s 48 470 700 28 "Document pour les responsables  ·  octobre 2026" 14 0 (Rgb 180 180 180) 1 | Out-Null

# 2 Promesse
$s = Add-ContentSlide $pres "L'objectif, en une phrase"
Add-Text $s 36 80 880 90 "Quand quelqu'un cherche un clavier, une façade ou une étiquette pour son métier, il doit tomber sur PIM, comprendre ce que nous savons faire, et pouvoir nous écrire." 22 0 $ink 1 | Out-Null
$cards = @(
  @("1. Trouver", "La bonne page apparaît dans Google, avec un titre clair."),
  @("2. Comprendre", "Le visiteur voit tout de suite si PIM peut l'aider."),
  @("3. Écrire", "Il peut décrire son besoin sans remplir un long formulaire.")
)
for ($i = 0; $i -lt 3; $i++) {
  $x = 36 + ($i * 300)
  Add-Card $s $x 230 280 200 $paper | Out-Null
  Add-Text $s ($x + 16) 248 248 36 $cards[$i][0] 20 1 $burgundy 1 | Out-Null
  Add-Text $s ($x + 16) 300 248 100 $cards[$i][1] 16 0 $ink 1 | Out-Null
}

# 3 Aujourd'hui
$s = Add-ContentSlide $pres "Ce que le visiteur vit aujourd'hui"
Add-Bullets $s @(
  "Il entre presque seulement par le nom du produit. Beaucoup ne le connaissent pas encore.",
  "Les métiers (médical, aéronautique, luxe...) sont souvent une image, sans explication.",
  "Les preuves de PIM existent, mais il faut les chercher loin dans les pages.",
  "Le glossaire est vide. Le plan du site aussi. Un lien « protection des données » ne mène nulle part.",
  "Pour écrire, le formulaire est long, avant même d'avoir expliqué le besoin."
) 90

# 4 Demain
$s = Add-ContentSlide $pres "Ce que le visiteur vivra demain"
Add-Bullets $s @(
  "Trois portes : son besoin, son métier, ou le produit s'il le connaît déjà.",
  "Chaque métier a sa page, avec un vrai texte et les produits qui vont avec.",
  "1961, la qualité, l'atelier, l'étanchéité et les grands noms sont visibles tout de suite.",
  "Sur chaque page, un court message suffit : le besoin, le métier, l'e-mail.",
  "Les anciennes adresses continuent de fonctionner. Personne ne tombe sur une erreur."
) 90

# 5 Trois portes
$s = Add-ContentSlide $pres "Trois façons d'entrer, au lieu d'une seule"
$doors = @(
  @($paper, "Son besoin", "J'ai une idée.`nMon besoin est déjà décrit.`nJe veux passer en série."),
  @($paper, "Son métier", "Médical, aéronautique,`nautomobile, luxe,`nvins, électronique..."),
  @($paper, "Le produit", "Clavier, circuit,`nface avant, étiquette,`nprésentoir. Déjà en ligne.")
)
for ($i = 0; $i -lt 3; $i++) {
  $x = 36 + ($i * 300)
  Add-Card $s $x 110 280 320 $paper | Out-Null
  $accent = $s.Shapes.AddShape(1, $x, 110, 280, 8)
  $accent.Fill.ForeColor.RGB = $burgundy
  $accent.Line.Visible = 0
  Add-Text $s ($x + 18) 140 244 40 $doors[$i][1] 22 1 $ink 1 | Out-Null
  Add-Text $s ($x + 18) 200 244 180 $doors[$i][2] 18 0 $muted 1 | Out-Null
}

# 6 Avant apres parcours
$s = Add-ContentSlide $pres "Le même visiteur, avant et après"
Add-Card $s 36 100 430 360 $paper | Out-Null
Add-Card $s 490 100 430 360 (Rgb 243 232 235) | Out-Null
Add-Text $s 52 116 400 28 "Aujourd'hui" 20 1 $muted 1 | Out-Null
Add-Text $s 506 116 400 28 "Demain" 20 1 $burgundy 1 | Out-Null
Add-Text $s 52 160 390 270 "Il cherche « clavier pour le médical ».`n`nIl arrive sur une liste de technologies.`n`nIl ne voit pas si PIM connaît son métier.`n`nLe contact est loin, et le formulaire est long." 16 0 $ink 1 | Out-Null
Add-Text $s 506 160 390 270 "Il arrive sur une page Industrie médicale.`n`nIl lit ce que PIM sait faire, et voit les claviers adaptés.`n`nIl voit la qualité et l'atelier.`n`nIl écrit son besoin en quelques lignes." 16 0 $ink 1 | Out-Null

# 7 On garde
$s = Add-ContentSlide $pres "Les adresses déjà connues ne bougent pas"
Add-Text $s 36 72 880 36 "Google connaît déjà ces pages. Les changer ferait perdre des visiteurs. On les garde." 15 0 $muted 1 | Out-Null
$keep = @(
  @("Clavier à membrane", "www.pim-industrie.com/industrie/clavier-a-membrane"),
  @("Étiquettes vins et spiritueux", "www.pim-industrie.com/decoration/etiquette-personnalisable/etiquette-vins-spiritueux"),
  @("Contact", "www.pim-industrie.com/contact"),
  @("Qui sommes-nous", "www.pim-industrie.com/qui-sommes-nous")
)
$y = 120
foreach ($row in $keep) {
  Add-Card $s 36 $y 888 78 $green | Out-Null
  Add-Text $s 52 ($y + 8) 400 28 $row[0] 16 1 $ink 1 | Out-Null
  Add-Text $s 52 ($y + 36) 850 28 $row[1] 14 0 $muted 1 | Out-Null
  $y += 88
}

# 8 Nouvelles
$s = Add-ContentSlide $pres "Les adresses que nous allons créer"
Add-Text $s 36 72 880 32 "Elles n'existent pas aujourd'hui. C'est par là que les nouveaux visiteurs arriveront." 15 0 $muted 1 | Out-Null
$news = @(
  @("J'ai une idée", "www.pim-industrie.com/besoins/j-ai-une-idee"),
  @("Besoin déjà décrit", "www.pim-industrie.com/besoins/besoin-decrit"),
  @("Passer en série", "www.pim-industrie.com/besoins/industrialiser"),
  @("Industrie médicale", "www.pim-industrie.com/secteurs/industrie-medicale"),
  @("Aéronautique et défense", "www.pim-industrie.com/secteurs/aeronautique-defense"),
  @("Luxe", "www.pim-industrie.com/secteurs/luxe")
)
for ($i = 0; $i -lt $news.Count; $i++) {
  $col = $i % 2
  $line = [math]::Floor($i / 2)
  $x = 36 + ($col * 460)
  $y = 118 + ($line * 120)
  Add-Card $s $x $y 440 108 $blue | Out-Null
  Add-Text $s ($x + 16) ($y + 12) 408 28 $news[$i][0] 18 1 $ink 1 | Out-Null
  Add-Text $s ($x + 16) ($y + 48) 408 44 $news[$i][1] 13 0 $muted 1 | Out-Null
}

# 9 Reparations
$s = Add-ContentSlide $pres "Les adresses que nous allons réparer"
Add-Text $s 36 70 880 28 "Si quelqu'un a noté l'ancienne adresse, il arrivera quand même au bon endroit." 15 0 $muted 1 | Out-Null
$fixes = @(
  @("Protection des données", "www.pim-industrie.com/93", "www.pim-industrie.com/politique-de-protection-des-donnees"),
  @("Deux pages « société »", "www.pim-industrie.com/societe", "www.pim-industrie.com/qui-sommes-nous"),
  @("Glossaire vide", "www.pim-industrie.com/outils/glossaire", "www.pim-industrie.com/glossaire"),
  @("Newsletter", "www.pim-industrie.com/inscriptiondesinscription-newsletter", "www.pim-industrie.com/newsletter")
)
$y = 112
foreach ($row in $fixes) {
  Add-Card $s 36 $y 888 90 $amber | Out-Null
  Add-Text $s 52 ($y + 8) 250 28 $row[0] 15 1 $ink 1 | Out-Null
  Add-Text $s 310 ($y + 8) 590 28 ("Avant  ·  " + $row[1]) 13 0 $muted 1 | Out-Null
  Add-Text $s 52 ($y + 44) 850 32 ("Après  ·  " + $row[2]) 15 0 $ink 1 | Out-Null
  $y += 98
}

# 10 Metiers
$s = Add-ContentSlide $pres "Une page par métier"
Add-Text $s 36 72 880 32 "Aujourd'hui ce sont des images. Demain, chacune a son texte et mène vers les bons produits." 15 0 $muted 1 | Out-Null
$jobs = @("Industrie médicale","Aéronautique et défense","Automobile","Automatisation","Machine-outils","Nautique","Électronique","Transports","Luxe, vins et cosmétique")
for ($i = 0; $i -lt $jobs.Count; $i++) {
  $col = $i % 3
  $line = [math]::Floor($i / 3)
  $x = 36 + ($col * 300)
  $y = 130 + ($line * 110)
  Add-Card $s $x $y 284 96 $paper | Out-Null
  Add-Text $s ($x + 14) ($y + 28) 256 36 $jobs[$i] 16 1 $ink 1 | Out-Null
}

# 11 Preuves
$s = Add-ContentSlide $pres "Les preuves, visibles tout de suite"
$proofs = @(
  @("1961","Création à Marckolsheim"),
  @("ISO 9001","Qualité et traçabilité"),
  @("4 500 m²","Atelier, de la couleur au contrôle"),
  @("IP65","Claviers protégés de l'eau et de la poussière"),
  @("100 %","Chaque pièce est contrôlée"),
  @("1 million","Coupelles posées par an"),
  @("350 000","LED posées par an"),
  @("Grands noms","Bosch, Siemens, Hennessy, Chanel...")
)
for ($i = 0; $i -lt $proofs.Count; $i++) {
  $col = $i % 4
  $line = [math]::Floor($i / 4)
  $x = 36 + ($col * 228)
  $y = 110 + ($line * 180)
  Add-Card $s $x $y 216 160 $paper | Out-Null
  Add-Text $s ($x + 12) ($y + 24) 192 50 $proofs[$i][0] 22 1 $burgundy 1 | Out-Null
  Add-Text $s ($x + 12) ($y + 84) 192 60 $proofs[$i][1] 14 0 $ink 1 | Out-Null
}

# 12 Experience
$s = Add-ContentSlide $pres "Écrire à PIM devient simple"
Add-Card $s 36 110 430 340 $paper | Out-Null
Add-Card $s 490 110 430 340 (Rgb 243 232 235) | Out-Null
Add-Text $s 52 126 390 28 "Le formulaire complet reste" 18 1 $ink 1 | Out-Null
Add-Text $s 52 170 390 240 "Sur la page Contact, rien n'est enlevé : nom, société, téléphone, délai, précision du projet.`n`nIl sert à ceux qui veulent tout dire." 16 0 $ink 1 | Out-Null
Add-Text $s 506 126 390 28 "Un message court partout ailleurs" 18 1 $burgundy 1 | Out-Null
Add-Text $s 506 170 390 240 "En bas de chaque page :`n`nle besoin,`nle métier,`nl'e-mail.`n`nLe téléphone 03 88 58 62 00 reste visible en haut." 16 0 $ink 1 | Out-Null

# 13 Textes
$s = Add-ContentSlide $pres "Les textes que nous allons écrire"
Add-Bullets $s @(
  "Une page par métier, avec ses contraintes et les produits PIM qui répondent.",
  "Les pages produits gardent leur texte. On le range, et on ajoute les questions fréquentes.",
  "Le glossaire est rempli : limande, coupelle, étanchéité, sérigraphie, étiquette 3D.",
  "Les pages atelier ne répètent plus le même paragraphe.",
  "Les récits clients détaillés ne seront publiés que lorsque PIM les aura validés."
) 100

# 14 Google
$s = Add-ContentSlide $pres "Comment on apparaît sur Google"
Add-Bullets $s @(
  "Chaque page a son propre titre, celui que les gens lisent dans les résultats.",
  "Le plan du site, aujourd'hui cassé ou vide, sera une vraie liste de pages.",
  "La fiche Google de Marckolsheim reprendra la même adresse, les mêmes métiers et des photos récentes.",
  "Après la mise en ligne, on vérifie que les anciennes adresses arrivent au bon endroit.",
  "On suivra deux choses : est-ce que les bonnes pages sortent, et est-ce que les demandes augmentent."
) 100

# 15 Marque
$s = Add-ContentSlide $pres "La marque ne change pas"
Add-Bullets $s @(
  "Le logo PIM Industrie reste.",
  "Le bordeaux, le noir et le blanc restent.",
  "Le téléphone reste en haut de chaque page.",
  "Le ton reste industriel et précis. Pas un site à la mode.",
  "La décoration et l'industrie restent dans la même maison, avec deux façons de parler.",
  "L'anglais et l'allemand seront repris quand les textes français seront prêts. Pas avant."
) 90

# 16 Ordre
$s = Add-ContentSlide $pres "Dans quel ordre"
$steps = @(
  @("1","Valider ensemble cette liste."),
  @("2","Garder les bonnes adresses, réparer les autres."),
  @("3","Écrire les pages métier, le glossaire, remonter les preuves."),
  @("4","Mettre en ligne, puis vérifier chaque ancienne adresse."),
  @("5","Ensuite seulement : anglais, allemand, récits clients.")
)
$y = 100
foreach ($step in $steps) {
  Add-Text $s 40 $y 50 36 $step[0] 26 1 $burgundy 1 | Out-Null
  Add-Text $s 100 ($y + 4) 800 32 $step[1] 18 0 $ink 1 | Out-Null
  $y += 72
}

# 17 Decision
$s = Add-ContentSlide $pres "Ce que nous vous demandons de valider"
Add-Bullets $s @(
  "La liste des métiers qui auront une page.",
  "Les preuves chiffrées que nous avons le droit d'afficher.",
  "Les noms de clients déjà présents sur le site, regroupés sur une page Références.",
  "Qu'aucun récit client détaillé ne sort sans votre accord.",
  "Qu'une série de photos récentes de l'atelier pourra être faite."
) 110

# Pied de page
$total = $pres.Slides.Count
for ($i = 2; $i -le $total; $i++) {
  $slide = $pres.Slides.Item($i)
  Add-Text $slide 36 508 760 20 "PIM Industrie  ·  Être mieux trouvé, et plus simple à utiliser" 11 0 $muted 1 | Out-Null
  Add-Text $slide 820 508 100 20 "$i / $total" 11 0 $muted 3 | Out-Null
}

if (Test-Path -LiteralPath $pptPath) { Remove-Item -LiteralPath $pptPath -Force }
$preview = Join-Path $Root "apercu"
if (Test-Path -LiteralPath $preview) { Remove-Item -LiteralPath $preview -Recurse -Force }
New-Item -ItemType Directory -Path $preview | Out-Null
foreach ($n in @(1, 6, 7, 8, 9, 11, 12)) {
  $file = Join-Path $preview ("slide-{0:00}.png" -f $n)
  $pres.Slides.Item($n).Export($file, "PNG", 1920, 1080) | Out-Null
}
$pres.SaveAs($pptPath)
$pres.Saved = $true
$pres.Close()
$ppt.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($pres) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($ppt) | Out-Null
[GC]::Collect()
Write-Output $pptPath
Write-Output ("ppt=" + (Get-Item -LiteralPath $pptPath).Length)
exit 0

# ---------- Word ----------
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
$doc = $word.Documents.Add()
$doc.PageSetup.Orientation = 1
$doc.PageSetup.TopMargin = 50
$doc.PageSetup.BottomMargin = 50
$doc.PageSetup.LeftMargin = 50
$doc.PageSetup.RightMargin = 50
$sel = $word.Selection
$sel.Font.Name = "Calibri"
$sel.Font.Size = 12
$sel.Font.Color = $ink

function Add-Heading([string]$text, [int]$level) {
  $sel.Style = $(if ($level -eq 1) { -2 } else { -3 })
  $sel.Font.Name = "Calibri"
  $sel.Font.Color = $burgundy
  $sel.TypeText($text)
  $sel.TypeParagraph()
  $sel.Font.Color = $ink
  $sel.Font.Size = 12
}
function Add-Paragraph([string]$text) {
  $sel.Style = "Normal"
  $sel.Font.Name = "Calibri"
  $sel.Font.Size = 12
  $sel.Font.Color = $ink
  $sel.TypeText($text)
  $sel.TypeParagraph()
}

Add-Heading "Compte rendu" 1
Add-Paragraph "PIM Industrie — Rendre le site plus facile à trouver, et plus simple à utiliser."
Add-Paragraph "Document pour les responsables. Octobre 2026. Il s'appuie sur le site public et sur les notes de travail du 20 février 2026."

Add-Heading "1. De quoi parlons-nous ?" 1
Add-Paragraph "Le site présente déjà le savoir-faire de PIM : claviers à membrane, façades, pièces, étiquettes, présentoirs. Le problème n'est pas l'absence de métier. Le problème est que le visiteur a du mal à trouver la bonne porte, et que Google a du mal à comprendre certaines pages."
Add-Paragraph "L'objectif est simple. Quand quelqu'un cherche une solution pour son métier, il tombe sur PIM, il comprend, et il peut écrire. On ne change pas la marque : le logo, le bordeaux, le téléphone et le ton industriel restent."

Add-Heading "2. Ce que le visiteur vit aujourd'hui" 1
Add-Paragraph "Il entre presque seulement par le nom du produit. Or beaucoup de clients arrivent avec une idée ou un métier, pas avec le mot « clavier capacitif »."
Add-Paragraph "Les métiers cités sur le site — médical, aéronautique, automobile, automatisation, machine-outils, nautique, électronique, transports, luxe — sont souvent une image, sans texte."
Add-Paragraph "Les preuves sont réelles, mais dispersées : création en 1961 à Marckolsheim, certification ISO 9001, atelier de 4 500 m², claviers protégés IP65, contrôle de chaque pièce, un million de coupelles et 350 000 LED par an, des noms comme Bosch, Siemens, Hennessy ou Chanel."
Add-Paragraph "Quelques pages font perdre confiance ou des visiteurs. Le glossaire affiche l'alphabet mais aucune définition. Le plan du site est vide. Le lien « protection des données » mène à une page qui n'existe pas. La société est décrite deux fois, à deux adresses différentes. Plusieurs pages de l'atelier répètent le même paragraphe."
Add-Paragraph "Pour prendre contact, le formulaire demande beaucoup d'informations dès le premier geste."

Add-Heading "3. Ce que nous allons changer" 1
Add-Paragraph "Trois portes, au lieu d'une. Le visiteur choisit selon ce qu'il a en tête."
Add-Paragraph "Son besoin : j'ai une idée ; mon besoin est déjà décrit ; je veux passer en série."
Add-Paragraph "Son métier : une page par milieu, qui explique et qui mène vers les bons produits. La page Luxe mène vers les étiquettes et les présentoirs, sans copier ces pages une seconde fois."
Add-Paragraph "Le produit, s'il le connaît déjà : claviers, circuits, faces avant, étiquettes, PLV. Ces pages gardent leur adresse actuelle, parce que Google les connaît déjà."
Add-Paragraph "Sur chaque page, un message court : le besoin, le métier, l'e-mail. Le formulaire complet reste sur la page Contact, pour ceux qui veulent tout préciser. Le 03 88 58 62 00 reste visible."
Add-Paragraph "Les preuves remontent en haut des pages, au lieu de rester dans l'historique."
Add-Paragraph "Les textes manquants seront écrits : métiers, glossaire, questions fréquentes sur les produits. Aucun récit client détaillé ne sera publié sans l'accord de PIM. Aucune page vide ne sera mise en ligne."
Add-Paragraph "La fiche Google de l'entreprise, à Marckolsheim, sera remise au même niveau que le site : adresse, métiers, photos récentes."
Add-Paragraph "Chaque page aura un titre clair, celui que l'on lit dans Google. Le plan du site, aujourd'hui vide, listera vraiment les pages. Après la mise en ligne, on vérifiera que chaque ancienne adresse arrive au bon endroit, et on suivra deux résultats : les bonnes pages apparaissent-elles, et les demandes de contact augmentent-elles."
Add-Paragraph "Les photos de l'atelier et des pièces seront renouvelées quand PIM pourra les faire. Les récits clients détaillés et les versions anglaise et allemande viendront après, pas dans la première mise en ligne. Aucune page vide ne sera publiée."

Add-Heading "4. Les adresses, avant et après" 1
Add-Paragraph "Une adresse, c'est le lien d'une page. Certaines sont déjà bonnes : on les garde. D'autres n'existent pas : on les crée. D'autres sont cassées ou en double : l'ancienne continuera d'envoyer le visiteur au bon endroit. Personne ne tombe sur une erreur."
Add-Paragraph "Le détail de chaque page est dans le tableau ci-dessous. Le vert, le bleu et l'orange du fichier Excel correspondent aux mêmes décisions : on garde, nouvelle page, on renvoie."

# Table pages
$rows = @($data.pages)
$n = $rows.Count + 1
$sel.TypeParagraph()
$table = $doc.Tables.Add($sel.Range, $n, 4)
$table.Borders.Enable = $true
$headers = @("Page", "Décision", "Avant", "Après")
for ($c = 1; $c -le 4; $c++) {
  $cell = $table.Cell(1, $c)
  $cell.Range.Text = $headers[$c - 1]
  $cell.Range.Font.Bold = $true
  $cell.Range.Font.Color = $white
  $cell.Shading.BackgroundPatternColor = $burgundy
}
for ($r = 0; $r -lt $rows.Count; $r++) {
  $item = $rows[$r]
  $vals = @([string]$item[1], [string]$item[2], [string]$item[3], [string]$item[4])
  for ($c = 0; $c -lt 4; $c++) {
    $cell = $table.Cell($r + 2, $c + 1)
    $cell.Range.Text = $vals[$c]
    $cell.Range.Font.Size = 9
    $cell.Range.Font.Color = $ink
  }
  $color = $white
  switch ([string]$item[2]) {
    "On garde" { $color = $green }
    "Nouvelle page" { $color = $blue }
    "On renvoie" { $color = $amber }
    "Plus tard" { $color = $gray }
  }
  $table.Cell($r + 2, 2).Shading.BackgroundPatternColor = $color
}
$sel.EndKey(6) | Out-Null
$sel.TypeParagraph()

Add-Heading "5. Comment lire trois exemples" 1
Add-Paragraph "Exemple 1, une adresse qu'on garde. Le clavier à membrane est déjà en www.pim-industrie.com/industrie/clavier-a-membrane. Cette adresse ne change pas. On améliore le texte et on la relie aux métiers."
Add-Paragraph "Exemple 2, une adresse qu'on crée. Il n'existe pas de page « industrie médicale ». Nous créerons www.pim-industrie.com/secteurs/industrie-medicale. Elle expliquera le milieu et mènera vers les claviers et les façades."
Add-Paragraph "Exemple 3, une adresse qu'on répare. Le bandeau du site envoie vers www.pim-industrie.com/93 pour la protection des données. Cette page n'existe pas. Elle deviendra www.pim-industrie.com/politique-de-protection-des-donnees, avec les textes déjà publiés. L'ancienne adresse y mènera automatiquement."

Add-Heading "6. Les preuves que nous proposons d'afficher" 1
Add-Paragraph "Ce sont des éléments déjà écrits sur le site. Nous demandons simplement de confirmer qu'ils peuvent être mis en avant."
$sel.TypeParagraph()
$pr = @($data.preuves)
$t2 = $doc.Tables.Add($sel.Range, $pr.Count + 1, 3)
$h2 = @("Preuve", "Ce que cela veut dire", "Où on la montre")
for ($c = 1; $c -le 3; $c++) {
  $cell = $t2.Cell(1, $c)
  $cell.Range.Text = $h2[$c - 1]
  $cell.Range.Font.Bold = $true
  $cell.Range.Font.Color = $white
  $cell.Shading.BackgroundPatternColor = $burgundy
}
for ($r = 0; $r -lt $pr.Count; $r++) {
  for ($c = 0; $c -lt 3; $c++) {
    $cell = $t2.Cell($r + 2, $c + 1)
    $cell.Range.Text = [string]$pr[$r][$c]
    $cell.Range.Font.Size = 10
    $cell.Range.Font.Color = $ink
  }
}
$sel.EndKey(6) | Out-Null
$sel.TypeParagraph()

Add-Heading "7. L'ordre de travail" 1
Add-Paragraph "Nous ne publions pas tout d'un coup, et nous ne publions pas une page vide."
$stepsText = @(
  "1. Valider ensemble cette liste : métiers, preuves, noms de clients, photos.",
  "2. Conserver les bonnes adresses et préparer le renvoi des anciennes.",
  "3. Écrire les pages métier, remplir le glossaire, structurer les pages produits, remonter les preuves.",
  "4. Mettre le message court sur chaque page, et garder le formulaire complet sur Contact.",
  "5. Mettre en ligne, puis vérifier une par une que les anciennes adresses arrivent au bon endroit.",
  "6. Ensuite seulement : anglais, allemand, et récits clients validés. La fiche Google de Marckolsheim est mise à jour en même temps que le site."
)
foreach ($line in $stepsText) { Add-Paragraph $line }

Add-Heading "8. Ce que nous vous demandons" 1
Add-Paragraph "Valider la liste des métiers. Confirmer les chiffres et la certification que nous pouvons afficher. Confirmer que les noms déjà présents sur le site peuvent être regroupés sur une page Références. Décider qu'aucun récit détaillé ne sort sans accord. Autoriser, quand vous serez prêts, une série de photos récentes de l'atelier et des pièces."
Add-Paragraph "Le fichier Excel « PIM - etre mieux trouve sur Google » reprend la même liste, avec des filtres, pour ceux qui veulent cocher page par page. Le PowerPoint reprend le même raisonnement, en images, pour la réunion."

if (Test-Path -LiteralPath $docPath) { Remove-Item -LiteralPath $docPath -Force }
$doc.SaveAs2($docPath, 16)
$doc.Close()
$word.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($doc) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null

Write-Output $pptPath
Write-Output $docPath
Write-Output ("ppt=" + (Get-Item -LiteralPath $pptPath).Length)
Write-Output ("doc=" + (Get-Item -LiteralPath $docPath).Length)
