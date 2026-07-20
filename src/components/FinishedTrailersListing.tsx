"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ChevronDown, SlidersHorizontal } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
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

type SortKey = "availability" | "priceAsc" | "priceDesc";

/* ---------- Filter-Logik ---------- */

/** "1.490" / "21.900" → 1490 / 21900 (erste Zahl im Text). */
function firstEuroNumber(text: string): number | null {
  const match = text.match(/\d{1,3}(?:\.\d{3})*(?:,\d+)?/);
  if (!match) return null;
  return parseFloat(match[0].replaceAll(".", "").replace(",", "."));
}

/** "1,5 T" → 1500, "500 KG" / "bis 750 KG" → 750; nicht-numerisch → null. */
function weightKg(text: string): number | null {
  const match = text.replace(",", ".").match(/([\d.]+)\s*(T|KG)/i);
  if (!match) return null;
  const value = parseFloat(match[1]);
  return match[2].toUpperCase() === "T" ? value * 1000 : value;
}

/** "5 M" / "bis 2 M" → 5 / 2; Flächenangaben ("3 x 3 M") → null. */
function singleMeters(text: string): number | null {
  if (text.toLowerCase().includes("x")) return null;
  const match = text.replace(",", ".").match(/[\d.]+/);
  return match ? parseFloat(match[0]) : null;
}

function optionMatchesProduct(groupTitle: string, option: string, product: FinishedTrailerProduct): boolean {
  if (groupTitle.startsWith("Verfügbarkeit")) {
    return product.status === option;
  }

  if (groupTitle.startsWith("Modell")) {
    if (option === "Verkaufs-Pavillon") return product.productType === "pavillon";
    return product.productType === "anhaenger" && product.name === option;
  }

  if (groupTitle.startsWith("Länge")) {
    if (product.length === option) return true;
    const productMeters = singleMeters(product.length);
    const optionMeters = singleMeters(option);
    if (productMeters === null || optionMeters === null) return false;
    if (option.startsWith("bis")) return productMeters <= optionMeters;
    return productMeters === optionMeters;
  }

  if (groupTitle.startsWith("Gewicht")) {
    if (product.weight === option) return true;
    const productKg = weightKg(product.weight);
    const optionKg = weightKg(option);
    if (productKg === null || optionKg === null) return false;
    if (option.startsWith("bis")) return productKg <= optionKg;
    return productKg === optionKg;
  }

  if (groupTitle.toLowerCase().includes("preis")) {
    const productPrice = firstEuroNumber(product.price);
    if (productPrice === null) return false;
    const bounds = option.match(/\d{1,3}(?:\.\d{3})*/g)?.map((n) => parseFloat(n.replaceAll(".", ""))) ?? [];
    if (bounds.length === 0) return false;
    if (option.startsWith("bis")) return productPrice <= bounds[0];
    if (option.startsWith("ab")) return productPrice >= bounds[0];
    if (bounds.length >= 2) return productPrice >= bounds[0] && productPrice <= bounds[1];
    return productPrice === bounds[0];
  }

  return false;
}

const STATUS_RANK: Record<string, number> = {
  "Sofort verfügbar": 0,
  Mietbereit: 0,
  "In Fertigung": 1,
  Reservierbar: 2,
  "Auf Anfrage": 3,
};

/* ---------- Teil-Komponenten ---------- */

