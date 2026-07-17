import type { Metadata } from "next";
import { Minimize2, Star, Truck, Utensils } from "lucide-react";
import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ModelsHero } from "@/components/modelle/ModelsHero";
import { ModelsPageIntro } from "@/components/modelle/ModelsPageIntro";
import { ModelsShowcase } from "@/components/modelle/ModelsShowcase";
import { MODELS } from "@/lib/models";

export const metadata: Metadata = {
  title: "Modelle | MINO",
  description: "Die MINO Modellreihe im Überblick — vom kompakten X-ray bis zum Premium-Anhänger.",
};

const modelIcons: Record<string, ReactNode> = {
  xl: <Minimize2 className="h-5 w-5" />,
  basis: <Utensils className="h-5 w-5" />,
  standard: <Truck className="h-5 w-5" />,
  premium: <Star className="h-5 w-5" />,
};

const models = MODELS.map((m) => ({ ...m, icon: modelIcons[m.id] }));

export default function ModellePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-beton text-graphit">
        <div className="pt-20 lg:pt-[4.25rem]">
          <ModelsHero models={MODELS} />
        </div>

        <section className="mx-auto w-full max-w-7xl px-6 pt-16 pb-8 lg:px-10 lg:pt-24">
          <ModelsPageIntro />
        </section>

        <section className="mx-auto flex w-full max-w-7xl flex-col px-6 pb-24 lg:px-10 lg:pb-32">
          <ModelsShowcase models={models} />
        </section>
      </main>
      <Footer />
    </>
  );
}
