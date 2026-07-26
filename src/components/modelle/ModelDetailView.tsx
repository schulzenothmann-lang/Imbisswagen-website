"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftRight,
  ArrowRight,
  ArrowUpDown,
  ChefHat,
  Check,
  ChevronRight,
  Palette,
  Ruler,
  ShieldCheck,
  Weight,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { LocalizedPrice } from "@/components/LocalizedPrice";
import { useLocaleSettings } from "@/components/LocaleProvider";
import { CONTACT_EMAIL } from "@/lib/contact";
import { translateCopy } from "@/lib/localized-content";
import type { ModelDetail, ModelSpec } from "@/lib/models";

const specIcons: Record<ModelSpec["icon"], LucideIcon> = {
  height: ArrowUpDown,
  width: ArrowLeftRight,
  length: Ruler,
  weight: Weight,
  color: Palette,
  equipment: ChefHat,
  warranty: ShieldCheck,
};

type Step = { title: string; text: string };

const TRAILER_STEPS: Step[] = [
  {
    title: "Gemeinsam planen wir dein Modell",
    text: "Wir klären Maße, Technik und Ausstattung — und sagen dir ehrlich, was du dafür brauchst und was du dir sparen kannst. Am Ende steht ein Entwurf, den du freigibst.",
  },
  {
    title: "Wir bauen deinen Anhänger",
    text: "Gebaut wird in unserer festen Partnerfertigung, mit der wir dauerhaft zusammenarbeiten. Die Produktion dauert in der Regel 10 bis 14 Wochen — du siehst währenddessen, wo dein Anhänger steht.",
  },
  {
    title: "Wir liefern — oder du holst ihn ab",
    text: "Wir bringen den fertigen Anhänger zu deiner Adresse oder du holst ihn persönlich bei uns ab. In beiden Fällen bekommst du eine Einweisung in Technik und Wartung.",
  },
];

const PAVILION_STEPS: Step[] = [
  {
    title: "Gemeinsam planen wir deinen Verkaufspavillon",
    text: "Wir klären Größe, Ausbau und Standort — und sagen dir ehrlich, was du dafür brauchst und was du dir sparen kannst. Am Ende steht ein Entwurf, den du freigibst.",
  },
  {
    title: "Wir bauen deinen Verkaufspavillon",
    text: "Gebaut wird in unserer festen Partnerfertigung, mit der wir dauerhaft zusammenarbeiten. Du siehst während der Umsetzung, wie weit dein Verkaufspavillon ist — ohne nachfragen zu müssen.",
  },
  {
    title: "Wir liefern — oder du holst ihn ab",
    text: "Wir bringen den fertigen Verkaufspavillon zu deiner Adresse oder du holst ihn persönlich bei uns ab. In beiden Fällen bekommst du eine Einweisung in Aufbau und Technik.",
  },
];

const FOUNDERS = [
  { name: "Erik Nothmann", initials: "EN" },
  { name: "Mika Schulze", initials: "MS" },
];

/** Vier Referenz-Plätze für die Projektgalerie — Fotos folgen, bis dahin Platzhalter. */
const PROJECT_SLOTS = ["Streetfood", "Kaffee", "Eis", "Markt"];