function FilterPanel({
  filterGroups,
  products,
  selectedProductTypes,
  toggleProductType,
  selectedFacets,
  toggleFacet,
  matchesAllExceptGroup,
}: {
  filterGroups: FilterGroup[];
  products: FinishedTrailerProduct[];
  selectedProductTypes: ProductType[];
  toggleProductType: (type: ProductType) => void;
  selectedFacets: Record<string, string[]>;
  toggleFacet: (group: string, option: string) => void;
  matchesAllExceptGroup: (product: FinishedTrailerProduct, excludedGroup: string | null) => boolean;
}) {
  const { region, rates, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);

  return (
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
          <h3 className="font-sans text-base font-black tracking-tight text-graphit">{tc(group.title)}</h3>
          <div className="mt-4 flex flex-col gap-2.5">
            {group.options.map((option) => {
              const checked = selectedFacets[group.title]?.includes(option) ?? false;
              const count = products.filter(
                (product) =>
                  selectedProductTypes.includes(product.productType) &&
                  matchesAllExceptGroup(product, group.title) &&
                  optionMatchesProduct(group.title, option, product)
              ).length;
              const disabled = count === 0 && !checked;

              return (
                <label
                  key={option}
                  className={`flex items-center gap-3 font-sans text-sm ${
                    disabled ? "cursor-not-allowed text-graphit/35" : "cursor-pointer text-graphit/68 hover:text-graphit"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggleFacet(group.title, option)}
                    className="h-4 w-4 accent-graphit disabled:opacity-40"
                  />
                  <span className="flex-1">{formatPriceForRegion(tc(option), region, rates)}</span>
                  <span className="font-sans text-xs tabular-nums text-graphit/40">{count}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: FinishedTrailerProduct }) {
  const { region, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden border border-graphit/10 bg-kreide/35 transition-colors hover:border-graphit/25">
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

      <div className="flex flex-1 flex-col px-4 pt-4 pb-4">
        <h2 className="font-sans text-[0.95rem] font-black tracking-tight">
          {product.productType === "pavillon" ? t("salesPavilion") : product.name}
        </h2>
        <p className="mt-1.5 min-h-10 font-sans text-[0.82rem] leading-5 text-graphit/68">
          {tc(product.description)}
        </p>

        <p className="mt-5 font-sans text-[1.85rem] leading-none font-black tracking-tight">
          <LocalizedPrice value={product.price} />
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-graphit/10 pt-4">
          <p className="pt-0.5 font-sans text-[0.8rem] text-graphit/60">
            {product.length} · {tc(product.weight)}
          </p>
          <Link
            href={product.href}
            className="inline-flex items-center gap-1.5 font-sans text-[0.82rem] font-semibold text-graphit transition-opacity hover:opacity-70"
          >
            {t("request")}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ---------- Hauptkomponente ---------- */

export function FinishedTrailersListing({
  heading,
  intro,
  filterGroups,
  products,
  initialProductTypes,
  countNoun,
}: FinishedTrailersListingProps) {
  const { region, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);
  const [selectedProductTypes, setSelectedProductTypes] = useState<ProductType[]>(initialProductTypes);
  const [selectedFacets, setSelectedFacets] = useState<Record<string, string[]>>({});
  const [sortKey, setSortKey] = useState<SortKey>("availability");

  function toggleProductType(type: ProductType) {
    setSelectedProductTypes((current) =>
      current.includes(type) ? current.filter((item) => item !== type) : [...current, type]
    );
  }

  function toggleFacet(group: string, option: string) {
    setSelectedFacets((current) => {
      const active = current[group] ?? [];
      const next = active.includes(option) ? active.filter((item) => item !== option) : [...active, option];
      return { ...current, [group]: next };
    });
  }

  const activeFacetCount = Object.values(selectedFacets).reduce((sum, options) => sum + options.length, 0);

  function resetFilters() {
    setSelectedFacets({});
    setSelectedProductTypes(["anhaenger", "pavillon"]);
  }

  /** Facetten-Logik: innerhalb einer Gruppe ODER, zwischen Gruppen UND. */
  function matchesAllExceptGroup(product: FinishedTrailerProduct, excludedGroup: string | null): boolean {
    return filterGroups.every((group) => {
      if (group.title === excludedGroup) return true;
      const active = selectedFacets[group.title] ?? [];
      if (active.length === 0) return true;
      return active.some((option) => optionMatchesProduct(group.title, option, product));
    });
  }

  const visibleProducts = useMemo(() => {
    const filtered = products.filter(
      (product) => selectedProductTypes.includes(product.productType) && matchesAllExceptGroup(product, null)
    );

    return [...filtered].sort((a, b) => {
      if (sortKey === "availability") {
        return (STATUS_RANK[a.status] ?? 4) - (STATUS_RANK[b.status] ?? 4);
      }
      const priceA = firstEuroNumber(a.price) ?? 0;
      const priceB = firstEuroNumber(b.price) ?? 0;
      return sortKey === "priceAsc" ? priceA - priceB : priceB - priceA;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, selectedProductTypes, selectedFacets, sortKey, filterGroups]);

  const configureHref = useMemo(() => {
    if (selectedProductTypes.length !== 1) return "/konfigurator";
    return selectedProductTypes[0] === "anhaenger" ? "/konfigurator?typ=anhaenger" : "/konfigurator?typ=pavillon";
  }, [selectedProductTypes]);

  const countLabel = t("found", {
    count: visibleProducts.length,
    noun: countNoun === "Produkte" ? t("products") : countNoun,
  });

  const filterPanel = (
    <FilterPanel
      filterGroups={filterGroups}
      products={products}
      selectedProductTypes={selectedProductTypes}
      toggleProductType={toggleProductType}
      selectedFacets={selectedFacets}
      toggleFacet={toggleFacet}
      matchesAllExceptGroup={matchesAllExceptGroup}
    />
  );

  const resetButton = (
    <button
      type="button"
      onClick={(event) => {
        // Im <summary> darf der Klick die Filter-Klappe nicht mit umschalten.
        event.preventDefault();
        event.stopPropagation();
        resetFilters();
      }}
      className="font-sans text-xs font-semibold text-graphit/55 underline underline-offset-2 transition-colors hover:text-graphit"
    >
      {tc("Zurücksetzen")}
    </button>
  );

  return (
    <main className="min-h-screen bg-beton pt-20 text-graphit lg:pt-[4.25rem]">
      <section className="mx-auto w-full max-w-7xl px-6 pt-10 pb-8 lg:px-10 lg:pt-14">
        <div className="flex max-w-2xl flex-col gap-3">
          <h1 className="text-3xl leading-tight tracking-normal lg:text-4xl">
            <span className="font-serif font-medium">{t("choosePrefix")}</span>{" "}
            <span className="font-sans font-black tracking-tight">{tc(heading)}</span>
          </h1>
          <p className="max-w-xl font-sans text-sm leading-6 text-graphit/60 lg:text-base lg:leading-7">
            {tc(intro)}
          </p>
        </div>
      </section>

      <section className="w-full pb-20 lg:pb-28">
        <div className="grid gap-6 lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:items-start lg:gap-8">
          {/* Mobile: Filter als Klappe */}
          <div className="px-6 lg:hidden">
            <details className="rounded-sm border border-graphit/15 bg-kreide/40 px-4 pb-1">
              <summary className="flex cursor-pointer list-none items-center gap-2 py-3.5 font-sans text-sm font-bold text-graphit">
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                {t("filter")}
                {activeFacetCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-graphit px-1.5 font-sans text-[0.65rem] font-bold text-kreide">
                    {activeFacetCount}
                  </span>
                )}
                <span className="ml-auto">{activeFacetCount > 0 && resetButton}</span>
              </summary>
              {filterPanel}
            </details>
          </div>

          {/* Desktop: Filter-Sidebar */}
          <aside className="hidden lg:sticky lg:top-24 lg:block">
            <div className="border-y border-r border-graphit/10 bg-kreide/30 px-5 py-5">
              <div className="flex items-center justify-between border-b border-graphit/10 pb-5">
                <div className="flex items-center gap-2 font-sans text-sm font-black tracking-tight">
                  <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                  {t("filter")}
                  {activeFacetCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-graphit px-1.5 font-sans text-[0.65rem] font-bold text-kreide">
                      {activeFacetCount}
                    </span>
                  )}
                </div>
                {activeFacetCount > 0 && resetButton}
              </div>
              {filterPanel}
            </div>
          </aside>

          <section aria-label="Produktübersicht" className="min-w-0 px-6 lg:pr-10 lg:pl-0">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-graphit/10 py-3">
              <p className="font-sans text-sm text-graphit/55">{countLabel}</p>
              <label className="relative inline-flex items-center gap-2 font-sans text-sm text-graphit/70">
                <span className="hidden sm:inline">{t("sort")}:</span>
                <span className="relative">
                  <select
                    value={sortKey}
                    onChange={(event) => setSortKey(event.target.value as SortKey)}
                    className="h-10 cursor-pointer appearance-none rounded-sm border border-graphit/15 bg-transparent pr-9 pl-4 font-sans text-sm text-graphit transition-colors hover:border-graphit/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="availability">{t("availability")}</option>
                    <option value="priceAsc">{tc("Preis aufsteigend")}</option>
                    <option value="priceDesc">{tc("Preis absteigend")}</option>
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-graphit/50"
                    aria-hidden="true"
                  />
                </span>
              </label>
            </div>

            {visibleProducts.length === 0 && (
              <div className="mb-8 flex flex-col items-start gap-4 rounded-sm border border-dashed border-graphit/25 p-6">
                <p className="font-sans text-sm text-graphit/65">
                  {tc("Keine Produkte für diese Auswahl. Passe die Filter an oder plane dein Modell individuell im Konfigurator.")}
                </p>
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  {tc("Filter zurücksetzen")}
                </Button>
              </div>
            )}

            <div className="grid grid-cols-[repeat(auto-fill,minmax(23rem,28rem))] gap-x-5 gap-y-8">
              {visibleProducts.map((product, index) => (
                <Reveal key={product.id} delayMs={Math.min(index, 3) * 70} className="min-w-0">
                  <ProductCard product={product} />
                </Reveal>
              ))}

              <Reveal delayMs={Math.min(visibleProducts.length, 4) * 70} className="min-w-0">
                <Link
                  href={configureHref}
                  className="flex h-full min-h-[27rem] min-w-0 flex-col justify-between border border-graphit/10 bg-kreide/35 p-6 transition-colors hover:border-graphit/30"
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
              </Reveal>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
