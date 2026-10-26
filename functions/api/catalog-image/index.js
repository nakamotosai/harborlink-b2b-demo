/** Demo catalog-image API — no remote client assets. */
const badRequest = (message, status = 400) =>
  new Response(message, {
    status,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow"
    }
  });

export const onRequestGet = async () =>
  badRequest("Catalog page images disabled in portfolio demo; use /images/prototype placeholders.", 404);

export const onRequestHead = onRequestGet;
