"use client";

import { useEffect, useRef, useState } from "react";

import { regions } from "@/lib/locale";
import { useLocaleSettings } from "./LocaleProvider";

function FlagIcon({ iso }: { iso: string }) {
  return <span className={`fi fi-${iso} h-3 w-4 shrink-0 rounded-none`} />;
}

export function RegionSwitcher({
  placement = "down",
  align = "right",
}: {
  placement?: "up" | "down";
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const { region: selected, setRegionCode, ratesLive, t } = useLocaleSettings();

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`${selected.country}, ${selected.language}, ${selected.currency}`}
        className="flex cursor-pointer items-center gap-1.5 text-graphit/50 transition-colors hover:text-graphit"
      >
        <FlagIcon iso={selected.iso} />
        <span className="hidden font-sans text-xs font-bold text-graphit/55 xl:inline">
          {selected.language} · {selected.currency}
        </span>
        <svg
          viewBox="0 0 12 8"
          className={`h-2 w-2.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
        >
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <ul
          className={`absolute z-50 w-64 overflow-hidden rounded-sm border border-graphit/10 bg-beton shadow-[0_8px_28px_rgba(0,0,0,0.18)] ${
            placement === "up" ? "bottom-full mb-3" : "top-full mt-3"
          } ${align === "left" ? "left-0" : "right-0"}`}
        >
          <li className="border-b border-graphit/10 px-4 py-2 font-sans text-[11px] font-bold tracking-wide text-graphit/45 uppercase">
            {ratesLive ? t("currencyLive") : t("currencyFallback")}
          </li>
          {regions.map((r) => (
            <li key={r.code}>
              <button
                type="button"
                onClick={() => {
                  setRegionCode(r.code);
                  setOpen(false);
                }}
                title={r.country}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition-colors hover:bg-graphit/5 ${
                  r.code === selected.code ? "bg-graphit/5" : ""
                }`}
              >
                <FlagIcon iso={r.iso} />
                <span className="flex flex-col font-sans">
                  <span className="text-xs font-bold text-graphit">{r.country}</span>
                  <span className="text-[11px] text-graphit/55">
                    {r.language} · {r.currency}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
