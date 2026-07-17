"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { translateCopy } from "@/lib/localized-content";
import { useLocaleSettings } from "./LocaleProvider";
import { Stempel } from "./Stempel";

const productionFrames = [
  { label: "Rahmen", position: "0% 0%" },
  { label: "Aufbau", position: "50% 0%" },
  { label: "Innenausbau", position: "100% 0%" },
  { label: "Technik", position: "0% 100%" },
  { label: "Theke", position: "50% 100%" },
  { label: "Fertigstellung", position: "100% 100%" },
];

const steps = [
  {
    station: "Station 01",
    heading: "Du entscheidest",
    subheading: "Fertig ab Lager oder ganz nach Maß",
    description:
      "Wähle eines unserer Standardmodelle oder stelle deinen Anhänger im Konfigurator Schritt für Schritt selbst zusammen.",
    cta: { label: "Zum Konfigurator", href: "/konfigurator" },
    image: "/images/prozess/konfigurator-device.png",
    imageFit: "cover" as const,
    tone: "graphit" as const,
  },
  {
    station: "Station 02",
    heading: "Wir finalisieren dein Design",
    subheading: "Aus deiner Auswahl wird ein fertiges Modell",
    description:
      "Wir stimmen die Details ab, planen die Umsetzung und halten dich während des gesamten Prozesses auf dem Laufenden.",
    image: "/images/prozess/design-finalisieren-freigestellt.png",
    imageFit: "contain" as const,
    tone: "graphit" as const,
  },
  {
    station: "Station 03",
    heading: "Wir halten dich auf dem Laufenden",
    subheading: "Transparente Updates während der Umsetzung",
    description:
      "Du siehst, wo dein Anhänger gerade steht, welche Schritte abgeschlossen sind und was als Nächstes passiert.",
    image: "/images/prozess/produktions-raster.png",
    gallery: true,
    imageFit: "cover" as const,
    tone: "graphit" as const,
  },
  {
    station: "Station 04",
    heading: "Du bekommst einen Anhänger",
    subheading: "Startklar für dein Geschäft",
    description:
      "Du bekommst deinen fertigen Imbisswagen inklusive Einweisung in Technik und Wartung übergeben.",
    image: "/images/prozess/verkauf-in-aktion.png",
    imageFit: "cover" as const,
    tone: "graphit" as const,
  },
];

