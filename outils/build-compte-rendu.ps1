$ErrorActionPreference = 'Stop'
$root = 'C:\Users\gaetan.salber\OneDrive - PIM industrie\Bureau\Rectréation site web pim'
$caps = Join-Path $root 'Compte rendu\30-10\captures\word'
if (-not (Test-Path -LiteralPath $caps)) { $caps = Join-Path $root 'Compte rendu\30-10\captures' }
$outPath = Join-Path $root 'Compte rendu\30-10\PIM - Compte rendu refonte site.docx'
$logPath = Join-Path $env:TEMP 'pim-cr-build.log'
function Log($m) { $line = "$(Get-Date -Format 'HH:mm:ss') $m"; Add-Content -LiteralPath $logPath -Value $line; Write-Output $line }
if (Test-Path -LiteralPath $logPath) { Remove-Item -LiteralPath $logPath -Force }
Log "start caps=$caps"
$pim = 50 + (2 * 256) + (151 * 65536) # #970232 BGR
$dark = 22 + (18 * 256) + (26 * 65536)
$soft = 237 + (235 * 256) + (240 * 65536)
$ok = 40 + (120 * 256) + (60 * 65536)
$warn = 0 + (110 * 256) + (180 * 65536)
$bad = 40 + (40 * 256) + (180 * 65536)
$white = 16777215

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
$doc = $word.Documents.Add()
$sel = $word.Selection
$doc.PageSetup.TopMargin = 50
$doc.PageSetup.BottomMargin = 50
$doc.PageSetup.LeftMargin = 54
$doc.PageSetup.RightMargin = 54

function Set-Normal($S) {
  $S.Style = 'Normal'
  $S.Font.Name = 'Calibri'
  $S.Font.Size = 11
  $S.Font.Bold = $false
  $S.Font.Italic = $false
  $S.Font.Color = 0
  $S.ParagraphFormat.SpaceAfter = 8
  $S.ParagraphFormat.SpaceBefore = 0
  $S.ParagraphFormat.LeftIndent = 0
  $S.ParagraphFormat.RightIndent = 0
}

function Add-Banner($S, $Doc, $Title, $Sub, $Bg, $Fg) {
  $t = $Doc.Tables.Add($S.Range, 1, 1)
  $t.Borders.Enable = $false
  $cell = $t.Cell(1, 1)
  $cell.Shading.BackgroundPatternColor = $Bg
  $cell.Range.Text = ''
  $r = $cell.Range
  $r.Collapse(1) # start
  $r.Text = $Title + "`r" + $Sub
  $r.Font.Name = 'Calibri'
  $r.Font.Color = $Fg
  $r.ParagraphFormat.SpaceAfter = 4
  # style first paragraph as title-ish
  $paras = $cell.Range.Paragraphs
  $paras.Item(1).Range.Font.Size = 26
  $paras.Item(1).Range.Font.Bold = $true
  if ($paras.Count -ge 2) {
    $paras.Item(2).Range.Font.Size = 12
    $paras.Item(2).Range.Font.Bold = $false
  }
  $cell.TopPadding = 18
  $cell.BottomPadding = 18
  $cell.LeftPadding = 18
  $cell.RightPadding = 18
  $S.EndKey(6) | Out-Null
  $S.TypeParagraph()
  Set-Normal $S
}

function Add-Callout($S, $Doc, $Text, $Bg, $BorderColor) {
  $t = $Doc.Tables.Add($S.Range, 1, 1)
  $t.Borders.Enable = $true
  foreach ($b in @($t.Borders.Item(1), $t.Borders.Item(2), $t.Borders.Item(3), $t.Borders.Item(4))) {
    $b.LineStyle = 1
    $b.LineWidth = 6
    $b.Color = $BorderColor
  }
  # thicker left via left border only emphasis - keep all
  $cell = $t.Cell(1, 1)
  $cell.Shading.BackgroundPatternColor = $Bg
  $cell.Range.Text = $Text
  $cell.Range.Font.Name = 'Calibri'
  $cell.Range.Font.Size = 12
  $cell.Range.Font.Bold = $true
  $cell.Range.Font.Color = $BorderColor
  $cell.TopPadding = 12
  $cell.BottomPadding = 12
  $cell.LeftPadding = 14
  $cell.RightPadding = 14
  $S.EndKey(6) | Out-Null
  $S.TypeParagraph()
  Set-Normal $S
}

