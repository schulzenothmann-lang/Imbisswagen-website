import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

// Website befindet sich hinter einem Passwort-Gate im Aufbau — bis zum echten
// Livegang nur die Warteraum-Seite listen, keine internen Unterseiten.
//
// Vollständige Routenliste für den Livegang (dann wieder MODELS-Import + Loop
// wie zuvor verwenden):
// const staticRoutes = [
//   { path: "/", priority: 1 },
//   { path: "/modelle", priority: 0.9 },
//   { path: "/sofort-verfuegbar", priority: 0.9 },
//   { path: "/kaufen", priority: 0.8 },
//   { path: "/kaufen/imbiss-anhaenger", priority: 0.85 },
//   { path: "/kaufen/pavillons", priority: 0.8 },
//   { path: "/mieten", priority: 0.8 },
//   { path: "/mieten/imbiss-anhaenger", priority: 0.85 },
//   { path: "/mieten/pavillons", priority: 0.8 },
//   { path: "/konfigurator", priority: 0.85 },
//   { path: "/kontakt", priority: 0.7 },
//   { path: "/ueber-uns", priority: 0.6 },
//   { path: "/fertige-anhaenger", priority: 0.7 },
//   { path: "/fertige-anhaenger/mieten", priority: 0.7 },
// ];
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/warteraum"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
