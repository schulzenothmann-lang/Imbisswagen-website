"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { LocalizedPrice } from "./LocalizedPrice";
import { useLocaleSettings } from "./LocaleProvider";
import type { TranslationKey } from "@/lib/locale";

export type ProductTypeVariant = "rent" | "buy" | "configure";

type PickerItem = {
  labelKey: TranslationKey;
  href: string;
  image: string;
  price: string;
};

type VariantConfig = {
  eyebrowKey: TranslationKey;
  trailer: PickerItem;
  pavilion: PickerItem;
};

const VARIANTS: Record<ProductTypeVariant, VariantConfig> = {
  rent: {
    eyebrowKey: "navRent",
    trailer: {
      labelKey: "snackTrailerNoHyphen",
      href: "/angebote?angebot=mieten&produkt=anhaenger",
      image: "/images/modelle/basis.png",
      price: "ab 1.490 € / Monat",
    },
    pavilion: {
      labelKey: "pavilion",
      href: "/angebote?angebot=mieten&produkt=pavillon",
      image: "/images/produkte/verkaufs-pavillon.png",
      price: "ab 390 € / Monat",
    },
  },
  buy: {
    eyebrowKey: "navAvailable",
    trailer: {
      labelKey: "snackTrailerNoHyphen",
      href: "/angebote?angebot=kaufen&produkt=anhaenger",
      image: "/images/modelle/basis.png",
      price: "ab 21.900 €",
    },
    pavilion: {
      labelKey: "pavilion",
      href: "/angebote?angebot=kaufen&produkt=pavillon",
      image: "/images/produkte/verkaufs-pavillon.png",
      price: "ab 7.900 €",
    },
  },
  configure: {
    eyebrowKey: "configureEyebrow",
    trailer: {
      labelKey: "snackTrailerNoHyphen",
      href: "/konfigurator?typ=anhaenger",
      image: "/images/modelle/basis.png",
      price: "ab 12.900 €",
    },
    pavilion: {
      labelKey: "pavilion",
      href: "/konfigurator?typ=pavillon",
      image: "/images/produkte/verkaufs-pavillon.png",
      price: "ab 7.900 €",
    },
  },
};

export function ProductTypePicker({ variant }: { variant: ProductTypeVariant }) {
  const { t } = useLocaleSettings();
  const config = VARIANTS[variant];
  const items = [config.trailer, config.pavilion];

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-baseline gap-3">
        <Eyebrow>{t(config.eyebrowKey)}</Eyebrow>
        <h1 className="font-serif text-lg font-medium leading-none tracking-normal text-graphit/80 lg:text-xl">
          {t("pickTypeHeading")}
        </h1>
      </div>

      <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2 lg:mt-6 lg:min-h-0 lg:gap-5">
        {items.map((item, index) => (
          <Reveal key={item.href} delayMs={index * 90} className="flex min-h-0 flex-col">
            <Link
              href={item.href}
              className="group flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm border border-graphit/10 bg-kreide/45 transition-colors hover:border-graphit/35"
            >
              <div className="relative min-h-0 flex-1 basis-52 bg-beton sm:basis-64">
                <Image
                  src={item.image}
                  alt={t(item.labelKey)}
                  fill
                  priority
                  unoptimized
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03] lg:p-10"
                />
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-graphit/10 p-5 font-sans lg:px-6">
                <div>
                  <h2 className="text-xl font-black tracking-tight text-graphit lg:text-2xl">
                    {t(item.labelKey)}
                  </h2>
                  <p className="mt-0.5 text-sm text-graphit/60">
                    <LocalizedPrice value={item.price} />
                  </p>
                </div>
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-graphit/20 text-graphit transition-colors duration-200 group-hover:border-graphit group-hover:bg-graphit group-hover:text-kreide"
                >
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
