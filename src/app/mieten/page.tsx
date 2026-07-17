import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductTypeLanding } from "@/components/ProductTypeLanding";

export const metadata: Metadata = {
  title: "Mieten | MINO",
  description: "Wähle zwischen mietbaren Imbissanhängern und Verkaufs-Pavillons.",
};

export default function MietenPage() {
  return (
    <>
      <Header />
      <ProductTypeLanding
        eyebrow="Mieten"
        title="Wähle aus, was du mieten möchtest."
        intro="Mietbare Imbiss-Anhänger und Verkaufs-Pavillons für Märkte, Events und saisonale Einsätze."
        items={[
          {
            title: "Imbissanhänger",
            description: "Mietbare Anhänger für Events, Saisonbetrieb und Übergangslösungen.",
            href: "/mieten/imbiss-anhaenger",
            image: "/images/modelle/basis.png",
            imageAlt: "MINO Imbissanhänger zur Miete",
            price: "ab 1.490 € / Monat",
          },
          {
            title: "Pavillon",
            description: "Verkaufs-Pavillons kurzfristig mieten und mit geringeren Einstiegskosten testen.",
            href: "/mieten/pavillons",
            image: "/images/produkte/verkaufs-pavillon.png",
            imageAlt: "MINO Verkaufs-Pavillon zur Miete",
            price: "ab 390 € / Monat",
          },
        ]}
      />
      <Footer />
    </>
  );
}
