import type { Metadata } from "next";

import { ConfiguratorPageIntro } from "@/components/konfigurator/ConfiguratorPageCopy";
import { ConfiguratorWizard } from "@/components/konfigurator/ConfiguratorWizard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductTypePicker } from "@/components/ProductTypePicker";
import { LEGACY_MODEL_IDS } from "@/lib/models";

export const metadata: Metadata = {
  title: "Konfigurator | MINO",
  description: "Stelle deinen MINO Anhänger oder Verkaufspavillon Schritt für Schritt selbst zusammen und fordere ein Angebot an.",
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
  const rawModelParam = typeof params?.modell === "string" ? params.modell : typeof params?.model === "string" ? params.model : undefined;
  // Alte Links (modell=basis) sollen weiterhin das richtige Modell vorbelegen.
  const rawModel = rawModelParam ? (LEGACY_MODEL_IDS[rawModelParam] ?? rawModelParam) : undefined;
  const rawStep = typeof params?.schritt === "string" ? params.schritt : typeof params?.step === "string" ? params.step : undefined;
  const initialType = rawType === "pavillon" || rawType === "anhaenger" ? rawType : undefined;
  const initialStep = rawStep ? Number.parseInt(rawStep, 10) : undefined;

  return (
    <>
      <Header />
      {initialType ? (
        <main className="min-h-screen bg-beton pt-20 text-graphit lg:pt-[4.25rem]">
          <section className="mx-auto w-full max-w-7xl px-6 pt-16 pb-8 lg:px-10 lg:pt-24">
            <ConfiguratorPageIntro initialType={initialType} />
          </section>

          <section className="mx-auto w-full max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
            <ConfiguratorWizard initialType={initialType} initialModelId={rawModel} initialStep={initialStep} />
          </section>
        </main>
      ) : (
        <main className="flex min-h-svh flex-col bg-beton pt-20 text-graphit lg:h-svh lg:pt-[4.25rem]">
          <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pt-8 pb-6 lg:min-h-0 lg:px-10 lg:pt-10 lg:pb-8">
            <ProductTypePicker variant="configure" />
          </section>
        </main>
      )}
      <Footer />
    </>
  );
}
