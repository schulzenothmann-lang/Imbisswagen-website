"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
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

export function ProductTypeLanding({ eyebrow, intro, items }: ProductTypeLandingProps) {
  const { t } = useLocaleSettings();
  const isRent = eyebrow === "Mieten";
  const localizedEyebrow = isRent ? t("navRent") : t("navAvailable");
  const localizedTitle = isRent ? t("rentQuestionTitle") : t("buyQuestionTitle");
  const localizedIntro = isRent ? t("rentLandingIntro") : t("buyLandingIntro");

  return (
    <main className="flex min-h-svh flex-col bg-beton pt-20 text-graphit lg:h-svh lg:pt-[4.25rem]">
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pt-8 pb-6 lg:min-h-0 lg:px-10 lg:pt-10 lg:pb-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <Eyebrow>{localizedEyebrow}</Eyebrow>
          <h1 className="font-serif text-3xl font-medium leading-tight tracking-normal lg:text-4xl">
            {localizedTitle}
          </h1>
          <p className="sr-only">{intro || localizedIntro}</p>
        </div>

        <div className="mt-6 grid flex-1 gap-4 sm:grid-cols-2 lg:mt-8 lg:min-h-0 lg:gap-5">
          {items.map((item, index) => (
            <Reveal key={item.href} delayMs={index * 90} className="flex min-h-0 flex-col">
            <Link
              href={item.href}
              className="group flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm border border-graphit/10 bg-kreide/45 transition-colors hover:border-graphit/35"
            >
              <div className="relative min-h-0 flex-1 basis-52 bg-beton sm:basis-64">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
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
                    {item.title === "Imbissanhänger" ? t("snackTrailerNoHyphen") : t("pavilion")}
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
      </section>
    </main>
  );
}
