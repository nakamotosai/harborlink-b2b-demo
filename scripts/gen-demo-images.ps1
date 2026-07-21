# Generate portfolio demo photos via sai-image (grok2api) and place into public/images/prototype
$ErrorActionPreference = "Stop"
$sai = "C:/Users/sai/.claude/skills/sai-image/sai_image.py"
$outRoot = "F:\生图存档\harborlink-demo-batch"
$proto = "F:\demo\日本建材官网\public\images\prototype"
New-Item -ItemType Directory -Force -Path $outRoot, (Join-Path $proto "processing") | Out-Null

# slug -> prompt (editorial industrial B2B, fictional, no text overlays)
$jobs = [ordered]@{
  "hero-room" = "A photograph of a sunlit modern industrial showroom with warm clay terracotta walls, large material sample boards, soft morning light from tall windows, shallow depth of field, shot on 35mm f/2, calm premium B2B architecture editorial, no text no logos no people faces."
  "hero-slide-2" = "A photograph of an elegant warehouse mezzanine overlooking stacked crates and pallet racks, warm golden hour light through skylights, architectural photography, shot on 24mm f/2.8, Portra 400 feel, no text no logos."
  "hero-slide-3" = "A photograph of a polished concrete floor corridor in a modern factory with soft overhead LED strips, clean industrial aesthetic, muted terracotta accents, shot on 28mm, no text no logos no people."
  "hero-slide-4" = "A photograph of large format material panels leaning against a studio wall, clay brown and cream samples, soft side light, product set design, shot on 50mm f/2, no text no logos."
  "hero-slide-5" = "A photograph of a harbor port at blue hour with container silhouettes in soft bokeh, long exposure water shimmer, cinematic architecture mood, shot on 35mm, no text no logos no readable ship names."
  "hero-slide-6" = "A photograph of a minimalist conference table with material swatches and a tablet, warm clay tones, soft window light, lifestyle B2B editorial, shot on 50mm f/1.8, no readable screens no logos."
  "hero-slide-7" = "A photograph of a clean fabrication workshop with cutting tables and soft dust motes in light beams, industrial craftsmanship, warm neutrals, shot on 35mm, no text no logos no faces."
  "hero-slide-8" = "A photograph of an open plan office overlooking a fictional port city skyline at dusk, glass reflections, premium corporate interior, shot on 24mm, no text no logos no readable signs."
  "product-series-a" = "A photograph of large matte charcoal architectural panel surface close-up with subtle stone grain, soft studio lighting, square composition, product editorial, shot on 85mm f/2.8, no text no logos."
  "product-series-b" = "A photograph of warm gold textured ceramic-like surface sample with soft relief pattern, studio softbox, product close-up, shot on 90mm macro, no text no logos."
  "product-series-c" = "A photograph of high-gloss white polished panel reflecting soft studio lights, premium material hero shot, shot on 70mm, no text no logos."
  "product-series-d" = "A photograph of natural stone-like slab with soft gray veining, angled on black foam board, product packshot, shot on 85mm, no text no logos."
  "product-series-e" = "A photograph of wood-grain textured panel sample in warm oak tones, soft side light, product editorial close-up, shot on 85mm, no text no logos."
  "catalog-vol1" = "A photograph of a thick hardcover catalog standing upright on a oak table, clay brown cover with blank embossed rectangle (no letters), soft window light, book product shot, shot on 50mm, no readable text."
  "catalog-vol2" = "A photograph of three hardcover catalogs stacked slightly offset, warm paper edges, soft studio light, still life, shot on 50mm, no readable text on covers."
  "catalog-vol3" = "A photograph of an open blank catalog spread on a table with soft shadow, cream paper, architectural book editorial, shot on 45mm, no readable text."
  "case-alpha" = "A photograph of a modern commercial lobby with large floor panels, soft daylight, architectural interior, shot on 24mm, no text no logos no people."
  "case-beta" = "A photograph of a glass office facade detail with warm exterior cladding, overcast soft light, architecture editorial, shot on 35mm, no text no logos."
  "case-gamma" = "A photograph of a hotel corridor with soft wall panels and warm cove lighting, hospitality interior, shot on 28mm, no text no logos no people."
  "case-delta" = "A photograph of a contemporary residential courtyard with paved surfaces, soft morning light, architecture lifestyle, shot on 35mm, no text no logos."
  "map-hq" = "A photograph of a stylized abstract city map print on a table, soft pastel lines, no real city names, design object still life, shot on 50mm, no readable street names."
  "map-branch" = "A photograph of a minimal desk with a folded abstract transit map brochure, soft light, still life, no real city names, shot on 50mm, no readable text."
  "map-plant" = "A photograph of an abstract industrial site plan printed on paper with soft pencil marks, top-down still life, no real addresses, shot on 45mm, no readable text."
  "company-port" = "A photograph of a modern coastal industrial skyline at golden hour with soft haze, freighters as abstract shapes, cinematic wide shot, shot on 35mm, no readable names no flags emphasis."
  "quality-spec" = "A photograph of blueprint papers and a caliper on a white table, soft overhead light, quality control still life, shot on 50mm, no readable drawings text."
  "quality-inspection" = "A photograph of gloved hands holding a material sample under a desk lamp, inspection scene, soft warm light, shot on 50mm, no faces no logos."
  "quality-shipping" = "A photograph of neatly strapped wooden crates on a pallet in a clean warehouse aisle, soft industrial light, shot on 35mm, no logos no readable labels."
  "quality-schedule" = "A photograph of a wall calendar and sticky notes on a corkboard in soft focus, planning aesthetic, shot on 50mm, no readable dates or words."
  "processing-1" = "A photograph of a precision cutting machine bed with a material slab, workshop light, industrial process, shot on 35mm, no logos no faces."
  "processing-2" = "A photograph of edge finishing tools laid out on a workbench, metal and wood textures, craft still life, shot on 50mm, no logos."
  "processing-3" = "A photograph of a worker hands only polishing a panel edge, soft workshop light, craftsmanship, shot on 50mm, no face no logos."
  "processing-4" = "A photograph of waterjet cut geometric sample pieces arranged neatly, studio light, process documentation, shot on 50mm, no text."
  "processing-5" = "A photograph of adhesive bonding clamps on a L-shaped material joint, workshop macro, shot on 85mm, no logos."
  "processing-6" = "A photograph of a mitered corner sample on black velvet, product process detail, shot on 90mm, no text."
  "processing-7" = "A photograph of cleaned polished panel surface catching soft specular light, finishing stage, shot on 85mm, no text no logos."
}

