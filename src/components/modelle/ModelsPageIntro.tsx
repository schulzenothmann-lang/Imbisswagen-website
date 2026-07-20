"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import { translateCopy } from "@/lib/localized-content";
import { useLocaleSettings } from "../LocaleProvider";

export function ModelsPageIntro() {
  const { region } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);

  return (
    <div className="flex max-w-xl flex-col gap-6">
      <Eyebrow>{tc("Die Modellreihe")}</Eyebrow>
      <h1 className="text-4xl leading-[0.95] tracking-normal lg:text-6xl">
        <span className="font-serif font-medium">{tc("Ikonische")}</span>
        <br />
        <span className="font-sans font-black tracking-tight">{tc("Modelle.")}</span>
      </h1>
      <p className="font-sans text-lg leading-8 text-graphit/70">
        {tc("Vom kompakten X-ray bis zum Premium — jedes Modell lässt sich im Konfigurator auf dein Konzept zuschneiden.")}
      </p>
    </div>
  );
}
