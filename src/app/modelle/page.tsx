import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ModelsPageIntro } from "@/components/modelle/ModelsPageIntro";
import { ModelsShowcase } from "@/components/modelle/ModelsShowcase";
import { MODELS } from "@/lib/models";

export const metadata: Metadata = {
  title: "Modelle | MINO",
  description: "Die MINO Modellreihe im Überblick — vom kompakten X-ray bis zum Premium-Anhänger.",
};

export default function ModellePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-beton pt-20 text-graphit lg:pt-[4.25rem]">
        <section className="mx-auto w-full max-w-7xl px-6 pt-14 lg:px-10 lg:pt-20">
          <ModelsPageIntro />
        </section>

        <section className="mx-auto flex w-full max-w-7xl flex-col px-6 pt-20 pb-24 lg:px-10 lg:pt-28 lg:pb-32">
          <ModelsShowcase models={MODELS} />
        </section>
      </main>
      <Footer />
    </>
  );
}
