/** Demo catalog-image by file — disabled (no client GitHub assets). */
const badRequest = (message, status = 400) =>
  new Response(message, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" }
  });

export const onRequestGet = async () =>
  badRequest("Catalog page images disabled in portfolio demo.", 404);

export const onRequestHead = onRequestGet;
