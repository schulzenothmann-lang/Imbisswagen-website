import {
  AppWindow,
  Blinds,
  Camera,
  ChefHat,
  ClipboardList,
  CookingPot,
  DoorClosed,
  DoorOpen,
  Droplet,
  Droplets,
  EyeOff,
  Package,
  Paintbrush,
  Palette,
  PanelTop,
  Refrigerator,
  ScrollText,
  Sticker,
  Tag,
  Table2,
  Truck,
  Video,
  Wrench,
  Zap,
  ZapOff,
} from "lucide-react";
import type { ReactNode } from "react";

export type Option = {
  id: string;
  label: string;
  description?: string;
  price?: string;
  icon: ReactNode;
  /** Marks the "no addition" baseline of a category — excluded from the selection summary. */
  neutral?: boolean;
};

export type ConceptOption = Option & {
  includes: string[];
  includedEquipmentIds: string[];
  comparisonPrice?: string;
};

export type OptionCategory = {
  id: string;
  label: string;
  hint?: string;
  type: "single" | "multi";
  options: Option[];
};

export const WINDOW_VARIANTS: Option[] = [
  {
    id: "a",
    label: "Variante A",
    description: "1 kleines Frontfenster, 1 Seitenfenster",
    icon: <AppWindow className="h-5 w-5" />,
  },
  {
    id: "b",
    label: "Variante B",
    description: "2 kleine Frontfenster, 1 Seitenfenster",
    icon: <Blinds className="h-5 w-5" />,
  },
  {
    id: "c",
    label: "Variante C",
    description: "1 großes Frontfenster über die volle Breite",
    icon: <PanelTop className="h-5 w-5" />,
  },
];

export const PAVILION_OPENINGS: Option[] = [
  {
    id: "eine-seite",
    label: "1 Seite offen",
    description: "Eine Verkaufsseite geöffnet, die übrigen Seiten geschlossen.",
    icon: <DoorOpen className="h-5 w-5" />,
  },
  {
    id: "zwei-seiten",
    label: "2 Seiten offen",
    description: "Zwei offene Seiten für Verkauf und Ausgabe über Eck.",
    icon: <AppWindow className="h-5 w-5" />,
  },
  {
    id: "drei-seiten",
    label: "3 Seiten offen",
    description: "Drei Seiten offen für viel Sichtbarkeit und schnellen Zugang.",
    icon: <Blinds className="h-5 w-5" />,
  },
  {
    id: "alle-seiten",
    label: "Alle Seiten offen",
    description: "Rundum offen für Markt, Event oder flexible Ausgabe.",
    icon: <PanelTop className="h-5 w-5" />,
  },
];

export const PAVILION_SIZES: Option[] = [
  {
    id: "3x3",
    label: "3 x 3 M",
    description: "Kompakt für kleine Märkte, Events oder einen schnellen Einstieg.",
    price: "ab 7.900 €",
    icon: <PanelTop className="h-5 w-5" />,
  },
  {
    id: "3x45",
    label: "3 x 4,5 M",
    description: "Mehr Ausgabe- und Arbeitsfläche bei weiterhin einfachem Aufbau.",
    price: "ab 9.900 €",
    icon: <PanelTop className="h-5 w-5" />,
  },
  {
    id: "3x6",
    label: "3 x 6 M",
    description: "Große Lösung für mehrere Mitarbeitende, viel Ware oder hohe Frequenz.",
    price: "ab 11.900 €",
    icon: <PanelTop className="h-5 w-5" />,
  },
];

