param([string]$Root)
$ErrorActionPreference = "Stop"
if (-not $Root) { $Root = Split-Path -Parent $MyInvocation.MyCommand.Path }
$root = $Root
$dataPath = Join-Path $root "plan-seo-data.json"
$outPath = Join-Path (Split-Path -Parent $root) "PIM - etre mieux trouve sur Google.xlsx"
$data = [System.IO.File]::ReadAllText($dataPath, [System.Text.Encoding]::UTF8) | ConvertFrom-Json

function XmlEsc([string]$s) {
  if ($null -eq $s) { return "" }
  return ($s -replace '&','&amp;' -replace '<','&lt;' -replace '>','&gt;' -replace '"','&quot;')
}

function Cell([string]$ref, [string]$value, [int]$style) {
  return '<c r="' + $ref + '" t="inlineStr" s="' + $style + '"><is><t xml:space="preserve">' + (XmlEsc $value) + '</t></is></c>'
}

function ColLetter([int]$n) {
  $s = ""
  while ($n -gt 0) {
    $n--
    $s = [char](65 + ($n % 26)) + $s
    $n = [math]::Floor($n / 26)
  }
  return $s
}

function SheetXml($headers, $rows, $widths, $decisionCol) {
  $sb = New-Object System.Text.StringBuilder
  [void]$sb.Append('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>')
  [void]$sb.Append('<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">')
  [void]$sb.Append('<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="A2" sqref="A2"/></sheetView></sheetViews>')
  [void]$sb.Append('<cols>')
  for ($i = 0; $i -lt $widths.Count; $i++) {
    $idx = $i + 1
    [void]$sb.Append('<col min="' + $idx + '" max="' + $idx + '" width="' + $widths[$i] + '" customWidth="1"/>')
  }
  [void]$sb.Append('</cols><sheetData>')
  [void]$sb.Append('<row r="1" ht="22" customHeight="1">')
  for ($c = 0; $c -lt $headers.Count; $c++) {
    [void]$sb.Append((Cell ((ColLetter ($c+1)) + "1") $headers[$c] 1))
  }
  [void]$sb.Append('</row>')
  for ($r = 0; $r -lt $rows.Count; $r++) {
    $rowNum = $r + 2
    $vals = $rows[$r]
    $base = 3
    if ($decisionCol -ge 0) {
      switch ($vals[$decisionCol]) {
        "On garde" { $base = 4 }
        "Nouvelle page" { $base = 5 }
        "On renvoie" { $base = 6 }
        "Plus tard" { $base = 7 }
      }
    } elseif (($r % 2) -eq 1) {
      $base = 8
    }
    [void]$sb.Append('<row r="' + $rowNum + '" ht="36" customHeight="1">')
    for ($c = 0; $c -lt $headers.Count; $c++) {
      $style = $base
      if ($decisionCol -ge 0 -and $c -ne $decisionCol) { $style = 3 }
      [void]$sb.Append((Cell ((ColLetter ($c+1)) + $rowNum) ([string]$vals[$c]) $style))
    }
    [void]$sb.Append('</row>')
  }
  $lastCol = ColLetter $headers.Count
  $lastRow = $rows.Count + 1
  [void]$sb.Append('</sheetData>')
  [void]$sb.Append('<autoFilter ref="A1:' + $lastCol + $lastRow + '"/>')
  [void]$sb.Append('<pageSetup orientation="landscape" fitToWidth="1" fitToHeight="0"/>')
  [void]$sb.Append('</worksheet>')
  return $sb.ToString()
}

$styles = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="3">
    <font><sz val="11"/><name val="Calibri"/><color rgb="FF333333"/></font>
    <font><b/><sz val="11"/><name val="Calibri"/><color rgb="FFFFFFFF"/></font>
    <font><b/><sz val="11"/><name val="Calibri"/><color rgb="FF1C1C1C"/></font>
  </fonts>
  <fills count="8">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF970232"/><bgColor rgb="FF970232"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFFFBFB"/><bgColor rgb="FFFFFBFB"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFE5F2E5"/><bgColor rgb="FFE5F2E5"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFE7F0FA"/><bgColor rgb="FFE7F0FA"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFDECC8"/><bgColor rgb="FFFDECC8"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFEEEEEE"/><bgColor rgb="FFEEEEEE"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border>
      <left style="thin"><color rgb="FFE4E0E0"/></left>
      <right style="thin"><color rgb="FFE4E0E0"/></right>
      <top style="thin"><color rgb="FFE4E0E0"/></top>
      <bottom style="thin"><color rgb="FFE4E0E0"/></bottom>
      <diagonal/>
    </border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="9">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyAlignment="1" applyBorder="1"><alignment wrapText="1" vertical="center"/></xf>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyAlignment="1" applyBorder="1"><alignment wrapText="1" vertical="center"/></xf>
    <xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/>
    <xf numFmtId="0" fontId="0" fillId="3" borderId="1" xfId="0" applyFill="1" applyAlignment="1" applyBorder="1"><alignment wrapText="1" vertical="center"/></xf>
    <xf numFmtId="0" fontId="2" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyAlignment="1" applyBorder="1"><alignment wrapText="1" vertical="center" horizontal="center"/></xf>
    <xf numFmtId="0" fontId="2" fillId="5" borderId="1" xfId="0" applyFont="1" applyFill="1" applyAlignment="1" applyBorder="1"><alignment wrapText="1" vertical="center" horizontal="center"/></xf>
    <xf numFmtId="0" fontId="2" fillId="6" borderId="1" xfId="0" applyFont="1" applyFill="1" applyAlignment="1" applyBorder="1"><alignment wrapText="1" vertical="center" horizontal="center"/></xf>
    <xf numFmtId="0" fontId="2" fillId="7" borderId="1" xfId="0" applyFont="1" applyFill="1" applyAlignment="1" applyBorder="1"><alignment wrapText="1" vertical="center" horizontal="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="3" borderId="1" xfId="0" applyFill="1" applyAlignment="1" applyBorder="1"><alignment wrapText="1" vertical="center"/></xf>
  </cellXfs>
