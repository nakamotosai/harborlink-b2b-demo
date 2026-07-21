const supportedLocales = new Set(["ja", "zh", "en"]);

const normalizeLocale = (value) => {
  if (!value) return "";
  const locale = value.trim().toLowerCase().split(/[-_]/)[0];
  return supportedLocales.has(locale) ? locale : "";
};

const getCookie = (cookieHeader, name) => {
  const cookies = cookieHeader.split(";");
  for (const cookie of cookies) {
    const [rawKey, ...rawValue] = cookie.trim().split("=");
    if (rawKey === name) return decodeURIComponent(rawValue.join("="));
  }
  return "";
};

const localeFromCountry = (country) => {
  const normalizedCountry = country.trim().toUpperCase();
  if (normalizedCountry === "CN") return "zh";
  if (normalizedCountry === "JP") return "ja";
  if (normalizedCountry) return "en";
  return "";
};

const localeFromAcceptLanguage = (acceptLanguage) => {
  const languages = acceptLanguage
    .split(",")
    .map((part) => part.trim().split(";")[0])
    .map(normalizeLocale)
    .filter(Boolean);

  return languages[0] || "";
};

export const onRequest = async ({ request }) => {
  const url = new URL(request.url);
  const cookieLocale = normalizeLocale(getCookie(request.headers.get("Cookie") || "", "harborlink-locale"));
  const country = request.cf?.country || request.headers.get("CF-IPCountry") || "";
  const locale = cookieLocale || localeFromCountry(country) || localeFromAcceptLanguage(request.headers.get("Accept-Language") || "") || "en";
  const target = new URL(`/${locale}/`, url.origin);

  return Response.redirect(target.toString(), 302);
};

