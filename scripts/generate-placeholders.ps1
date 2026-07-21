# Generate desensitized placeholder images (SVG) + minimal PDF catalogs.
# Run from repo root: pwsh -NoProfile -File scripts/generate-placeholders.ps1
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$proto = Join-Path $root "public\images\prototype"
$brand = Join-Path $root "public\images\brand"
$catalogs = Join-Path $root "public\catalogs"
New-Item -ItemType Directory -Force -Path $proto, (Join-Path $proto "processing"), $brand, $catalogs | Out-Null

function New-SvgPlaceholder {
  param(
    [string]$Path,
    [int]$W = 1200,
    [int]$H = 800,
    [string]$Label = "DEMO",
    [string]$Bg = "#2d333b",
    [string]$Fg = "#e6edf3"
  )
  $safe = [System.Security.SecurityElement]::Escape($Label)
  $svg = @"
<svg xmlns="http://www.w3.org/2000/svg" width="$W" height="$H" viewBox="0 0 $W $H">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="$Bg"/>
      <stop offset="100%" stop-color="#1a1f24"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="48" y="48" width="$($W-96)" height="$($H-96)" fill="none" stroke="$Fg" stroke-opacity="0.25" stroke-width="2"/>
  <text x="50%" y="48%" text-anchor="middle" fill="$Fg" font-family="Segoe UI, sans-serif" font-size="42" font-weight="600">Harborlink Demo</text>
  <text x="50%" y="56%" text-anchor="middle" fill="$Fg" font-family="Segoe UI, sans-serif" font-size="28" opacity="0.8">$safe</text>
  <text x="50%" y="90%" text-anchor="middle" fill="$Fg" font-family="Segoe UI, sans-serif" font-size="18" opacity="0.45">placeholder · not client asset</text>
</svg>
"@
  $dir = Split-Path -Parent $Path
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  # Write UTF8 no BOM
  [System.IO.File]::WriteAllText($Path, $svg)
}

function New-MinimalPdf {
  param([string]$Path, [string]$Title)
  # Minimal one-page PDF with title text (ASCII only in stream for simplicity)
  $text = $Title -replace '[^\x20-\x7E]', '?'
  if ($text.Length -gt 60) { $text = $text.Substring(0, 60) }
  $stream = "BT /F1 24 Tf 72 720 Td ($text) Tj ET"
  $streamBytes = [System.Text.Encoding]::ASCII.GetBytes($stream)
  $len = $streamBytes.Length
  $objects = @(
    "1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj",
    "2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj",
    "3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>endobj",
    "4 0 obj<< /Length $len >>stream`n$stream`nendstream endobj",
    "5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj"
  )
  $pdf = "%PDF-1.4`n"
  $offsets = @()
  foreach ($obj in $objects) {
    $offsets += [System.Text.Encoding]::ASCII.GetByteCount($pdf)
    $pdf += "$obj`n"
  }
  $xrefPos = [System.Text.Encoding]::ASCII.GetByteCount($pdf)
  $pdf += "xref`n0 $($objects.Count + 1)`n"
  $pdf += "0000000000 65535 f `n"
  foreach ($off in $offsets) {
    $pdf += ("{0:D10} 00000 n `n" -f $off)
  }
  $pdf += "trailer<< /Size $($objects.Count + 1) /Root 1 0 R >>`nstartxref`n$xrefPos`n%%EOF`n"
  [System.IO.File]::WriteAllBytes($Path, [System.Text.Encoding]::ASCII.GetBytes($pdf))
}

# Wipe real prototype binaries first
Get-ChildItem $proto -Recurse -File -ErrorAction SilentlyContinue | Remove-Item -Force
Get-ChildItem $brand -Recurse -File -ErrorAction SilentlyContinue | Remove-Item -Force
Get-ChildItem $catalogs -File -ErrorAction SilentlyContinue | Remove-Item -Force
# Remove client logo names
$logo = Join-Path $root "public\images\logo.png"
if (Test-Path $logo) { Remove-Item $logo -Force }

