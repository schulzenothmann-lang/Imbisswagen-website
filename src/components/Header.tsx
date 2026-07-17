"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BadgeEuro, CalendarRange, Menu, Minimize2, Star, Store, Truck, Utensils } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LocalizedPrice } from "./LocalizedPrice";
import { useLocaleSettings } from "./LocaleProvider";
import { RegionSwitcher } from "./RegionSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { translateCopy } from "@/lib/localized-content";

const models = [
  {
    id: "xl",
    name: "X-ray",
    specs: "1,5 M · 500 KG",
    price: "12900",
    description: "Der Kleinste — kompakt, leicht und schnell einsatzbereit.",
    icon: <Minimize2 className="size-5 shrink-0" />,
  },
  {
    id: "basis",
    name: "Basis",
    specs: "5 M · 1,5 T",
    price: "ab 21.900 €",
    description: "Der Einstieg — solide Fläche für den ersten Auftritt.",
    icon: <Utensils className="size-5 shrink-0" />,
  },
  {
    id: "standard",
    name: "Standard",
    specs: "5,5 M · 1,7 T",
    price: "ab 25.900 €",
    description: "Der Bestseller — mehr Platz für Theke und Technik.",
    icon: <Truck className="size-5 shrink-0" />,
  },
  {
    id: "premium",
    name: "Premium",
    specs: "5,5 M · 1,7 T",
    price: "ab 25.900 €",
    description: "Für hohe Ansprüche — mehr Ausstattung, mehr Auftritt.",
    icon: <Star className="size-5 shrink-0" />,
  },
];

const purchaseLinks = [
  {
    href: "/kaufen/imbiss-anhaenger",
    name: "Imbiss-Anhänger",
    eyebrow: "Sofort verfügbar",
    description: "Fertige MINO Anhänger direkt anfragen und übernehmen.",
    icon: <BadgeEuro className="size-5 shrink-0" />,
  },
  {
    href: "/kaufen/pavillons",
    name: "Pavillons",
    eyebrow: "Günstiger starten",
    description: "Verkaufs-Pavillons als kompakte Alternative zum Anhänger.",
    icon: <Store className="size-5 shrink-0" />,
  },
];

const rentalLinks = [
  {
    href: "/mieten/imbiss-anhaenger",
    name: "Imbiss-Anhänger",
    eyebrow: "Flexibel starten",
    description: "Mietbare Anhänger für Events, Saison oder Übergang.",
    icon: <CalendarRange className="size-5 shrink-0" />,
  },
  {
    href: "/mieten/pavillons",
    name: "Pavillons",
    eyebrow: "Kurzfristig mieten",
    description: "Verkaufs-Pavillons für Märkte, Events und Tests.",
    icon: <Store className="size-5 shrink-0" />,
  },
];

