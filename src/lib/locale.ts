export type RegionCode = "DE" | "AT" | "CH" | "FR" | "NL" | "UK" | "US";
export type LanguageCode = "de" | "en" | "fr" | "nl";
export type CurrencyCode = "EUR" | "CHF" | "GBP" | "USD";

export type Region = {
  code: RegionCode;
  iso: string;
  country: string;
  language: string;
  languageCode: LanguageCode;
  locale: string;
  currency: CurrencyCode;
  fallbackRateFromEur: number;
};

export type ExchangeRates = Partial<Record<CurrencyCode, number>>;

export const fallbackRates: Record<CurrencyCode, number> = {
  EUR: 1,
  CHF: 0.95,
  GBP: 0.86,
  USD: 1.08,
};

export const regions: Region[] = [
  {
    code: "DE",
    iso: "de",
    country: "Deutschland",
    language: "Deutsch",
    languageCode: "de",
    locale: "de-DE",
    currency: "EUR",
    fallbackRateFromEur: 1,
  },
  {
    code: "AT",
    iso: "at",
    country: "Österreich",
    language: "Deutsch",
    languageCode: "de",
    locale: "de-AT",
    currency: "EUR",
    fallbackRateFromEur: 1,
  },
  {
    code: "CH",
    iso: "ch",
    country: "Schweiz",
    language: "Deutsch",
    languageCode: "de",
    locale: "de-CH",
    currency: "CHF",
    fallbackRateFromEur: fallbackRates.CHF,
  },
  {
    code: "FR",
    iso: "fr",
    country: "France",
    language: "Français",
    languageCode: "fr",
    locale: "fr-FR",
    currency: "EUR",
    fallbackRateFromEur: 1,
  },
  {
    code: "NL",
    iso: "nl",
    country: "Nederland",
    language: "Nederlands",
    languageCode: "nl",
    locale: "nl-NL",
    currency: "EUR",
    fallbackRateFromEur: 1,
  },
  {
    code: "UK",
    iso: "gb",
    country: "United Kingdom",
    language: "English",
    languageCode: "en",
    locale: "en-GB",
    currency: "GBP",
    fallbackRateFromEur: fallbackRates.GBP,
  },
  {
    code: "US",
    iso: "us",
    country: "USA",
    language: "English",
    languageCode: "en",
    locale: "en-US",
    currency: "USD",
    fallbackRateFromEur: fallbackRates.USD,
  },
];

export const defaultRegion = regions[0];

export function getRegion(code?: string | null) {
  return regions.find((region) => region.code === code) ?? defaultRegion;
}

export function parseEuroPrice(price: string) {
  const match = price.match(/(\d{1,3}(?:[.\s]\d{3})*|\d+)(?:,(\d{1,2}))?/);
  if (!match) return null;
  const normalized = match[1].replace(/[.\s]/g, "") + (match[2] ? `.${match[2]}` : "");
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : null;
}

export function getRateForRegion(region: Region, liveRates?: ExchangeRates) {
  if (region.currency === "EUR") return 1;
  return liveRates?.[region.currency] ?? region.fallbackRateFromEur;
}

export function formatPriceForRegion(price: string, region: Region, liveRates?: ExchangeRates) {
  if (!price) return price;

  const amount = parseEuroPrice(price);
  if (amount === null) return price;

  const formatter = new Intl.NumberFormat(region.locale, {
    style: "currency",
    currency: region.currency,
    maximumFractionDigits: 0,
  });
  const formatAmount = (value: number) => formatter.format(value * getRateForRegion(region, liveRates));

  if (price.includes("€")) {
    return price.replace(/(\d{1,3}(?:[.\s]\d{3})*|\d+)(?:,(\d{1,2}))?\s*€?/gu, (match, whole, decimals) => {
      const normalized = String(whole).replace(/[.\s]/g, "") + (decimals ? `.${decimals}` : "");
      const value = Number(normalized);
      return Number.isFinite(value) ? formatAmount(value) : match;
    });
  }

  return price.replace(/(\d{1,3}(?:[.\s]\d{3})*|\d+)(?:,\d{1,2})?/u, formatAmount(amount));
}

