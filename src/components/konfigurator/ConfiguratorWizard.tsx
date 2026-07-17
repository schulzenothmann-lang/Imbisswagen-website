"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { Check, Paintbrush } from "lucide-react";

import { CONTACT_EMAIL } from "@/lib/contact";
import { translateCopy, translateCopyList } from "@/lib/localized-content";
import { formatPriceForRegion } from "@/lib/locale";
import {
  ADDITIONAL_SERVICES,
  KITCHEN_CONCEPTS,
  KITCHEN_EQUIPMENT,
  PAVILION_DETAILS,
  PAVILION_OPENINGS,
  PAVILION_SIZES,
  PROJECT_DETAILS,
  WINDOW_VARIANTS,
} from "@/lib/konfigurator-options";
import { MODELS } from "@/lib/models";
import { LocalizedPrice } from "../LocalizedPrice";
import { useLocaleSettings } from "../LocaleProvider";

const STEPS = [
  { id: 1, label: "Modell" },
  { id: 2, label: "Fenster" },
  { id: 3, label: "Details" },
  { id: 4, label: "Konzept" },
  { id: 5, label: "Kontakt" },
  { id: 6, label: "Angebot" },
] as const;

const inputClass =
  "h-12 w-full rounded-sm border border-graphit/15 bg-kreide px-4 font-sans text-sm text-graphit placeholder:text-graphit/40 outline-none transition-colors focus:border-graphit/50";

type ProductType = "anhaenger" | "pavillon";

type ContactState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
};

const PAVILION_PRODUCT = {
  id: "pavillon",
  name: "Verkaufs-Pavillon",
  length: "3 x 3 M",
  weight: "modular",
  price: "ab 7.900 €",
  image: "/images/produkte/verkaufs-pavillon.png",
};

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function OptionChip({
  selected,
  onClick,
  icon,
  label,
  description,
  disabled,
}: {
  selected: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
  description?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-start gap-2 rounded-sm border p-4 text-left transition-colors ${
        selected ? "border-graphit bg-graphit/5" : "border-graphit/15 hover:border-graphit/35"
      } ${disabled ? "cursor-default" : ""}`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full ${
          selected ? "bg-graphit text-kreide" : "bg-graphit/5 text-graphit/70"
      }`}
      >
        {icon}
      </span>
      <span className="font-sans text-sm font-bold text-graphit">{label}</span>
      {description && <span className="font-sans text-xs text-graphit/55">{description}</span>}
    </button>
  );
}

