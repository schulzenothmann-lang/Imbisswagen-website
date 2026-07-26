"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { StorefrontIcon } from "@phosphor-icons/react/dist/csr/Storefront";
import { Menu } from "lucide-react";

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
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LocalizedPrice } from "./LocalizedPrice";
import { useLocaleSettings } from "./LocaleProvider";
import { RegionSwitcher } from "./RegionSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { translateCopy } from "@/lib/localized-content";

type TrailerGlyphSize = "small" | "medium" | "large";

const trailerBodyClasses: Record<TrailerGlyphSize, string> = {
  small: "h-[10px] w-[13px]",
  medium: "h-[11px] w-[16px]",
  large: "h-[12px] w-[19px]",
};

function TrailerGlyph({ size }: { size: TrailerGlyphSize }) {
  const hasTwoWheels = size !== "small";

  return (
    <span aria-hidden className="relative block h-5 w-6 shrink-0">
      <span
        className={`absolute bottom-[5px] left-0 rounded-[1px] border-[1.5px] border-current ${trailerBodyClasses[size]}`}
      >
        <span className="absolute -right-[5px] bottom-[1px] h-[1.5px] w-[5px] bg-current" />
        <span
          className={`absolute -bottom-[4px] size-1 rounded-full bg-current ${
            hasTwoWheels ? "left-[3px]" : "left-1/2 -translate-x-1/2"
          }`}
        />
        {hasTwoWheels && <span className="absolute right-[3px] -bottom-[4px] size-1 rounded-full bg-current" />}
      </span>
    </span>
  );
}

const models = [
  {
    id: "light",
    name: "Light",
    specs: "1,5 M · 500 KG",
    price: "ab 12.900 €",
    icon: <TrailerGlyph size="small" />,
  },
  {
    id: "classic",
    name: "Classic",
    specs: "5 M · 1,5 T",
    price: "ab 21.900 €",
    icon: <TrailerGlyph size="medium" />,
  },
  {
    id: "premium",
    name: "Premium",
    specs: "5,5 M · 1,7 T",
    price: "ab 25.900 €",
    icon: <TrailerGlyph size="large" />,
  },
  {
    id: "station",
    name: "Station",
    specs: "ab 3 × 3 M · modular",
    price: "ab 7.900 €",
    icon: <StorefrontIcon aria-hidden className="size-5 shrink-0" weight="regular" />,
  },
];

const purchaseLinks = [
  {
    href: "/angebote?angebot=kaufen&produkt=anhaenger",
    name: "Imbiss-Anhänger",
    eyebrow: "Sofort verfügbar",
    icon: <TrailerGlyph size="large" />,
  },
  {
    href: "/angebote?angebot=kaufen&produkt=pavillon",
    name: "Verkaufspavillons",
    eyebrow: "Günstiger starten",
    icon: <StorefrontIcon aria-hidden className="size-6 shrink-0" weight="regular" />,
  },
];

const rentalLinks = [
  {
    href: "/angebote?angebot=mieten&produkt=anhaenger",
    name: "Imbiss-Anhänger",
    eyebrow: "Flexibel starten",
    icon: <TrailerGlyph size="large" />,
  },
  {
    href: "/angebote?angebot=mieten&produkt=pavillon",
    name: "Verkaufspavillons",
    eyebrow: "Kurzfristig mieten",
    icon: <StorefrontIcon aria-hidden className="size-6 shrink-0" weight="regular" />,
  },
];

