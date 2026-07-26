"use client";

import { translateCopy } from "@/lib/localized-content";
import { useLocaleSettings } from "../LocaleProvider";

type ProductType = "anhaenger" | "pavillon";

export function ConfiguratorPageIntro({ initialType }: { initialType?: ProductType }) {
  const { region, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);
  const isPavilion = initialType === "pavillon";

  return (
    <div className="flex max-w-xl flex-col gap-6">
      <h1 className="text-4xl leading-[0.95] tracking-normal lg:text-6xl">
        <span className="font-serif font-medium">
          {initialType ? tc("Dein") : tc("Was möchtest du")}
        </span>
        <br />
        <span className="font-sans font-black tracking-tight">
          {initialType ? (isPavilion ? `${t("pavilion")}.` : `${t("snackTrailer")}.`) : tc("konfigurieren?")}
        </span>
      </h1>
      <p className="font-sans text-lg leading-8 text-graphit/70">
        {initialType
          ? isPavilion
            ? tc("Öffnungen und Ausstattung Schritt für Schritt festlegen — am Ende erhältst du dein individuelles Angebot.")
            : tc("Modell, Fenster und Ausstattung Schritt für Schritt festlegen — am Ende erhältst du dein individuelles Angebot.")
          : tc("Wähle zuerst, ob du einen Imbiss-Anhänger oder einen Verkaufspavillon konfigurieren möchtest.")}
      </p>
    </div>
  );
}
