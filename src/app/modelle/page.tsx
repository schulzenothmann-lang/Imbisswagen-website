import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ModelsHero } from "@/components/modelle/ModelsHero";
import { ModelsClosingCta, ModelsShowcase } from "@/components/modelle/ModelsShowcase";
import { MODELS } from "@/lib/models";

export const metadata: Metadata = {
  title: "Modelle | MINO",
  description: "Die MINO Modellreihe im Überblick — vom kompakten Base bis zum Premium-Anhänger und Verkaufs-Pavillon.",
};

export default function ModellePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-beton pt-16 text-graphit lg:pt-[4.25rem]">
        <ModelsHero models={MODELS} />

        <section className="mx-auto flex w-full max-w-7xl flex-col px-6 pt-14 pb-24 lg:px-10 lg:pt-20 lg:pb-32">
          <ModelsShowcase models={MODELS} />
        </section>

        <ModelsClosingCta />
      </main>
      <Footer />
    </>
  );
}
