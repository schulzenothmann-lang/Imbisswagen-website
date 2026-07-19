import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Website befindet sich hinter einem Passwort-Gate im Aufbau — bis zum echten
  // Livegang keine Indexierung zulassen.
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
