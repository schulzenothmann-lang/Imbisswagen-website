"use client";

import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { LocalizedPrice } from "./LocalizedPrice";
import { useLocaleSettings } from "./LocaleProvider";

type ProductTypeLink = {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  price: string;
};

type ProductTypeLandingProps = {
  eyebrow: string;
  title: string;
  intro: string;
  items: [ProductTypeLink, ProductTypeLink];
};

export function ProductTypeLanding({ eyebrow, title, intro, items }: ProductTypeLandingProps) {
  const { t } = useLocaleSettings();
  const isRent = eyebrow === "Mieten";
  const localizedEyebrow = isRent ? t("navRent") : t("navAvailable");
  const localizedTitle =
    title === "Wähle aus, was du kaufen möchtest."
      ? t("chooseBuyTitle")
      : title === "Wähle aus, was du mieten möchtest."
        ? t("chooseRentTitle")
        : title;
  const localizedIntro = isRent ? t("rentLandingIntro") : t("buyLandingIntro");

  return (
    <main className="min-h-screen bg-beton pt-20 text-graphit lg:pt-[4.25rem]">
      <section className="mx-auto w-full max-w-7xl px-6 pt-16 pb-24 lg:px-10 lg:pt-24 lg:pb-32">
        <div className="max-w-2xl">
          <Eyebrow>{localizedEyebrow}</Eyebrow>
          <h1 className="mt-4 text-4xl leading-[0.95] tracking-normal lg:text-6xl">
            <span className="font-serif font-medium">{localizedTitle}</span>
          </h1>
          <p className="mt-6 font-sans text-lg leading-8 text-graphit/70">
            {intro === "Fertige Imbiss-Anhänger und Verkaufs-Pavillons, die kurzfristig verfügbar sind." ||
            intro === "Mietbare Imbiss-Anhänger und Verkaufs-Pavillons für Märkte, Events und saisonale Einsätze."
              ? localizedIntro
              : intro}
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
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
                  <h2 className="text-2xl font-black tracking-tight text-graphit">
                    {item.title === "Imbissanhänger" ? t("snackTrailerNoHyphen") : t("pavilion")}
                  </h2>
                  <span className="shrink-0 pt-1 text-sm font-bold text-graphit">
                    <LocalizedPrice value={item.price} />
                  </span>
                </div>
                <p className="max-w-xl text-sm leading-6 text-graphit/65">
                  {item.title === "Pavillon"
                    ? isRent
                      ? t("pavilionRentalDescription")
                      : t("pavilionPurchaseDescription")
                    : isRent
                      ? t("trailerRentalDescription")
                      : t("trailerPurchaseDescription")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
