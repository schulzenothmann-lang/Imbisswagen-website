"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { LocalizedPrice } from "@/components/LocalizedPrice";
import { useLocaleSettings } from "@/components/LocaleProvider";
import { translateCopy } from "@/lib/localized-content";
import type { ModelData } from "@/lib/models";

/** Maßlinie im Stil technischer Zeichnungen: |——— 5,5 M ———| */
function DimensionLine({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span className={`flex items-center gap-2 text-graphit/40 ${className}`}>
      <span aria-hidden className="h-2.5 w-px shrink-0 bg-current" />
      <span aria-hidden className="h-px min-w-2 flex-1 bg-current" />
      <span className="shrink-0 font-sans text-[0.7rem] font-medium tracking-[0.08em] whitespace-nowrap">
        {label}
      </span>
      <span aria-hidden className="h-px min-w-2 flex-1 bg-current" />
      <span aria-hidden className="h-2.5 w-px shrink-0 bg-current" />
    </span>
  );
}

/** "Der Bestseller — mehr Platz…" → Badge "Der Bestseller" */
function badgeFromDescription(description: string): string | null {
  const parts = description.split(" — ");
  return parts.length >= 2 ? parts[0] : null;
}

function ModelStage({ model, index }: { model: ModelData; index: number }) {
  const { region, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);
  const badge = badgeFromDescription(tc(model.description));
  const imageFirst = index % 2 === 0;

  const textBlock = (
    <div className="flex flex-col items-start gap-5">
      <p className="flex items-center gap-3 font-sans text-xs font-bold tracking-[0.18em] text-graphit/45 uppercase">
        <span className="tabular-nums">0{index + 1}</span>
        <span aria-hidden className="h-px w-6 bg-graphit/30" />
        {badge && <span>{badge}</span>}
      </p>

      <h2 className="font-sans text-4xl font-black tracking-tight lg:text-5xl">{model.name}</h2>

      <p className="max-w-lg font-sans text-base leading-7 text-graphit/70">
        {tc(model.longDescription)}
      </p>

      <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
        {model.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2.5 font-sans text-sm leading-6 text-graphit/75">
            <Check className="mt-1 h-4 w-4 shrink-0 text-graphit/55" aria-hidden="true" />
            {tc(highlight)}
          </li>
        ))}
      </ul>

      <dl className="flex w-full max-w-md gap-8 border-y border-graphit/10 py-4 font-sans text-sm">
        <div className="flex flex-col gap-0.5">
          <dt className="text-xs text-graphit/50">{t("length")}</dt>
          <dd className="font-bold text-graphit">{model.length}</dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="text-xs text-graphit/50">{t("weight")}</dt>
          <dd className="font-bold text-graphit">{model.weight}</dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="text-xs text-graphit/50">{t("price")}</dt>
          <dd className="font-bold text-graphit">
            <LocalizedPrice value={model.price} />
          </dd>
        </div>
      </dl>

      <div className="mt-1 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href={`/konfigurator?typ=anhaenger&modell=${model.id}&schritt=2`}>{t("ctaConfigure")}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/modelle/${model.id}`}>{tc("Modell im Detail ansehen")}</Link>
        </Button>
      </div>

      <Link
        href={`/kontakt?anliegen=${encodeURIComponent(`Beratung zu Modell ${model.name}`)}`}
        className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-graphit/60 transition-colors duration-200 hover:text-graphit"
      >
        {tc("Beratung anfragen")}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );

  const imageBlock = (
    <Link
      href={`/modelle/${model.id}`}
      aria-label={`${model.name} ${tc("Modell im Detail ansehen")}`}
      className="group flex flex-col items-center px-2 lg:px-6"
    >
      <img
        src={`/images/modelle/${model.imageId}.png`}
        alt={`MINO ${model.name}`}
        className="max-h-56 w-auto max-w-full object-contain transition-transform duration-500 ease-brand group-hover:scale-[1.02] sm:max-h-64 lg:max-h-80"
      />
      <DimensionLine label={model.length} className="mt-8 w-2/3 max-w-xs" />
    </Link>
  );

  return (
    <Reveal>
      <article
        id={model.id}
        className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20"
      >
        <div className={imageFirst ? "lg:order-1" : "lg:order-2"}>{imageBlock}</div>
        <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>{textBlock}</div>
      </article>
    </Reveal>
  );
}