const navLinks = [
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
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
  const pathname = usePathname();
  const { region, t } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);
  const [hidden, setHidden] = useState(false);
  const hoveredRef = useRef(false);
  const lastScrollY = useRef(0);

  // "Du bist hier": aktiven Navigationspunkt anhand des Pfads markieren.
  const isActive = (prefixes: string[]) =>
    prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
  const activeUnderline = "underline decoration-graphit/40 decoration-[1.5px] underline-offset-[0.55rem]";

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let frame = 0;

    function updateHeader() {
      frame = 0;
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

    function requestUpdate() {
      if (frame) return;
      frame = window.requestAnimationFrame(updateHeader);
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
    };
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
                <NavigationMenuTrigger
                  onClick={() => router.push("/modelle")}
                  className={isActive(["/modelle"]) ? activeUnderline : undefined}
                >
                  {t("navModels")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[22rem] p-2">
                    <NavigationMenuLink asChild>
                      <div>
                        {models.map((m) => (
                          <li key={m.id}>
                            <Link
                              href={`/modelle/${m.id}`}
                              className="grid select-none grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 rounded-sm px-3 py-2.5 no-underline outline-none transition-colors hover:bg-graphit/5 focus:bg-graphit/5"
                            >
                              <span className="flex size-8 items-center justify-center rounded-[2px] bg-graphit/5 text-graphit/65">
                                {m.icon}
                              </span>
                              <div className="min-w-0">
                                <p className="font-sans text-sm font-semibold text-graphit">{m.name}</p>
                                <p className="mt-0.5 font-sans text-[0.7rem] tracking-[0.04em] text-graphit/45 uppercase">
                                  {m.specs}
                                </p>
                              </div>
                              <span className="font-sans text-xs whitespace-nowrap text-graphit/55">
                                <LocalizedPrice value={m.price} />
                              </span>
                            </Link>
                          </li>
                        ))}
                      </div>
                    </NavigationMenuLink>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  onClick={() => router.push("/sofort-verfuegbar")}
                  className={isActive(["/sofort-verfuegbar", "/kaufen"]) ? activeUnderline : undefined}
                >
                  {t("navAvailable")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-72 p-2">
                    <NavigationMenuLink asChild>
                      <div>
                        {purchaseLinks.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="grid select-none grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 rounded-sm px-3 py-2.5 no-underline outline-none transition-colors hover:bg-graphit/5 focus:bg-graphit/5"
                            >
                              <span className="flex size-8 items-center justify-center rounded-[2px] bg-graphit/5 text-graphit/65">
                                {item.icon}
                              </span>
                              <div className="min-w-0">
                                <p className="font-sans text-sm font-semibold text-graphit">
                                  {item.href.includes("pavillon") ? t("pavilion") : t("snackTrailer")}
                                </p>
                                <p className="mt-0.5 font-sans text-xs text-graphit/50">{tc(item.eyebrow)}</p>
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
                <NavigationMenuTrigger
                  onClick={() => router.push("/mieten")}
                  className={isActive(["/mieten"]) ? activeUnderline : undefined}
                >
                  {t("navRent")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-72 p-2">
                    <NavigationMenuLink asChild>
                      <div>
                        {rentalLinks.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="grid select-none grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 rounded-sm px-3 py-2.5 no-underline outline-none transition-colors hover:bg-graphit/5 focus:bg-graphit/5"
                            >
                              <span className="flex size-8 items-center justify-center rounded-[2px] bg-graphit/5 text-graphit/65">
                                {item.icon}
                              </span>
                              <div className="min-w-0">
                                <p className="font-sans text-sm font-semibold text-graphit">
                                  {item.href.includes("pavillon") ? t("pavilion") : t("snackTrailer")}
                                </p>
                                <p className="mt-0.5 font-sans text-xs text-graphit/50">{tc(item.eyebrow)}</p>
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
                      className={`font-sans text-[0.98rem] leading-none font-normal tracking-normal whitespace-nowrap text-graphit/85 transition-opacity hover:opacity-60 ${
                        isActive([link.href]) ? activeUnderline : ""
                      }`}
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
            <SheetContent className="flex flex-col overflow-y-auto bg-beton">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-1 flex-col">
                <Accordion type="single" collapsible className="flex w-full flex-col">
                  <AccordionItem value="modelle" className="border-graphit/10">
                    <div className="flex items-center">
                      <SheetClose asChild>
                        <Link
                          href="/modelle"
                          className={`flex-1 py-4 font-sans text-base text-graphit transition-colors hover:text-graphit/70 ${
                            isActive(["/modelle"]) ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {t("navModels")}
                        </Link>
                      </SheetClose>
                      <AccordionTrigger
                        aria-label={`${t("navModels")}: ${t("menuOpen")}`}
                        className="w-11 flex-none justify-center px-0 py-4 hover:no-underline"
                      >
                        <span className="sr-only">{t("overview")}</span>
                      </AccordionTrigger>
                    </div>
                    <AccordionContent className="pb-3">
                      <SheetClose asChild>
                        <Link
                          href="/modelle"
                          className="mb-1 flex select-none rounded-sm p-3 font-sans text-sm font-semibold text-graphit outline-none transition-colors hover:bg-graphit/5"
                        >
                          {t("overview")}
                        </Link>
                      </SheetClose>
                      {models.map((m) => (
                        <SheetClose key={m.id} asChild>
                          <Link
                            href={`/modelle/${m.id}`}
                            className="grid select-none grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 rounded-sm px-3 py-2.5 outline-none transition-colors hover:bg-graphit/5"
                          >
                            <span className="flex size-8 items-center justify-center rounded-[2px] bg-graphit/5 text-graphit/65">
                              {m.icon}
                            </span>
                            <div className="min-w-0">
                              <p className="font-sans text-sm font-semibold text-graphit">{m.name}</p>
                              <p className="mt-0.5 font-sans text-[0.7rem] tracking-[0.04em] text-graphit/45 uppercase">
                                {m.specs}
                              </p>
                            </div>
                            <span className="font-sans text-xs whitespace-nowrap text-graphit/55">
                              <LocalizedPrice value={m.price} />
                            </span>
                          </Link>
                        </SheetClose>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="sofort-verfuegbar" className="border-graphit/10">
                    <div className="flex items-center">
                      <SheetClose asChild>
                        <Link
                          href="/sofort-verfuegbar"
                          className={`flex-1 py-4 font-sans text-base text-graphit transition-colors hover:text-graphit/70 ${
                            isActive(["/sofort-verfuegbar", "/kaufen"]) ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {t("navAvailable")}
                        </Link>
                      </SheetClose>
                      <AccordionTrigger
                        aria-label={`${t("navAvailable")}: ${t("menuOpen")}`}
                        className="w-11 flex-none justify-center px-0 py-4 hover:no-underline"
                      >
                        <span className="sr-only">{t("overview")}</span>
                      </AccordionTrigger>
                    </div>
                    <AccordionContent className="pb-3">
                      <SheetClose asChild>
                        <Link
                          href="/sofort-verfuegbar"
                          className="mb-1 flex select-none rounded-sm p-3 font-sans text-sm font-semibold text-graphit outline-none transition-colors hover:bg-graphit/5"
                        >
                          {t("overview")}
                        </Link>
                      </SheetClose>
                      {purchaseLinks.map((item) => (
                        <SheetClose key={item.href} asChild>
                          <Link
                            href={item.href}
                            className="grid select-none grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 rounded-sm px-3 py-2.5 outline-none transition-colors hover:bg-graphit/5"
                          >
                            <span className="flex size-8 items-center justify-center rounded-[2px] bg-graphit/5 text-graphit/65">
                              {item.icon}
                            </span>
                            <div className="min-w-0">
                              <p className="font-sans text-sm font-semibold text-graphit">
                                {item.href.includes("pavillon") ? t("pavilion") : t("snackTrailer")}
                              </p>
                              <p className="mt-0.5 font-sans text-xs text-graphit/50">{tc(item.eyebrow)}</p>
                            </div>
                          </Link>
                        </SheetClose>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="mieten" className="border-graphit/10">
                    <div className="flex items-center">
                      <SheetClose asChild>
                        <Link
                          href="/mieten"
                          className={`flex-1 py-4 font-sans text-base text-graphit transition-colors hover:text-graphit/70 ${
                            isActive(["/mieten"]) ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {t("navRent")}
                        </Link>
                      </SheetClose>
                      <AccordionTrigger
                        aria-label={`${t("navRent")}: ${t("menuOpen")}`}
                        className="w-11 flex-none justify-center px-0 py-4 hover:no-underline"
                      >
                        <span className="sr-only">{t("overview")}</span>
                      </AccordionTrigger>
                    </div>
                    <AccordionContent className="pb-3">
                      <SheetClose asChild>
                        <Link
                          href="/mieten"
                          className="mb-1 flex select-none rounded-sm p-3 font-sans text-sm font-semibold text-graphit outline-none transition-colors hover:bg-graphit/5"
                        >
                          {t("overview")}
                        </Link>
                      </SheetClose>
                      {rentalLinks.map((item) => (
                        <SheetClose key={item.href} asChild>
                          <Link
                            href={item.href}
                            className="grid select-none grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 rounded-sm px-3 py-2.5 outline-none transition-colors hover:bg-graphit/5"
                          >
                            <span className="flex size-8 items-center justify-center rounded-[2px] bg-graphit/5 text-graphit/65">
                              {item.icon}
                            </span>
                            <div className="min-w-0">
                              <p className="font-sans text-sm font-semibold text-graphit">
                                {item.href.includes("pavillon") ? t("pavilion") : t("snackTrailer")}
                              </p>
                              <p className="mt-0.5 font-sans text-xs text-graphit/50">{tc(item.eyebrow)}</p>
                            </div>
                          </Link>
                        </SheetClose>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex flex-col">
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <Link
                        href={link.href}
                        className={`border-b border-graphit/10 py-4 font-sans text-base text-graphit transition-colors hover:text-graphit/70 ${
                          isActive([link.href]) ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {link.href === "/ueber-uns" ? t("navAbout") : t("navContact")}
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                <div className="mt-auto flex flex-col gap-5 pt-8 pb-2">
                  <Button asChild size="lg" className="w-full">
                    <SheetClose asChild>
                      <Link href="/konfigurator">{t("ctaConfigure")}</Link>
                    </SheetClose>
                  </Button>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <RegionSwitcher placement="up" align="left" />
                      <SheetClose asChild>
                        <Link
                          href="/impressum"
                          className="font-sans text-xs text-graphit/50 transition-colors hover:text-graphit"
                        >
                          {t("legalNotice")}
                        </Link>
                      </SheetClose>
                    </div>
                    <div className="flex items-center gap-3">
                      <SheetClose asChild>
                        <Link
                          href="/datenschutz"
                          className="font-sans text-xs text-graphit/50 transition-colors hover:text-graphit"
                        >
                          {t("privacy")}
                        </Link>
                      </SheetClose>
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
