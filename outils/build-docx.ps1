param([string]$Root)
$ErrorActionPreference = "Stop"
if (-not $Root) { $Root = Split-Path -Parent $MyInvocation.MyCommand.Path }
$project = Split-Path -Parent $Root
$data = [System.IO.File]::ReadAllText((Join-Path $Root "plan-seo-data.json"), [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$outPath = Join-Path $project "PIM - Compte rendu responsables.docx"

function X([string]$s) {
  if ($null -eq $s) { return "" }
  return [System.Security.SecurityElement]::Escape($s)
}
function P([string]$text, [int]$sz, [string]$color, [bool]$bold, [int]$before, [int]$after) {
  $b = ""
  if ($bold) { $b = "<w:b/>" }
  return "<w:p><w:pPr><w:spacing w:before=`"$before`" w:after=`"$after`" w:line=`"276`" w:lineRule=`"auto`"/></w:pPr><w:r><w:rPr>$b<w:color w:val=`"$color`"/><w:sz w:val=`"$sz`"/><w:szCs w:val=`"$sz`"/><w:rFonts w:ascii=`"Calibri`" w:hAnsi=`"Calibri`" w:cs=`"Calibri`"/></w:rPr><w:t xml:space=`"preserve`">$(X $text)</w:t></w:r></w:p>"
}
function Cell([string]$text, [string]$fill, [bool]$bold, [string]$font, [int]$sz) {
  $b = ""
  if ($bold) { $b = "<w:b/>" }
  return "<w:tc><w:tcPr><w:shd w:val=`"clear`" w:color=`"auto`" w:fill=`"$fill`"/><w:vAlign w:val=`"center`"/><w:tcMar><w:top w:w=`"50`" w:type=`"dxa`"/><w:left w:w=`"70`" w:type=`"dxa`"/><w:bottom w:w=`"50`" w:type=`"dxa`"/><w:right w:w=`"70`" w:type=`"dxa`"/></w:tcMar></w:tcPr><w:p><w:pPr><w:spacing w:before=`"0`" w:after=`"0`"/></w:pPr><w:r><w:rPr>$b<w:color w:val=`"$font`"/><w:sz w:val=`"$sz`"/><w:szCs w:val=`"$sz`"/><w:rFonts w:ascii=`"Calibri`" w:hAnsi=`"Calibri`"/></w:rPr><w:t xml:space=`"preserve`">$(X $text)</w:t></w:r></w:p></w:tc>"
}
function Row([string[]]$vals, [string[]]$fills, [bool]$bold, [string]$font, [int]$sz, [bool]$header) {
  $hp = ""
  if ($header) { $hp = "<w:trPr><w:tblHeader/></w:trPr>" }
  $cells = ""
  for ($i = 0; $i -lt $vals.Count; $i++) { $cells += Cell $vals[$i] $fills[$i] $bold $font $sz }
  return "<w:tr>$hp$cells</w:tr>"
}
function Table([string]$rowsXml, [int[]]$widths) {
  $grid = ""
  foreach ($w in $widths) { $grid += "<w:gridCol w:w=`"$w`"/>" }
  $borders = "<w:tblBorders><w:top w:val=`"single`" w:sz=`"4`" w:space=`"0`" w:color=`"E4E4E4`"/><w:left w:val=`"single`" w:sz=`"4`" w:space=`"0`" w:color=`"E4E4E4`"/><w:bottom w:val=`"single`" w:sz=`"4`" w:space=`"0`" w:color=`"E4E4E4`"/><w:right w:val=`"single`" w:sz=`"4`" w:space=`"0`" w:color=`"E4E4E4`"/><w:insideH w:val=`"single`" w:sz=`"4`" w:space=`"0`" w:color=`"E4E4E4`"/><w:insideV w:val=`"single`" w:sz=`"4`" w:space=`"0`" w:color=`"E4E4E4`"/></w:tblBorders>"
  return "<w:tbl><w:tblPr><w:tblW w:w=`"15398`" w:type=`"dxa`"/>$borders<w:tblLayout w:type=`"fixed`"/></w:tblPr><w:tblGrid>$grid</w:tblGrid>$rowsXml</w:tbl>"
}

$sb = New-Object System.Text.StringBuilder
[void]$sb.Append('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>')
[void]$sb.Append('<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">')
[void]$sb.Append("<w:body>")
[void]$sb.Append((P "PIM INDUSTRIE  ·  MARCKOLSHEIM" 22 "970232" $true 0 80))
[void]$sb.Append((P "Compte rendu" 40 "1C1C1C" $true 0 40))
[void]$sb.Append((P "Rendre le site plus facile à trouver, et plus simple à utiliser." 28 "970232" $false 0 160))
[void]$sb.Append((P "Document pour les responsables. Octobre 2026. Il s'appuie sur le site public pim-industrie.com et sur les notes de travail du 20 février 2026. Aucun chiffre nouveau n'est inventé : tout ce qui est chiffré est déjà écrit sur le site." 22 "1C1C1C" $false 0 80))
[void]$sb.Append((P "Comment lire ce document. Le PowerPoint sert à la réunion. Ce compte rendu est le dossier à laisser. Le fichier Excel « PIM - etre mieux trouve sur Google » reprend la même liste, avec des filtres, pour cocher page par page." 22 "1C1C1C" $false 0 200))

[void]$sb.Append((P "1. L'objectif, en une phrase" 32 "970232" $true 200 80))
[void]$sb.Append((P "Quand quelqu'un cherche un clavier, une façade ou une étiquette pour son métier, il doit tomber sur PIM, comprendre ce que nous savons faire, et pouvoir nous écrire. On ne change pas la marque : le logo, le bordeaux, le noir, le blanc, le téléphone et le ton industriel restent." 22 "1C1C1C" $false 0 80))
[void]$sb.Append((P "Trois résultats, et seulement trois. Trouver : la bonne page apparaît dans Google, avec un titre clair. Comprendre : le visiteur voit tout de suite si PIM peut l'aider. Écrire : il peut décrire son besoin sans remplir un long formulaire dès la première seconde." 22 "1C1C1C" $false 0 80))

[void]$sb.Append((P "2. Ce que le visiteur vit aujourd'hui" 32 "970232" $true 280 80))
[void]$sb.Append((P "Le site présente déjà le savoir-faire : claviers à membrane, façades, circuits, étiquettes, présentoirs. Le problème n'est pas l'absence de métier. Le problème est que le visiteur a du mal à trouver la bonne porte, et que Google a du mal à comprendre certaines pages." 22 "1C1C1C" $false 0 80))
[void]$sb.Append((P "Il entre presque seulement par le nom du produit. Or beaucoup de clients arrivent avec une idée ou un métier, pas avec le mot « clavier capacitif ». La question qui revient, dans les notes du 20 février, est : « J'ai une idée, avez-vous la capacité technique pour la réaliser ? »" 22 "1C1C1C" $false 0 80))
[void]$sb.Append((P "Les métiers cités sur le site — médical, aéronautique, automobile, automatisation, machine-outils, nautique, électronique, transports, luxe — sont souvent une image, sans texte. Les preuves sont réelles, mais dispersées : création en 1961 à Marckolsheim, certification ISO 9001, atelier de 4 500 m², claviers protégés IP65, contrôle de chaque pièce, un million de coupelles et 350 000 LED par an." 22 "1C1C1C" $false 0 80))
[void]$sb.Append((P "Quelques pages font perdre confiance. Le glossaire affiche l'alphabet mais aucune définition. Le plan du site est vide. Le lien « protection des données » du bandeau mène vers une page qui n'existe pas (l'adresse se termine par /93). La société est décrite deux fois, à deux adresses. Plusieurs pages de l'atelier répètent le même paragraphe. Pour écrire, le formulaire demande beaucoup d'informations dès le premier geste." 22 "1C1C1C" $false 0 80))

[void]$sb.Append((P "3. Les mesures pour le visiteur" 32 "970232" $true 280 80))
[void]$sb.Append((P "Trois portes, au lieu d'une. Le visiteur choisit selon ce qu'il a en tête." 22 "1C1C1C" $false 40 40))
[void]$sb.Append((P "Son besoin. Trois pages : j'ai une idée ; mon besoin est déjà décrit ; je veux passer en série. Elles répondent aux trois niveaux déjà notés : une idée, un besoin structuré, une industrialisation." 22 "1C1C1C" $false 40 40))
[void]$sb.Append((P "Son métier. Une page par milieu, avec un vrai texte, les contraintes du milieu, et les produits PIM qui répondent. La page Luxe mène vers les étiquettes et les présentoirs, sans copier ces pages une seconde fois." 22 "1C1C1C" $false 40 40))
[void]$sb.Append((P "Le produit, s'il le connaît déjà. Claviers, circuits, faces avant, étiquettes, PLV. Ces pages gardent leur adresse actuelle, parce que Google les connaît déjà. On range le texte, on ajoute les questions fréquentes, et on relie chaque produit aux métiers." 22 "1C1C1C" $false 40 40))
[void]$sb.Append((P "Un message court sur chaque page : le besoin, le métier, l'e-mail. Le formulaire complet reste sur Contact, avec les champs actuels (nom, société, téléphone, délai, précision du projet). Le 03 88 58 62 00 reste visible en haut." 22 "1C1C1C" $false 40 40))
[void]$sb.Append((P "Les preuves remontent en haut des pages, au lieu de rester dans l'historique. Le glossaire est rempli avec les mots déjà expliqués ailleurs. Les pages atelier ne répètent plus le même paragraphe. Les photos récentes de l'atelier et des pièces seront faites quand PIM pourra les organiser. Aucun récit client détaillé ne sort sans accord. Aucune page vide n'est mise en ligne." 22 "1C1C1C" $false 40 80))

[void]$sb.Append((P "4. Les mesures pour être mieux vu sur Google" 32 "970232" $true 280 80))
[void]$sb.Append((P "Google ne « note » pas un site joli. Il affiche une page quand il comprend de quoi elle parle, et quand l'adresse est stable. Voici ce que nous changeons, dit sans jargon." 22 "1C1C1C" $false 0 80))
[void]$sb.Append((P "Chaque page a son propre titre, celui que les gens lisent dans les résultats. Une page, un sujet. On ne met pas tout sur l'accueil." 22 "1C1C1C" $false 40 40))
[void]$sb.Append((P "On garde les adresses déjà connues. Les changer ferait perdre les visiteurs qui arrivent déjà par ces liens." 22 "1C1C1C" $false 40 40))
[void]$sb.Append((P "On crée les pages qui manquent : les besoins et les métiers. C'est par là que les nouvelles recherches arriveront." 22 "1C1C1C" $false 40 40))
[void]$sb.Append((P "On répare les adresses cassées ou en double. Si quelqu'un a noté l'ancienne, il arrive quand même au bon endroit. Personne ne tombe sur une erreur." 22 "1C1C1C" $false 40 40))
[void]$sb.Append((P "Le plan du site, aujourd'hui vide, devient une vraie liste de pages, pour les visiteurs et pour Google." 22 "1C1C1C" $false 40 40))
[void]$sb.Append((P "La fiche Google de Marckolsheim reprend la même adresse, les mêmes métiers et des photos récentes. Beaucoup de clients cherchent sur la carte, pas seulement sur le site." 22 "1C1C1C" $false 40 40))
[void]$sb.Append((P "Le français reste l'adresse principale. L'anglais et l'allemand seront repris seulement quand les textes seront vraiment traduits. Pas de page dans une langue vide." 22 "1C1C1C" $false 40 40))
[void]$sb.Append((P "Après la mise en ligne, on vérifie deux choses : est-ce que les bonnes pages sortent, et est-ce que les demandes de contact augmentent. On ne se contente pas de compter les visites." 22 "1C1C1C" $false 40 80))

[void]$sb.Append((P "5. Trois exemples, avant et après" 32 "970232" $true 280 80))
[void]$sb.Append((P "Exemple 1 — une adresse qu'on garde. Le clavier à membrane est déjà à l'adresse www.pim-industrie.com/industrie/clavier-a-membrane. Cette adresse ne change pas. On améliore le texte, on le relie aux métiers, et on remonte les preuves (coupelles, étanchéité, contrôle)." 22 "1C1C1C" $false 40 80))
[void]$sb.Append((P "Exemple 2 — une adresse qu'on crée. Il n'existe pas de page « industrie médicale ». Aujourd'hui, c'est une image. Nous créerons www.pim-industrie.com/secteurs/industrie-medicale. Elle expliquera le milieu et mènera vers les claviers et les façades. Même logique pour l'aéronautique, l'automobile, l'automatisation, les machines-outils, le nautique, l'électronique, les transports et le luxe." 22 "1C1C1C" $false 40 80))
[void]$sb.Append((P "Exemple 3 — une adresse qu'on répare. Le bandeau du site envoie vers www.pim-industrie.com/93 pour la protection des données. Cette page n'existe pas. Elle deviendra www.pim-industrie.com/politique-de-protection-des-donnees, avec les textes déjà publiés. L'ancienne adresse y mènera automatiquement." 22 "1C1C1C" $false 40 80))
[void]$sb.Append((P "Autres réparations, dans le même esprit. www.pim-industrie.com/societe mène vers www.pim-industrie.com/qui-sommes-nous, parce que c'est le même texte. www.pim-industrie.com/outils/glossaire mène vers www.pim-industrie.com/glossaire, et la page sera remplie. L'adresse très longue de la newsletter mène vers www.pim-industrie.com/newsletter. Les mentions légales, le plan du site et les conditions générales quittent le dossier « outils » pour une adresse lisible, sans changer le texte." 22 "1C1C1C" $false 40 120))

[void]$sb.Append((P "6. Toutes les pages, avant et après" 32 "970232" $true 200 60))
[void]$sb.Append((P "Vert : on garde l'adresse. Bleu : page nouvelle. Orange : l'ancienne adresse envoie vers la nouvelle. Gris : plus tard, on ne publie pas une page vide. La colonne « En clair » dit pourquoi." 20 "5A5A5A" $false 0 120))

$headerFills = @("970232","970232","970232","970232","970232","970232")
$rowsXml = Row @("Famille","Page","Décision","Avant","Après","En clair") $headerFills $true "FFFFFF" 16 $true
foreach ($item in @($data.pages)) {
  $decision = [string]$item[2]
  $fill = "FFFFFF"
  switch ($decision) {
    "On garde" { $fill = "E2F2E2" }
    "Nouvelle page" { $fill = "E2ECF8" }
    "On renvoie" { $fill = "FDECC8" }
    "Plus tard" { $fill = "EEEEEE" }
  }
  $fills = @("FFFFFF", "FFFFFF", $fill, "FFFFFF", "FFFFFF", "FFFFFF")
  $rowsXml += Row @([string]$item[0], [string]$item[1], $decision, [string]$item[3], [string]$item[4], [string]$item[5]) $fills $false "1C1C1C" 16 $false
}
[void]$sb.Append((Table $rowsXml @(1500, 2200, 1600, 3400, 3600, 3098)))
[void]$sb.Append((P "" 20 "1C1C1C" $false 0 80))

[void]$sb.Append((P "7. Les preuves que nous proposons d'afficher" 32 "970232" $true 280 60))
[void]$sb.Append((P "Ce sont des éléments déjà écrits sur le site. Nous demandons de confirmer qu'ils peuvent être mis en avant. Nous n'ajoutons pas une certification qui n'est pas présentée comme actuelle sur le site." 22 "1C1C1C" $false 0 120))
$prXml = Row @("Preuve","Ce que cela veut dire","Où on la montre") @("970232","970232","970232") $true "FFFFFF" 18 $true
foreach ($item in @($data.preuves)) {
  $prXml += Row @([string]$item[0], [string]$item[1], [string]$item[2]) @("F7F4F4","FFFFFF","FFFFFF") $false "1C1C1C" 18 $false
}
[void]$sb.Append((Table $prXml @(2800, 6598, 6000)))
[void]$sb.Append((P "" 20 "1C1C1C" $false 0 80))

[void]$sb.Append((P "8. Les textes à écrire" 32 "970232" $true 280 60))
[void]$sb.Append((P "On n'invente pas un nouveau discours. On écrit ce qui manque, à partir de ce qui est déjà dit." 22 "1C1C1C" $false 0 120))
$ctXml = Row @("Sujet","Aujourd'hui","Ce que nous écrivons") @("970232","970232","970232") $true "FFFFFF" 18 $true
foreach ($item in @($data.contenu)) {
  $ctXml += Row @([string]$item[0], [string]$item[1], [string]$item[2]) @("F7F4F4","FFFFFF","FFFFFF") $false "1C1C1C" 18 $false
}
[void]$sb.Append((Table $ctXml @(2800, 5598, 7000)))
[void]$sb.Append((P "" 20 "1C1C1C" $false 0 80))

[void]$sb.Append((P "9. L'ordre de travail" 32 "970232" $true 280 60))
[void]$sb.Append((P "Nous ne publions pas tout d'un coup, et nous ne publions pas une page vide." 22 "1C1C1C" $false 0 120))
$orXml = Row @("Étape","Moment","Ce que nous faisons","Pourquoi") @("970232","970232","970232","970232") $true "FFFFFF" 18 $true
foreach ($item in @($data.ordre)) {
  $orXml += Row @([string]$item[0], [string]$item[1], [string]$item[2], [string]$item[3]) @("F7F4F4","FFFFFF","FFFFFF","FFFFFF") $false "1C1C1C" 18 $false
}
[void]$sb.Append((Table $orXml @(900, 2200, 6500, 5798)))
[void]$sb.Append((P "" 20 "1C1C1C" $false 0 80))

[void]$sb.Append((P "10. Ce que nous vous demandons de valider" 32 "970232" $true 280 80))
[void]$sb.Append((P "La liste des métiers qui auront une page. Les preuves chiffrées que nous avons le droit d'afficher. Les noms de clients déjà présents sur le site, regroupés sur une page Références, sans inventer de lien entre un nom et un métier. Qu'aucun récit client détaillé ne sort sans votre accord. Qu'une série de photos récentes de l'atelier et des pièces pourra être faite, quand vous serez prêts." 22 "1C1C1C" $false 0 80))
[void]$sb.Append((P "La décoration et l'industrie restent dans la même maison, avec deux façons de parler. Le français reste la langue du site jusqu'à ce que l'anglais et l'allemand soient réellement écrits." 22 "1C1C1C" $false 80 200))
[void]$sb.Append((P "PIM Industrie  ·  Impasse Kohlgaerten, 67390 Marckolsheim  ·  03 88 58 62 00" 18 "5A5A5A" $false 200 0))

[void]$sb.Append('<w:sectPr><w:pgSz w:w="16838" w:h="11906" w:orient="landscape"/><w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720" w:header="284" w:footer="284" w:gutter="0"/></w:sectPr>')
[void]$sb.Append("</w:body></w:document>")

$tmp = Join-Path $env:TEMP ("pim-docx-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $tmp | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tmp "_rels") | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tmp "word\_rels") | Out-Null
$utf8 = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText((Join-Path $tmp "[Content_Types].xml"), @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>
'@, $utf8)
[System.IO.File]::WriteAllText((Join-Path $tmp "_rels\.rels"), @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>
'@, $utf8)
[System.IO.File]::WriteAllText((Join-Path $tmp "word\_rels\document.xml.rels"), @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>
'@, $utf8)
[System.IO.File]::WriteAllText((Join-Path $tmp "word\document.xml"), $sb.ToString(), $utf8)

if (Test-Path -LiteralPath $outPath) { Remove-Item -LiteralPath $outPath -Force }
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::Open($outPath, [System.IO.Compression.ZipArchiveMode]::Create)
$base = [System.IO.Path]::GetFullPath($tmp)
if (-not $base.EndsWith('\')) { $base += '\' }
Get-ChildItem -LiteralPath $tmp -Recurse -File | ForEach-Object {
  $full = [System.IO.Path]::GetFullPath($_.FullName)
  $rel = $full.Substring($base.Length).Replace('\', '/')
  [void][System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $full, $rel)
}
$archive.Dispose()
Remove-Item -LiteralPath $tmp -Recurse -Force
Write-Output $outPath
Write-Output ("bytes=" + (Get-Item -LiteralPath $outPath).Length)
