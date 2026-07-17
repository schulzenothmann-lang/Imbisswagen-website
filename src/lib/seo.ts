export const SITE_NAME = "MINO Imbissanhänger";
export const SITE_TITLE = "MINO Imbissanhänger | Kaufen, mieten & konfigurieren";
export const SITE_DESCRIPTION =
  "MINO baut, verkauft und vermietet Imbissanhänger und Verkaufs-Pavillons für Märkte, Events und Gastronomie in der DACH-Region, mit besonderem Fokus auf Norddeutschland und Bremen.";

export const OG_IMAGE = {
  path: "/images/hero-sms5000.png",
  width: 1536,
  height: 764,
  alt: "MINO Imbissanhänger als Verkaufsanhänger",
};

const DEFAULT_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(value: string | undefined) {
  const raw = value?.trim();

  if (!raw) return DEFAULT_SITE_URL;

  const withProtocol = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, "");
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL,
);

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}
