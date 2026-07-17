"use client";

import { useEffect, useState } from "react";

import { translateCopy } from "@/lib/localized-content";
import type { ModelData } from "@/lib/models";
import { useLocaleSettings } from "../LocaleProvider";

const INTERVAL_MS = 4500;

export function ModelsHero({ models }: { models: ModelData[] }) {
  const { region } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % models.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [models.length]);

  const active = models[activeIndex];

  return (
    <section className="relative flex h-[62vh] min-h-[26rem] w-full flex-col justify-end overflow-hidden bg-graphit text-kreide">
      {models.map((m, index) => (
        <img
          key={m.id}
          src={`/images/modelle/${m.imageId}.png`}
          alt={m.name}
          className={`absolute inset-0 h-full w-full object-contain p-10 transition-opacity duration-1000 ease-in-out sm:p-16 lg:p-20 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="relative z-10 flex flex-col gap-6 px-6 pb-10 lg:px-10 lg:pb-14">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-sans text-3xl font-black tracking-tight transition-opacity duration-500 lg:text-5xl">
            {active.name}
          </h2>
          <span className="hidden font-sans text-sm text-kreide/50 sm:block">{tc("Vier Modelle. Eine Handschrift.")}</span>
        </div>

        <div className="flex gap-2">
          {models.map((m, index) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={m.name}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-10 bg-kreide" : "w-4 bg-kreide/30 hover:bg-kreide/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