export const translations = {
  navModels: {
    de: "Modelle",
    en: "Models",
    fr: "Modèles",
    nl: "Modellen",
  },
  navAvailable: {
    de: "Sofort verfügbar",
    en: "Available now",
    fr: "Disponible maintenant",
    nl: "Direct beschikbaar",
  },
  navRent: {
    de: "Mieten",
    en: "Rent",
    fr: "Louer",
    nl: "Huren",
  },
  navAbout: {
    de: "Über uns",
    en: "About us",
    fr: "À propos",
    nl: "Over ons",
  },
  navContact: {
    de: "Kontakt",
    en: "Contact",
    fr: "Contact",
    nl: "Contact",
  },
  ctaConfigure: {
    de: "Jetzt konfigurieren",
    en: "Configure now",
    fr: "Configurer",
    nl: "Nu configureren",
  },
  ctaOpenConfigurator: {
    de: "Konfigurator öffnen",
    en: "Open configurator",
    fr: "Ouvrir le configurateur",
    nl: "Configurator openen",
  },
  select: {
    de: "Auswählen",
    en: "Select",
    fr: "Sélectionner",
    nl: "Selecteren",
  },
  overview: {
    de: "Übersicht",
    en: "Overview",
    fr: "Aperçu",
    nl: "Overzicht",
  },
  snackTrailer: {
    de: "Imbiss-Anhänger",
    en: "Food trailer",
    fr: "Remorque snack",
    nl: "Foodtrailer",
  },
  snackTrailerNoHyphen: {
    de: "Imbissanhänger",
    en: "Food trailer",
    fr: "Remorque snack",
    nl: "Foodtrailer",
  },
  pavilion: {
    de: "Pavillon",
    en: "Pavilion",
    fr: "Pavillon",
    nl: "Paviljoen",
  },
  salesPavilion: {
    de: "Verkaufs-Pavillon",
    en: "Sales pavilion",
    fr: "Pavillon de vente",
    nl: "Verkooppaviljoen",
  },
  cheaperStart: {
    de: "Günstiger starten",
    en: "Start for less",
    fr: "Démarrer moins cher",
    nl: "Voordeliger starten",
  },
  flexibleStart: {
    de: "Flexibel starten",
    en: "Start flexibly",
    fr: "Démarrer flexible",
    nl: "Flexibel starten",
  },
  rentShortTerm: {
    de: "Kurzfristig mieten",
    en: "Rent short-term",
    fr: "Location courte durée",
    nl: "Kort huren",
  },
  trailerPurchaseDescription: {
    de: "Fertige MINO Anhänger direkt anfragen und übernehmen.",
    en: "Request ready-built MINO trailers and take them over directly.",
    fr: "Demandez des remorques MINO prêtes à l'emploi.",
    nl: "Vraag direct kant-en-klare MINO trailers aan.",
  },
  pavilionPurchaseDescription: {
    de: "Verkaufs-Pavillons als kompakte Alternative zum Anhänger.",
    en: "Sales pavilions as a compact alternative to a trailer.",
    fr: "Pavillons de vente comme alternative compacte.",
    nl: "Verkooppaviljoens als compact alternatief.",
  },
  trailerRentalDescription: {
    de: "Mietbare Anhänger für Events, Saison oder Übergang.",
    en: "Rentable trailers for events, seasons or temporary use.",
    fr: "Remorques à louer pour événements ou saisons.",
    nl: "Foodtrailers te huur voor events of seizoen.",
  },
  pavilionRentalDescription: {
    de: "Verkaufs-Pavillons für Märkte, Events und Tests.",
    en: "Sales pavilions for markets, events and testing.",
    fr: "Pavillons pour marchés, événements et essais.",
    nl: "Verkooppaviljoens voor markten, events en tests.",
  },
  heroKicker: {
    de: "Einfach. Zuverlässig. Flexibel.",
    en: "Simple. Reliable. Flexible.",
    fr: "Simple. Fiable. Flexible.",
    nl: "Eenvoudig. Betrouwbaar. Flexibel.",
  },
  heroTitleSerif: {
    de: "Deine Idee",
    en: "Your idea",
    fr: "Votre idée",
    nl: "Jouw idee",
  },
  heroTitleBold: {
    de: "wird wahr.",
    en: "made real.",
    fr: "devient réelle.",
    nl: "wordt werkelijkheid.",
  },
  heroText: {
    de: "Mehrere Anhänger-Modelle ab Werk oder komplett individuell im Konfigurator zusammengestellt.",
    en: "Several trailer models from the factory or fully tailored in the configurator.",
    fr: "Plusieurs modèles de remorques d'usine ou une configuration entièrement personnalisée.",
    nl: "Meerdere trailermodellen af fabriek of volledig individueel samengesteld.",
  },
  ctaViewModels: {
    de: "Modelle ansehen",
    en: "View models",
    fr: "Voir les modèles",
    nl: "Modellen bekijken",
  },
  ctaStartConfigurator: {
    de: "Konfigurator starten",
    en: "Start configurator",
    fr: "Lancer le configurateur",
    nl: "Configurator starten",
  },
  footerText: {
    de: "Jeder Imbisswagen beginnt als Idee auf einem Blatt Papier - und endet als Zuhause für dein Business auf vier Rädern.",
    en: "Every food trailer begins as an idea on paper and becomes a home for your business on wheels.",
    fr: "Chaque remorque snack commence comme une idée sur papier et devient la base mobile de votre activité.",
    nl: "Elke foodtrailer begint als idee op papier en wordt de mobiele basis van je bedrijf.",
  },
  footerRights: {
    de: "Alle Rechte vorbehalten.",
    en: "All rights reserved.",
    fr: "Tous droits réservés.",
    nl: "Alle rechten voorbehouden.",
  },
  follow: {
    de: "Folgen",
    en: "Follow",
    fr: "Suivre",
    nl: "Volgen",
  },
  legalNotice: {
    de: "Impressum",
    en: "Legal notice",
    fr: "Mentions légales",
    nl: "Impressum",
  },
  privacy: {
    de: "Datenschutz",
    en: "Privacy",
    fr: "Confidentialité",
    nl: "Privacy",
  },
  menuOpen: {
    de: "Menü öffnen",
    en: "Open menu",
    fr: "Ouvrir le menu",
    nl: "Menu openen",
  },
  filter: {
    de: "Filter",
    en: "Filter",
    fr: "Filtre",
    nl: "Filter",
  },
  product: {
    de: "Produkt",
    en: "Product",
    fr: "Produit",
    nl: "Product",
  },
  sort: {
    de: "Sortieren",
    en: "Sort",
    fr: "Trier",
    nl: "Sorteren",
  },
  found: {
    de: "{count} {noun} gefunden",
    en: "{count} {noun} found",
    fr: "{count} {noun} trouvés",
    nl: "{count} {noun} gevonden",
  },
  products: {
    de: "Produkte",
    en: "products",
    fr: "produits",
    nl: "producten",
  },
  availability: {
    de: "Verfügbarkeit",
    en: "Availability",
    fr: "Disponibilité",
    nl: "Beschikbaarheid",
  },
  request: {
    de: "Anfrage",
    en: "Request",
    fr: "Demande",
    nl: "Aanvraag",
  },
  choosePrefix: {
    de: "Wähle aus,",
    en: "Choose",
    fr: "Choisissez",
    nl: "Kies",
  },
  chooseBuyTitle: {
    de: "Wähle aus, was du kaufen möchtest.",
    en: "Choose what you want to buy.",
    fr: "Choisissez ce que vous souhaitez acheter.",
    nl: "Kies wat je wilt kopen.",
  },
  chooseRentTitle: {
    de: "Wähle aus, was du mieten möchtest.",
    en: "Choose what you want to rent.",
    fr: "Choisissez ce que vous souhaitez louer.",
    nl: "Kies wat je wilt huren.",
  },
  buyQuestionTitle: {
    de: "Was möchtest du kaufen?",
    en: "What do you want to buy?",
    fr: "Que souhaitez-vous acheter ?",
    nl: "Wat wil je kopen?",
  },
  rentQuestionTitle: {
    de: "Was möchtest du mieten?",
    en: "What do you want to rent?",
    fr: "Que souhaitez-vous louer ?",
    nl: "Wat wil je huren?",
  },
  buyLandingIntro: {
    de: "Fertige Imbiss-Anhänger und Verkaufs-Pavillons, die kurzfristig verfügbar sind.",
    en: "Ready-made food trailers and sales pavilions available at short notice.",
    fr: "Remorques snack et pavillons de vente prêts rapidement.",
    nl: "Kant-en-klare foodtrailers en verkooppaviljoens die snel beschikbaar zijn.",
  },
  rentLandingIntro: {
    de: "Mietbare Imbiss-Anhänger und Verkaufs-Pavillons für Märkte, Events und saisonale Einsätze.",
    en: "Food trailers and sales pavilions to rent for markets, events and seasonal use.",
    fr: "Remorques snack et pavillons à louer pour marchés, événements et saisons.",
    nl: "Foodtrailers en verkooppaviljoens te huur voor markten, events en seizoenen.",
  },
  planIndividually: {
    de: "Individuell planen",
    en: "Plan individually",
    fr: "Planifier sur mesure",
    nl: "Individueel plannen",
  },
  directConfigurator: {
    de: "Wir öffnen direkt den passenden Konfigurator für deine Produktauswahl.",
    en: "We open the matching configurator for your product selection.",
    fr: "Nous ouvrons le configurateur adapté à votre sélection.",
    nl: "We openen direct de passende configurator voor je productkeuze.",
  },
  chooseConfigurator: {
    de: "Du startest bei der Auswahl zwischen Imbiss-Anhänger und Pavillon.",
    en: "You start by choosing between food trailer and pavilion.",
    fr: "Vous commencez par choisir entre remorque snack et pavillon.",
    nl: "Je start met de keuze tussen foodtrailer en paviljoen.",
  },
  step: {
    de: "Schritt {step} von {total}",
    en: "Step {step} of {total}",
    fr: "Étape {step} sur {total}",
    nl: "Stap {step} van {total}",
  },
  model: {
    de: "Modell",
    en: "Model",
    fr: "Modèle",
    nl: "Model",
  },
  windows: {
    de: "Fenster",
    en: "Windows",
    fr: "Fenêtres",
    nl: "Ramen",
  },
  openings: {
    de: "Öffnungen",
    en: "Openings",
    fr: "Ouvertures",
    nl: "Openingen",
  },
  details: {
    de: "Details",
    en: "Details",
    fr: "Détails",
    nl: "Details",
  },
  concept: {
    de: "Konzept",
    en: "Concept",
    fr: "Concept",
    nl: "Concept",
  },
  offer: {
    de: "Angebot",
    en: "Quote",
    fr: "Offre",
    nl: "Offerte",
  },
  length: {
    de: "Länge",
    en: "Length",
    fr: "Longueur",
    nl: "Lengte",
  },
  size: {
    de: "Größe",
    en: "Size",
    fr: "Taille",
    nl: "Maat",
  },
  weight: {
    de: "Gewicht",
    en: "Weight",
    fr: "Poids",
    nl: "Gewicht",
  },
  price: {
    de: "Preis",
    en: "Price",
    fr: "Prix",
    nl: "Prijs",
  },
  yourSelection: {
    de: "Deine Auswahl",
    en: "Your selection",
    fr: "Votre sélection",
    nl: "Je selectie",
  },
  modelAndLength: {
    de: "Modell & Länge",
    en: "Model & length",
    fr: "Modèle et longueur",
    nl: "Model en lengte",
  },
  chooseBaseModel: {
    de: "Wähle das Grundmodell für deinen Anhänger.",
    en: "Choose the base model for your trailer.",
    fr: "Choisissez le modèle de base de votre remorque.",
    nl: "Kies het basismodel voor je trailer.",
  },
  choosePavilionSize: {
    de: "Wähle zuerst die Größe deines Verkaufs-Pavillons. Öffnungen und Ausstattung legst du danach fest.",
    en: "First choose the size of your sales pavilion. Openings and equipment follow next.",
    fr: "Choisissez d'abord la taille de votre pavillon. Les ouvertures et l'équipement suivront.",
    nl: "Kies eerst de maat van je verkooppaviljoen. Openingen en uitrusting volgen daarna.",
  },
  pavilionIntro: {
    de: "Der Pavillon ist die günstigere, modulare Alternative zum Anhänger. Wähle unten die passende Grundfläche für deinen Einsatz.",
    en: "The pavilion is the more affordable modular alternative to a trailer. Choose the right footprint below.",
    fr: "Le pavillon est l'alternative modulaire plus économique à la remorque. Choisissez la surface adaptée.",
    nl: "Het paviljoen is het voordeligere modulaire alternatief voor een trailer. Kies hieronder de juiste oppervlakte.",
  },
  trailerConfiguratorDescription: {
    de: "Für mobile Gastronomie mit Fahrgestell, Verkaufsfenstern und frei wählbarem Grundmodell.",
    en: "For mobile gastronomy with chassis, sales windows and a freely selectable base model.",
    fr: "Pour la gastronomie mobile avec châssis, fenêtres de vente et modèle de base au choix.",
    nl: "Voor mobiele gastronomie met chassis, verkoopramen en vrij te kiezen basismodel.",
  },
  pavilionConfiguratorDescription: {
    de: "Die günstigere, modulare Lösung für Markt, Event und schnellen Start mit frei wählbaren Öffnungen.",
    en: "The more affordable modular solution for markets, events and a quick start with freely selectable openings.",
    fr: "La solution modulaire plus abordable pour marchés, événements et démarrage rapide avec ouvertures au choix.",
    nl: "De voordeligere modulaire oplossing voor markt, event en snelle start met vrij te kiezen openingen.",
  },
  windowVariant: {
    de: "Fenstervariante",
    en: "Window variant",
    fr: "Variante de fenêtre",
    nl: "Raamvariant",
  },
  windowVariants: {
    de: "Fenstervarianten",
    en: "Window variants",
    fr: "Variantes de fenêtres",
    nl: "Raamvarianten",
  },
  windowHint: {
    de: "Wähle Anzahl, Art und Anordnung der Verkaufsfenster.",
    en: "Choose the number, type and layout of the sales windows.",
    fr: "Choisissez le nombre, le type et la disposition des fenêtres de vente.",
    nl: "Kies aantal, type en indeling van de verkoopramen.",
  },
  openingHint: {
    de: "Wähle, wie viele Seiten deines Verkaufs-Pavillons offen sein sollen.",
    en: "Choose how many sides of your sales pavilion should be open.",
    fr: "Choisissez combien de côtés du pavillon doivent être ouverts.",
    nl: "Kies hoeveel zijden van je verkooppaviljoen open moeten zijn.",
  },
  projectDetails: {
    de: "Projektdetails",
    en: "Project details",
    fr: "Détails du projet",
    nl: "Projectdetails",
  },
  customizeProduct: {
    de: "Passe Erscheinungsbild und Ausstattung deines Produkts an.",
    en: "Adjust the look and equipment of your product.",
    fr: "Personnalisez l'apparence et l'équipement de votre produit.",
    nl: "Pas uitstraling en uitrusting van je product aan.",
  },
  brandingTitle: {
    de: "Individualisierung - Logo oder Design",
    en: "Customization - logo or design",
    fr: "Personnalisation - logo ou design",
    nl: "Personalisatie - logo of ontwerp",
  },
  brandingHint: {
    de: "Lade ein Logo, eine Skizze oder ein Referenzbild hoch. Wir nutzen es als Grundlage für eine spätere Visualisierung.",
    en: "Upload a logo, sketch or reference image. We use it as the basis for a later visualization.",
    fr: "Téléversez un logo, un croquis ou une image de référence pour une future visualisation.",
    nl: "Upload een logo, schets of referentiebeeld. We gebruiken dit als basis voor de visualisatie.",
  },
  chooseFile: {
    de: "Datei auswählen",
    en: "Choose file",
    fr: "Choisir un fichier",
    nl: "Bestand kiezen",
  },
  fileHelp: {
    de: "PNG, JPG, WEBP oder PDF. Der Dateiname wird in der Anfrage übernommen.",
    en: "PNG, JPG, WEBP or PDF. The file name is included in the request.",
    fr: "PNG, JPG, WEBP ou PDF. Le nom du fichier est inclus dans la demande.",
    nl: "PNG, JPG, WEBP of PDF. De bestandsnaam komt mee in de aanvraag.",
  },
  fileMailNote: {
    de: "Hinweis: Über den aktuellen Mail-Link kann die Datei nicht automatisch angehängt werden. Die Anfrage erinnert dich daran, die Datei im E-Mail-Programm mitzusenden.",
    en: "Note: The current mail link cannot attach files automatically. The request reminds you to attach it in your email app.",
    fr: "Remarque : le lien e-mail actuel ne peut pas joindre le fichier automatiquement.",
    nl: "Let op: de huidige mail-link kan geen bestanden automatisch bijvoegen.",
  },
  kitchenConcept: {
    de: "Küchenkonzept",
    en: "Kitchen concept",
    fr: "Concept cuisine",
    nl: "Keukenconcept",
  },
  kitchenHint: {
    de: "Wähle ein fertiges Gastro-Paket oder stelle deine Geräte selbst zusammen.",
    en: "Choose a ready-made package or assemble your own equipment.",
    fr: "Choisissez un pack prêt à l'emploi ou composez votre équipement.",
    nl: "Kies een kant-en-klaar pakket of stel zelf je apparaten samen.",
  },
  packageSaving: {
    de: "Paketvorteil gegenüber Einzelwahl:",
    en: "Package saving compared with individual selection:",
    fr: "Avantage du pack par rapport au choix individuel :",
    nl: "Pakketvoordeel tegenover losse keuze:",
  },
  includes: {
    de: "Enthält:",
    en: "Includes:",
    fr: "Inclut :",
    nl: "Bevat:",
  },
  includedInPackage: {
    de: "im Paket enthalten",
    en: "included in package",
    fr: "inclus dans le pack",
    nl: "in pakket inbegrepen",
  },
  contactDetails: {
    de: "Deine Kontaktdaten",
    en: "Your contact details",
    fr: "Vos coordonnées",
    nl: "Je contactgegevens",
  },
  contactHint: {
    de: "Damit wir dir dein Angebot zu dieser Konfiguration zusenden können.",
    en: "So we can send you a quote for this configuration.",
    fr: "Pour que nous puissions vous envoyer une offre.",
    nl: "Zodat we je een offerte kunnen sturen.",
  },
  firstName: {
    de: "Vorname *",
    en: "First name *",
    fr: "Prénom *",
    nl: "Voornaam *",
  },
  lastName: {
    de: "Nachname *",
    en: "Last name *",
    fr: "Nom *",
    nl: "Achternaam *",
  },
  email: {
    de: "E-Mail *",
    en: "Email *",
    fr: "E-mail *",
    nl: "E-mail *",
  },
  phone: {
    de: "Telefon",
    en: "Phone",
    fr: "Téléphone",
    nl: "Telefoon",
  },
  extraInfo: {
    de: "Zusätzliche Informationen",
    en: "Additional information",
    fr: "Informations supplémentaires",
    nl: "Extra informatie",
  },
  extraInfoPlaceholder: {
    de: "Gibt es noch etwas, das wir wissen sollten?",
    en: "Is there anything else we should know?",
    fr: "Y a-t-il autre chose à savoir ?",
    nl: "Is er nog iets dat we moeten weten?",
  },
  yourConfiguration: {
    de: "Deine Konfiguration",
    en: "Your configuration",
    fr: "Votre configuration",
    nl: "Je configuratie",
  },
  checkSelection: {
    de: "Prüfe deine Auswahl - wir melden uns mit einem individuellen Angebot bei dir.",
    en: "Check your selection - we will get back to you with an individual quote.",
    fr: "Vérifiez votre sélection - nous vous enverrons une offre personnalisée.",
    nl: "Controleer je selectie - we nemen contact op met een persoonlijke offerte.",
  },
  modelVariant: {
    de: "Modell/Variante",
    en: "Model/variant",
    fr: "Modèle/variante",
    nl: "Model/variant",
  },
  logoDesign: {
    de: "Logo/Design",
    en: "Logo/design",
    fr: "Logo/design",
    nl: "Logo/ontwerp",
  },
  packagePrice: {
    de: "Paketpreis",
    en: "Package price",
    fr: "Prix du pack",
    nl: "Pakketprijs",
  },
  sink: {
    de: "Spüle",
    en: "Sink",
    fr: "Évier",
    nl: "Spoelbak",
  },
  included: {
    de: "inklusive",
    en: "included",
    fr: "inclus",
    nl: "inbegrepen",
  },
  equipment: {
    de: "Geräte",
    en: "Equipment",
    fr: "Équipement",
    nl: "Apparatuur",
  },
  services: {
    de: "Dienstleistungen",
    en: "Services",
    fr: "Services",
    nl: "Diensten",
  },
  startPriceNote: {
    de: "Startpreis {product}: {price} - zzgl. der oben gewählten Ausstattung. Dies ist eine unverbindliche Schätzung und kein offizielles Angebot; die endgültige Konfiguration und der Preis werden von uns nach deiner Anfrage bestätigt.",
    en: "Starting price {product}: {price} plus selected equipment. This is a non-binding estimate, not an official quote; we confirm the final configuration and price after your request.",
    fr: "Prix de départ {product} : {price}, hors équipement choisi. Estimation non contractuelle.",
    nl: "Startprijs {product}: {price} plus gekozen uitrusting. Dit is een vrijblijvende schatting.",
  },
  acceptPrivacy: {
    de: "Ich akzeptiere die",
    en: "I accept the",
    fr: "J'accepte la",
    nl: "Ik accepteer de",
  },
  requestOffer: {
    de: "Angebot anfragen",
    en: "Request quote",
    fr: "Demander une offre",
    nl: "Offerte aanvragen",
  },
  mailOpened: {
    de: "Dein E-Mail-Programm sollte sich gerade geöffnet haben - bitte sende die Nachricht dort ab.",
    en: "Your email app should have opened - please send the message there.",
    fr: "Votre application e-mail devrait s'être ouverte - envoyez le message depuis là.",
    nl: "Je e-mailprogramma is geopend - verstuur het bericht daar.",
  },
  mailHelp: {
    de: "Öffnet dein E-Mail-Programm mit deiner vorausgefüllten Konfiguration.",
    en: "Opens your email app with your pre-filled configuration.",
    fr: "Ouvre votre e-mail avec la configuration préremplie.",
    nl: "Opent je e-mailprogramma met je ingevulde configuratie.",
  },
  back: {
    de: "Zurück",
    en: "Back",
    fr: "Retour",
    nl: "Terug",
  },
  nextStep: {
    de: "Nächster Schritt",
    en: "Next step",
    fr: "Étape suivante",
    nl: "Volgende stap",
  },
  currencyLive: {
    de: "Live-Kurs",
    en: "Live rate",
    fr: "Taux en direct",
    nl: "Live koers",
  },
  currencyFallback: {
    de: "Fallback-Kurs",
    en: "Fallback rate",
    fr: "Taux de secours",
    nl: "Fallback koers",
  },
} satisfies Record<string, Record<LanguageCode, string>>;

export type TranslationKey = keyof typeof translations;

export function translate(key: TranslationKey, language: LanguageCode, values?: Record<string, string | number>) {
  const template = translations[key]?.[language] ?? translations[key]?.de ?? String(key);
  if (!values) return template;

  return Object.entries(values).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
    template
  );
}
