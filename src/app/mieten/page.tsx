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
      <ProductTypeLanding eyebrow="Mieten" />
      <Footer />
    </>
  );
}
