export type ProductType = "anhaenger" | "pavillon";

export type ModelData = {
  id: string;
  productType: ProductType;
  name: string;
  /** Bildquelle — Anhänger sind freigestellt, der Verkaufspavillon ist ein Studiofoto. */
  image: string;
  /** Freigestellte PNGs stehen frei auf der Bühne, Fotos brauchen einen Rahmen. */
  imageFit: "contain" | "cover";
  length: string;
  /** Abweichende Beschriftung der Längenangabe (Station: „Größe"). */
  lengthLabel?: string;
  weight: string;
  /** Abweichende Beschriftung der Gewichtsangabe (Station: „Bauweise"). */
  weightLabel?: string;
  price: string;
  description: string;
  longDescription: string;
  highlights: string[];
};

export const MODELS: ModelData[] = [
  {
    id: "light",
    productType: "anhaenger",
    name: "Light",
    image: "/images/modelle/xl.png",
    imageFit: "contain",
    length: "1,5 M",
    weight: "500 KG",
    price: "ab 12.900 €",
    description: "Der Kleinste — kompakt, leicht und schnell einsatzbereit.",
    longDescription:
      "Light ist unser kompaktestes Modell — leicht genug für den spontanen Einsatz, durchdacht genug für den täglichen Verkauf. Ideal für Märkte, Events und alle, die unkompliziert starten wollen.",
    highlights: [
      "Geringes Gewicht — einfach zu ziehen und zu rangieren",
      "Kompakte Stellfläche für enge Standorte",
      "Schneller Auf- und Abbau",
      "Solide Grundausstattung, im Konfigurator erweiterbar",
    ],
  },
  {
    id: "classic",
    productType: "anhaenger",
    name: "Classic",
    image: "/images/modelle/basis.png",
    imageFit: "contain",
    length: "5 M",
    weight: "1,5 T",
    price: "ab 21.900 €",
    description: "Der Einstieg — solide Fläche für den ersten Auftritt.",
    longDescription:
      "Classic bietet spürbar mehr Fläche für Theke, Technik und Warenpräsentation — der solide Einstieg für alle, die dauerhaft und professionell verkaufen wollen.",
    highlights: [
      "Großzügige Grundfläche für Theke und Ausrüstung",
      "Vorbereitet für individuelle Konzepte im Konfigurator",
      "Robuste Bauweise für den täglichen Einsatz",
      "Gutes Preis-Leistungs-Verhältnis für den Einstieg",
    ],
  },
  {
    id: "premium",
    productType: "anhaenger",
    name: "Premium",
    image: "/images/modelle/standard.png",
    imageFit: "contain",
    length: "5,5 M",
    weight: "1,7 T",
    price: "ab 25.900 €",
    description: "Der Bestseller — mehr Platz für Theke und Technik.",
    longDescription:
      "Premium ist unser meistgebautes Modell — die ausgewogene Mitte aus Fläche, Ausstattungsmöglichkeiten und Preis. Genug Raum für aufwendigere Konzepte, ohne unnötig groß zu sein.",
    highlights: [
      "Meistgewähltes Modell unserer Reihe",
      "Mehr Platz für Theke, Küche und Technik",
      "Breite Auswahl an Fenster- und Ausstattungsvarianten",
      "Bewährte Bauweise, tausendfach im Einsatz",
    ],
  },
  {
    id: "station",
    productType: "pavillon",
    name: "Station",
    image: "/images/produkte/verkaufs-pavillon.png",
    imageFit: "cover",
    length: "AB 3 × 3 M",
    lengthLabel: "Größe",
    weight: "MODULAR",
    weightLabel: "Bauweise",
    price: "ab 7.900 €",
    description: "Der flexible Einstieg — schnell aufgebaut, modular erweiterbar.",
    longDescription:
      "Station ist unser Verkaufspavillon — die modulare Alternative zum Anhänger: schnell aufgebaut, in mehreren Größen planbar und ideal für Märkte, Events oder den wirtschaftlichen Einstieg in die mobile Gastronomie.",
    highlights: [
      "Modulare Größen ab 3 × 3 M",
      "Schneller Auf- und Abbau",
      "Edelstahl-Arbeitsbereich und Verkaufstheke",
      "Im Konfigurator individuell planbar",
    ],
  },
];