function Add-H($S, $Text, $Level, $Color) {
  $S.Style = "Heading $Level"
  $S.Font.Name = 'Calibri'
  $S.Font.Color = $Color
  $S.TypeText($Text)
  $S.TypeParagraph()
  Set-Normal $S
}

function Add-P($S, $Text, $Bold = $false, $Size = 11) {
  Set-Normal $S
  $S.Font.Size = $Size
  if ($Bold) { $S.Font.Bold = $true }
  $S.TypeText($Text)
  $S.Font.Bold = $false
  $S.TypeParagraph()
}

function Add-B($S, $Text) {
  $S.Range.ListFormat.ApplyBulletDefault() | Out-Null
  $S.TypeText($Text)
  $S.TypeParagraph()
  $S.Range.ListFormat.RemoveNumbers() | Out-Null
}

function Add-Img($S, $Path, $Caption, $WidthCm) {
  $jpg = [IO.Path]::ChangeExtension($Path, '.jpg')
  if (Test-Path -LiteralPath $jpg) { $Path = $jpg }
  if (-not (Test-Path -LiteralPath $Path)) { Add-P $S '[Image manquante]'; Log "missing $Path"; return }
  Log "img $Path"
  $pic = $S.InlineShapes.AddPicture($Path, $false, $true)
  $pic.LockAspectRatio = $true
  $pic.Width = ($WidthCm / 2.54) * 72
  $S.TypeParagraph()
  $S.Font.Size = 9
  $S.Font.Italic = $true
  $S.Font.Color = 0x666666
  $S.ParagraphFormat.SpaceAfter = 14
  $S.TypeText($Caption)
  $S.TypeParagraph()
  Set-Normal $S
}

function Add-StatusTable($S, $Doc, $Rows) {
  $t = $Doc.Tables.Add($S.Range, $Rows.Count + 1, 3)
  $t.Borders.Enable = $true
  $headers = @('Livrable', 'Statut', 'Commentaire')
  for ($c = 0; $c -lt 3; $c++) {
    $cell = $t.Cell(1, $c + 1)
    $cell.Range.Text = $headers[$c]
    $cell.Range.Font.Bold = $true
    $cell.Range.Font.Size = 10
    $cell.Range.Font.Color = $white
    $cell.Shading.BackgroundPatternColor = $pim
  }
  for ($r = 0; $r -lt $Rows.Count; $r++) {
    for ($c = 0; $c -lt 3; $c++) {
      $cell = $t.Cell($r + 2, $c + 1)
      $cell.Range.Text = [string]$Rows[$r][$c]
      $cell.Range.Font.Size = 10
      $cell.Range.Font.Bold = $false
      $cell.Range.Font.Color = 0
      if ($c -eq 1) {
        $st = [string]$Rows[$r][1]
        $cell.Range.Font.Bold = $true
        if ($st -like '*Fait*') { $cell.Shading.BackgroundPatternColor = 0xDFF0D8; $cell.Range.Font.Color = $ok }
        elseif ($st -like '*Partiel*') { $cell.Shading.BackgroundPatternColor = 0xDCEBFA; $cell.Range.Font.Color = $warn }
        else { $cell.Shading.BackgroundPatternColor = 0xE8E0F0; $cell.Range.Font.Color = $pim }
      }
    }
  }
  $S.EndKey(6) | Out-Null
  $S.TypeParagraph()
  Set-Normal $S
}

function Add-Tbl($S, $Doc, $Headers, $Rows, $HeaderBg) {
  $t = $Doc.Tables.Add($S.Range, $Rows.Count + 1, $Headers.Count)
  $t.Borders.Enable = $true
  for ($c = 0; $c -lt $Headers.Count; $c++) {
    $cell = $t.Cell(1, $c + 1)
    $cell.Range.Text = [string]$Headers[$c]
    $cell.Range.Font.Bold = $true
    $cell.Range.Font.Size = 10
    $cell.Range.Font.Color = $white
    $cell.Shading.BackgroundPatternColor = $HeaderBg
  }
  for ($r = 0; $r -lt $Rows.Count; $r++) {
    for ($c = 0; $c -lt $Headers.Count; $c++) {
      $cell = $t.Cell($r + 2, $c + 1)
      $cell.Range.Text = [string]$Rows[$r][$c]
      $cell.Range.Font.Size = 10
      $cell.Range.Font.Bold = $false
      $cell.Range.Font.Color = 0
      if (($r % 2) -eq 1) { $cell.Shading.BackgroundPatternColor = $soft }
    }
  }
  $S.EndKey(6) | Out-Null
  $S.TypeParagraph()
  Set-Normal $S
}