export const PAVILION_DETAILS: OptionCategory[] = [
  {
    id: "arbeitsflaeche-material",
    label: "Arbeitsfläche — Material",
    hint: "Edelstahl ist robuster und wirkt hochwertiger; HPL ist leichter und günstiger.",
    type: "single",
    options: [
      { id: "edelstahl", label: "Edelstahltische", icon: <Table2 className="h-5 w-5" /> },
      { id: "hpl", label: "HPL-Hygieneplatten", icon: <PanelTop className="h-5 w-5" /> },
    ],
  },
  {
    id: "arbeitsflaeche-umfang",
    label: "Arbeitsfläche — Umfang",
    hint: "Wähle ungefähr, wie viel Arbeitsfläche du brauchst.",
    type: "single",
    options: [
      { id: "2m", label: "ca. 2 M / 1 Tisch", icon: <Table2 className="h-5 w-5" /> },
      { id: "4m", label: "ca. 4 M / 2 Tische", icon: <Table2 className="h-5 w-5" /> },
      { id: "6m", label: "ca. 6 M / 3 Tische", icon: <Table2 className="h-5 w-5" /> },
      { id: "frei", label: "nach Bedarf planen", icon: <Wrench className="h-5 w-5" /> },
    ],
  },
  {
    id: "stromversorgung",
    label: "Stromversorgung",
    hint: "Optional mit Strominsel, Starkstromkabel oder vorbereitetem Anschluss.",
    type: "single",
    options: [
      { id: "keine", label: "Keine Zusatzlösung", icon: <ZapOff className="h-5 w-5" />, neutral: true },
      { id: "schuko", label: "Strominsel 230 V", icon: <Zap className="h-5 w-5" /> },
      { id: "starkstrom", label: "Starkstrom vorbereitet", icon: <Zap className="h-5 w-5" /> },
      { id: "starkstrom-kabel", label: "Starkstromkabel inklusive", icon: <Zap className="h-5 w-5" /> },
    ],
  },
  {
    id: "pavillon-branding",
    label: "Individualisierung",
    hint: "Grundlage für Logo, Farbe oder Bedruckung. Eine Datei kannst du unten zusätzlich hochladen.",
    type: "single",
    options: [
      { id: "keine", label: "Ohne Branding", icon: <Tag className="h-5 w-5 opacity-30" />, neutral: true },
      { id: "logo", label: "Logo auf Plane", icon: <Sticker className="h-5 w-5" /> },
      { id: "vollflaeche", label: "vollflächige Gestaltung", icon: <Paintbrush className="h-5 w-5" /> },
    ],
  },
];

