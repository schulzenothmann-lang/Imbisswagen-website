"use client";

import Image from "next/image";
import Link from "next/link";

import { translateCopy } from "@/lib/localized-content";
import { LocalizedPrice } from "../LocalizedPrice";
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
          : tc("Wähle zuerst, ob du einen Imbiss-Anhänger oder einen Verkaufs-Pavillon konfigurieren möchtest.")}
      </p>
    </div>
  );
}

export function ConfiguratorTypePicker() {
  const { t } = useLocaleSettings();
  const items = [
    {
      title: t("snackTrailer"),
      description: t("trailerConfiguratorDescription"),
      href: "/konfigurator?typ=anhaenger",
      image: "/images/modelle/basis.png",
      imageAlt: t("snackTrailer"),
      price: "ab 12.900 €",
    },
    {
      title: t("salesPavilion"),
      description: t("pavilionConfiguratorDescription"),
      href: "/konfigurator?typ=pavillon",
      image: "/images/produkte/verkaufs-pavillon.png",
      imageAlt: t("salesPavilion"),
      price: "ab 7.900 €",
    },
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group overflow-hidden rounded-sm border border-graphit/10 bg-kreide/45 transition-colors hover:border-graphit/35"
        >
          <div className="relative flex aspect-[16/10] items-center justify-center bg-beton p-6">
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              priority
              unoptimized
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-8 transition-transform duration-500 group-hover:scale-[1.025]"
            />
          </div>
          <div className="flex flex-col gap-3 p-5 font-sans sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-black tracking-tight text-graphit">{item.title}</h2>
              <span className="shrink-0 pt-1 text-sm font-bold text-graphit">
                <LocalizedPrice value={item.price} />
              </span>
            </div>
            <p className="max-w-xl text-sm leading-6 text-graphit/65">{item.description}</p>
            <span className="mt-2 flex h-11 w-fit items-center justify-center rounded-sm bg-graphit px-6 font-sans text-sm font-semibold text-kreide transition-colors duration-200 group-hover:bg-graphit/90">
              {t("select")}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