export function HowItWorks() {
  const { region } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [productionFrame, setProductionFrame] = useState(0);

  function showPreviousFrame() {
    setProductionFrame((current) => (current === 0 ? productionFrames.length - 1 : current - 1));
  }

  function showNextFrame() {
    setProductionFrame((current) => (current + 1) % productionFrames.length);
  }

  useEffect(() => {
    let frame = 0;

    function updateActiveItem() {
      frame = 0;

      setActiveIndex((current) => {
        const viewportCenter = window.innerHeight * 0.5;
        let nextIndex = current;
        let shortestDistance = Number.POSITIVE_INFINITY;

        itemRefs.current.forEach((item, index) => {
          if (!item) return;

          const rect = item.getBoundingClientRect();
          const itemCenter = rect.top + rect.height * 0.5;
          const distance = Math.abs(itemCenter - viewportCenter);

          if (distance < shortestDistance) {
            shortestDistance = distance;
            nextIndex = index;
          }
        });

        return nextIndex;
      });
    }

    function requestUpdate() {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveItem);
    }

    updateActiveItem();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section className="mx-auto mt-16 flex w-full max-w-7xl flex-col gap-8 border-t border-graphit/10 px-6 pt-24 pb-24 lg:mt-24 lg:px-10 lg:pt-32 lg:pb-32">
      <div className="flex max-w-xl flex-col gap-6">
        <Eyebrow>{tc("Der Prozess")}</Eyebrow>
        <h2 className="text-4xl leading-[0.95] tracking-normal lg:text-6xl">
          <span className="font-serif font-medium">{tc("Wir gehen den Weg")}</span>
          <br />
          <span className="font-sans font-black tracking-tight">{tc("gemeinsam")}</span>
        </h2>
        <p className="font-sans text-lg leading-8 text-graphit/70">
          {tc("Von deiner Entscheidung bis zur Übergabe.")}
        </p>
      </div>

      <ol className="relative flex flex-col gap-16 before:absolute before:top-2 before:bottom-2 before:left-1/2 before:hidden before:w-px before:bg-linear-to-b before:from-transparent before:via-graphit/40 before:to-transparent before:shadow-[0_0_22px_rgba(35,36,31,0.22)] lg:gap-0 lg:before:block">
        {steps.map((s, index) => {
          const imageFirst = index % 2 === 1;
          const isActive = activeIndex === index;
          const textContent = (
            <div
              className={`flex flex-col items-start gap-4 transition-all duration-700 ease-out ${
                isActive ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
              }`}
            >
              <h3 className="font-sans text-2xl font-black tracking-tight lg:text-4xl">{tc(s.heading)}</h3>
              <h4 className="font-sans text-sm font-medium text-graphit/60">{tc(s.subheading)}</h4>
              <p className="max-w-xl font-sans text-base leading-7 text-graphit/70">{tc(s.description)}</p>
              {s.cta && (
                <Button asChild className="mt-2 w-fit">
                  <a href={s.cta.href}>{tc(s.cta.label)}</a>
                </Button>
              )}
            </div>
          );
          const imageContent = (
            <div
              className={`relative aspect-16/9 overflow-hidden rounded-sm bg-graphit/[0.03] transition-all duration-700 ease-out ${
                s.imageFit === "contain" ? "p-6 lg:p-8" : ""
              } ${isActive ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
            >
              {s.gallery ? (
                <>
                  <div
                    role="img"
                    aria-label={`${tc("Produktionsphase")}: ${tc(productionFrames[productionFrame].label)}`}
                    className="h-full w-full bg-cover bg-no-repeat transition-[background-position] duration-500 ease-out"
                    style={{
                      backgroundImage: `url(${s.image})`,
                      backgroundPosition: productionFrames[productionFrame].position,
                      backgroundSize: "300% 200%",
                    }}
                  />

                  <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 rounded-full bg-beton/90 px-3 py-2 shadow-sm backdrop-blur">
                      {productionFrames.map((frame, frameIndex) => (
                        <button
                          key={frame.label}
                          type="button"
                          aria-label={`${tc("Produktionsphase")} ${frameIndex + 1}: ${tc(frame.label)}`}
                          aria-current={productionFrame === frameIndex ? "true" : undefined}
                          onClick={() => setProductionFrame(frameIndex)}
                          className={`h-2 rounded-full transition-all ${
                            productionFrame === frameIndex ? "w-6 bg-graphit" : "w-2 bg-graphit/30"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={tc("Vorheriges Modell")}
                        onClick={showPreviousFrame}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-beton/90 text-graphit shadow-sm backdrop-blur transition hover:bg-kreide"
                      >
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        aria-label={tc("Nächstes Modell")}
                        onClick={showNextFrame}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-beton/90 text-graphit shadow-sm backdrop-blur transition hover:bg-kreide"
                      >
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <img
                  src={s.image}
                  alt=""
                  className={`h-full w-full ${s.imageFit === "contain" ? "object-contain" : "object-cover"}`}
                />
              )}
            </div>
          );

          return (
            <li
              key={s.station}
              data-index={index}
              className="relative lg:min-h-[118svh] last:lg:min-h-[92svh]"
            >
              <article
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                className="grid items-center gap-8 lg:sticky lg:top-[16svh] lg:min-h-[68svh] lg:grid-cols-[minmax(0,1fr)_7rem_minmax(0,1fr)] lg:gap-10"
              >
                <div className="lg:col-start-1">{imageFirst ? imageContent : textContent}</div>

                <div
                  className={`relative z-10 flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full bg-beton transition-all duration-700 ease-out max-lg:order-first ${
                    isActive ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  } lg:col-start-2 lg:justify-self-center`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 hidden h-[11rem] w-px -translate-x-1/2 -translate-y-1/2 bg-graphit/10 lg:block"
                  />
                  <div className="relative z-10 flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full bg-beton">
                    <Stempel label={tc(s.station)} sublabel="Mino Werk" tone={s.tone} active={isActive} />
                  </div>
                </div>

                <div className="lg:col-start-3">{imageFirst ? textContent : imageContent}</div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
