"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { translateCopy } from "@/lib/localized-content";
import { LocalizedPrice } from "./LocalizedPrice";
import { useLocaleSettings } from "./LocaleProvider";

// Fotos unter public/images/modelle/<id>.png: freigestellt (transparenter
// Hintergrund), eng zugeschnitten auf den Inhalt (kein Leerraum-Rand).
// Der Bildbereich hat eine feste Höhe (kein aspect-ratio-Box mehr), und das
// Foto füllt diese Höhe exakt (h-full, w-auto) — so gibt es keinen toten
// Leerraum über dem Bild mehr, und alle Modelle sind gleich hoch,
// unabhängig vom Seitenverhältnis des jeweiligen Fotos.
const models = [
  {
    id: "basis",
    imageId: "basis",
    name: "Basis",
    length: "5 M",
    weight: "1,5 T",
    price: "ab 21.900 €",
    bodyOffset: "-7%",
  },
  {
    id: "standard",
    imageId: "standard",
    name: "Standard",
    length: "5,5 M",
    weight: "1,7 T",
    price: "ab 25.900 €",
    bodyOffset: "-7%",
  },
  {
    id: "premium",
    imageId: "premium",
    name: "Premium",
    length: "5,5 M",
    weight: "1,7 T",
    price: "ab 25.900 €",
    bodyOffset: "-7%",
  },
  {
    id: "xl",
    imageId: "xl",
    name: "X-ray",
    length: "1,5 M",
    weight: "500 KG",
    price: "12900",
    bodyOffset: "-10%",
  },
];

export function ModelsTeaser() {
  const { region, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);
  const sectionRef = useRef<HTMLElement>(null);
  const autoFinishedRef = useRef(false);
  const [active, setActive] = useState(0);
  const canPrev = active > 0;
  const canNext = active < models.length - 1;
  const current = models[active];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let frame = 0;

    function updateFromScroll() {
      frame = 0;
      if (autoFinishedRef.current) return;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.78;
      const end = viewportHeight * 0.08;
      const rawProgress = (start - rect.top) / (start - end);
      const progress = Math.min(1, Math.max(0, rawProgress));
      const nextActive = progress >= 0.5 ? 1 : 0;

      if (nextActive === 1) {
        autoFinishedRef.current = true;
      }

      setActive((currentIndex) => (currentIndex === nextActive ? currentIndex : nextActive));
    }

    function requestUpdate() {
      if (frame) return;
      frame = window.requestAnimationFrame(updateFromScroll);
    }

    updateFromScroll();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section ref={sectionRef} className="mx-auto flex min-h-[42rem] max-w-7xl flex-col justify-center px-6 py-24 lg:min-h-[calc(100svh-7rem)] lg:px-10 lg:py-32">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.35fr] lg:items-start">
        <div className="flex flex-col gap-5">
          <Eyebrow>{tc("Die Modellreihe")}</Eyebrow>
          <h2 className="text-4xl leading-[0.95] tracking-normal lg:text-6xl">
            <span className="font-serif font-medium">{tc("Ikonisch")}</span>
            <br />
            <span className="font-sans font-black tracking-tight">{tc("Modelle")}</span>
          </h2>
        </div>
        <div className="max-w-2xl lg:pt-2">
          <h3 className="font-sans text-xl font-black tracking-tight text-graphit lg:text-2xl">
            {tc("Zeitloses Design + handwerkliche Qualität")}
          </h3>
          <p className="mt-4 max-w-xl font-sans text-sm leading-6 text-graphit/70 lg:text-base lg:leading-7">
            {tc("Ein MINO ist mehr als ein Verkaufsanhänger — er ist die Bühne für dein Konzept, gebaut für Alltag, Wirkung und lange Nutzung.")}
          </p>
          <Button asChild variant="outline" className="mt-7">
            <Link href="/modelle">{t("ctaViewModels")}</Link>
          </Button>
        </div>
      </div>

      <div className="mt-12 lg:mt-14">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(-${active} * 100%))` }}
          >
            {models.map((m) => (
              <div key={m.id} className="flex h-40 w-full shrink-0 items-end justify-center sm:h-52 lg:h-[17.5rem] xl:h-[19rem]">
                <img
                  src={`/images/modelle/${m.imageId}.png`}
                  alt={`MINO ${m.name}`}
                  className="h-full w-auto max-w-full object-contain"
                  style={{ transform: `translateX(${m.bodyOffset})` }}
                />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-5 text-center font-sans text-sm text-graphit/62">{current.name}</p>
        <p className="mt-1 text-center font-sans text-xs font-bold text-graphit/50">
          <LocalizedPrice value={current.price} />
        </p>

        <div className="mx-auto mt-7 flex max-w-lg items-center gap-4">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setActive((i) => Math.max(0, i - 1))}
              disabled={!canPrev}
              aria-label={tc("Vorheriges Modell")}
              className="flex h-8 w-11 shrink-0 items-center justify-center rounded-full border border-graphit/25 text-graphit transition-colors disabled:opacity-30 enabled:hover:bg-graphit enabled:hover:text-kreide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setActive((i) => Math.min(models.length - 1, i + 1))}
              disabled={!canNext}
              aria-label={tc("Nächstes Modell")}
              className="flex h-8 w-11 shrink-0 items-center justify-center rounded-full border border-graphit/25 text-graphit transition-colors disabled:opacity-30 enabled:hover:bg-graphit enabled:hover:text-kreide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-1 items-center gap-2.5">
            {models.map((m, i) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${m.name}`}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i === active ? "bg-graphit" : "bg-graphit/15 hover:bg-graphit/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
