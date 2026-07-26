import type { Metadata } from "next";

import { FinishedTrailersListing } from "@/components/FinishedTrailersListing";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LISTING_OFFERS, type ListingProductType, type OfferKey } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Anhänger & Verkaufspavillons – kaufen oder mieten | MINO",
  description:
    "Alle sofort verfügbaren und mietbaren MINO Imbiss-Anhänger und Verkaufspavillons in einer Übersicht – umschalten zwischen Kaufen und Mieten, filtern und vergleichen.",
};

export default async function AngebotePage({
  searchParams,
}: {
  searchParams?: Promise<{
    angebot?: string | string[];
    produkt?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const rawOffer = typeof params?.angebot === "string" ? params.angebot : undefined;
  const rawProduct = typeof params?.produkt === "string" ? params.produkt : undefined;

  const initialOffer: OfferKey = rawOffer === "mieten" ? "mieten" : "kaufen";
  const initialProductTypes: ListingProductType[] =
    rawProduct === "pavillon"
      ? ["pavillon"]
      : rawProduct === "anhaenger"
        ? ["anhaenger"]
        : ["anhaenger", "pavillon"];

  return (
    <>
      <Header />
      <FinishedTrailersListing
        offers={LISTING_OFFERS}
        initialOffer={initialOffer}
        initialProductTypes={initialProductTypes}
        countNoun="Produkte"
      />
      <Footer />
    </>
  );
}
