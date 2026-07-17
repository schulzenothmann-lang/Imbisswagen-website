export type ModelData = {
  id: string;
  imageId: string;
  name: string;
  length: string;
  weight: string;
  price: string;
  description: string;
  longDescription: string;
  highlights: string[];
};

export const MODELS: ModelData[] = [
  {
    id: "xl",
    imageId: "xl",
    name: "X-ray",
    length: "1,5 M",
    weight: "500 KG",
    price: "ab 12.900 €",
    description: "Der Kleinste — kompakt, leicht und schnell einsatzbereit.",
    longDescription:
      "Der X-ray ist unser kompaktestes Modell — leicht genug für den spontanen Einsatz, durchdacht genug für den täglichen Verkauf. Ideal für Märkte, Events und alle, die unkompliziert starten wollen.",
    highlights: [
      "Geringes Gewicht — einfach zu ziehen und zu rangieren",
      "Kompakte Stellfläche für enge Standorte",
      "Schneller Auf- und Abbau",
      "Solide Grundausstattung, im Konfigurator erweiterbar",
    ],
  },
  {
    id: "basis",
    imageId: "basis",
    name: "Basis",
    length: "5 M",
    weight: "1,5 T",
    price: "ab 21.900 €",
    description: "Der Einstieg — solide Fläche für den ersten Auftritt.",
    longDescription:
      "Der Basis bietet spürbar mehr Fläche für Theke, Technik und Warenpräsentation — der solide Einstieg für alle, die dauerhaft und professionell verkaufen wollen.",
    highlights: [
      "Großzügige Grundfläche für Theke und Ausrüstung",
      "Vorbereitet für individuelle Konzepte im Konfigurator",
      "Robuste Bauweise für den täglichen Einsatz",
      "Gutes Preis-Leistungs-Verhältnis für den Einstieg",
    ],
  },
  {
    id: "standard",
    imageId: "standard",
    name: "Standard",
    length: "5,5 M",
    weight: "1,7 T",
    price: "ab 25.900 €",
    description: "Der Bestseller — mehr Platz für Theke und Technik.",
    longDescription:
      "Der Standard ist unser meistgebautes Modell — die ausgewogene Mitte aus Fläche, Ausstattungsmöglichkeiten und Preis. Genug Raum für aufwendigere Konzepte, ohne unnötig groß zu sein.",
    highlights: [
      "Meistgewähltes Modell unserer Reihe",
      "Mehr Platz für Theke, Küche und Technik",
      "Breite Auswahl an Fenster- und Ausstattungsvarianten",
      "Bewährte Bauweise, tausendfach im Einsatz",
    ],
  },
  {
    id: "premium",
    imageId: "premium",
    name: "Premium",
    length: "5,5 M",
    weight: "1,7 T",
    price: "ab 25.900 €",
    description: "Für hohe Ansprüche — mehr Ausstattung, mehr Auftritt.",
    longDescription:
      "Der Premium richtet sich an alle mit hohem Anspruch an Ausstattung und Auftritt — gleiche Grundfläche wie der Standard, aber mit hochwertigerer Verarbeitung und mehr Ausstattungsdetails ab Werk.",
    highlights: [
      "Hochwertigere Verarbeitung und Materialien",
      "Mehr Ausstattung bereits ab Werk enthalten",
      "Repräsentativer Auftritt für dein Business",
      "Volle Flexibilität durch den Konfigurator",
    ],
  },
];
