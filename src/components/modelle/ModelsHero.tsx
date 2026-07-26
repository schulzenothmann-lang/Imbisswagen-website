"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { LocalizedPrice } from "@/components/LocalizedPrice";
import { useLocaleSettings } from "@/components/LocaleProvider";
import { translateCopy } from "@/lib/localized-content";
import { configureHrefFor, type ModelData } from "@/lib/models";

const AUTOPLAY_MS = 5200;

type HeroSlide = {
  id: string;
  name: string;
  length: string;
  weight: string;
  price: string;
  image: string;
  imageFit: "contain" | "cover";
  detailHref: string;
  configureHref: string;
};

function createSlides(models: ModelData[]): HeroSlide[] {
  return models.map((model) => ({
    id: model.id,
    name: model.name,
    length: model.length,
    weight: model.weight,
    price: model.price,
    image: model.image,
    imageFit: model.imageFit,
    detailHref: `/modelle/${model.id}`,
    configureHref: configureHrefFor(model),
  }));
}

export function ModelsHero({ models }: { models: ModelData[] }) {
  const { region, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);
  const slides = createSlides(models);

  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const activeRef = useRef(0);
  const current = slides[active];

  const goTo = useCallback((next: number, forced?: 1 | -1) => {
    const currentIndex = activeRef.current;
    if (next === currentIndex) return;

    setPrevious(currentIndex);
    setDirection(forced ?? (next > currentIndex ? 1 : -1));
    activeRef.current = next;
    setActive(next);
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      goTo((activeRef.current + 1) % slides.length, 1);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [goTo, paused, slides.length]);

  function onTabKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const next = (active + step + slides.length) % slides.length;
    goTo(next, step);
    const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button");
    buttons[next]?.focus();
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label={tc("MINO Modelle")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      className="relative isolate flex flex-col overflow-clip bg-tinte text-kreide lg:min-h-[calc(100svh-4.25rem)]"
    >
      {/* Studio-Licht über der Bühne — hält den Hintergrund monochrom, aber nicht flach. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(115%_70%_at_50%_18%,color-mix(in_oklab,var(--color-kreide)_9%,transparent),transparent_72%)]"
      />

      <div className="mx-auto flex w-full max-w-[86rem] flex-1 flex-col px-6 pb-8 lg:px-12 lg:pb-10">
        {/* Kopfleiste — rahmt die Bühne und füllt die äußeren Ränder. */}
        <div className="flex items-center justify-between border-b border-kreide/10 py-4 lg:py-5">
          <Eyebrow onDark>{tc("Die Modellreihe")}</Eyebrow>
          <p className="font-sans text-xs font-bold tracking-[0.16em] text-kreide/40 tabular-nums">
            <span className="text-kreide">{String(active + 1).padStart(2, "0")}</span>
            <span className="mx-1.5">/</span>
            {String(slides.length).padStart(2, "0")}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center text-center lg:mt-10">
          <h1 className="text-4xl leading-[0.95] tracking-normal lg:text-5xl">
            <span className="font-serif font-medium">{tc("Ikonische")}</span>{" "}
            <span className="font-sans font-black tracking-tight">{tc("Modelle.")}</span>
          </h1>
          <p className="mt-3.5 font-sans text-sm leading-6 text-kreide/60 lg:text-base">
            {tc("Vier Modelle, eine Handschrift.")}
          </p>
        </div>

        {/* Modellwahl */}
        <div
          role="group"
          aria-label={tc("Modell auswählen")}
          onKeyDown={onTabKeyDown}
          className="mt-6 flex items-stretch justify-center gap-1 sm:gap-2 lg:mt-8"
        >
          {slides.map((slide, index) => {
            const isActive = index === active;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(index)}
                aria-current={isActive ? "true" : undefined}
                className="group flex flex-col items-center gap-2.5 px-3 pt-1 sm:px-5"
              >
                <span
                  className={`font-sans text-xs font-bold tracking-[0.14em] uppercase transition-colors duration-300 sm:text-sm ${
                    isActive ? "text-kreide" : "text-kreide/40 group-hover:text-kreide/70"
                  }`}
                >
                  {slide.name}
                </span>
                <span className="block h-px w-10 overflow-hidden bg-kreide/15 sm:w-14">
                  {isActive && (
                    <span
                      key={active}
                      style={{
                        animationDuration: `${AUTOPLAY_MS}ms`,
                        animationPlayState: paused ? "paused" : "running",
                      }}
                      className="animate-carousel-progress block h-full w-full bg-kreide"
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bühne — mobil inhaltsgroß, ab lg nimmt sie die Resthöhe des Bildschirms auf. */}
        <div className="relative mt-6 flex flex-col justify-end lg:mt-8 lg:flex-1">
          <div className="relative h-44 sm:h-56 lg:h-auto lg:min-h-52 lg:flex-1">
            {/* Bodenlicht bleibt konstant — alle Anhänger stehen auf derselben Linie. */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-1/2 h-10 w-[64%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(50%_50%_at_50%_50%,color-mix(in_oklab,var(--color-kreide)_11%,transparent),transparent_70%)] blur-lg"
            />

            {slides.map((slide, index) => {
              const isActive = index === active;
              const isLeaving = index === previous && !isActive;
              const exitOffset = direction === 1 ? "-translate-x-8" : "translate-x-8";
              const enterOffset = direction === 1 ? "translate-x-8" : "-translate-x-8";

              return (
                <div
                  key={slide.id}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 transition-[opacity,transform,filter] duration-[900ms] ease-brand motion-reduce:transition-none ${
                    isActive
                      ? "translate-x-0 scale-100 opacity-100 blur-0"
                      : `scale-[0.97] opacity-0 blur-[3px] ${isLeaving ? exitOffset : enterOffset}`
                  }`}
                >
                  <Link
                    href={slide.detailHref}
                    tabIndex={isActive ? undefined : -1}
                    aria-label={`${slide.name} ${tc("Modell im Detail ansehen")}`}
                    className="group block h-full w-full"
                  >
                    {/* Freigestellte Anhänger stehen frei auf der Bühne; das Studiofoto
                        der Station bekommt einen gerahmten Ausschnitt in der Mitte. */}
                    {slide.imageFit === "cover" ? (
                      <div className="relative mx-auto h-full w-fit max-w-full overflow-hidden rounded-sm ring-1 ring-kreide/10">
                        <Image
                          src={slide.image}
                          alt={`MINO ${slide.name}`}
                          width={1536}
                          height={1024}
                          priority={index === 0}
                          sizes="(max-width: 1023px) 92vw, 48rem"
                          className="h-full w-auto object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.015]"
                        />
                      </div>
                    ) : (
                      <Image
                        src={slide.image}
                        alt={`MINO ${slide.name}`}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 1023px) 92vw, 86rem"
                        className="object-contain object-bottom transition-transform duration-700 ease-brand group-hover:scale-[1.015]"
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Standlinie im Stil technischer Zeichnungen — spannt sich über die volle Breite. */}
          <div
            aria-hidden
            className="h-px w-full bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--color-kreide)_22%,transparent)_8%,color-mix(in_oklab,var(--color-kreide)_22%,transparent)_92%,transparent)]"
          />
        </div>

        {/* Eckdaten links, Aktion rechts — die Zeile trägt die äußeren Ränder. */}
        <div className="mt-5 flex flex-col items-center gap-5 lg:mt-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <p
            key={current.id}
            className="animate-fade-up flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-sans text-xs font-bold tracking-[0.12em] text-kreide/50 uppercase sm:gap-x-6 sm:text-sm"
          >
            <span>{current.length}</span>
            <span aria-hidden className="h-3 w-px bg-kreide/20" />
            <span>{current.weight}</span>
            <span aria-hidden className="h-3 w-px bg-kreide/20" />
            <span className="text-kreide">
              <LocalizedPrice value={current.price} />
            </span>
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row lg:gap-6">
            <Link
              href={current.detailHref}
              className="order-2 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-kreide/60 transition-colors duration-200 hover:text-kreide sm:order-1"
            >
              {`${current.name} ${tc("im Detail")}`}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Button asChild variant="inverse" className="order-1 sm:order-2">
              <Link href={current.configureHref}>{t("ctaConfigure")}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Übergang zur hellen Seite — und der leise Hinweis auf die Station als Alternative. */}
      <div className="border-t border-kreide/10">
        <Link
          href="#station"
          className="mx-auto flex w-full max-w-[86rem] items-center justify-center gap-2 px-6 py-3.5 font-sans text-[0.7rem] font-bold tracking-[0.16em] text-kreide/45 uppercase transition-colors duration-200 hover:text-kreide lg:px-12"
        >
          {tc("Auch als Verkaufspavillon")}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
