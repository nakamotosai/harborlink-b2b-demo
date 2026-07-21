/** Demo image upload — rejects writes; no GitHub, no client asset repo. */
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*"
    }
  });

export const onRequestOptions = async () => json({ ok: true });

export const onRequestPost = async () =>
  json(
    {
      ok: false,
      demo: true,
      error: "image_upload_disabled_in_demo",
      message: "This portfolio demo does not write remote assets."
    },
    403
  );
