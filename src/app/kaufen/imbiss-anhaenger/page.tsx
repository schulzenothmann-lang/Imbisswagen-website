import type { Metadata } from "next";

import { FinishedTrailersListing } from "@/components/FinishedTrailersListing";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Sofort verfügbare Imbiss-Anhänger | MINO",
  description: "Werksseitig gefertigte Imbissanhänger, sofort verfügbar und direkt anfragbar.",
};

const filterGroups = [
  {
    title: "Verfügbarkeit",
    options: ["Sofort verfügbar", "In Fertigung", "Reservierbar"],
  },
  {
    title: "Modell / Variante",
    options: ["Basis", "Standard", "Premium", "X-ray", "Verkaufs-Pavillon"],
  },
  {
    title: "Länge / Fläche",
    options: ["bis 2 M", "5 M", "5,5 M", "3 x 3 M", "3 x 4,5 M", "3 x 6 M"],
  },
  {
    title: "Gewicht",
    options: ["bis 750 KG", "1,5 T", "1,7 T"],
  },
  {
    title: "Preis",
    options: ["bis 15.000 €", "15.000 - 25.000 €", "ab 25.000 €"],
  },
];

const products = [
  {
    id: "basis-kaufen",
    productType: "anhaenger" as const,
    productLabel: "Imbiss-Anhänger",
    name: "Basis",
    status: "Sofort verfügbar",
    price: "21.900 €",
    length: "5 M",
    weight: "1,5 T",
    image: "/images/modelle/basis.png",
    imageAlt: "MINO Basis Imbiss-Anhänger",
    href: "/kontakt?anliegen=Beratung%20zu%20Modell%20Basis",
    description: "Sofort verfügbarer Imbiss-Anhänger, 5 M, 1,5 T",
  },
  {
    id: "pavillon-kaufen",
    productType: "pavillon" as const,
    productLabel: "Pavillon",
    name: "Verkaufs-Pavillon",
    status: "Sofort verfügbar",
    price: "ab 7.900 €",
    length: "3 x 3 M",
    weight: "modular",
    image: "/images/produkte/verkaufs-pavillon.png",
    imageAlt: "MINO Verkaufs-Pavillon",
    href: "/kontakt?anliegen=Beratung%20zu%20Verkaufs-Pavillon",
    description: "Günstiger Verkaufs-Pavillon mit Theke und Edelstahl-Arbeitsbereich",
  },
];

export default function ImbissAnhaengerKaufenPage() {
  return (
    <>
      <Header />
      <FinishedTrailersListing
        heading="was du kaufen möchtest."
        intro="Wähle zwischen sofort verfügbaren Imbiss-Anhängern und Verkaufs-Pavillons. Über den Produktfilter kannst du beide Produktarten vergleichen."
        sortLabel="Verfügbarkeit"
        filterGroups={filterGroups}
        products={products}
        initialProductTypes={["anhaenger"]}
        countNoun="Produkte"
      />
      <Footer />
    </>
  );
}
