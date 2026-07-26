export type OfferKey = "kaufen" | "mieten";

export type ListingProductType = "anhaenger" | "pavillon";

export type FinishedTrailerProduct = {
  id: string;
  productType: ListingProductType;
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

export type FilterGroupId = "availability" | "model" | "dimensions" | "weight" | "price";

export type FilterGroup = {
  id: FilterGroupId;
  title: string;
  titleByProductType?: Partial<Record<ListingProductType, string>>;
  options?: string[];
  optionsByProductType?: Partial<Record<ListingProductType, string[]>>;
};

export type OfferData = {
  /** Serifen-Zeile nach "Wähle aus," — wird via translateCopy übersetzt. */
  heading: string;
  intro: string;
  filterGroups: FilterGroup[];
  products: FinishedTrailerProduct[];
};

const kaufenProducts: FinishedTrailerProduct[] = [
  {
    id: "basis-kaufen",
    productType: "anhaenger",
    productLabel: "Imbiss-Anhänger",
    name: "Classic",
    status: "Sofort verfügbar",
    price: "21.900 €",
    length: "5 M",
    weight: "1,5 T",
    image: "/images/modelle/basis.png",
    imageAlt: "MINO Classic Imbiss-Anhänger",
    href: "/kontakt?anliegen=Beratung%20zu%20Modell%20Classic",
    description: "Sofort verfügbarer Imbiss-Anhänger, 5 M, 1,5 T",
  },
  {
    id: "pavillon-kaufen",
    productType: "pavillon",
    productLabel: "Verkaufspavillon",
    name: "Station",
    status: "Sofort verfügbar",
    price: "ab 7.900 €",
    length: "3 x 3 M",
    weight: "modular",
    image: "/images/produkte/verkaufs-pavillon.png",
    imageAlt: "MINO Verkaufspavillon",
    href: "/kontakt?anliegen=Beratung%20zu%20Modell%20Station",
    description: "Günstiger Verkaufspavillon mit Theke und Edelstahl-Arbeitsbereich",
  },
];

const mietenProducts: FinishedTrailerProduct[] = [
  {
    id: "basis-mieten",
    productType: "anhaenger",
    productLabel: "Imbiss-Anhänger",
    name: "Classic",
    status: "Mietbereit",
    price: "ab 1.490 € / Monat",
    length: "5 M",
    weight: "1,5 T",
    image: "/images/modelle/basis.png",
    imageAlt: "MINO Classic Imbiss-Anhänger zur Miete",
    href: "/kontakt?anliegen=Beratung%20zu%20Modell%20Classic",
    description: "Mietbarer Imbiss-Anhänger, 5 M, 1,5 T",
  },
  {
    id: "pavillon-mieten",
    productType: "pavillon",
    productLabel: "Verkaufspavillon",
    name: "Station",
    status: "Mietbereit",
    price: "ab 390 € / Monat",
    length: "3 x 3 M",
    weight: "modular",
    image: "/images/produkte/verkaufs-pavillon.png",
    imageAlt: "MINO Verkaufspavillon zur Miete",
    href: "/kontakt?anliegen=Beratung%20zu%20Modell%20Station",
    description: "Mietbarer Verkaufspavillon für Märkte, Events und saisonale Einsätze",
  },
];

const modelVariantGroup: FilterGroup = {
  id: "model",
  title: "Modell / Variante",
  titleByProductType: {
    anhaenger: "Modell",
    pavillon: "Variante",
  },
  optionsByProductType: {
    anhaenger: ["Light", "Classic", "Premium"],
    pavillon: ["Station"],
  },
};

const lengthGroup: FilterGroup = {
  id: "dimensions",
  title: "Länge / Fläche",
  titleByProductType: {
    anhaenger: "Länge",
    pavillon: "Fläche",
  },
  optionsByProductType: {
    anhaenger: ["bis 2 M", "5 M", "5,5 M"],
    pavillon: ["3 x 3 M", "3 x 4,5 M", "3 x 6 M"],
  },
};

const weightGroup: FilterGroup = {
  id: "weight",
  title: "Gewicht",
  optionsByProductType: {
    anhaenger: ["bis 750 KG", "1,5 T", "1,7 T"],
  },
};

export const LISTING_OFFERS: Record<OfferKey, OfferData> = {
  kaufen: {
    heading: "was du kaufen möchtest.",
    intro:
      "Wähle zwischen sofort verfügbaren Imbiss-Anhängern und Verkaufspavillons. Über den Produktfilter kannst du beide Produktarten vergleichen.",
    filterGroups: [
      { id: "availability", title: "Verfügbarkeit", options: ["Sofort verfügbar", "In Fertigung", "Reservierbar"] },
      modelVariantGroup,
      lengthGroup,
      weightGroup,
      { id: "price", title: "Preis", options: ["bis 10.000 €", "10.000 - 25.000 €", "ab 25.000 €"] },
    ],
    products: kaufenProducts,
  },
  mieten: {
    heading: "was du mieten möchtest.",
    intro:
      "Wähle zwischen mietbaren Imbiss-Anhängern und Verkaufspavillons. Über den Produktfilter kannst du beide Produktarten vergleichen.",
    filterGroups: [
      { id: "availability", title: "Verfügbarkeit", options: ["Mietbereit", "In Fertigung", "Reservierbar", "Auf Anfrage"] },
      modelVariantGroup,
      lengthGroup,
      weightGroup,
      { id: "price", title: "Mietpreis", options: ["bis 490 € / Monat", "490 - 1.500 € / Monat", "ab 1.500 € / Monat"] },
    ],
    products: mietenProducts,
  },
};
