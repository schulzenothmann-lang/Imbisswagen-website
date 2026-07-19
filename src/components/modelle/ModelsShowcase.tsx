"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { LocalizedPrice } from "@/components/LocalizedPrice";
import { useLocaleSettings } from "@/components/LocaleProvider";
import { translateCopy } from "@/lib/localized-content";
import type { ModelData } from "@/lib/models";

export type ModelWithIcon = ModelData & { icon: ReactNode };

/** "Der Bestseller — mehr Platz…" → Badge "Der Bestseller" + Tagline "mehr Platz…" */
function splitDescription(description: string): { badge: string | null; tagline: string } {
  const parts = description.split(" — ");
  if (parts.length < 2) return { badge: null, tagline: description };
  return { badge: parts[0], tagline: parts.slice(1).join(" — ") };
}

function ModelTile({ model }: { model: ModelWithIcon }) {
  const { region, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);
  const { badge, tagline } = splitDescription(tc(model.description));

  return (
    <article
      id={model.id}
      className="group flex scroll-mt-28 flex-col items-center overflow-hidden rounded-sm border border-graphit/10 bg-kreide/40 px-6 pt-10 text-center transition-colors hover:border-graphit/25 lg:pt-12"
    >
      {badge && <Eyebrow>{badge}</Eyebrow>}
      <h2 className="mt-3 font-sans text-3xl font-black tracking-tight lg:text-4xl">{model.name}</h2>
      <p className="mx-auto mt-2 max-w-sm font-sans text-sm leading-6 text-graphit/65 lg:text-base lg:leading-7">
        {tagline}
      </p>
      <p className="mt-3 font-sans text-sm font-bold text-graphit">
        <LocalizedPrice value={model.price} />
      </p>

      <div className="mt-5 flex items-center justify-center gap-3">
        <Button asChild size="sm">
          <Link href={`/konfigurator?typ=anhaenger&modell=${model.id}&schritt=2`}>{tc("Konfigurieren")}</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href={`/modelle/${model.id}`}>{tc("Details")}</Link>
        </Button>
      </div>

      <Link
        href={`/modelle/${model.id}`}
        aria-label={`${model.name} ${tc("Modell im Detail ansehen")}`}
        className="mt-8 flex w-full flex-1 items-end justify-center pb-6 lg:pb-8"
      >
        <img
          src={`/images/modelle/${model.imageId}.png`}
          alt={`MINO ${model.name}`}
          className="h-44 w-auto max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03] sm:h-52 lg:h-64"
        />
      </Link>

      <dl className="flex w-full items-center justify-center gap-8 border-t border-graphit/10 py-4 font-sans text-sm">
        <div className="flex items-baseline gap-2">
          <dt className="text-xs text-graphit/50">{t("length")}</dt>
          <dd className="font-bold text-graphit">{model.length}</dd>
        </div>
        <div className="flex items-baseline gap-2">
          <dt className="text-xs text-graphit/50">{t("weight")}</dt>
          <dd className="font-bold text-graphit">{model.weight}</dd>
        </div>
      </dl>
    </article>
  );
}

function ComparisonTable({ models }: { models: ModelWithIcon[] }) {
  const { region, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);

  return (
    <div className="mt-24 lg:mt-32">
      <div className="flex flex-col gap-3">
        <Eyebrow>{tc("Im Überblick")}</Eyebrow>
        <h3 className="font-sans text-2xl font-black tracking-tight lg:text-3xl">
          {tc("Alle Modelle im Vergleich")}
        </h3>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[44rem] border-collapse font-sans text-sm">
          <thead>
            <tr className="border-b border-graphit/15">
              <th className="w-36 py-4" aria-hidden />
              {models.map((m) => (
                <th key={m.id} scope="col" className="px-4 py-4 text-center">
                  <span className="block font-sans text-base font-black tracking-tight text-graphit">
                    {m.name}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-graphit/10">
              <th scope="row" className="py-4 pr-4 text-left text-xs font-normal text-graphit/50">
                {t("length")}
              </th>
              {models.map((m) => (
                <td key={m.id} className="px-4 py-4 text-center font-bold text-graphit">
                  {m.length}
                </td>
              ))}
            </tr>
            <tr className="border-b border-graphit/10">
              <th scope="row" className="py-4 pr-4 text-left text-xs font-normal text-graphit/50">
                {t("weight")}
              </th>
              {models.map((m) => (
                <td key={m.id} className="px-4 py-4 text-center font-bold text-graphit">
                  {m.weight}
                </td>
              ))}
            </tr>
            <tr className="border-b border-graphit/10">
              <th scope="row" className="py-4 pr-4 text-left text-xs font-normal text-graphit/50">
                {t("price")}
              </th>
              {models.map((m) => (
                <td key={m.id} className="px-4 py-4 text-center font-bold text-graphit">
                  <LocalizedPrice value={m.price} />
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="py-5 pr-4" aria-hidden />
              {models.map((m) => (
                <td key={m.id} className="px-4 py-5 text-center">
                  <Link
                    href={`/modelle/${m.id}`}
                    className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-graphit transition-opacity hover:opacity-70"
                  >
                    {tc("Details")}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ModelsShowcase({ models }: { models: ModelWithIcon[] }) {
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-2">
        {models.map((m) => (
          <ModelTile key={m.id} model={m} />
        ))}
      </div>

      <ComparisonTable models={models} />
    </div>
  );
}
