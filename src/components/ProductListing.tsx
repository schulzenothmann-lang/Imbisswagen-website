"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, CircleCheckBig, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { translateCopy } from "@/lib/localized-content";
import { formatPriceForRegion } from "@/lib/locale";
import { LocalizedPrice } from "./LocalizedPrice";
import { useLocaleSettings } from "./LocaleProvider";

type FacetOption = { id: string; label: string; available: boolean };

const modelFacets: FacetOption[] = [
  { id: "basis", label: "Basis", available: true },
  { id: "standard", label: "Standard", available: false },
  { id: "premium", label: "Premium", available: false },
  { id: "xl", label: "X-ray", available: false },
];

const availabilityFacets: FacetOption[] = [
  { id: "sofort", label: "Sofort verfügbar", available: true },
  { id: "anfrage", label: "Auf Anfrage", available: false },
];

const weightFacets: FacetOption[] = [
  { id: "bis-2t", label: "bis 2 t", available: true },
  { id: "2-3t", label: "2–3 t", available: false },
  { id: "ueber-3t", label: "über 3 t", available: false },
];

const priceFacets: FacetOption[] = [
  { id: "bis-25k", label: "bis 25.000 €", available: true },
  { id: "25-35k", label: "25.000–35.000 €", available: false },
  { id: "ueber-35k", label: "über 35.000 €", available: false },
];

// Weitere Anhänger (Standard, Premium, X-ray) folgen ab Werk, sobald sie als
// sofort verfügbare Einheit vorrätig sind — bis dahin nur Basis gelistet.
const products = [
  {
    id: "basis",
    model: "basis",
    name: "MINO Basis",
    tagline: "Der Einstieg — solide Fläche für den ersten Auftritt.",
    length: "5 M",
    weight: "1,5 T",
    weightFacet: "bis-2t",
    price: "ab 21.900 €",
    priceFacet: "bis-25k",
    availability: "sofort",
    image: "/images/modelle/basis.png",
  },
];

type FilterGroupKey = "model" | "availability" | "weight" | "price";

function useFacetFilter() {
  const [selected, setSelected] = useState<Record<FilterGroupKey, string[]>>({
    model: [],
    availability: [],
    weight: [],
    price: [],
  });

  function toggle(group: FilterGroupKey, id: string) {
    setSelected((current) => {
      const active = current[group];
      const next = active.includes(id) ? active.filter((v) => v !== id) : [...active, id];
      return { ...current, [group]: next };
    });
  }

  const filtered = products.filter((p) => {
    const matchesModel = selected.model.length === 0 || selected.model.includes(p.model);
    const matchesAvailability =
      selected.availability.length === 0 || selected.availability.includes(p.availability);
    const matchesWeight = selected.weight.length === 0 || selected.weight.includes(p.weightFacet);
    const matchesPrice = selected.price.length === 0 || selected.price.includes(p.priceFacet);
    return matchesModel && matchesAvailability && matchesWeight && matchesPrice;
  });

  return { selected, toggle, filtered };
}