function Fill-CompareCol($Cell, $Title, $Plus, $Moins) {
  $Cell.TopPadding = 10
  $Cell.BottomPadding = 10
  $Cell.LeftPadding = 10
  $Cell.RightPadding = 10
  $Cell.Shading.BackgroundPatternColor = $soft
  $lines = New-Object System.Collections.Generic.List[string]
  $lines.Add($Title) | Out-Null
  $lines.Add('') | Out-Null
  $lines.Add('PLUS') | Out-Null
  foreach ($x in $Plus) { $lines.Add('+ ' + $x) | Out-Null }
  $lines.Add('') | Out-Null
  $lines.Add('MOINS') | Out-Null
  foreach ($x in $Moins) { $lines.Add('- ' + $x) | Out-Null }
  $Cell.Range.Text = ($lines -join "`r")
  $paras = $Cell.Range.Paragraphs
  $paras.Item(1).Range.Font.Bold = $true
  $paras.Item(1).Range.Font.Size = 14
  $paras.Item(1).Range.Font.Color = $pim
  for ($i = 1; $i -le $paras.Count; $i++) {
    $p = $paras.Item($i)
    $txt = $p.Range.Text.Trim()
    if ($txt -eq 'PLUS') { $p.Range.Font.Bold = $true; $p.Range.Font.Color = $ok; $p.Range.Font.Size = 11 }
    elseif ($txt -eq 'MOINS') { $p.Range.Font.Bold = $true; $p.Range.Font.Color = $pim; $p.Range.Font.Size = 11 }
    elseif ($txt.StartsWith('+')) { $p.Range.Font.Size = 10; $p.Range.Font.Color = 0 }
    elseif ($txt.StartsWith('-')) { $p.Range.Font.Size = 10; $p.Range.Font.Color = 0 }
  }
}

function Add-Compare($S, $Doc, $LeftTitle, $LeftPlus, $LeftMoins, $RightTitle, $RightPlus, $RightMoins) {
  $t = $Doc.Tables.Add($S.Range, 1, 2)
  $t.Borders.Enable = $false
  $t.PreferredWidthType = 2
  $t.PreferredWidth = 100
  Fill-CompareCol $t.Cell(1, 1) $LeftTitle $LeftPlus $LeftMoins
  Fill-CompareCol $t.Cell(1, 2) $RightTitle $RightPlus $RightMoins
  $S.EndKey(6) | Out-Null
  $S.TypeParagraph()
  Set-Normal $S
}

# ---- CONTENT ----
Log 'content'
Add-Banner $sel $doc 'Refonte du site PIM Industrie' "Compte rendu de presentation · octobre 2026 · Maquette v2 vs maquette comparaison + page maintenance" $dark $white
Add-Callout $sel $doc "Recommandation : retenir la maquette v2. Deux univers (Industrie / Luxe & PLV), menu = arbre du site, pages SEO pretes. La maquette comparaison inspire le design (hero, CTA) mais reste trop plate pour le referencement." $soft $pim

Add-H $sel 'Ou en est-on pour vendredi ?' 1 $pim
Add-StatusTable $sel $doc @(
  @('Page site en maintenance + coordonnees', 'Fait', 'Dossier maintenance/ pret a deployer'),
  @('Site v2 plus proche d''un produit fini', 'Partiel', 'Structure OK ; chiffres Sur devis, photos et cas clients a valider'),
  @('Etat des lieux (Google / mobile / vitesse)', 'Fait', 'Baseline pour mesurer les progres'),
  @('Captures des pages principales', 'Fait', 'Sans barre Plein ecran / planches / Mode admin'),
  @('Comparaison v2 / maquette comparaison', 'Fait', 'Retenue : v2'),
  @('Liste recherches Google a cibler', 'Fait', 'Aussi dans outils/mots-cles-seo.json')
)

$sel.InsertBreak(7) | Out-Null # page break