export function ModelDetailView({ detail, others }: { detail: ModelDetail; others: ModelDetail[] }) {
  const { region, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);

  const isPavilion = detail.productType === "pavillon";
  const steps = isPavilion ? PAVILION_STEPS : TRAILER_STEPS;
  const listingHref = isPavilion
    ? "/angebote?angebot=kaufen&produkt=pavillon"
    : "/angebote?angebot=kaufen&produkt=anhaenger";
  const adviceHref = `/kontakt?anliegen=${encodeURIComponent(`Beratung zu ${detail.category} ${detail.name}`)}`;

  return (
    <>
      {/* Pfad — zeigt, wo man gelandet ist, und führt zurück in die Reihe. */}
      <nav
        aria-label={tc("Pfad")}
        className="mx-auto flex w-full max-w-[86rem] items-center gap-1.5 px-6 py-4 font-sans text-xs text-graphit/50 lg:px-12"
      >
        <Link href="/" className="transition-colors hover:text-graphit">
          {tc("Startseite")}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <Link href="/modelle" className="transition-colors hover:text-graphit">
          {tc("Modelle")}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="font-semibold text-graphit">{detail.name}</span>
      </nav>

      {/* Bühne — dunkel wie die Modellreihe, Daten links, Produkt rechts. */}
      <section className="relative isolate overflow-clip bg-tinte text-kreide">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(115%_70%_at_70%_18%,color-mix(in_oklab,var(--color-kreide)_9%,transparent),transparent_72%)]"
        />

        <div className="mx-auto grid w-full max-w-[86rem] items-center gap-10 px-6 py-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-12 lg:py-20">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow onDark>{tc(detail.category)}</Eyebrow>

            <div className="flex flex-col gap-4">
              <h1 className="font-sans text-5xl font-black tracking-tight lg:text-7xl">{detail.name}</h1>
              <p className="max-w-lg font-sans text-base leading-7 text-kreide/70 lg:text-lg lg:leading-8">
                {tc(detail.longDescription)}
              </p>
            </div>

            <div className="flex items-end gap-3 border-y border-kreide/10 py-4">
              <span className="font-sans text-xs font-bold tracking-[0.14em] text-kreide/45 uppercase">
                {t("price")}
              </span>
              <span className="font-sans text-2xl font-black tracking-tight lg:text-3xl">
                <LocalizedPrice value={detail.price} />
              </span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="inverse" size="lg">
                <Link href={detail.configureHref}>{t("ctaConfigure")}</Link>
              </Button>
              <Button asChild variant="outlineOnDark" size="lg">
                <Link href={adviceHref}>{tc("Beratung anfragen")}</Link>
              </Button>
            </div>
          </div>

          <div className="relative flex flex-col justify-end">
            <div className="relative h-56 sm:h-72 lg:h-[26rem]">
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-1/2 h-10 w-[64%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(50%_50%_at_50%_50%,color-mix(in_oklab,var(--color-kreide)_11%,transparent),transparent_70%)] blur-lg"
              />
              <Image
                src={detail.image}
                alt={`MINO ${detail.name}`}
                fill
                priority
                sizes="(max-width: 1023px) 92vw, 48rem"
                className={
                  detail.imageFit === "cover"
                    ? "rounded-sm object-cover"
                    : "object-contain object-bottom"
                }
              />
            </div>
            <div
              aria-hidden
              className="mt-6 h-px w-full bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--color-kreide)_22%,transparent)_8%,color-mix(in_oklab,var(--color-kreide)_22%,transparent)_92%,transparent)]"
            />
          </div>
        </div>
      </section>

      {/* Technische Eckdaten — eine Zeile, sieben Werte. */}
      <section className="border-b border-graphit/10 bg-beton">
        <dl className="mx-auto grid w-full max-w-[86rem] grid-cols-2 gap-x-6 gap-y-8 px-6 py-10 sm:grid-cols-4 lg:grid-cols-7 lg:px-12 lg:py-12">
          {detail.specs.map((spec) => {
            const Icon = specIcons[spec.icon];
            return (
              <div key={spec.label} className="flex flex-col gap-2">
                <Icon className="h-5 w-5 text-graphit/45" aria-hidden="true" />
                <dt className="font-sans text-[0.7rem] font-bold tracking-[0.12em] text-graphit/45 uppercase">
                  {tc(spec.label)}
                </dt>
                <dd className="flex flex-col gap-0.5">
                  <span className="font-sans text-base font-bold text-graphit">{tc(spec.value)}</span>
                  {spec.note && (
                    <span className="font-sans text-xs leading-5 text-graphit/50">{tc(spec.note)}</span>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </section>

      {/* Vom Entwurf zur Übergabe — drei Schritte. */}
      <section className="bg-kreide/40">
        <div className="mx-auto grid w-full max-w-[86rem] items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-28">
          <Reveal className="relative flex items-center justify-center">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-6 left-0 font-sans text-[14rem] leading-none font-black tracking-tight text-graphit/[0.05] select-none lg:text-[20rem]"
            >
              3
            </span>
            <div className="relative h-52 w-full sm:h-64 lg:h-80">
              <Image
                src={detail.image}
                alt=""
                fill
                sizes="(max-width: 1023px) 92vw, 36rem"
                loading="lazy"
                className={detail.imageFit === "cover" ? "rounded-sm object-cover" : "object-contain"}
              />
            </div>
          </Reveal>

          <Reveal className="flex flex-col items-start gap-8">
            <div className="flex flex-col gap-5">
              <Eyebrow>{tc("Der Weg zu deinem Modell")}</Eyebrow>
              <h2 className="text-3xl leading-[0.95] tracking-normal lg:text-5xl">
                <span className="font-serif font-medium">{tc("Ein Modell,")}</span>{" "}
                <span className="font-sans font-black tracking-tight">{tc("das es so nur einmal gibt.")}</span>
              </h2>
            </div>

            <ol className="flex flex-col gap-7">
              {steps.map((step, index) => (
                <li key={step.title} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-graphit/20 font-sans text-xs font-bold text-graphit/60 tabular-nums">
                    {index + 1}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-sans text-base font-bold text-graphit lg:text-lg">{tc(step.title)}</h3>
                    <p className="max-w-xl font-sans text-sm leading-6 text-graphit/70 lg:text-base lg:leading-7">
                      {tc(step.text)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <Button asChild size="lg">
              <Link href={detail.configureHref}>{t("ctaConfigure")}</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Fertige Projekte — Fotos folgen, die Fläche steht. */}
      <section className="mx-auto w-full max-w-[86rem] px-6 py-20 lg:px-12 lg:py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-4">
            <Eyebrow>{tc("Fertige Projekte")}</Eyebrow>
            <h2 className="font-sans text-2xl font-black tracking-tight lg:text-3xl">
              {tc("Gebaut, ausgeliefert, im Einsatz.")}
            </h2>
          </div>
          <Link
            href={listingHref}
            className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-graphit/60 transition-colors duration-200 hover:text-graphit"
          >
            {tc("Verfügbare Einheiten ansehen")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="mt-8 -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 lg:mx-0 lg:grid lg:grid-cols-4 lg:px-0">
          {PROJECT_SLOTS.map((slot) => (
            <div key={slot} className="w-64 shrink-0 snap-start lg:w-auto">
              <MediaPlaceholder aspect="4/3" label="MINO" className="rounded-sm" />
              <p className="mt-3 font-sans text-sm font-medium text-graphit/60">{tc(slot)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bauweise und Ausstattung — abwechselnd Bild und Text. */}
      <section className="mx-auto flex w-full max-w-[86rem] flex-col gap-20 border-t border-graphit/10 px-6 py-20 lg:gap-28 lg:px-12 lg:py-28">
        {detail.features.map((feature, index) => {
          const imageFirst = index % 2 === 0;
          const media = feature.image ? (
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm bg-graphit/[0.03]">
              <Image
                src={feature.image}
                alt=""
                fill
                sizes="(max-width: 1023px) calc(100vw - 3rem), 40rem"
                loading="lazy"
                className="object-cover"
              />
            </div>
          ) : (
            <MediaPlaceholder aspect="4/3" label="MINO" className="w-full rounded-sm" />
          );

          return (
            <Reveal key={feature.title}>
              <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div className={imageFirst ? "lg:order-1" : "lg:order-2"}>{media}</div>
                <div className={`flex flex-col gap-4 ${imageFirst ? "lg:order-2" : "lg:order-1"}`}>
                  <h2 className="max-w-md font-sans text-2xl font-black tracking-tight lg:text-4xl">
                    {tc(feature.title)}
                  </h2>
                  <p className="max-w-lg font-sans text-base leading-7 text-graphit/70">{tc(feature.text)}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </section>

      {/* Was drin ist — die Kurzliste aus der Modellreihe. */}
      <section className="bg-kreide/40">
        <div className="mx-auto w-full max-w-[86rem] px-6 py-16 lg:px-12 lg:py-20">
          <Eyebrow>{tc("Auf einen Blick")}</Eyebrow>
          <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {detail.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2.5 font-sans text-sm leading-6 text-graphit/75 lg:text-base lg:leading-7"
              >
                <Check className="mt-1 h-4 w-4 shrink-0 text-graphit/55" aria-hidden="true" />
                {tc(highlight)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Vollbild-Band — der Anhänger im Alltag. */}
      <section className="relative isolate h-72 overflow-hidden lg:h-[28rem]">
        <Image
          src="/images/prozess/verkauf-in-aktion.png"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-tinte/45" />
        <div className="relative mx-auto flex h-full w-full max-w-[86rem] items-end px-6 pb-10 lg:px-12 lg:pb-14">
          <p className="max-w-md font-sans text-2xl leading-tight font-black tracking-tight text-kreide lg:text-4xl">
            {tc("Am Ende steht dein Geschäft — nicht unser Prospekt.")}
          </p>
        </div>
      </section>

      {/* Konfigurator-Karte mit den Gründern als Ansprechpartner. */}
      <section className="mx-auto w-full max-w-[86rem] px-6 py-20 lg:px-12 lg:py-24">
        <Reveal className="grid gap-10 rounded-sm border border-graphit/10 bg-kreide/40 p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16 lg:p-12">
          <div className="flex flex-col items-start gap-5">
            <h2 className="font-sans text-2xl font-black tracking-tight lg:text-3xl">
              {isPavilion ? tc("Konfiguriere deinen Verkaufspavillon") : tc("Konfiguriere deinen Anhänger")}
            </h2>
            <p className="max-w-md font-sans text-base leading-7 text-graphit/70">
              {tc(
                "In wenigen Schritten legst du Größe, Ausstattung und Optik fest. Wir melden uns danach mit einem verbindlichen Preis zurück."
              )}
            </p>
            <Button asChild size="lg">
              <Link href={detail.configureHref}>{t("ctaConfigure")}</Link>
            </Button>
          </div>

          <div className="flex flex-col gap-4 lg:border-l lg:border-graphit/10 lg:pl-12">
            <p className="font-sans text-[0.7rem] font-bold tracking-[0.12em] text-graphit/45 uppercase">
              {tc("Deine Ansprechpartner")}
            </p>
            {FOUNDERS.map((founder) => (
              <div key={founder.name} className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-graphit/15 font-sans text-sm font-bold text-graphit/60">
                  {founder.initials}
                </span>
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-bold text-graphit">{founder.name}</span>
                  <span className="font-sans text-xs text-graphit/50">{tc("Gründer")}</span>
                </div>
              </div>
            ))}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-2 font-sans text-sm text-graphit/70 underline decoration-graphit/25 underline-offset-4 transition-colors hover:text-graphit hover:decoration-graphit"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </Reveal>
      </section>

      {/* Weitere Modelle — inklusive Verkaufspavillon als Alternative. */}
      <section className="mx-auto w-full max-w-[86rem] border-t border-graphit/10 px-6 py-16 lg:px-12 lg:py-24">
        <Eyebrow>{tc("Weitere Modelle")}</Eyebrow>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {others.map((other) => (
            <Link
              key={other.id}
              href={`/modelle/${other.id}`}
              className="group flex flex-col gap-4 rounded-sm border border-graphit/10 bg-kreide/40 p-5 transition-colors hover:border-graphit/25"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-sm bg-kreide/60">
                <Image
                  src={other.image}
                  alt={`MINO ${other.name}`}
                  fill
                  sizes="(max-width: 639px) 100vw, 22rem"
                  loading="lazy"
                  className={`transition-transform duration-500 ease-brand group-hover:scale-105 ${
                    other.imageFit === "cover" ? "object-cover" : "object-contain p-4"
                  }`}
                />
              </div>
              <div>
                <p className="font-sans text-base font-bold text-graphit">{other.name}</p>
                <p className="mt-1 font-sans text-sm text-graphit/60">
                  <LocalizedPrice value={other.price} />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