/** Anhänger-Modelle — der Konfigurator zeigt im Anhänger-Zweig nur diese. */
export const TRAILER_MODELS = MODELS.filter((model) => model.productType === "anhaenger");

/** Alte Modell-IDs aus früheren Namensgebungen — Detailseiten leiten dauerhaft um. */
export const LEGACY_MODEL_IDS: Record<string, string> = {
  xl: "light",
  base: "light",
  basis: "classic",
  standard: "premium",
  pavillon: "station",
};

/** Ziel des „Jetzt konfigurieren"-Buttons je Modell. */
export function configureHrefFor(model: Pick<ModelData, "id" | "productType">) {
  return model.productType === "pavillon"
    ? "/konfigurator?typ=pavillon"
    : `/konfigurator?typ=anhaenger&modell=${model.id}&schritt=2`;
}

/* ---------- Detailseiten ---------- */

export type ModelSpec = {
  /** Icon-Schlüssel, wird in der Detailseite auf ein Lucide-Icon gemappt. */
  icon: "height" | "width" | "length" | "weight" | "color" | "equipment" | "warranty";
  label: string;
  value: string;
  note?: string;
};

export type ModelFeature = {
  title: string;
  text: string;
  /** Foto unter public/images/…; ohne Angabe erscheint der MINO-Platzhalter. */
  image?: string;
};

export type ModelDetail = {
  id: string;
  productType: ProductType;
  /** Produktgattung über der Überschrift, z. B. „Verkaufsanhänger". */
  category: string;
  name: string;
  image: string;
  imageFit: "contain" | "cover";
  price: string;
  description: string;
  longDescription: string;
  highlights: string[];
  specs: ModelSpec[];
  features: ModelFeature[];
  configureHref: string;
};

/** Bau- und Ausstattungsdetails gelten für alle Modelle gleich. */
const SHARED_SPECS: ModelSpec[] = [
  {
    icon: "color",
    label: "Farbe",
    value: "Nach Wunsch",
    note: "RAL-Ton oder Vollverklebung",
  },
  {
    icon: "equipment",
    label: "Ausstattung",
    value: "Leer oder ausgebaut",
    note: "im Konfigurator wählbar",
  },
  {
    icon: "warranty",
    label: "Garantie",
    value: "24 Monate",
  },
];

const TRAILER_FEATURES: ModelFeature[] = [
  {
    title: "Ein Aufbau, der für sich spricht",
    text: "Glatte Flächen, saubere Kanten, keine sichtbaren Kompromisse: Der Aufbau ist so gebaut, dass er auf dem Markt, dem Festival oder vor dem Bürogebäude von selbst auffällt — auch ohne laute Beschriftung.",
  },
  {
    title: "Leer oder komplett ausgebaut",
    text: "Du bekommst deinen Anhänger genau so, wie du ihn brauchst: als leeren Aufbau für den eigenen Innenausbau oder fertig ausgestattet mit Theke, Küchentechnik und Kühlung.",
  },
  {
    title: "Gebaut für Wind und Wetter",
    text: "Rahmen und tragende Bauteile bestehen aus verzinktem und pulverbeschichtetem Stahl. Der Aufbau ist gedämmt und abgedichtet, damit du im Sommer wie im Winter arbeiten kannst.",
    image: "/images/prozess/produktions-raster.avif",
  },
  {
    title: "Auf deinen Ablauf zugeschnitten",
    text: "Wir planen das Layout entlang deiner Speisekarte: Wo stehst du, wo ist die Ausgabe, wo die Technik. Jedes Detail wird vor dem Bau abgestimmt — inklusive Skizze zur Freigabe.",
    image: "/images/prozess/design-finalisieren-freigestellt.png",
  },
  {
    title: "Vorbereitet für deine Behörden",
    text: "Wir bauen mit Blick auf die Hygiene- und Sanitärvorgaben deines Standorts und liefern den Anhänger straßenzulassungsfertig aus. Was in deinem Landkreis konkret gefordert ist, klären wir vorher gemeinsam.",
  },
];

