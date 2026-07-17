import type { Metadata } from "next";

import { FinishedTrailersListing } from "@/components/FinishedTrailersListing";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Verkaufs-Pavillons mieten | MINO",
  description: "Mietbare Verkaufs-Pavillons für Märkte, Events und kurzfristige Gastronomie-Einsätze.",
};

const filterGroups = [
  {
    title: "Verfügbarkeit",
    options: ["Mietbereit", "Reservierbar", "Auf Anfrage"],
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
    title: "Mietpreis",
    options: ["bis 490 € / Monat", "490 - 900 € / Monat", "ab 900 € / Monat"],
  },
];

const products = [
  {
    id: "basis-mieten",
    productType: "anhaenger" as const,
    productLabel: "Imbiss-Anhänger",
    name: "Basis",
    status: "Mietbereit",
    price: "ab 1.490 € / Monat",
    length: "5 M",
    weight: "1,5 T",
    image: "/images/modelle/basis.png",
    imageAlt: "MINO Basis Imbiss-Anhänger zur Miete",
    href: "/kontakt?anliegen=Beratung%20zu%20Modell%20Basis",
    description: "Mietbarer Imbiss-Anhänger, 5 M, 1,5 T",
  },
  {
    id: "pavillon-mieten",
    productType: "pavillon" as const,
    productLabel: "Pavillon",
    name: "Verkaufs-Pavillon",
    status: "Mietbereit",
    price: "ab 390 € / Monat",
    length: "3 x 3 M",
    weight: "modular",
    image: "/images/produkte/verkaufs-pavillon.png",
    imageAlt: "MINO Verkaufs-Pavillon zur Miete",
    href: "/kontakt?anliegen=Beratung%20zu%20Verkaufs-Pavillon",
    description: "Mietbarer Verkaufs-Pavillon für Märkte, Events und saisonale Einsätze",
  },
];

export default function PavillonsMietenPage() {
  return (
    <>
      <Header />
      <FinishedTrailersListing
        heading="was du mieten möchtest."
        intro="Wähle zwischen mietbaren Imbiss-Anhängern und Verkaufs-Pavillons. Über den Produktfilter kannst du beide Produktarten vergleichen."
        sortLabel="Verfügbarkeit"
        filterGroups={filterGroups}
        products={products}
        initialProductTypes={["pavillon"]}
        countNoun="Produkte"
      />
      <Footer />
    </>
  );
}