$heroLabels = @(
  @{n="hero-room.svg"; l="Hero 1"},
  @{n="hero-slide-2.svg"; l="Hero 2"},
  @{n="hero-slide-3.svg"; l="Hero 3"},
  @{n="hero-slide-4.svg"; l="Hero 4"},
  @{n="hero-slide-5.svg"; l="Hero 5"},
  @{n="hero-slide-6.svg"; l="Hero 6"},
  @{n="hero-slide-7.svg"; l="Hero 7"},
  @{n="hero-slide-8.svg"; l="Hero 8"}
)
foreach ($h in $heroLabels) {
  New-SvgPlaceholder -Path (Join-Path $proto $h.n) -W 1920 -H 1080 -Label $h.l -Bg "#3d2914"
}

$products = @(
  "product-series-a.svg","product-series-b.svg","product-series-c.svg",
  "product-series-d.svg","product-series-e.svg"
)
$i = 1
foreach ($p in $products) {
  New-SvgPlaceholder -Path (Join-Path $proto $p) -W 900 -H 900 -Label "Series $([char](64+$i))" -Bg "#1e3a2f"
  $i++
}

foreach ($c in @("catalog-vol1.svg","catalog-vol2.svg","catalog-vol3.svg")) {
  New-SvgPlaceholder -Path (Join-Path $proto $c) -W 800 -H 1100 -Label $c.Replace(".svg","") -Bg "#1a2744"
}

foreach ($c in @("case-alpha.svg","case-beta.svg","case-gamma.svg","case-delta.svg")) {
  New-SvgPlaceholder -Path (Join-Path $proto $c) -W 1200 -H 800 -Label $c.Replace(".svg","") -Bg "#2a2140"
}

foreach ($m in @("map-hq.svg","map-branch.svg","map-plant.svg")) {
  New-SvgPlaceholder -Path (Join-Path $proto $m) -W 960 -H 540 -Label $m.Replace(".svg","") -Bg "#243038"
}

1..7 | ForEach-Object {
  New-SvgPlaceholder -Path (Join-Path $proto "processing\step-$_.svg") -W 1000 -H 700 -Label "Process $_" -Bg "#3a2a1a"
}

foreach ($q in @("quality-spec.svg","quality-inspection.svg","quality-shipping.svg","quality-schedule.svg")) {
  New-SvgPlaceholder -Path (Join-Path $proto $q) -W 1000 -H 700 -Label $q.Replace(".svg","") -Bg "#1f2f2a"
}

New-SvgPlaceholder -Path (Join-Path $proto "company-port.svg") -W 1400 -H 900 -Label "Company" -Bg "#1c2b3a"
New-SvgPlaceholder -Path (Join-Path $brand "harborlink-mark.svg") -W 512 -H 128 -Label "HARBORLINK" -Bg "#c45c26" -Fg "#fffaf5"
New-SvgPlaceholder -Path (Join-Path $root "public\images\logo.svg") -W 512 -H 512 -Label "HL" -Bg "#c45c26" -Fg "#fffaf5"

$pdfs = @(
  @{f="catalog-2026-vol1.pdf"; t="Harborlink Demo Catalog Vol.1"},
  @{f="catalog-2026-vol2.pdf"; t="Harborlink Demo Catalog Vol.2"},
  @{f="catalog-2026-vol3.pdf"; t="Harborlink Demo Catalog Vol.3"},
  @{f="catalog-2026-complete.pdf"; t="Harborlink Demo Catalog Complete"},
  @{f="catalog-2026-complete-download.pdf"; t="Harborlink Demo Catalog Download"}
)
foreach ($p in $pdfs) {
  New-MinimalPdf -Path (Join-Path $catalogs $p.f) -Title $p.t
}

# Favicon-ish simple SVG already as logo; skip binary ico overwrite if hard
Write-Host "OK placeholders written under public/"
Get-ChildItem $proto -Recurse -File | Measure-Object | ForEach-Object { "prototype files: $($_.Count)" }
Get-ChildItem $catalogs -File | ForEach-Object { $_.Name }
