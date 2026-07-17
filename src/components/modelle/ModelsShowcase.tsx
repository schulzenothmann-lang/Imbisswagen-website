"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LocalizedPrice } from "@/components/LocalizedPrice";
import { useLocaleSettings } from "@/components/LocaleProvider";
import { translateCopy } from "@/lib/localized-content";
import type { ModelData } from "@/lib/models";

export type ModelWithIcon = ModelData & { icon: ReactNode };

export function ModelsShowcase({ models }: { models: ModelWithIcon[] }) {
  const { region, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);

  return (
    <div className="flex flex-col gap-20 lg:gap-28">
      {models.map((m, index) => {
        const imageFirst = index % 2 === 0;

        const imageBlock = (
          <div className="group flex aspect-4/3 items-center justify-center overflow-hidden rounded-sm bg-kreide/40 p-8 lg:p-12">
            <img
              src={`/images/modelle/${m.imageId}.png`}
              alt={`MINO ${m.name}`}
              className="h-full w-auto max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        );

        const textBlock = (
          <div className="flex flex-col items-start gap-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-graphit/5 text-graphit/70">
              {m.icon}
            </span>
            <h2 className="font-sans text-3xl font-black tracking-tight lg:text-5xl">{m.name}</h2>
            <p className="max-w-md font-sans text-base leading-7 text-graphit/70">{tc(m.description)}</p>

            <dl className="flex gap-6 border-y border-graphit/10 py-4 font-sans text-sm">
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs text-graphit/50">{t("length")}</dt>
                <dd className="font-bold text-graphit">{m.length}</dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs text-graphit/50">{t("weight")}</dt>
                <dd className="font-bold text-graphit">{m.weight}</dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs text-graphit/50">{t("price")}</dt>
                <dd className="font-bold text-graphit">
                  <LocalizedPrice value={m.price} />
                </dd>
              </div>
            </dl>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href={`/konfigurator?typ=anhaenger&modell=${m.id}&schritt=2`}>{t("ctaConfigure")}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/modelle/${m.id}`}>{tc("Modell im Detail ansehen")}</Link>
              </Button>
            </div>
            <Link
              href={`/kontakt?anliegen=${encodeURIComponent(`Beratung zu Modell ${m.name}`)}`}
              className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-graphit/60 transition-colors duration-200 hover:text-graphit"
            >
              {tc("Beratung anfragen")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        );

        return (
          <article key={m.id} id={m.id} className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <Link
              href={`/modelle/${m.id}`}
              className={imageFirst ? "lg:order-1" : "lg:order-2"}
              aria-label={`${m.name} ${tc("Modell im Detail ansehen")}`}
            >
              {imageBlock}
            </Link>
            <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>{textBlock}</div>
          </article>
        );
      })}
    </div>
  );
}
