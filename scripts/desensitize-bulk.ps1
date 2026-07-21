# Bulk desensitize text replacements in demo tree
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$files = Get-ChildItem $root -Recurse -File | Where-Object {
  $_.FullName -notmatch '\\node_modules\\|\\dist\\|\\\.git\\|\\public\\fonts\\' -and
  $_.Extension -match '\.(astro|ts|js|mjs|cjs|css|md|json|toml|html|txt|example)$'
}

# Ordered pairs: longer / more specific first
$pairs = @(
  @('seko@tyu-an.com', 'contact@example.com'),
  @('https://www.tyu-an.com', 'https://www.example.com'),
  @('www.tyu-an.com', 'www.example.com'),
  @('tyu-an.com', 'example.com'),
  @('tyu-an/xmza-assets', 'demo/placeholder-assets'),
  @('tyu-an/xmza', 'demo/placeholder-site'),
  @('github.com/tyu-an', 'github.com/example'),
  @('tyu2013an', 'demo-admin'),
  @('tyuan2013', 'demo-user'),
  @('zongan-locale', 'harborlink-locale'),
  @('zongan-theme', 'harborlink-theme'),
  @('zongan-font', 'harborlink-font'),
  @('zongan-catalog-', 'harborlink-catalog-'),
  @('/images/brand/zongan-logo.png', '/images/brand/harborlink-mark.svg'),
  @('zongan-logo.png', 'harborlink-mark.svg'),
  @('ZONGAN', 'HARBORLINK'),
  @("Zhong'an", 'Harborlink'),
  @('Zhongan', 'Harborlink'),
  @('zongan', 'harborlink'),
  @('厦門中岸輸出入有限公司', '領港工業グループ'),
  @('厦门中岸进出口有限公司', '领港工业集团有限公司'),
  @('厦門中岸進出口有限公司', '領港工業グループ'),
  @('厦門中岸', '領港'),
  @('厦门中岸', '领港'),
  @('中岸黑', '演示黑'),
  @('中岸金麻', '演示金'),
  @('中岸黒', 'デモ黒'),
  @('中岸', '領港'),
  @('中国アモイ本社', '本社（デモ）'),
  @('中国厦门总部', '总部（演示）'),
  @('Xiamen Head Office', 'HQ (Demo)'),
  @('福建省厦门市思明区软件园二期观日路28号之三', '虚构港城 示例路 1 号'),
  @('福建省アモイ市思明区ソフトパーク二期', '架空港城 デモ通り 1-1'),
  @('Siming District, Xiamen, China', 'Fictional Port City'),
  @('Xiamen, China', 'Fictional Port City'),
  @('中国・厦門', '港湾都市（架空）'),
  @('中国厦门', '港城（虚构）'),
  @('厦門', '港湾都市'),
  @('厦门', '港城'),
  @('アモイ', '港湾都市'),
  @('Xiamen', 'Port City'),
  @('xmza-pages', 'harborlink-demo-pages'),
  @('user-agent": "xmza', 'user-agent": "harborlink-demo'),
  @('tyu-an', 'harborlink-demo'),
  @('xmza', 'harborlink-demo')
)

$countFiles = 0
foreach ($f in $files) {
  $raw = [System.IO.File]::ReadAllText($f.FullName)
  $new = $raw
  foreach ($p in $pairs) {
    $new = $new.Replace($p[0], $p[1])
  }
  if ($new -ne $raw) {
    [System.IO.File]::WriteAllText($f.FullName, $new, [System.Text.UTF8Encoding]::new($false))
    $countFiles++
    Write-Host ("patched {0}" -f $f.FullName.Substring($root.Length + 1))
  }
}
Write-Host "patched_files=$countFiles"