export function ModelsClosingCta() {
  const { region, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);

  return (
    <Reveal as="section" className="relative isolate overflow-clip bg-tinte px-6 py-24 text-kreide lg:px-10 lg:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-8">
        <Eyebrow onDark>{tc("Dein nächster Schritt")}</Eyebrow>
        <h2 className="text-4xl leading-[0.95] tracking-normal lg:text-6xl">
          <span className="font-serif font-medium">{tc("Unsicher,")}</span>
          <br />
          <span className="font-sans font-black tracking-tight">{tc("welches Modell passt?")}</span>
        </h2>
        <p className="max-w-lg font-sans text-lg leading-8 text-kreide/80">
          {tc("In einem kurzen Gespräch finden wir gemeinsam das Modell, das zu deinem Konzept passt — unverbindlich und kostenlos.")}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild variant="inverse" size="lg">
            <Link href="/kontakt?anliegen=Modellberatung">{tc("Beratung anfragen")}</Link>
          </Button>
          <Button asChild variant="outlineOnDark" size="lg">
            <Link href="/konfigurator">{t("ctaConfigure")}</Link>
          </Button>
        </div>
      </div>
    </Reveal>
  );
}

function PavilionStage({ index }: { index: number }) {
  const { region, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);

  return (
    <Reveal>
      <article id="pavillon" className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <Link
          href="/kaufen/pavillons"
          aria-label={tc("Verkaufs-Pavillon ansehen")}
          className="group flex flex-col items-center px-2 lg:order-1 lg:px-6"
        >
          <div className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-sm bg-kreide/50">
            <Image
              src="/images/produkte/verkaufs-pavillon.png"
              alt={tc("MINO Verkaufs-Pavillon")}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-brand group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-graphit/10" />
          </div>
          <DimensionLine label="AB 3 × 3 M" className="mt-8 w-2/3 max-w-xs" />
        </Link>

        <div className="flex flex-col items-start gap-5 lg:order-2">
          <p className="flex items-center gap-3 font-sans text-xs font-bold tracking-[0.18em] text-graphit/45 uppercase">
            <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
            <span aria-hidden className="h-px w-6 bg-graphit/30" />
            <span>{tc("Der flexible Einstieg")}</span>
          </p>

          <h2 className="font-sans text-4xl font-black tracking-tight lg:text-5xl">
            {tc("Verkaufs-Pavillon")}
          </h2>

          <p className="max-w-lg font-sans text-base leading-7 text-graphit/70">
            {tc("Der MINO Verkaufs-Pavillon ist die modulare Alternative zum Anhänger — schnell aufgebaut, in mehreren Größen planbar und ideal für Märkte, Events oder den wirtschaftlichen Einstieg in die mobile Gastronomie.")}
          </p>

          <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {[
              "Modulare Größen ab 3 × 3 M",
              "Schneller Auf- und Abbau",
              "Edelstahl-Arbeitsbereich und Verkaufstheke",
              "Im Konfigurator individuell planbar",
            ].map((highlight) => (
              <li key={highlight} className="flex items-start gap-2.5 font-sans text-sm leading-6 text-graphit/75">
                <Check className="mt-1 h-4 w-4 shrink-0 text-graphit/55" aria-hidden="true" />
                {tc(highlight)}
              </li>
            ))}
          </ul>

          <dl className="flex w-full max-w-md gap-8 border-y border-graphit/10 py-4 font-sans text-sm">
            <div className="flex flex-col gap-0.5">
              <dt className="text-xs text-graphit/50">{tc("Größe")}</dt>
              <dd className="font-bold text-graphit">ab 3 × 3 M</dd>
            </div>
            <div className="flex flex-col gap-0.5">
              <dt className="text-xs text-graphit/50">{tc("Bauweise")}</dt>
              <dd className="font-bold text-graphit">{tc("modular")}</dd>
            </div>
            <div className="flex flex-col gap-0.5">
              <dt className="text-xs text-graphit/50">{t("price")}</dt>
              <dd className="font-bold text-graphit"><LocalizedPrice value="ab 7.900 €" /></dd>
            </div>
          </dl>

          <div className="mt-1 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/konfigurator?typ=pavillon">{t("ctaConfigure")}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/kaufen/pavillons">{tc("Pavillon ansehen")}</Link>
            </Button>
          </div>

          <Link
            href="/kontakt?anliegen=Beratung%20zu%20Verkaufs-Pavillon"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-graphit/60 transition-colors duration-200 hover:text-graphit"
          >
            {tc("Beratung anfragen")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export function ModelsShowcase({ models }: { models: ModelData[] }) {
  return (
    <div className="flex flex-col gap-28 lg:gap-40">
      {models.map((m, index) => (
        <ModelStage key={m.id} model={m} index={index} />
      ))}
      <PavilionStage index={models.length} />
    </div>
  );
}