export const PROJECT_DETAILS: OptionCategory[] = [
  {
    id: "aussenfenster",
    label: "Äußere Fenster",
    type: "single",
    options: [
      { id: "keine", label: "Keine Gläser", icon: <Package className="h-5 w-5" />, neutral: true },
      { id: "schiebe", label: "Schiebegläser", icon: <AppWindow className="h-5 w-5" /> },
    ],
  },
  {
    id: "aussentueren",
    label: "Äußere Türen",
    type: "single",
    options: [
      { id: "voll", label: "Volltüren", icon: <DoorClosed className="h-5 w-5" /> },
      { id: "fenster", label: "Türen mit Fenster", icon: <DoorOpen className="h-5 w-5" /> },
    ],
  },
  {
    id: "fahrgestell",
    label: "Aufbau des Fahrgestells",
    type: "single",
    options: [
      { id: "kein", label: "Kein Aufbau", icon: <Package className="h-5 w-5" />, neutral: true },
      { id: "sockel", label: "Sockel (Abdeckung)", icon: <PanelTop className="h-5 w-5" /> },
    ],
  },
  {
    id: "elektro",
    label: "Elektroinstallation",
    type: "single",
    options: [
      { id: "keine", label: "Keine", icon: <ZapOff className="h-5 w-5" />, neutral: true },
      { id: "standard", label: "Standard", icon: <Zap className="h-5 w-5" /> },
    ],
  },
  {
    id: "hydraulik",
    label: "Installation — Hydraulik",
    type: "single",
    options: [
      { id: "keine", label: "Keine", icon: <Droplet className="h-5 w-5 opacity-30" />, neutral: true },
      { id: "geschlossen", label: "Geschlossen", icon: <Droplet className="h-5 w-5" /> },
      { id: "offen", label: "Offener Wasserkreislauf", icon: <Droplets className="h-5 w-5" /> },
    ],
  },
  {
    id: "moebel",
    label: "Innenausstattung — Möbelaufbau",
    type: "single",
    options: [
      { id: "stock", label: "Stock (ohne Möbel)", icon: <Package className="h-5 w-5" />, neutral: true },
      { id: "suess", label: "Street-Food Konzept süß", icon: <CookingPot className="h-5 w-5" /> },
      { id: "herzhaft", label: "Street-Food Konzept herzhaft", icon: <ChefHat className="h-5 w-5" /> },
    ],
  },
  {
    id: "haushaltsgeraete",
    label: "Innenausbau — Haushaltsgeräte",
    hint: "Zum Beispiel Kühlschrank, Grill oder eine schlüsselfertige Küchenausstattung",
    type: "single",
    options: [
      { id: "keine", label: "Keine", icon: <Package className="h-5 w-5" />, neutral: true },
      { id: "kuehlschrank", label: "Kühlschrank", icon: <Refrigerator className="h-5 w-5" /> },
      { id: "kuehlschrank-grill", label: "Kühlschrank + Grill", icon: <ChefHat className="h-5 w-5" /> },
    ],
  },
  {
    id: "fassade",
    label: "Fassade",
    type: "single",
    options: [
      { id: "ohne", label: "Ohne Dibond", icon: <Package className="h-5 w-5" />, neutral: true },
      { id: "dibond", label: "Dibond", icon: <Palette className="h-5 w-5" /> },
      { id: "uv", label: "UV-Druck", icon: <Paintbrush className="h-5 w-5" /> },
    ],
  },
  {
    id: "branding-logo",
    label: "Branding — Logo",
    type: "single",
    options: [
      { id: "keine", label: "Kein Logo", icon: <Tag className="h-5 w-5 opacity-30" />, neutral: true },
      { id: "standard", label: "Standard", icon: <Tag className="h-5 w-5" /> },
      { id: "premium", label: "Premium (beleuchtet)", icon: <Sticker className="h-5 w-5" /> },
    ],
  },
  {
    id: "branding-menue",
    label: "Branding — Menü",
    type: "single",
    options: [
      { id: "keine", label: "Kein Menü", icon: <ScrollText className="h-5 w-5 opacity-30" />, neutral: true },
      { id: "standard", label: "Standard", icon: <ScrollText className="h-5 w-5" /> },
    ],
  },
  {
    id: "ueberwachung",
    label: "Zusätzliche Ausstattung — Überwachung",
    type: "single",
    options: [
      { id: "keine", label: "Keine", icon: <EyeOff className="h-5 w-5" />, neutral: true },
      { id: "eine", label: "1 Kamera", icon: <Camera className="h-5 w-5" /> },
      { id: "zwei", label: "2 Kameras", icon: <Video className="h-5 w-5" /> },
    ],
  },
];

