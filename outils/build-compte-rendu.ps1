$ErrorActionPreference = 'Stop'
$root = 'C:\Users\gaetan.salber\OneDrive - PIM industrie\Bureau\Rectréation site web pim'
$caps = Join-Path $root 'Compte rendu\30-10\captures'
$outPath = Join-Path $root 'Compte rendu\30-10\PIM - Compte rendu refonte site.docx'
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
  if (-not (Test-Path -LiteralPath $Path)) { Add-P $S '[Image manquante]'; return }
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
  $null = $t.AutoFitBehavior(1)
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
  $null = $t.AutoFitBehavior(1)
  $S.EndKey(6) | Out-Null
  $S.TypeParagraph()
  Set-Normal $S
}

function Add-Compare($S, $Doc, $LeftTitle, $LeftPlus, $LeftMoins, $RightTitle, $RightPlus, $RightMoins) {
  $t = $Doc.Tables.Add($S.Range, 1, 2)
  $t.Borders.Enable = $false
  $t.PreferredWidthType = 2
  $t.PreferredWidth = 100

  function Fill-Col($Cell, $Title, $Plus, $Moins) {
    $Cell.TopPadding = 10
    $Cell.BottomPadding = 10
    $Cell.LeftPadding = 10
    $Cell.RightPadding = 10
    $Cell.Shading.BackgroundPatternColor = $soft
    $lines = @()
    $lines += $Title
    $lines += ''
    $lines += 'PLUS'
    foreach ($x in $Plus) { $lines += '+ ' + $x }
    $lines += ''
    $lines += 'MOINS'
    foreach ($x in $Moins) { $lines += '- ' + $x }
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

  Fill-Col $t.Cell(1, 1) $LeftTitle $LeftPlus $LeftMoins
  Fill-Col $t.Cell(1, 2) $RightTitle $RightPlus $RightMoins
  $S.EndKey(6) | Out-Null
  $S.TypeParagraph()
  Set-Normal $S
}

# ---- CONTENT ----
Add-Banner $sel $doc 'Refonte du site PIM Industrie' "Compte rendu de presentation · octobre 2026 · Maquettes v1 / v2 + page maintenance" $dark $white
Add-Callout $sel $doc "Recommandation : retenir la maquette v2. Deux univers clairs (Industrie / Luxe & PLV), menu aligne sur l'arbre, pages SEO pretes. La v1 reste une reserve de contenus." $soft $pim

Add-H $sel 'Ou en est-on pour vendredi ?' 1 $pim
Add-StatusTable $sel $doc @(
  @('Page site en maintenance + coordonnees', 'Fait', 'Dossier maintenance/ pret a deployer'),
  @('Site v2 plus proche d''un produit fini', 'Partiel', 'Structure OK ; chiffres Sur devis, photos et cas clients a valider'),
  @('Etat des lieux (Google / mobile / vitesse)', 'Fait', 'Baseline pour mesurer les progres'),
  @('Captures des pages principales', 'Fait', 'Sans barre Plein ecran / planches / Mode admin'),
  @('Comparaison v1 / v2 + choix', 'Fait', 'Retenue : v2'),
  @('Liste recherches Google <-> pages', 'Fait', 'Aussi dans outils/mots-cles-seo.json')
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
Add-Img $sel (Join-Path $caps 'v1-accueil.png') 'v1 — carrousel + Domaines au menu' 14.5
Add-Img $sel (Join-Path $caps 'accueil.png') 'v2 — deux univers, parcours plus clair' 14.5

Add-Compare $sel $doc `
  'Maquette v1' `
  @('Charte PIM deja en place', 'Beaucoup de pages produit structurees', 'Bonne base visuelle') `
  @('Domaines au meme niveau qu''Industrie', 'Accueil dense (carrousel + secteurs)', 'Peu de separation Industrie / Luxe') `
  'Maquette v2' `
  @('Deux univers clairs des l''accueil', 'Domaines sous Industrie (menu = arbre)', 'Plus de doublon Domaines / Par besoin', 'Titres Google prets page par page', 'Guide, glossaire, etudes de cas') `
  @('Cas clients a valider', 'Photos atelier a reprendre', 'Chiffres encore Sur devis')

Add-Callout $sel $doc 'Choix : maquette v2. Elle corrige la structure et prepare le referencement. La planche Comparaison design reste hors production (trop eloignee de la charte).' $soft $pim

$sel.InsertBreak(7) | Out-Null

Add-H $sel '4. Ou sortir sur Google ?' 1 $pim
Add-P $sel 'Regle simple : 1 recherche principale = 1 page. Priorite haute = a gagner vite apres mise en ligne.'
Add-Tbl $sel $doc @('Recherche Google', 'Page', 'Priorite', 'Aujourd''hui') @(
  @('clavier a membrane sur mesure', 'Clavier a membrane', 'Haute', 'Hors top 5'),
  @('clavier a membrane industriel', 'Clavier a membrane', 'Haute', '~3e'),
  @('clavier a coupelles', 'Clavier a coupelles', 'Maintenir', '~1er'),
  @('clavier etanche IP65', 'Clavier etanche', 'Haute', 'Absent'),
  @('face avant plastique serigraphiee', 'Face avant plastique', 'Haute', 'Absent'),
  @('plaque constructeur metal', 'Facade / insert metal', 'Moyenne', 'Absent'),
  @('etiquette metal personnalisee', 'Etiquettes', 'Haute', 'Absent'),
  @('etiquette metal cognac / champagne / vin', 'Vins et spiritueux', 'Haute', '~2e'),
  @('PLV lumineuse', 'Signaletique lumineuse', 'Moyenne', 'Absent'),
  @('presentoir plexiglas sur mesure', 'Presentoir plexiglas', 'Moyenne', 'Absent'),
  @('choisir clavier a membrane', 'Guide (nouvelle page)', 'Haute', '—'),
  @('clavier pour appareil medical', 'Domaine medical', 'Moyenne', 'A mesurer')
) $pim

Add-H $sel '5. Prochaines etapes' 1 $pim
Add-B $sel 'Deployer la page maintenance sur pim-industrie.com'
Add-B $sel 'Valider la v2 comme base de production'
Add-B $sel 'Fournir MOQ / delais reels + hebergeur legal'
Add-B $sel 'Valider 4 a 6 etudes de cas avec les clients'
Add-B $sel 'Remplacer les photos floues / stock'
Add-B $sel 'Apres mise en ligne : Search Console + PageSpeed vs ce document'

Add-P $sel 'Maquettes : index.html a la racine (v1 / v2 / comparaison). Page maintenance : dossier maintenance/.' $false 9

if (Test-Path -LiteralPath $outPath) { Remove-Item -LiteralPath $outPath -Force }
$doc.SaveAs2($outPath, 16)
$doc.Close($false)
$word.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($sel) | Out-Null
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($doc) | Out-Null
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
[GC]::Collect(); [GC]::WaitForPendingFinalizers()
Write-Output "OK $outPath"
(Get-Item -LiteralPath $outPath | Format-List FullName, Length, LastWriteTime | Out-String)