const navLinks = [
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

const mobileExtraLinks = [
  { name: "Impressum", url: "/impressum" },
  { name: "Datenschutz", url: "/datenschutz" },
];

function Logo() {
  return (
    <Link href="/" aria-label="Startseite" className="flex items-center font-sans text-xl font-black tracking-tight text-graphit lg:text-2xl">
      MINO
    </Link>
  );
}

export function Header() {
  const router = useRouter();
  const { region, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);
  const [hidden, setHidden] = useState(false);
  const hoveredRef = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function onScroll() {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (hoveredRef.current || currentY < 96) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      onMouseEnter={() => {
        hoveredRef.current = true;
        setHidden(false);
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
      className={`fixed top-0 left-0 z-50 w-full border-b border-graphit/10 bg-beton transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto grid h-16 w-full max-w-none grid-cols-[auto_1fr_auto] items-center gap-5 px-6 lg:h-[4.25rem] lg:px-8">
        <Logo />

        <nav className="hidden items-center justify-center gap-8 lg:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-8 space-x-0">
              <NavigationMenuItem>
                <NavigationMenuTrigger onClick={() => router.push("/modelle")}>{t("navModels")}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-96 p-3">
                    <NavigationMenuLink asChild>
                      <div>
                        {models.map((m) => (
                          <li key={m.id}>
                            <Link
                              href={`/modelle/${m.id}`}
                              className="flex select-none gap-4 rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-graphit/5"
                            >
                              <span className="text-graphit/70">{m.icon}</span>
                              <div>
                                <div className="flex items-baseline gap-2 font-sans text-sm font-semibold text-graphit">
                                  {m.name}
                                  <span className="font-sans text-xs font-normal text-graphit/60">
                                    <LocalizedPrice value={m.price} />
                                  </span>
                                </div>
                                <p className="mt-1 font-sans text-sm leading-snug text-graphit/60">{tc(m.description)}</p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </div>
                    </NavigationMenuLink>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger onClick={() => router.push("/sofort-verfuegbar")}>
                  {t("navAvailable")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-80 p-3">
                    <NavigationMenuLink asChild>
                      <div>
                        {purchaseLinks.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="flex select-none gap-4 rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-graphit/5"
                            >
                              <span className="text-graphit/70">{item.icon}</span>
                              <div>
                                <div className="flex items-baseline gap-2 font-sans text-sm font-semibold text-graphit">
                                  {item.href.includes("pavillons") ? t("pavilion") : t("snackTrailer")}
                                  <span className="font-sans text-xs font-normal text-graphit/60">
                                    {item.href.includes("pavillons") ? t("cheaperStart") : t("navAvailable")}
                                  </span>
                                </div>
                                <p className="mt-1 font-sans text-sm leading-snug text-graphit/60">
                                  {item.href.includes("pavillons")
                                    ? t("pavilionPurchaseDescription")
                                    : t("trailerPurchaseDescription")}
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </div>
                    </NavigationMenuLink>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger onClick={() => router.push("/mieten")}>
                  {t("navRent")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-80 p-3">
                    <NavigationMenuLink asChild>
                      <div>
                        {rentalLinks.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="flex select-none gap-4 rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-graphit/5"
                            >
                              <span className="text-graphit/70">{item.icon}</span>
                              <div>
                                <div className="flex items-baseline gap-2 font-sans text-sm font-semibold text-graphit">
                                  {item.href.includes("pavillons") ? t("pavilion") : t("snackTrailer")}
                                  <span className="font-sans text-xs font-normal text-graphit/60">
                                    {item.href.includes("pavillons") ? t("rentShortTerm") : t("flexibleStart")}
                                  </span>
                                </div>
                                <p className="mt-1 font-sans text-sm leading-snug text-graphit/60">
                                  {item.href.includes("pavillons")
                                    ? t("pavilionRentalDescription")
                                    : t("trailerRentalDescription")}
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </div>
                    </NavigationMenuLink>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className="font-sans text-[0.98rem] leading-none font-normal tracking-normal whitespace-nowrap text-graphit/85 transition-opacity hover:opacity-60"
                    >
                      {link.href === "/ueber-uns" ? t("navAbout") : t("navContact")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <Button asChild className="ml-2 h-10 px-6 whitespace-nowrap">
            <Link href="/konfigurator">{t("ctaConfigure")}</Link>
          </Button>
        </nav>

        <div className="hidden items-center justify-end gap-4 lg:flex">
          <RegionSwitcher />
          <ThemeToggle />
        </div>

        <div className="col-start-3 justify-self-end lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-graphit/15 text-graphit" aria-label={t("menuOpen")}>
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto bg-beton">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>

              <div className="my-6 flex flex-col gap-6">
                <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                  <AccordionItem value="modelle" className="border-graphit/10">
                    <AccordionTrigger className="py-0 font-sans text-base font-normal text-graphit hover:no-underline">
                      {t("navModels")}
                    </AccordionTrigger>
                    <AccordionContent className="mt-2">
                      <Link
                        href="/modelle"
                        className="mb-1 flex select-none rounded-sm p-3 font-sans text-sm font-semibold text-graphit outline-none transition-colors hover:bg-graphit/5"
                      >
                        {t("overview")}
                      </Link>
                      {models.map((m) => (
                        <Link
                          key={m.id}
                          href={`/modelle/${m.id}`}
                          className="flex select-none gap-4 rounded-sm p-3 leading-none outline-none transition-colors hover:bg-graphit/5"
                        >
                          <span className="text-graphit/70">{m.icon}</span>
                          <div>
                            <div className="flex items-baseline gap-2 font-sans text-sm font-semibold text-graphit">
                              {m.name}
                              <span className="font-sans text-xs font-normal text-graphit/60">
                                <LocalizedPrice value={m.price} />
                              </span>
                            </div>
                            <p className="text-sm leading-snug text-graphit/60">{m.specs}</p>
                          </div>
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="sofort-verfuegbar" className="border-graphit/10">
                    <AccordionTrigger className="py-0 font-sans text-base font-normal text-graphit hover:no-underline">
                      {t("navAvailable")}
                    </AccordionTrigger>
                    <AccordionContent className="mt-2">
                      <Link
                        href="/sofort-verfuegbar"
                        className="mb-1 flex select-none rounded-sm p-3 font-sans text-sm font-semibold text-graphit outline-none transition-colors hover:bg-graphit/5"
                      >
                        {t("overview")}
                      </Link>
                      {purchaseLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex select-none gap-4 rounded-sm p-3 leading-none outline-none transition-colors hover:bg-graphit/5"
                        >
                          <span className="text-graphit/70">{item.icon}</span>
                          <div>
                            <div className="flex items-baseline gap-2 font-sans text-sm font-semibold text-graphit">
                              {item.href.includes("pavillons") ? t("pavilion") : t("snackTrailer")}
                              <span className="font-sans text-xs font-normal text-graphit/60">
                                {item.href.includes("pavillons") ? t("cheaperStart") : t("navAvailable")}
                              </span>
                            </div>
                            <p className="text-sm leading-snug text-graphit/60">
                              {item.href.includes("pavillons")
                                ? t("pavilionPurchaseDescription")
                                : t("trailerPurchaseDescription")}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="mieten" className="border-graphit/10">
                    <AccordionTrigger className="py-0 font-sans text-base font-normal text-graphit hover:no-underline">
                      {t("navRent")}
                    </AccordionTrigger>
                    <AccordionContent className="mt-2">
                      <Link
                        href="/mieten"
                        className="mb-1 flex select-none rounded-sm p-3 font-sans text-sm font-semibold text-graphit outline-none transition-colors hover:bg-graphit/5"
                      >
                        {t("overview")}
                      </Link>
                      {rentalLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex select-none gap-4 rounded-sm p-3 leading-none outline-none transition-colors hover:bg-graphit/5"
                        >
                          <span className="text-graphit/70">{item.icon}</span>
                          <div>
                            <div className="flex items-baseline gap-2 font-sans text-sm font-semibold text-graphit">
                              {item.href.includes("pavillons") ? t("pavilion") : t("snackTrailer")}
                              <span className="font-sans text-xs font-normal text-graphit/60">
                                {item.href.includes("pavillons") ? t("rentShortTerm") : t("flexibleStart")}
                              </span>
                            </div>
                            <p className="text-sm leading-snug text-graphit/60">
                              {item.href.includes("pavillons")
                                ? t("pavilionRentalDescription")
                                : t("trailerRentalDescription")}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-sm px-3 py-2 font-sans text-base font-normal text-graphit transition-colors hover:bg-graphit/5"
                    >
                      {link.href === "/ueber-uns" ? t("navAbout") : t("navContact")}
                    </Link>
                  ))}
                </div>

                <div className="border-t border-graphit/10 py-4">
                  <div className="grid grid-cols-2 justify-start">
                    {mobileExtraLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.url}
                        className="inline-flex h-10 items-center gap-2 rounded-sm px-3 py-2 font-sans text-sm text-graphit/60 transition-colors hover:bg-graphit/5 hover:text-graphit"
                      >
                        {link.url === "/impressum" ? t("legalNotice") : t("privacy")}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 border-t border-graphit/10 pt-4">
                  <RegionSwitcher />
                  <ThemeToggle />
                </div>

                <Button asChild size="lg" className="w-full">
                  <Link href="/konfigurator">{t("ctaConfigure")}</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