export const KITCHEN_CONCEPTS: ConceptOption[] = [
  {
    id: "eigenes-paket",
    label: "Eigenes Paket",
    description: "Du stellst die Geräte selbst zusammen.",
    price: "nach Auswahl",
    icon: <Wrench className="h-5 w-5" />,
    includes: ["Freie Geräteauswahl", "Individuelle Planung", "Angebot nach Bedarf"],
    includedEquipmentIds: [],
  },
  {
    id: "pommes",
    label: "Pommes Laden",
    description: "Für Fritten, Snacks und schnelle Ausgabe.",
    price: "ab 4.490 €",
    comparisonPrice: "einzeln ca. 5.050 €",
    icon: <CookingPot className="h-5 w-5" />,
    includes: ["Fritteuse", "Kühlung", "Warmhaltung", "Edelstahl-Arbeitsfläche"],
    includedEquipmentIds: ["fritteuse", "kuehlung", "warmhaltung", "edelstahl"],
  },
  {
    id: "pizza",
    label: "Pizza",
    description: "Für Pizza, Flammkuchen oder ähnliche Ofen-Konzepte.",
    price: "ab 6.990 €",
    comparisonPrice: "einzeln ca. 7.700 €",
    icon: <ChefHat className="h-5 w-5" />,
    includes: ["Pizzaofen", "Pizzakühlung", "Edelstahl-Arbeitsfläche", "Abluft"],
    includedEquipmentIds: ["pizzaofen", "pizzakuehlung", "edelstahl", "abluft"],
  },
  {
    id: "wuerstchen",
    label: "Würstchen",
    description: "Für Grill, Bratwurst und klassische Imbiss-Ausgabe.",
    price: "ab 4.790 €",
    comparisonPrice: "einzeln ca. 5.250 €",
    icon: <ChefHat className="h-5 w-5" />,
    includes: ["Grill", "Warmhaltung", "Kühlung", "Edelstahl-Arbeitsfläche"],
    includedEquipmentIds: ["grill", "warmhaltung", "kuehlung", "edelstahl"],
  },
  {
    id: "getraenke",
    label: "Getränke",
    description: "Für kalte Getränke, Kaffee oder Ausschank.",
    price: "ab 3.290 €",
    comparisonPrice: "einzeln ca. 3.700 €",
    icon: <Refrigerator className="h-5 w-5" />,
    includes: ["Getränkekühler", "Kühlung", "Edelstahl-Arbeitsfläche", "Stauraum"],
    includedEquipmentIds: ["getraenkekuehler", "kuehlung", "edelstahl"],
  },
  {
    id: "eis",
    label: "Eis",
    description: "Für Eisverkauf und gekühlte Produkte.",
    price: "ab 3.590 €",
    comparisonPrice: "einzeln ca. 4.000 €",
    icon: <Refrigerator className="h-5 w-5" />,
    includes: ["Eistruhe", "Kühlung", "Edelstahl-Arbeitsfläche", "Portionierbereich"],
    includedEquipmentIds: ["eistruhe", "kuehlung", "edelstahl"],
  },
];

export const KITCHEN_EQUIPMENT: OptionCategory = {
  id: "kitchen-equipment",
  label: "Geräte & Ausstattung",
  hint: "Optional: ergänze ein Paket oder erstelle dein eigenes Küchenkonzept. Eine Spüle ist immer inklusive.",
  type: "multi",
  options: [
    { id: "grill", label: "Grill", price: "1.900 €", icon: <ChefHat className="h-5 w-5" /> },
    { id: "pizzaofen", label: "Pizzaofen", price: "2.900 €", icon: <CookingPot className="h-5 w-5" /> },
    { id: "pizzakuehlung", label: "Pizzakühlung", price: "1.600 €", icon: <Refrigerator className="h-5 w-5" /> },
    { id: "fritteuse", label: "Fritteuse", price: "1.700 €", icon: <CookingPot className="h-5 w-5" /> },
    { id: "kuehlung", label: "Kühlung", price: "1.400 €", icon: <Refrigerator className="h-5 w-5" /> },
    { id: "getraenkekuehler", label: "Getränkekühler", price: "1.200 €", icon: <Refrigerator className="h-5 w-5" /> },
    { id: "eistruhe", label: "Eistruhe", price: "1.500 €", icon: <Refrigerator className="h-5 w-5" /> },
    { id: "warmhaltung", label: "Warmhaltung", price: "850 €", icon: <CookingPot className="h-5 w-5" /> },
    { id: "edelstahl", label: "Edelstahl-Arbeitsfläche", price: "1.100 €", icon: <Package className="h-5 w-5" /> },
    { id: "abluft", label: "Abluft", price: "2.100 €", icon: <Zap className="h-5 w-5" /> },
  ],
};

export const ADDITIONAL_SERVICES: OptionCategory = {
  id: "services",
  label: "Zusätzliche Dienstleistungen (optional)",
  type: "multi",
  options: [
    { id: "transport", label: "Transport", icon: <Truck className="h-5 w-5" /> },
    { id: "montage", label: "Montage", icon: <Wrench className="h-5 w-5" /> },
    { id: "einweisung", label: "Einweisung", icon: <ClipboardList className="h-5 w-5" /> },
  ],
};
