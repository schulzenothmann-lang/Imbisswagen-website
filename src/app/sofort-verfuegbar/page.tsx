import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductTypeLanding } from "@/components/ProductTypeLanding";

export const metadata: Metadata = {
  title: "Sofort verfügbar | MINO",
  description: "Wähle zwischen sofort verfügbaren Imbissanhängern und Verkaufspavillons.",
};

export default function SofortVerfuegbarPage() {
  return (
    <>
      <Header />
      <ProductTypeLanding eyebrow="Sofort verfügbar" />
      <Footer />
    </>
  );
}