const STATION_FEATURES: ModelFeature[] = [
  {
    title: "In Minuten aufgebaut",
    text: "Station steht ohne Kran, ohne Zugfahrzeug und ohne Zulassung. Aufbauen, Theke ausklappen, verkaufen — und am Abend genauso schnell wieder zusammen.",
  },
  {
    title: "Modular in der Größe",
    text: "Ab 3 × 3 M und in Modulen erweiterbar: Du beginnst klein und stellst später weitere Felder daneben, wenn dein Sortiment oder dein Standort wächst.",
  },
  {
    title: "Gebaut für Wind und Wetter",
    text: "Stabiles Gestell, wetterfeste Flächen und verschließbare Seiten. Station bleibt auch bei Regen und Wind ein Arbeitsplatz und kein Provisorium.",
    image: "/images/prozess/produktions-raster.avif",
  },
  {
    title: "Auf deinen Ablauf zugeschnitten",
    text: "Verkaufstheke, Arbeitsfläche aus Edelstahl, Kühlung oder Spüle: Der Innenausbau wird genauso geplant wie beim Anhänger — nur eben ohne Fahrgestell.",
    image: "/images/prozess/design-finalisieren-freigestellt.png",
  },
  {
    title: "Der wirtschaftliche Einstieg",
    text: "Wer erst testen will, ob das Konzept trägt, startet mit Station deutlich günstiger — und steigt später auf einen Anhänger um, ohne den Aufbau zu verlieren.",
  },
];

/** Modellabhängige Maße; Farbe, Ausstattung und Garantie kommen aus SHARED_SPECS. */
const MODEL_SPECS: Record<string, ModelSpec[]> = {
  light: [
    { icon: "height", label: "Höhe", value: "2,0 M", note: "2,4 M aufgestellt" },
    { icon: "width", label: "Breite", value: "1,8 M" },
    { icon: "length", label: "Länge", value: "1,5 M" },
    { icon: "weight", label: "Gewicht", value: "500 KG", note: "zul. Gesamtgewicht 750 KG" },
  ],
  classic: [
    { icon: "height", label: "Höhe", value: "2,2 M", note: "2,6 M aufgestellt" },
    { icon: "width", label: "Breite", value: "2,0 M" },
    { icon: "length", label: "Länge", value: "5 M" },
    { icon: "weight", label: "Gewicht", value: "1,5 T", note: "zul. Gesamtgewicht 2.000 KG" },
  ],
  premium: [
    { icon: "height", label: "Höhe", value: "2,3 M", note: "2,7 M aufgestellt" },
    { icon: "width", label: "Breite", value: "2,2 M" },
    { icon: "length", label: "Länge", value: "5,5 M" },
    { icon: "weight", label: "Gewicht", value: "1,7 T", note: "zul. Gesamtgewicht 2.600 KG" },
  ],
  station: [
    { icon: "height", label: "Höhe", value: "2,4 M", note: "im Aufbau" },
    { icon: "width", label: "Breite", value: "ab 3 M" },
    { icon: "length", label: "Tiefe", value: "ab 3 M", note: "modular erweiterbar" },
    { icon: "weight", label: "Gewicht", value: "Je nach Größe" },
  ],
};

function toDetail(model: ModelData): ModelDetail {
  const isPavilion = model.productType === "pavillon";

  return {
    id: model.id,
    productType: model.productType,
    category: isPavilion ? "Verkaufspavillon" : "Verkaufsanhänger",
    name: model.name,
    image: model.image,
    imageFit: model.imageFit,
    price: model.price,
    description: model.description,
    longDescription: model.longDescription,
    highlights: model.highlights,
    specs: [...MODEL_SPECS[model.id], ...SHARED_SPECS],
    features: isPavilion ? STATION_FEATURES : TRAILER_FEATURES,
    configureHref: configureHrefFor(model),
  };
}

/** Alle Detailseiten unter /modelle/… — die drei Anhänger plus Station. */
export const MODEL_DETAILS: ModelDetail[] = MODELS.map(toDetail);

export function findModelDetail(id: string): ModelDetail | undefined {
  return MODEL_DETAILS.find((detail) => detail.id === id);
}
