"use client";

import { useLocaleSettings } from "./LocaleProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useLocaleSettings();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Helles Design aktivieren" : "Dunkles Design aktivieren"}
      className={`relative flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-300 ${
        isDark ? "border-graphit bg-graphit" : "border-graphit/15 bg-transparent"
      }`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full shadow-sm transition-transform duration-300 ease-out ${
          isDark ? "translate-x-[22px]" : "translate-x-0.5"
        } ${isDark ? "bg-kreide" : "bg-graphit/55"}`}
      />
    </button>
  );
}
