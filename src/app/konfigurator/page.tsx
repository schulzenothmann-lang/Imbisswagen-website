import type { Metadata } from "next";

import { ConfiguratorPageIntro, ConfiguratorTypePicker } from "@/components/konfigurator/ConfiguratorPageCopy";
import { ConfiguratorWizard } from "@/components/konfigurator/ConfiguratorWizard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Konfigurator | MINO",
  description: "Stelle deinen MINO Anhänger oder Verkaufs-Pavillon Schritt für Schritt selbst zusammen und fordere ein Angebot an.",
};

export default async function KonfiguratorPage({
  searchParams,
}: {
  searchParams?: Promise<{
    typ?: string | string[];
    modell?: string | string[];
    model?: string | string[];
    schritt?: string | string[];
    step?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const rawType = typeof params?.typ === "string" ? params.typ : undefined;
  const rawModel = typeof params?.modell === "string" ? params.modell : typeof params?.model === "string" ? params.model : undefined;
  const rawStep = typeof params?.schritt === "string" ? params.schritt : typeof params?.step === "string" ? params.step : undefined;
  const initialType = rawType === "pavillon" || rawType === "anhaenger" ? rawType : undefined;
  const initialStep = rawStep ? Number.parseInt(rawStep, 10) : undefined;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-beton pt-20 text-graphit lg:pt-[4.25rem]">
        <section className="mx-auto w-full max-w-7xl px-6 pt-16 pb-8 lg:px-10 lg:pt-24">
          <ConfiguratorPageIntro initialType={initialType} />
        </section>

        <section className="mx-auto w-full max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
          {initialType ? (
            <ConfiguratorWizard initialType={initialType} initialModelId={rawModel} initialStep={initialStep} />
          ) : (
            <ConfiguratorTypePicker />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