export function ConfiguratorWizard({
  initialType,
  initialModelId,
  initialStep,
}: {
  initialType: ProductType;
  initialModelId?: string;
  initialStep?: number;
}) {
  const { region, rates, t } = useLocaleSettings();
  const language = region.languageCode;
  const tc = (text: string) => translateCopy(text, language);
  const tcn = (text?: string) => (text ? translateCopy(text, language) : undefined);
  const productType = initialType;
  const validInitialModelId: string | null =
    initialModelId && MODELS.some((m) => m.id === initialModelId) ? initialModelId : null;
  const initialCanSkipModel = productType === "anhaenger" && validInitialModelId !== null;
  const sanitizedInitialStep =
    initialStep && initialStep > 1 && initialCanSkipModel ? Math.min(initialStep, STEPS.length) : 1;

  const [step, setStep] = useState(sanitizedInitialStep);
  const [modelId, setModelId] = useState<string | null>(productType === "anhaenger" ? validInitialModelId : null);
  const [pavilionSizeId, setPavilionSizeId] = useState<string | null>(null);
  const [windowVariant, setWindowVariant] = useState<string | null>(null);
  const [details, setDetails] = useState<Record<string, string>>({});
  const [kitchenConcept, setKitchenConcept] = useState<string | null>(null);
  const [kitchenEquipment, setKitchenEquipment] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [brandingFile, setBrandingFile] = useState<File | null>(null);
  const [contact, setContact] = useState<ContactState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [sent, setSent] = useState(false);

  const selectedModel = MODELS.find((m) => m.id === modelId);
  const selectedPavilionSize = PAVILION_SIZES.find((option) => option.id === pavilionSizeId);
  const stepLabels =
    productType === "pavillon"
      ? [
          { id: 1, label: t("pavilion") },
          { id: 2, label: t("openings") },
          { id: 3, label: t("details") },
          { id: 4, label: t("concept") },
          { id: 5, label: t("navContact") },
          { id: 6, label: t("offer") },
        ]
      : [
          { id: 1, label: t("model") },
          { id: 2, label: t("windows") },
          { id: 3, label: t("details") },
          { id: 4, label: t("concept") },
          { id: 5, label: t("navContact") },
          { id: 6, label: t("offer") },
        ];
  const openingOptions = productType === "pavillon" ? PAVILION_OPENINGS : WINDOW_VARIANTS;
  const openingLabel = productType === "pavillon" ? t("openings") : t("windowVariant");
  const openingHeading = productType === "pavillon" ? t("openings") : t("windowVariants");
  const openingHint = productType === "pavillon" ? t("openingHint") : t("windowHint");
  const displayProduct =
    productType === "pavillon"
      ? {
          ...PAVILION_PRODUCT,
          name: t("salesPavilion"),
          length: selectedPavilionSize?.label ?? PAVILION_PRODUCT.length,
          price: selectedPavilionSize?.price ?? PAVILION_PRODUCT.price,
        }
      : {
          id: selectedModel?.id ?? MODELS[0].id,
          name: selectedModel?.name ?? MODELS[0].name,
          length: selectedModel?.length ?? MODELS[0].length,
          weight: selectedModel?.weight ?? MODELS[0].weight,
          price: selectedModel?.price ?? MODELS[0].price,
          image: `/images/modelle/${selectedModel?.imageId ?? MODELS[0].imageId}.png`,
        };
  const selectedKitchenConcept = KITCHEN_CONCEPTS.find((option) => option.id === kitchenConcept);
  const includedKitchenEquipmentIds = selectedKitchenConcept?.includedEquipmentIds ?? [];
  const detailCategories = productType === "pavillon" ? PAVILION_DETAILS : PROJECT_DETAILS;

  const canProceed = useMemo(() => {
    if (step === 1) return productType === "pavillon" ? pavilionSizeId !== null : modelId !== null;
    if (step === 2) return windowVariant !== null;
    if (step === 4) return kitchenConcept !== null;
    if (step === 5) {
      return contact.firstName.trim() !== "" && contact.lastName.trim() !== "" && contact.email.trim() !== "";
    }
    return true;
  }, [step, productType, pavilionSizeId, modelId, windowVariant, kitchenConcept, contact]);

  const summaryIcons = (() => {
    const icons: { key: string; label: string; icon: ReactNode }[] = [];

    const wv = openingOptions.find((w) => w.id === windowVariant);
    if (wv) icons.push({ key: `window-${wv.id}`, label: `${openingLabel}: ${tc(wv.label)}`, icon: wv.icon });

    if (selectedPavilionSize) {
      icons.push({ key: `size-${selectedPavilionSize.id}`, label: `${t("size")}: ${selectedPavilionSize.label}`, icon: selectedPavilionSize.icon });
    }

    for (const category of detailCategories) {
      const option = category.options.find((o) => o.id === details[category.id]);
      if (option && !option.neutral) {
        icons.push({ key: `${category.id}-${option.id}`, label: `${tc(category.label)}: ${tc(option.label)}`, icon: option.icon });
      }
    }

    const concept = KITCHEN_CONCEPTS.find((option) => option.id === kitchenConcept);
    if (concept) {
      icons.push({ key: `kitchen-${concept.id}`, label: `${t("kitchenConcept")}: ${tc(concept.label)}`, icon: concept.icon });
    }

    for (const equipmentId of kitchenEquipment) {
      const option = KITCHEN_EQUIPMENT.options.find((o) => o.id === equipmentId);
      if (option) icons.push({ key: `equipment-${option.id}`, label: tc(option.label), icon: option.icon });
    }

    for (const serviceId of services) {
      const option = ADDITIONAL_SERVICES.options.find((o) => o.id === serviceId);
      if (option) icons.push({ key: `service-${option.id}`, label: tc(option.label), icon: option.icon });
    }

    if (brandingFile) {
      icons.push({ key: "branding-file", label: `Upload: ${brandingFile.name}`, icon: <Paintbrush className="h-5 w-5" /> });
    }

    return icons;
  })();

  function selectDetail(categoryId: string, optionId: string) {
    setDetails((prev) => ({ ...prev, [categoryId]: optionId }));
  }

  function toggleService(optionId: string) {
    setServices((prev) => (prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]));
  }

  function toggleKitchenEquipment(optionId: string) {
    if (includedKitchenEquipmentIds.includes(optionId)) return;
    setKitchenEquipment((prev) => (prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]));
  }

  function selectKitchenConcept(optionId: string) {
    const concept = KITCHEN_CONCEPTS.find((option) => option.id === optionId);
    setKitchenConcept(optionId);
    setKitchenEquipment(concept?.includedEquipmentIds ?? []);
  }

  function goNext() {
    if (!canProceed) return;
    setStep((s) => Math.min(s + 1, STEPS.length));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!acceptedPrivacy) return;

    const detailLines = detailCategories.map((category) => {
      const option = category.options.find((o) => o.id === details[category.id]);
      return `- ${tc(category.label)}: ${option ? tc(option.label) : "-"}`;
    });

    const serviceLabels = services
      .map((id) => {
        const label = ADDITIONAL_SERVICES.options.find((o) => o.id === id)?.label;
        return label ? tc(label) : undefined;
      })
      .filter(Boolean);
    const kitchenEquipmentLabels = kitchenEquipment
      .map((id) => {
        const label = KITCHEN_EQUIPMENT.options.find((o) => o.id === id)?.label;
        return label ? tc(label) : undefined;
      })
      .filter(Boolean);

    const body = [
      `Produkttyp: ${productType === "pavillon" ? "Pavillon" : "Imbiss-Anhänger"}`,
      `Modell/Variante: ${displayProduct.name} (${displayProduct.length}, ${
        productType === "pavillon" ? displayProduct.price : `${displayProduct.weight}, ${displayProduct.price}`
      })`,
      ...(productType === "pavillon" ? [`Größe: ${selectedPavilionSize?.label ?? "-"}`] : []),
      `${openingLabel}: ${tcn(openingOptions.find((w) => w.id === windowVariant)?.label) ?? "-"}`,
      "",
      "Projektdetails:",
      ...detailLines,
      "",
      "Individualisierung:",
      brandingFile
        ? `- Datei ausgewählt: ${brandingFile.name} (${brandingFile.type || "Dateityp unbekannt"}, ${formatFileSize(brandingFile.size)})`
        : "- Keine Datei ausgewählt",
      "- Hinweis: Der Browser kann Dateien über diesen Mail-Link nicht automatisch anhängen. Bitte die Datei beim Absenden im E-Mail-Programm manuell anhängen.",
      "",
      `${t("kitchenConcept")}: ${selectedKitchenConcept ? tc(selectedKitchenConcept.label) : "-"} (${selectedKitchenConcept?.price ?? "-"})`,
      `${t("includes")} ${selectedKitchenConcept ? translateCopyList(selectedKitchenConcept.includes, language).join(", ") : "-"}`,
      "Spüle: inklusive",
      `Geräte & Ausstattung: ${kitchenEquipmentLabels.length > 0 ? kitchenEquipmentLabels.join(", ") : "-"}`,
      "",
      `Zusätzliche Dienstleistungen: ${serviceLabels.length > 0 ? serviceLabels.join(", ") : "-"}`,
      "",
      `Name: ${contact.firstName} ${contact.lastName}`,
      `E-Mail: ${contact.email}`,
      `Telefon: ${contact.phone || "-"}`,
      "",
      `Zusätzliche Informationen: ${contact.notes || "-"}`,
    ].join("\n");

    const subject = `Konfigurator-Anfrage: ${displayProduct.name}`;
    window.location.assign(`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setSent(true);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(24rem,0.9fr)_minmax(0,1fr)] lg:gap-12">
      <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:h-fit">
        <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-sm bg-kreide/40 p-5 sm:p-6">
          <img
            src={displayProduct.image}
            alt={displayProduct.name}
            className="h-full w-auto max-w-full object-contain"
          />
        </div>

        <div className="rounded-sm border border-graphit/10 bg-kreide/40 p-4 font-sans">
          <p className="text-sm font-bold text-graphit">{displayProduct.name}</p>
          <dl className="mt-2 flex gap-5 text-xs">
            <div className="flex flex-col gap-0.5">
              <dt className="text-graphit/50">{productType === "pavillon" ? t("size") : t("length")}</dt>
              <dd className="font-bold text-graphit">{displayProduct.length}</dd>
            </div>
            {productType === "anhaenger" && (
              <div className="flex flex-col gap-0.5">
                <dt className="text-graphit/50">{t("weight")}</dt>
                <dd className="font-bold text-graphit">{displayProduct.weight}</dd>
              </div>
            )}
            <div className="flex flex-col gap-0.5">
              <dt className="text-graphit/50">{t("price")}</dt>
              <dd className="font-bold text-graphit">
                <LocalizedPrice value={displayProduct.price} />
              </dd>
            </div>
          </dl>
        </div>

        {summaryIcons.length > 0 && (
          <div className="flex flex-col gap-2 rounded-sm border border-graphit/10 bg-kreide/40 p-4">
            <p className="font-sans text-xs font-bold text-graphit/60">{t("yourSelection")}</p>
            <div className="flex flex-wrap gap-2">
              {summaryIcons.map((item) => (
                <span
                  key={item.key}
                  title={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-graphit/5 text-graphit/70"
                >
                  {item.icon}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <div className="flex items-center justify-between font-sans text-xs text-graphit/50">
            <span>
              {t("step", { step, total: STEPS.length })}
            </span>
            <span>{stepLabels[step - 1].label}</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-graphit/10">
            <div
              className="h-full rounded-full bg-graphit transition-all"
              style={{ width: `${(step / STEPS.length) * 100}%` }}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {stepLabels.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => s.id < step && setStep(s.id)}
                disabled={s.id > step}
                className={`rounded-sm border px-2 py-2 text-center font-sans text-xs font-semibold transition-colors ${
                  s.id === step
                    ? "border-graphit bg-graphit text-kreide"
                    : s.id < step
                      ? "border-graphit/25 text-graphit hover:bg-graphit/5"
                      : "cursor-not-allowed border-graphit/10 text-graphit/30"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="font-sans text-xl font-bold text-graphit">
                {productType === "pavillon" ? t("salesPavilion") : t("modelAndLength")}
              </h2>
              <p className="mt-1 font-sans text-sm text-graphit/60">
                {productType === "pavillon"
                  ? t("choosePavilionSize")
                  : t("chooseBaseModel")}
              </p>
            </div>

            {productType === "pavillon" && (
              <div className="flex flex-col gap-4">
                <div className="rounded-sm border border-graphit/10 bg-kreide/40 p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-sm bg-kreide/60 p-3 sm:w-52">
                      <img
                        src={PAVILION_PRODUCT.image}
                        alt={t("salesPavilion")}
                        className="h-full w-auto max-w-full object-contain"
                      />
                    </div>
                    <div className="font-sans">
                      <p className="text-sm font-bold text-graphit">{t("salesPavilion")}</p>
                      <p className="mt-1 text-sm leading-6 text-graphit/60">
                        {t("pavilionIntro")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {PAVILION_SIZES.map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setPavilionSizeId(size.id)}
                      className={`flex flex-col gap-2.5 rounded-sm border p-4 text-left transition-colors ${
                        pavilionSizeId === size.id
                          ? "border-graphit bg-graphit/5"
                          : "border-graphit/15 hover:border-graphit/35"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full ${
                          pavilionSizeId === size.id ? "bg-graphit text-kreide" : "bg-graphit/5 text-graphit/70"
                        }`}
                      >
                        {size.icon}
                      </span>
                      <span className="font-sans text-sm font-bold text-graphit">{size.label}</span>
                      <span className="font-sans text-xs leading-5 text-graphit/55">{tcn(size.description)}</span>
                      <span className="mt-auto font-sans text-sm font-bold text-graphit">
                        <LocalizedPrice value={size.price ?? ""} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              {productType === "anhaenger" && MODELS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setModelId(m.id)}
                  className={`flex flex-col gap-2.5 rounded-sm border p-3 text-left transition-colors ${
                    modelId === m.id ? "border-graphit bg-graphit/5" : "border-graphit/15 hover:border-graphit/35"
                  }`}
                >
                  <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-sm bg-kreide/60 p-3">
                    <img
                      src={`/images/modelle/${m.imageId}.png`}
                      alt={m.name}
                      className="h-full w-auto max-w-full object-contain"
                    />
                  </div>
                  <span className="font-sans text-sm font-bold text-graphit">{m.name}</span>
                  <dl className="flex gap-4 font-sans text-xs text-graphit/60">
                    <div>
                      <dt className="inline">{t("length")}: </dt>
                      <dd className="inline font-semibold text-graphit">{m.length}</dd>
                    </div>
                    <div>
                      <dt className="inline">{t("price")}: </dt>
                      <dd className="inline font-semibold text-graphit">
                        <LocalizedPrice value={m.price} />
                      </dd>
                    </div>
                  </dl>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="font-sans text-xl font-bold text-graphit">{openingHeading}</h2>
              <p className="mt-1 font-sans text-sm text-graphit/60">{openingHint}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {openingOptions.map((v) => (
                <OptionChip
                  key={v.id}
                  selected={windowVariant === v.id}
                  onClick={() => setWindowVariant(v.id)}
                  icon={v.icon}
                  label={tc(v.label)}
                  description={tcn(v.description)}
                />
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-sans text-xl font-bold text-graphit">{t("projectDetails")}</h2>
              <p className="mt-1 font-sans text-sm text-graphit/60">
                {t("customizeProduct")}
              </p>
            </div>

            {detailCategories.map((category) => (
              <div key={category.id} className="flex flex-col gap-3">
                <p className="font-sans text-sm font-bold text-graphit">{tc(category.label)}</p>
                {category.hint && <p className="-mt-2 font-sans text-xs text-graphit/50">{tc(category.hint)}</p>}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {category.options.map((option) => (
                    <OptionChip
                      key={option.id}
                      selected={details[category.id] === option.id}
                      onClick={() => selectDetail(category.id, option.id)}
                      icon={option.icon}
                      label={tc(option.label)}
                    />
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-3">
              <div>
                <p className="font-sans text-sm font-bold text-graphit">{t("brandingTitle")}</p>
                <p className="mt-1 font-sans text-xs text-graphit/50">
                  {t("brandingHint")}
                </p>
              </div>
              <label className="flex cursor-pointer flex-col gap-3 rounded-sm border border-dashed border-graphit/25 bg-kreide/40 p-5 transition-colors hover:border-graphit/45">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="sr-only"
                  onChange={(event) => setBrandingFile(event.target.files?.[0] ?? null)}
                />
                <span className="font-sans text-sm font-bold text-graphit">
                  {brandingFile ? brandingFile.name : t("chooseFile")}
                </span>
                <span className="font-sans text-xs leading-5 text-graphit/55">
                  {brandingFile
                    ? `${brandingFile.type || "Datei"} · ${formatFileSize(brandingFile.size)}`
                    : t("fileHelp")}
                </span>
              </label>
              <p className="font-sans text-xs leading-5 text-graphit/45">
                {t("fileMailNote")}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-sans text-sm font-bold text-graphit">{tc(ADDITIONAL_SERVICES.label)}</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {ADDITIONAL_SERVICES.options.map((option) => (
                  <OptionChip
                    key={option.id}
                    selected={services.includes(option.id)}
                    onClick={() => toggleService(option.id)}
                    icon={option.icon}
                    label={tc(option.label)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-sans text-xl font-bold text-graphit">{t("kitchenConcept")}</h2>
              <p className="mt-1 font-sans text-sm text-graphit/60">
                {t("kitchenHint")}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {KITCHEN_CONCEPTS.map((concept) => (
                <button
                  key={concept.id}
                  type="button"
                  onClick={() => selectKitchenConcept(concept.id)}
                  className={`flex flex-col gap-3 rounded-sm border p-4 text-left transition-colors ${
                    kitchenConcept === concept.id
                      ? "border-graphit bg-graphit/5"
                      : "border-graphit/15 hover:border-graphit/35"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      kitchenConcept === concept.id ? "bg-graphit text-kreide" : "bg-graphit/5 text-graphit/70"
                    }`}
                  >
                    {concept.icon}
                  </span>
                  <span className="flex items-start justify-between gap-4">
                    <span className="font-sans text-sm font-bold text-graphit">{tc(concept.label)}</span>
                    <span className="shrink-0 font-sans text-sm font-bold text-graphit">
                      <LocalizedPrice value={concept.price ?? ""} />
                    </span>
                  </span>
                  <span className="font-sans text-xs leading-5 text-graphit/55">{tc(concept.description ?? "")}</span>
                  {concept.comparisonPrice && (
                    <span className="font-sans text-xs leading-5 text-graphit/50">
                      {t("packageSaving")} <LocalizedPrice value={concept.comparisonPrice} />
                    </span>
                  )}
                  <span className="font-sans text-xs leading-5 text-graphit/70">
                    {t("includes")} <span className="font-semibold text-graphit">{translateCopyList(concept.includes, language).join(", ")}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <p className="font-sans text-sm font-bold text-graphit">{tc(KITCHEN_EQUIPMENT.label)}</p>
                {KITCHEN_EQUIPMENT.hint && (
                  <p className="mt-1 font-sans text-xs text-graphit/50">{tc(KITCHEN_EQUIPMENT.hint)}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {KITCHEN_EQUIPMENT.options.map((option) => {
                  const included = includedKitchenEquipmentIds.includes(option.id);
                  return (
                    <OptionChip
                      key={option.id}
                      selected={kitchenEquipment.includes(option.id)}
                      onClick={() => toggleKitchenEquipment(option.id)}
                      icon={option.icon}
                      label={tc(option.label)}
                      description={
                        included
                          ? t("includedInPackage")
                          : option.price
                            ? `+ ${formatPriceForRegion(option.price, region, rates)}`
                            : undefined
                      }
                      disabled={included}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="font-sans text-xl font-bold text-graphit">{t("contactDetails")}</h2>
              <p className="mt-1 font-sans text-sm text-graphit/60">
                {t("contactHint")}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="font-sans text-sm font-bold text-graphit">
                  {t("firstName")}
                </label>
                <input
                  id="firstName"
                  className={inputClass}
                  value={contact.firstName}
                  onChange={(e) => setContact((c) => ({ ...c, firstName: e.target.value }))}
                  placeholder="Max"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="font-sans text-sm font-bold text-graphit">
                  {t("lastName")}
                </label>
                <input
                  id="lastName"
                  className={inputClass}
                  value={contact.lastName}
                  onChange={(e) => setContact((c) => ({ ...c, lastName: e.target.value }))}
                  placeholder="Mustermann"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-sans text-sm font-bold text-graphit">
                  {t("email")}
                </label>
                <input
                  id="email"
                  type="email"
                  className={inputClass}
                  value={contact.email}
                  onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                  placeholder="max@beispiel.de"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="font-sans text-sm font-bold text-graphit">
                  {t("phone")}
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={inputClass}
                  value={contact.phone}
                  onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                  placeholder="0151 234 567 89"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="notes" className="font-sans text-sm font-bold text-graphit">
                {t("extraInfo")}
              </label>
              <textarea
                id="notes"
                rows={4}
                className={`${inputClass} h-auto resize-none py-3`}
                value={contact.notes}
                onChange={(e) => setContact((c) => ({ ...c, notes: e.target.value }))}
                placeholder={t("extraInfoPlaceholder")}
              />
            </div>
          </div>
        )}

        {step === 6 && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <h2 className="font-sans text-xl font-bold text-graphit">{t("yourConfiguration")}</h2>
              <p className="mt-1 font-sans text-sm text-graphit/60">
                {t("checkSelection")}
              </p>
            </div>

            <div className="rounded-sm border border-graphit/10 bg-kreide/40 p-5 font-sans text-sm">
              <dl className="flex flex-col gap-3">
                <div className="flex justify-between border-b border-graphit/10 pb-3">
                  <dt className="text-graphit/60">{t("product")}</dt>
                  <dd className="font-bold text-graphit">
                    {productType === "pavillon" ? t("pavilion") : t("snackTrailer")}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-graphit/10 pb-3">
                  <dt className="text-graphit/60">{t("modelVariant")}</dt>
                  <dd className="font-bold text-graphit">{displayProduct.name}</dd>
                </div>
                {productType === "pavillon" && (
                  <div className="flex justify-between border-b border-graphit/10 pb-3">
                    <dt className="text-graphit/60">{t("size")}</dt>
                    <dd className="font-bold text-graphit">{selectedPavilionSize?.label ?? "-"}</dd>
                  </div>
                )}
                <div className="flex justify-between border-b border-graphit/10 pb-3">
                  <dt className="text-graphit/60">{openingLabel}</dt>
                  <dd className="font-bold text-graphit">
                    {tcn(openingOptions.find((w) => w.id === windowVariant)?.label) ?? "-"}
                  </dd>
                </div>
                {detailCategories.map((category) => {
                  const option = category.options.find((o) => o.id === details[category.id]);
                  return (
                    <div key={category.id} className="flex justify-between border-b border-graphit/10 pb-3">
                      <dt className="text-graphit/60">{tc(category.label)}</dt>
                      <dd className="font-bold text-graphit">{option ? tc(option.label) : "-"}</dd>
                    </div>
                  );
                })}
                <div className="flex justify-between border-b border-graphit/10 pb-3">
                  <dt className="text-graphit/60">{t("logoDesign")}</dt>
                  <dd className="max-w-[65%] text-right font-bold text-graphit">
                    {brandingFile ? brandingFile.name : "-"}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-graphit/10 pb-3">
                  <dt className="text-graphit/60">{t("kitchenConcept")}</dt>
                  <dd className="font-bold text-graphit">
                    {selectedKitchenConcept ? tc(selectedKitchenConcept.label) : "-"}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-graphit/10 pb-3">
                  <dt className="text-graphit/60">{t("packagePrice")}</dt>
                  <dd className="text-right font-bold text-graphit">
                    {selectedKitchenConcept?.price ? <LocalizedPrice value={selectedKitchenConcept.price} /> : "-"}
                    {selectedKitchenConcept?.comparisonPrice && (
                      <span className="ml-2 font-normal text-graphit/50">
                        (<LocalizedPrice value={selectedKitchenConcept.comparisonPrice} />)
                      </span>
                    )}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-graphit/10 pb-3">
                  <dt className="text-graphit/60">{t("sink")}</dt>
                  <dd className="font-bold text-graphit">
                    {t("included")}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-graphit/10 pb-3">
                  <dt className="text-graphit/60">{t("equipment")}</dt>
                  <dd className="max-w-[65%] text-right font-bold text-graphit">
                    {kitchenEquipment.length > 0
                      ? kitchenEquipment
                          .map((id) => {
                            const label = KITCHEN_EQUIPMENT.options.find((o) => o.id === id)?.label;
                            return label ? tc(label) : undefined;
                          })
                          .filter(Boolean)
                          .join(", ")
                      : "-"}
                  </dd>
                </div>
                <div className="flex justify-between pb-1">
                  <dt className="text-graphit/60">{t("services")}</dt>
                  <dd className="text-right font-bold text-graphit">
                    {services.length > 0
                      ? services
                          .map((id) => {
                            const label = ADDITIONAL_SERVICES.options.find((o) => o.id === id)?.label;
                            return label ? tc(label) : undefined;
                          })
                          .join(", ")
                      : "-"}
                  </dd>
                </div>
              </dl>

              <div className="mt-4 border-t border-graphit/10 pt-4">
                <p className="font-sans text-xs text-graphit/50">
                  {t("startPriceNote", {
                    product: displayProduct.name,
                    price: formatPriceForRegion(displayProduct.price, region, rates),
                  })}
                </p>
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-3 font-sans text-sm text-graphit/70">
              <input
                type="checkbox"
                required
                checked={acceptedPrivacy}
                onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-xs border transition-colors ${
                  acceptedPrivacy ? "border-graphit bg-graphit" : "border-graphit/30"
                }`}
              >
                {acceptedPrivacy && <Check className="h-3 w-3 text-kreide" />}
              </span>
              <span>
                {t("acceptPrivacy")}{" "}
                <Link href="/datenschutz" className="underline underline-offset-2 hover:text-graphit">
                  {t("privacy")}
                </Link>
                . *
              </span>
            </label>

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center rounded-sm bg-graphit px-7 font-sans text-sm font-semibold text-kreide transition-colors duration-200 hover:bg-graphit/90 sm:w-fit"
            >
              {t("requestOffer")}
            </button>

            <p className="font-sans text-xs text-graphit/50">
              {sent
                ? t("mailOpened")
                : t("mailHelp")}
            </p>
          </form>
        )}

        {step < 6 && (
          <div className="flex items-center justify-between border-t border-graphit/10 pt-6">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 1}
              className={`font-sans text-sm font-semibold ${
                step === 1 ? "cursor-not-allowed text-graphit/25" : "text-graphit hover:opacity-70"
              }`}
            >
              {t("back")}
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canProceed}
              className={`flex h-12 items-center justify-center rounded-sm px-7 font-sans text-sm font-semibold transition-colors duration-200 ${
                canProceed ? "bg-graphit text-kreide hover:bg-graphit/90" : "cursor-not-allowed bg-graphit/15 text-graphit/40"
              }`}
            >
              {t("nextStep")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
