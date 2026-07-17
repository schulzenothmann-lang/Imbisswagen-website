import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductTypeLanding } from "@/components/ProductTypeLanding";

export const metadata: Metadata = {
  title: "Sofort verfügbar | MINO",
  description: "Wähle zwischen sofort verfügbaren Imbissanhängern und Verkaufs-Pavillons.",
};

export default function SofortVerfuegbarPage() {
  return (
    <>
      <Header />
      <ProductTypeLanding
        eyebrow="Sofort verfügbar"
        title="Wähle aus, was du kaufen möchtest."
        intro="Fertige Imbiss-Anhänger und Verkaufs-Pavillons, die kurzfristig verfügbar sind."
        items={[
          {
            title: "Imbissanhänger",
            description: "Fertige MINO Anhänger direkt anfragen und übernehmen.",
            href: "/kaufen/imbiss-anhaenger",
            image: "/images/modelle/basis.png",
            imageAlt: "MINO Imbissanhänger",
            price: "ab 21.900 €",
          },
          {
            title: "Pavillon",
            description: "Kompakte Verkaufs-Pavillons als deutlich günstigere Alternative zum Anhänger.",
            href: "/kaufen/pavillons",
            image: "/images/produkte/verkaufs-pavillon.png",
            imageAlt: "MINO Verkaufs-Pavillon",
            price: "ab 7.900 €",
          },
        ]}
      />
      <Footer />
    </>
  );
}