function Invoke-One {
  param($slug, $prompt)
  $stampDir = Join-Path $outRoot $slug
  New-Item -ItemType Directory -Force -Path $stampDir | Out-Null
  Write-Host "GEN $slug"
  $psi = python $sai $prompt --no-telegram --out-dir $stampDir 2>&1
  $psi | ForEach-Object { Write-Host $_ }
  $img = Get-ChildItem $stampDir -File -Include *.jpg,*.jpeg,*.png,*.webp | Sort-Object LastWriteTime -Descending | Select-Object -First 1
  if (-not $img) { throw "No image for $slug" }
  if ($slug -match '^processing-(\d)$') {
    $dest = Join-Path $proto ("processing\step-{0}.jpg" -f $Matches[1])
  } else {
    $dest = Join-Path $proto ("{0}.jpg" -f $slug)
  }
  Copy-Item $img.FullName $dest -Force
  Write-Host "OK $slug -> $dest"
}

# sequential for API stability (pool)
foreach ($k in $jobs.Keys) {
  try {
    Invoke-One -slug $k -prompt $jobs[$k]
  } catch {
    Write-Host "FAIL $k : $_"
  }
}
Write-Host "DONE batch"
Get-ChildItem $proto -Recurse -File -Filter *.jpg | Measure-Object | ForEach-Object { "jpg_count=$($_.Count)" }
