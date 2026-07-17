import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Check, Minimize2, Star, Truck, Utensils } from "lucide-react";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LocalizedCopy } from "@/components/LocalizedCopy";
import { LocalizedPrice } from "@/components/LocalizedPrice";
import { MODELS } from "@/lib/models";

const modelIcons: Record<string, ReactNode> = {
  xl: <Minimize2 className="h-5 w-5" />,
  basis: <Utensils className="h-5 w-5" />,
  standard: <Truck className="h-5 w-5" />,
  premium: <Star className="h-5 w-5" />,
};

export function generateStaticParams() {
  return MODELS.map((m) => ({ modelId: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ modelId: string }>;
}): Promise<Metadata> {
  const { modelId } = await params;
  const model = MODELS.find((m) => m.id === modelId);
  if (!model) return {};

  return {
    title: `${model.name} | MINO`,
    description: model.description,
  };
}

export default async function ModelDetailPage({ params }: { params: Promise<{ modelId: string }> }) {
  const { modelId } = await params;
  const model = MODELS.find((m) => m.id === modelId);

  if (!model) notFound();

  const otherModels = MODELS.filter((m) => m.id !== model.id);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-beton text-graphit">
        <section className="mx-auto w-full max-w-7xl px-6 pt-24 lg:px-10 lg:pt-32">
          <Link
            href="/modelle"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-graphit/60 transition-colors hover:text-graphit"
          >
            <ChevronLeft className="h-4 w-4" />
            <LocalizedCopy text="Alle Modelle" />
          </Link>
        </section>

        <section className="mx-auto mt-6 flex w-full max-w-7xl items-center justify-center bg-kreide/40 px-6 py-12 lg:mt-8 lg:px-10 lg:py-20">
          <img
            src={`/images/modelle/${model.imageId}.png`}
            alt={model.name}
            className="h-[22rem] w-auto max-w-full object-contain lg:h-[30rem]"
          />
        </section>

        <section className="mx-auto w-full max-w-3xl px-6 pt-14 pb-24 lg:px-10 lg:pb-32">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-graphit/5 text-graphit/70">
              {modelIcons[model.id]}
            </span>
            <h1 className="font-sans text-4xl font-black tracking-tight lg:text-6xl">{model.name}</h1>
          </div>

          <p className="mt-6 font-sans text-lg leading-8 text-graphit/70">
            <LocalizedCopy text={model.longDescription} />
          </p>

          <dl className="mt-8 flex gap-10 border-y border-graphit/10 py-6 font-sans text-sm">
            <div className="flex flex-col gap-0.5">
              <dt className="text-xs text-graphit/50"><LocalizedCopy text="Länge" /></dt>
              <dd className="text-lg font-bold text-graphit">{model.length}</dd>
            </div>
            <div className="flex flex-col gap-0.5">
              <dt className="text-xs text-graphit/50"><LocalizedCopy text="Gewicht" /></dt>
              <dd className="text-lg font-bold text-graphit">{model.weight}</dd>
            </div>
            <div className="flex flex-col gap-0.5">
              <dt className="text-xs text-graphit/50"><LocalizedCopy text="Preis" /></dt>
              <dd className="text-lg font-bold text-graphit">
                <LocalizedPrice value={model.price} />
              </dd>
            </div>
          </dl>

          <ul className="mt-8 flex flex-col gap-4">
            {model.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3 font-sans text-base text-graphit/75">
                <Check className="mt-1 h-4 w-4 shrink-0 text-graphit/70" />
                <LocalizedCopy text={highlight} />
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={`/konfigurator?typ=anhaenger&modell=${model.id}&schritt=2`}>
                <LocalizedCopy text="Jetzt konfigurieren" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/kontakt?anliegen=${encodeURIComponent(`Beratung zu Modell ${model.name}`)}`}>
                <LocalizedCopy text="Beratung anfragen" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl border-t border-graphit/10 px-6 py-16 lg:px-10 lg:py-24">
          <p className="font-sans text-sm font-bold text-graphit/50"><LocalizedCopy text="Weitere Modelle" /></p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {otherModels.map((m) => (
              <Link
                key={m.id}
                href={`/modelle/${m.id}`}
                className="group flex flex-col gap-4 rounded-sm border border-graphit/10 bg-kreide/40 p-5 transition-colors hover:border-graphit/25"
              >
                <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-sm bg-kreide/60 p-4">
                  <img
                    src={`/images/modelle/${m.imageId}.png`}
                    alt={m.name}
                    className="h-full w-auto max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div>
                  <p className="font-sans text-base font-bold text-graphit">{m.name}</p>
                  <p className="mt-1 font-sans text-sm text-graphit/60">
                    <LocalizedPrice value={m.price} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
