"use client";

import { useLocaleSettings } from "./LocaleProvider";

const columns = [
  {
    heading: "MINO",
    links: [
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    heading: "Sofort verfügbar",
    links: [
      { label: "Modelle", href: "/modelle" },
      { label: "Imbiss-Anhänger", href: "/kaufen/imbiss-anhaenger" },
      { label: "Pavillons", href: "/kaufen/pavillons" },
      { label: "Jetzt konfigurieren", href: "/konfigurator" },
    ],
  },
  {
    heading: "Mieten",
    links: [
      { label: "Imbiss-Anhänger", href: "/mieten/imbiss-anhaenger" },
      { label: "Pavillons", href: "/mieten/pavillons" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Kontakt", href: "/kontakt" },
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
    ],
  },
];

// TODO: echte Social-Media-Profile verlinken, sobald vorhanden.
const social = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path
          d="M14 8.5h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3.5h2V21h3.5v-6.5H16l.5-3.5h-3V9c0-.6.4-1 1-1Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <rect x="2.5" y="6" width="19" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10.5 9.5l5 2.5-5 2.5v-5Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <line x1="7.5" y1="10" x2="7.5" y2="16.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="7.5" cy="7" r="1" fill="currentColor" />
        <path
          d="M11 16.5V10M11 12.8c0-1.5 1-2.8 2.5-2.8s2.5 1 2.5 2.8v3.7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function Footer() {
  const { t } = useLocaleSettings();

  return (
    <footer className="relative overflow-hidden border-t border-graphit/10 bg-beton">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 pt-12 pb-8 lg:flex-row lg:justify-between lg:px-10 lg:pt-14 lg:pb-8">
        <div className="flex max-w-sm flex-col gap-6">
          <p className="font-sans text-xl leading-8 text-graphit/80">
            {t("footerText")}
          </p>
          <p className="font-sans text-sm font-bold text-graphit">— MINO</p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:gap-x-12">
          {columns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <p className="font-sans text-sm font-bold text-graphit">
                {col.heading === "Sofort verfügbar"
                  ? t("navAvailable")
                  : col.heading === "Mieten"
                    ? t("navRent")
                    : col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="font-sans text-sm text-graphit/70 hover:text-graphit">
                      {l.label === "Über uns"
                        ? t("navAbout")
                        : l.label === "Kontakt"
                          ? t("navContact")
                          : l.label === "Modelle"
                            ? t("navModels")
                            : l.label === "Imbiss-Anhänger"
                              ? t("snackTrailer")
                              : l.label === "Pavillons"
                                ? t("pavilion")
                                : l.label === "Jetzt konfigurieren"
                                  ? t("ctaConfigure")
                                  : l.label === "Impressum"
                                    ? t("legalNotice")
                                    : l.label === "Datenschutz"
                                      ? t("privacy")
                                      : l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none mt-2 -mb-[0.8vw] overflow-hidden select-none lg:mt-4"
        style={{
          maskImage: "linear-gradient(to bottom, black 20%, transparent 86%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 86%)",
        }}
      >
        <div className="flex -translate-x-[10vw] items-end gap-[5vw] whitespace-nowrap">
          {Array.from({ length: 3 }).map((_, index) => (
            <span
              key={index}
              className="font-sans text-[16vw] leading-[0.72] font-black tracking-tight text-graphit/10"
            >
              MINO
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-graphit/10 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p className="font-sans text-xs text-graphit/60">
          © 2026 MINO. <span className="font-bold text-graphit">{t("footerRights")}</span>
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
          <ul aria-label={t("follow")} className="flex items-center gap-1.5">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-graphit/55 transition-colors hover:bg-graphit/5 hover:text-graphit"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
          <span aria-hidden className="hidden h-4 w-px bg-graphit/15 sm:block" />
          <ul className="flex flex-row gap-6">
            <li>
              <a href="/impressum" className="font-sans text-xs text-graphit/60 hover:text-graphit">
                {t("legalNotice")}
              </a>
            </li>
            <li>
              <a href="/datenschutz" className="font-sans text-xs text-graphit/60 hover:text-graphit">
                {t("privacy")}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