Add-H $sel '1. Pourquoi changer ? Etat des lieux' 1 $pim
Add-P $sel 'Le site public repond en 403. Les pages restent en partie indexees, mais plus de visiteurs possibles en conditions normales. Voici la photo de depart pour expliquer le changement et mesurer apres mise en ligne.'

Add-H $sel 'Positions Google (releve manuel, octobre 2026)' 2 $pim
Add-Tbl $sel $doc @('Mot-cle', 'Position', 'Lecture') @(
  @('clavier a coupelles', '~1er', 'Point fort a conserver'),
  @('etiquette metal cognac / champagne', '~2e', 'Niche luxe forte'),
  @('clavier a membrane industriel', '~3e', 'Present, perfectible'),
  @('clavier a membrane sur mesure', 'Hors top 5', 'Requete large, concurrents devant'),
  @('clavier etanche IP65', 'Absent', 'Marche noye (medical USB...)'),
  @('face avant / plaque / PLV / presentoir', 'Absent', 'Pages a renforcer')
) $pim

Add-H $sel 'Mobile et vitesse (accueil historique)' 2 $pim
Add-Tbl $sel $doc @('Indicateur', 'Aujourd''hui', 'Cible') @(
  @('Score performance', '~36 / 100', '> 70 mobile'),
  @('First Contentful Paint', '~6,2 s', '< 2,5 s'),
  @('Largest Contentful Paint', '~6,9 s', '< 2,5 s'),
  @('Poids page', '~2,3 Mo (surtout images)', 'Images compressees'),
  @('CLS (decalage layout)', '~0,6', '< 0,1')
) $dark
Add-P $sel 'Source indicative : Accessify / Lighthouse. A rejouer via PageSpeed Insights des la remise en ligne.' $false 9

$sel.InsertBreak(7) | Out-Null

Add-H $sel '2. Apercu du site propose (maquette v2)' 1 $pim
Add-P $sel 'Captures sans outils de maquette. On voit le site tel qu''un client le verrait.'
Add-Img $sel (Join-Path $caps 'accueil.png') 'Accueil — deux univers, un atelier' 15.5
Add-Img $sel (Join-Path $caps 'interfaces-industrielles.png') 'Hub Industrie — Domaines ou Gamme' 15.2
Add-Img $sel (Join-Path $caps 'luxe-plv.png') 'Hub Luxe & PLV — par univers / par produit' 15.2

$sel.InsertBreak(7) | Out-Null
Add-Img $sel (Join-Path $caps 'clavier-membrane.png') 'Fiche SEO — clavier a membrane' 15.2
Add-Img $sel (Join-Path $caps 'etiquette-vins.png') 'Fiche SEO — etiquette metal vins & spiritueux' 15.2

Add-H $sel 'Page maintenance (en attendant la mise en ligne)' 2 $pim
Add-Img $sel (Join-Path $caps 'maintenance.png') 'Page temporaire — message + coordonnees, plein ecran (pas de carte au milieu)' 15.5

$sel.InsertBreak(7) | Out-Null

Add-H $sel '3. Quelle maquette retenir ?' 1 $pim
Add-P $sel 'Deux pistes design ont ete poussees : la maquette comparaison (site court, hero fort, menu simple) et la maquette v2 (deux univers + profondeur SEO). Voici les captures cote a cote, puis les plus / moins.'
Add-Img $sel (Join-Path $caps 'comparaison-accueil.png') 'Maquette comparaison — hero plein ecran, menu court, grille de prestations' 14.5
Add-Img $sel (Join-Path $caps 'accueil.png') 'Maquette v2 — deux univers des l''accueil (Industrie / Luxe & PLV)' 14.5

Add-Compare $sel $doc `
  'Maquette comparaison' `
  @('Hero plein ecran impactant', 'Menu court et lisible (5 entrees)', 'CTA contact tres present', 'Grille prestations scannable', 'Rendu moderne type site vitrine') `
  @('Pas de separation Industrie / Luxe', 'Structure plate (peu de pages profondes)', 'Faible preparation SEO (1 requete = 1 page)', 'Menu generique (A propos / Prestations)', 'Ne suit pas l''arbre Domaines sous Industrie') `
  'Maquette v2' `
  @('Deux univers clairs des l''accueil', 'Domaines sous Industrie (menu = arbre)', 'Titres / meta Google prets page par page', 'Fiches produit + guides + ressources', 'Parcours acheteur B2B plus precis') `
  @('Plus dense a prendre en main', 'Cas clients a valider', 'Photos atelier a reprendre', 'Chiffres encore Sur devis')

