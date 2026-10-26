/** Demo admin content API — in-memory mock only. Never touches GitHub. */
const encoder = new TextEncoder();

let memoryStore = { version: 1, updatedAt: null, fields: {} };

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "content-type, x-admin-token",
      "access-control-allow-methods": "GET, POST, OPTIONS"
    }
  });

const timingSafeEqual = (a, b) => {
  const left = encoder.encode(String(a || ""));
  const right = encoder.encode(String(b || ""));
  if (left.length !== right.length) return false;
  let result = 0;
  for (let index = 0; index < left.length; index += 1) result |= left[index] ^ right[index];
  return result === 0;
};

// Demo password only — not a client credential
const adminPassword = (env) => env.ADMIN_PASSWORD || "demo-admin";

const isAuthorized = (request, env) =>
  timingSafeEqual(request.headers.get("x-admin-token"), adminPassword(env));

export const onRequestOptions = async () => json({ ok: true });

export const onRequestGet = async () => json(memoryStore);

export const onRequestPost = async ({ request, env }) => {
  if (!isAuthorized(request, env)) return json({ error: "unauthorized" }, 401);
  try {
    const payload = await request.json();
    const fields = payload && typeof payload.fields === "object" ? payload.fields : {};
    memoryStore = { version: 1, updatedAt: new Date().toISOString(), fields };
    return json({ ok: true, demo: true, store: memoryStore });
  } catch {
    return json({ error: "bad_request" }, 400);
  }
};
