"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Filter, SlidersHorizontal, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import { translateCopy } from "@/lib/localized-content";
import { formatPriceForRegion } from "@/lib/locale";
import { LocalizedPrice } from "./LocalizedPrice";
import { useLocaleSettings } from "./LocaleProvider";

type FilterGroup = {
  title: string;
  options: string[];
};

type ProductType = "anhaenger" | "pavillon";

export type FinishedTrailerProduct = {
  id: string;
  productType: ProductType;
  productLabel: string;
  name: string;
  status: string;
  price: string;
  length: string;
  weight: string;
  image: string;
  imageAlt: string;
  href: string;
  description: string;
};

type FinishedTrailersListingProps = {
  heading: string;
  intro: string;
  sortLabel: string;
  filterGroups: FilterGroup[];
  products: FinishedTrailerProduct[];
  initialProductTypes: ProductType[];
  countNoun: string;
};

export function FinishedTrailersListing({
  heading,
  intro,
  sortLabel,
  filterGroups,
  products,
  initialProductTypes,
  countNoun,
}: FinishedTrailersListingProps) {
  const { region, rates, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);
  const [selectedProductTypes, setSelectedProductTypes] = useState<ProductType[]>(initialProductTypes);

  const visibleProducts = useMemo(() => {
    if (selectedProductTypes.length === 0) return [];
    return products.filter((product) => selectedProductTypes.includes(product.productType));
  }, [products, selectedProductTypes]);

  const configureHref = useMemo(() => {
    if (selectedProductTypes.length !== 1) return "/konfigurator";
    return selectedProductTypes[0] === "anhaenger" ? "/konfigurator?typ=anhaenger" : "/konfigurator?typ=pavillon";
  }, [selectedProductTypes]);

  function toggleProductType(type: ProductType) {
    setSelectedProductTypes((current) =>
      current.includes(type) ? current.filter((item) => item !== type) : [...current, type]
    );
  }

  const countLabel = t("found", {
    count: visibleProducts.length,
    noun: countNoun === "Produkte" ? t("products") : countNoun,
  });

  return (
    <main className="min-h-screen bg-beton pt-20 text-graphit lg:pt-[4.25rem]">
      <section className="mx-auto w-full max-w-7xl px-6 pt-16 pb-8 lg:px-10 lg:pt-24">
        <div className="flex max-w-2xl flex-col gap-5">
          <h1 className="text-4xl leading-[0.95] tracking-normal lg:text-6xl">
            <span className="font-serif font-medium">{t("choosePrefix")}</span>
            <br />
            <span className="font-sans font-black tracking-tight">{tc(heading)}</span>
          </h1>
          <p className="font-sans text-lg leading-8 text-graphit/70">{tc(intro)}</p>
        </div>
      </section>

      <section className="w-full pb-20 lg:pb-28">
        <div className="grid gap-8 lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:items-start">
          <aside className="lg:sticky lg:top-24">
            <div className="border-y border-r border-graphit/10 bg-kreide/30 px-5 py-5">
              <div className="flex items-center justify-between border-b border-graphit/10 pb-5">
                <div className="flex items-center gap-2 font-sans text-sm font-black tracking-tight">
                  <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                  {t("filter")}
                </div>
                <Filter className="h-4 w-4 text-graphit/45" aria-hidden="true" />
              </div>

              <div className="divide-y divide-graphit/10">
                <div className="pt-5 pb-5">
                  <h3 className="font-sans text-base font-black tracking-tight text-graphit">{t("product")}</h3>
                  <div className="mt-4 flex flex-col gap-2.5">
                    {[
                      { id: "anhaenger" as const, label: t("snackTrailer") },
                      { id: "pavillon" as const, label: t("pavilion") },
                    ].map((option) => (
                      <label
                        key={option.id}
                        className="flex cursor-pointer items-center gap-3 font-sans text-sm text-graphit/68"
                      >
                        <input
                          type="checkbox"
                          checked={selectedProductTypes.includes(option.id)}
                          onChange={() => toggleProductType(option.id)}
                          className="h-4 w-4 accent-graphit"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>

                {filterGroups.map((group) => (
                  <div key={group.title} className="pt-5 pb-5">
                    <h3 className="font-sans text-base font-black tracking-tight text-graphit">
                      {tc(group.title)}
                    </h3>
                    <div className="mt-4 flex flex-col gap-2.5">
                      {group.options.map((option) => (
                        <label
                          key={option}
                          className="flex cursor-pointer items-center gap-3 font-sans text-sm text-graphit/68"
                        >
                          <input
                            type="checkbox"
                            defaultChecked={products.some((product) => option === product.status || option === product.name)}
                            className="h-4 w-4 accent-graphit"
                          />
                          {formatPriceForRegion(tc(option), region, rates)}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section aria-label="Produktübersicht" className="min-w-0 px-6 lg:pr-10 lg:pl-0">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-graphit/10 py-4">
              <p className="font-sans text-sm text-graphit/55">{countLabel}</p>
              <button
                type="button"
                className="hidden h-10 items-center gap-2 rounded-sm border border-graphit/15 px-4 font-sans text-sm text-graphit/70 lg:inline-flex"
              >
                {t("sort")}: {sortLabel === "Verfügbarkeit" ? t("availability") : tc(sortLabel)}
              </button>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(23rem,28rem))] gap-x-5 gap-y-8">
              {visibleProducts.map((product) => (
                <article key={product.id} className="group min-w-0 overflow-hidden border border-graphit/10 bg-kreide/35">
                  <Link
                    href={product.href}
                    aria-label={`${product.name} ${t("request")}`}
                    className="relative flex aspect-[3/2] items-center justify-center overflow-hidden bg-beton p-5"
                  >
                    <span className="absolute top-3 left-3 bg-beton px-2.5 py-1 font-sans text-[0.68rem] font-black tracking-tight text-graphit">
                      {tc(product.status)}
                    </span>
                    <span className="absolute top-3 right-3 bg-kreide px-2.5 py-1 font-sans text-[0.68rem] font-black tracking-tight text-graphit/70">
                      {product.productType === "pavillon" ? t("pavilion") : t("snackTrailer")}
                    </span>
                    <div className="w-[118%]" style={{ transform: "translateX(-7%)" }}>
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]"
                      />
                    </div>
                  </Link>

                  <div className="px-4 pt-4 pb-4">
                    <h2 className="font-sans text-[0.95rem] font-black tracking-tight">
                      {product.productType === "pavillon" ? t("salesPavilion") : product.name}
                    </h2>
                    <p className="mt-1.5 min-h-10 font-sans text-[0.82rem] leading-5 text-graphit/68">
                      {tc(product.description)}
                    </p>

                    <p className="mt-5 font-sans text-[1.85rem] leading-none font-black tracking-tight">
                      <LocalizedPrice value={product.price} />
                    </p>

                    <div className="mt-5 flex items-center gap-1.5">
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star key={star} className="h-3.5 w-3.5 fill-graphit text-graphit" aria-hidden="true" />
                      ))}
                      <Link href={product.href} className="ml-2 font-sans text-[0.82rem] text-graphit underline underline-offset-2">
                        {t("request")}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}

              <Link
                href={configureHref}
                className="flex min-h-[27rem] min-w-0 flex-col justify-between border border-graphit/10 bg-kreide/35 p-6 transition-colors hover:border-graphit/30"
              >
                <div>
                  <Eyebrow>{t("planIndividually")}</Eyebrow>
                  <h2 className="mt-4 font-sans text-3xl leading-none font-black tracking-tight text-graphit">
                    {t("ctaConfigure")}
                  </h2>
                  <p className="mt-4 font-sans text-sm leading-6 text-graphit/65">
                    {selectedProductTypes.length === 1
                      ? t("directConfigurator")
                      : t("chooseConfigurator")}
                  </p>
                </div>
                <span className={cn(buttonVariants(), "mt-8")}>
                  {t("ctaOpenConfigurator")}
                </span>
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