Add-Callout $sel $doc 'Choix : maquette v2. On peut reprendre des idees visuelles de la comparaison (hero, CTA, respiration) mais la base de production doit etre la v2 : structure + referencement.' $soft $pim

$sel.InsertBreak(7) | Out-Null

Add-H $sel '4. Ou sortir sur Google ?' 1 $pim
Add-P $sel 'L''etude de referencement ci-dessus mesure le point de depart. Ci-dessous : la liste des recherches sur lesquelles on veut se positionner grace au nouveau site. Regle : 1 recherche principale = 1 page cible.'
Add-P $sel 'Priorite haute = a gagner vite apres mise en ligne. Maintenir = deja bien place, a proteger. Moyenne = deuxieme vague.' $false 10

Add-H $sel 'Liste des recherches Google ciblees' 2 $pim
Add-Tbl $sel $doc @('Recherche Google', 'Page cible', 'Priorite', 'Position actuelle') @(
  @('clavier a membrane sur mesure', 'Clavier a membrane', 'Haute', 'Hors top 5'),
  @('clavier a membrane industriel', 'Clavier a membrane', 'Haute', '~3e'),
  @('clavier a coupelles', 'Clavier a coupelles', 'Maintenir', '~1er'),
  @('clavier etanche IP65', 'Clavier etanche', 'Haute', 'Absent'),
  @('face avant plastique serigraphiee', 'Face avant plastique', 'Haute', 'Absent'),
  @('plaque constructeur metal', 'Facade / insert metal', 'Moyenne', 'Absent'),
  @('circuit imprime souple', 'Circuit flexible', 'Moyenne', 'A mesurer'),
  @('etiquette metal personnalisee', 'Etiquettes', 'Haute', 'Absent'),
  @('etiquette metal cognac / champagne', 'Vins et spiritueux', 'Haute', '~2e'),
  @('etiquette vin metal', 'Vins et spiritueux', 'Haute', 'A mesurer'),
  @('insert metal parfum', 'Etiquette cosmetiques', 'Moyenne', 'A mesurer'),
  @('PLV lumineuse', 'Signaletique lumineuse', 'Moyenne', 'Absent'),
  @('presentoir plexiglas sur mesure', 'Presentoir plexiglas', 'Moyenne', 'Absent'),
  @('choisir clavier a membrane', 'Guide (nouvelle page)', 'Haute', '—'),
  @('clavier pour appareil medical', 'Domaine medical', 'Moyenne', 'A mesurer')
) $pim
Add-P $sel 'Fichier detaille : outils/mots-cles-seo.json (requete, page, URL cible, priorite).' $false 9

Add-H $sel '5. Prochaines etapes' 1 $pim
Add-B $sel 'Deployer la page maintenance sur pim-industrie.com'
Add-B $sel 'Valider la v2 comme base de production (et piquer le meilleur de la comparaison en design)'
Add-B $sel 'Fournir MOQ / delais reels + hebergeur legal'
Add-B $sel 'Valider 4 a 6 etudes de cas avec les clients'
Add-B $sel 'Remplacer les photos floues / stock'
Add-B $sel 'Apres mise en ligne : Search Console sur la liste ci-dessus + PageSpeed vs ce document'

Add-P $sel 'Maquettes : dossiers maquette v2 / et maquette comparaison/. Page maintenance : dossier maintenance/.' $false 9

Log 'save'
$tmpOut = Join-Path $env:TEMP 'PIM-Compte-rendu-refonte-site.docx'
if (Test-Path -LiteralPath $tmpOut) { Remove-Item -LiteralPath $tmpOut -Force }
$doc.SaveAs2($tmpOut, 16)
Log 'saved-temp'
$doc.Close($false)
$word.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($sel) | Out-Null
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($doc) | Out-Null
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
[GC]::Collect(); [GC]::WaitForPendingFinalizers()
Start-Sleep -Milliseconds 400
if (Test-Path -LiteralPath $outPath) { Remove-Item -LiteralPath $outPath -Force }
Copy-Item -LiteralPath $tmpOut -Destination $outPath -Force
Log "OK $outPath"
(Get-Item -LiteralPath $outPath | Format-List FullName, Length, LastWriteTime | Out-String)
