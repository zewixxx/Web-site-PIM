$imgDir = "C:\Users\Natalia.Osiak\Desktop\Rectréation site web pim\maquettes\medias\images"
$backup = Join-Path $imgDir "_originals_low"
$jsRoot = "C:\Users\Natalia.Osiak\Desktop\Rectréation site web pim\maquettes\js"
$cssRoot = "C:\Users\Natalia.Osiak\Desktop\Rectréation site web pim\maquettes\css"

$files = @()
$files += Get-ChildItem $jsRoot -Filter "*.js"
$files += Get-ChildItem $cssRoot -Filter "*.css"

$pattern = 'medias/images/([A-Za-z0-9_\-\.]+)'
$refs = New-Object System.Collections.Generic.HashSet[string]
foreach ($f in $files) {
  $text = [IO.File]::ReadAllText($f.FullName)
  foreach ($m in [regex]::Matches($text, $pattern)) {
    [void]$refs.Add($m.Groups[1].Value)
  }
}

$missing = @()
foreach ($r in ($refs | Sort-Object)) {
  if (-not (Test-Path (Join-Path $imgDir $r))) {
    $missing += $r
    Write-Output "MISSING $r"
  }
}
Write-Output "MISSING_COUNT=$($missing.Count)"

# Map png->jpg where conversion happened; update JS helpers references
$replacements = @{}
foreach ($m in $missing) {
  $stem = [IO.Path]::GetFileNameWithoutExtension($m)
  $jpg = Join-Path $imgDir ($stem + ".jpg")
  $bak = Get-ChildItem $backup -ErrorAction SilentlyContinue | Where-Object { $_.BaseName -eq $stem } | Select-Object -First 1
  if (Test-Path $jpg) {
    $replacements[$m] = $stem + ".jpg"
    Write-Output "MAP $m -> $($stem).jpg"
  } elseif ($bak) {
    Copy-Item $bak.FullName (Join-Path $imgDir $m) -Force
    Write-Output "RESTORED $m from backup"
  }
}

if ($replacements.Count -gt 0) {
  foreach ($f in $files) {
    $text = [IO.File]::ReadAllText($f.FullName)
    $orig = $text
    foreach ($k in $replacements.Keys) {
      $text = $text.Replace($k, $replacements[$k])
    }
    if ($text -ne $orig) {
      $utf8 = New-Object System.Text.UTF8Encoding $false
      [IO.File]::WriteAllText($f.FullName, $text, $utf8)
      Write-Output "UPDATED $($f.Name)"
    }
  }
}