function FilterOption({
  label,
  count,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  count: number;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
}) {
  const { region, rates } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);

  return (
    <label
      className={`flex items-center gap-2.5 py-1.5 font-sans text-sm ${
        disabled ? "cursor-not-allowed text-graphit/35" : "cursor-pointer text-graphit/75 hover:text-graphit"
      }`}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <span
        aria-hidden
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-xs border transition-colors ${
          checked ? "border-graphit bg-graphit" : "border-graphit/30"
        } ${disabled ? "opacity-40" : ""}`}
      >
        {checked && <Check className="h-3 w-3 text-kreide" />}
      </span>
      <span className="flex-1">{formatPriceForRegion(tc(label), region, rates)}</span>
      <span className="font-sans text-xs text-graphit/40">{count}</span>
      {disabled && (
        <span className="rounded-full bg-graphit/5 px-1.5 py-0.5 font-sans text-[10px] tracking-wide text-graphit/40 uppercase">
          {tc("bald")}
        </span>
      )}
    </label>
  );
}

function FilterPanel({
  selected,
  toggle,
}: {
  selected: Record<FilterGroupKey, string[]>;
  toggle: (group: FilterGroupKey, id: string) => void;
}) {
  const { t } = useLocaleSettings();
  const groups: { key: FilterGroupKey; heading: string; options: FacetOption[] }[] = [
    { key: "model", heading: "Modell", options: modelFacets },
    { key: "availability", heading: "Verfügbarkeit", options: availabilityFacets },
    { key: "weight", heading: "Gewicht", options: weightFacets },
    { key: "price", heading: "Preis", options: priceFacets },
  ];

  return (
    <div className="flex flex-col gap-7">
      {groups.map((group) => (
        <div key={group.key} className="flex flex-col gap-1 border-b border-graphit/10 pb-6 last:border-0 last:pb-0">
          <p className="mb-1 font-sans text-xs font-bold tracking-wide text-graphit uppercase">
            {group.heading === "Modell"
              ? t("model")
              : group.heading === "Verfügbarkeit"
                ? t("availability")
                : group.heading === "Gewicht"
                  ? t("weight")
                  : group.heading === "Preis"
                    ? t("price")
                    : group.heading}
          </p>
          {group.options.map((option) => {
            const matchCount = products.filter((p) => {
              if (group.key === "model") return p.model === option.id;
              if (group.key === "availability") return p.availability === option.id;
              if (group.key === "weight") return p.weightFacet === option.id;
              return p.priceFacet === option.id;
            }).length;

            return (
              <FilterOption
                key={option.id}
                label={option.label}
                count={matchCount}
                checked={selected[group.key].includes(option.id)}
                disabled={!option.available}
                onChange={() => toggle(group.key, option.id)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  const { region, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);

  return (
    <div className="group flex flex-col overflow-hidden rounded-sm border border-graphit/10 bg-kreide/40 transition-colors hover:border-graphit/25">
      <div className="relative flex h-56 items-end justify-center bg-beton sm:h-64 lg:h-72">
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-kreide px-3 py-1.5 font-sans text-xs font-bold text-graphit shadow-sm">
          <CircleCheckBig className="h-3.5 w-3.5 text-graphit" />
          {t("navAvailable")}
        </span>
        <img
          src={product.image}
          alt={product.name}
          className="h-[85%] w-auto max-w-[80%] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="font-sans text-xl font-black tracking-tight text-graphit">{product.name}</h3>
          <p className="mt-1 font-sans text-sm text-graphit/65">{tc(product.tagline)}</p>
        </div>

        <dl className="flex gap-6 border-y border-graphit/10 py-3 font-sans text-sm">
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs text-graphit/50">{t("length")}</dt>
            <dd className="font-bold text-graphit">{product.length}</dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs text-graphit/50">{t("weight")}</dt>
            <dd className="font-bold text-graphit">{product.weight}</dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs text-graphit/50">{t("price")}</dt>
            <dd className="font-bold text-graphit">
              <LocalizedPrice value={product.price} />
            </dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-col gap-3 pt-1 sm:flex-row">
          <Button asChild className="flex-1">
            <Link href={`/konfigurator?typ=anhaenger&modell=${product.model}&schritt=2`}>
              {t("ctaConfigure")}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link
              href={`/kontakt?anliegen=${encodeURIComponent(`Beratung zu Modell ${product.name.replace("MINO ", "")}`)}`}
            >
              {t("request")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ProductListing() {
  const { region, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);
  const { selected, toggle, filtered } = useFacetFilter();

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pt-8 pb-24 lg:flex-row lg:gap-12 lg:px-10 lg:pb-32">
      <div className="lg:hidden">
        <details className="rounded-sm border border-graphit/15 bg-kreide/40 p-4">
          <summary className="flex cursor-pointer list-none items-center gap-2 font-sans text-sm font-bold text-graphit">
            <SlidersHorizontal className="h-4 w-4" />
            {t("filter")}
          </summary>
          <div className="mt-5">
            <FilterPanel selected={selected} toggle={toggle} />
          </div>
        </details>
      </div>

      <aside className="hidden lg:block lg:w-56 lg:shrink-0 lg:pt-1">
        <p className="mb-6 font-sans text-sm font-bold text-graphit">{t("filter")}</p>
        <FilterPanel selected={selected} toggle={toggle} />
      </aside>

      <div className="flex flex-1 flex-col gap-6">
        <p className="font-sans text-sm text-graphit/60">
          {filtered.length} {tc("Anhänger verfügbar")}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="font-sans text-sm text-graphit/60">
            {tc("Für diese Filterkombination ist aktuell kein Anhänger verfügbar.")}
          </p>
        )}
      </div>
    </section>
  );
}
