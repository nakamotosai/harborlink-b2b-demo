/** Demo catalog proxy — serves local /public/catalogs only (no GitHub, no client assets). */
const allowedFiles = new Set([
  "catalog-2026-vol1.pdf",
  "catalog-2026-vol2.pdf",
  "catalog-2026-vol3.pdf",
  "catalog-2026-complete.pdf",
  "catalog-2026-complete-download.pdf"
]);

const badRequest = (message, status = 400) =>
  new Response(message, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" }
  });

const handleCatalogRequest = async ({ request }) => {
  const url = new URL(request.url);
  const file = url.searchParams.get("file") || "";
  if (!allowedFiles.has(file)) return badRequest("Unknown catalog file", 404);

  // Local static path under public/catalogs (Astro/Pages static)
  const localUrl = new URL(`/catalogs/${file}`, url.origin);
  const upstream = await fetch(localUrl.toString());
  if (!upstream.ok || !upstream.body) return badRequest("Catalog file unavailable", 502);

  const headers = new Headers();
  headers.set("content-type", "application/pdf");
  headers.set("cache-control", "public, max-age=60");
  headers.set("x-content-type-options", "nosniff");
  headers.set("x-demo-note", "local-placeholder-pdf");
  if (url.searchParams.get("download") === "1") {
    const dlName = file.replace("-download", "");
    headers.set("content-disposition", `attachment; filename="${dlName}"`);
  } else {
    headers.set("content-disposition", `inline; filename="${file}"`);
  }

  return new Response(upstream.body, { status: 200, headers });
};

export const onRequestGet = handleCatalogRequest;
export const onRequestHead = handleCatalogRequest;