</styleSheet>
'@

$sheets = @(
  @{
    name = "A lire en premier"
    headers = @("N°", "On s'occupe de", "En pratique", "Pourquoi")
    rows = @($data.lire | ForEach-Object { ,@($_[0], $_[1], $_[2], $_[3]) })
    widths = @(6, 32, 62, 55)
    decision = -1
  },
  @{
    name = "Toutes les pages"
    headers = @("Famille", "Page", "Décision", "Adresse aujourd'hui", "Adresse après", "En clair")
    rows = @($data.pages | ForEach-Object { ,@($_[0], $_[1], $_[2], $_[3], $_[4], $_[5]) })
    widths = @(16, 34, 16, 62, 62, 55)
    decision = 2
  },
  @{
    name = "Preuves a montrer"
    headers = @("Preuve", "Ce que cela veut dire", "Où on la montre")
    rows = @($data.preuves | ForEach-Object { ,@($_[0], $_[1], $_[2]) })
    widths = @(28, 70, 48)
    decision = -1
  },
  @{
    name = "Textes a ecrire"
    headers = @("Sujet", "Aujourd'hui", "Ce qu'on prépare")
    rows = @($data.contenu | ForEach-Object { ,@($_[0], $_[1], $_[2]) })
    widths = @(28, 55, 70)
    decision = -1
  },
  @{
    name = "Ordre"
    headers = @("Étape", "Moment", "Ce qu'on fait", "À quoi ça sert")
    rows = @($data.ordre | ForEach-Object { ,@($_[0], $_[1], $_[2], $_[3]) })
    widths = @(10, 18, 62, 50)
    decision = -1
  }
)

$tmp = Join-Path $env:TEMP ("pim-xlsx-" + [guid]::NewGuid().ToString())
New-Item -ItemType Directory -Path $tmp | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tmp "_rels") | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tmp "xl\_rels") | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tmp "xl\worksheets") | Out-Null

$utf8 = New-Object System.Text.UTF8Encoding $false
function WriteUtf8($path, $text) { [System.IO.File]::WriteAllText($path, $text, $utf8) }

WriteUtf8 (Join-Path $tmp "[Content_Types].xml") @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet3.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet4.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet5.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>
'@

WriteUtf8 (Join-Path $tmp "_rels\.rels") @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>
'@

$wb = New-Object System.Text.StringBuilder
[void]$wb.Append('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>')
[void]$wb.Append('<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">')
[void]$wb.Append('<sheets>')
for ($i = 0; $i -lt $sheets.Count; $i++) {
  $n = $i + 1
  [void]$wb.Append('<sheet name="' + (XmlEsc $sheets[$i].name) + '" sheetId="' + $n + '" r:id="rId' + $n + '"/>')
}
[void]$wb.Append('</sheets></workbook>')
WriteUtf8 (Join-Path $tmp "xl\workbook.xml") $wb.ToString()

$rels = New-Object System.Text.StringBuilder
[void]$rels.Append('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>')
[void]$rels.Append('<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">')
for ($i = 0; $i -lt $sheets.Count; $i++) {
  $n = $i + 1
  [void]$rels.Append('<Relationship Id="rId' + $n + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet' + $n + '.xml"/>')
}
[void]$rels.Append('<Relationship Id="rId6" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>')
[void]$rels.Append('</Relationships>')
WriteUtf8 (Join-Path $tmp "xl\_rels\workbook.xml.rels") $rels.ToString()
WriteUtf8 (Join-Path $tmp "xl\styles.xml") $styles

for ($i = 0; $i -lt $sheets.Count; $i++) {
  $s = $sheets[$i]
  $xml = SheetXml $s.headers $s.rows $s.widths $s.decision
  WriteUtf8 (Join-Path $tmp ("xl\worksheets\sheet" + ($i+1) + ".xml")) $xml
}

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
