const tones = {
  graphit: { ink: "text-graphit", fill: "fill-graphit" },
  kreide: { ink: "text-kreide", fill: "fill-kreide" },
} as const;

// Farbe für Label/Sublabel/Ringe, sobald der Stempel gefüllt ist (active) —
// muss auf der jeweiligen tone-Fläche lesbar sein.
const onFill = {
  graphit: "text-kreide",
  kreide: "text-graphit",
} as const;

export function Stempel({
  label,
  sublabel,
  tone = "graphit",
  active = false,
  className = "",
}: {
  label: string;
  sublabel?: string;
  tone?: keyof typeof tones;
  active?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative inline-flex h-[5.5rem] w-[5.5rem] shrink-0 -rotate-6 items-center justify-center transition-colors duration-500 ease-out ${
        active ? onFill[tone] : tones[tone].ink
      } ${className}`}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r="39"
          className={`transition-colors duration-500 ease-out ${active ? tones[tone].fill : "fill-transparent"}`}
        />
        <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2.5 2" opacity="0.85" />
        <circle cx="50" cy="50" r="39" stroke="currentColor" strokeWidth="1" opacity={active ? 0.3 : 0.5} />
      </svg>
      <div className="flex flex-col items-center gap-0.5 px-4 text-center">
        <span className="font-sans text-[9px] leading-tight font-bold tracking-[0.04em] uppercase">
          {label}
        </span>
        {sublabel && (
          <span
            className={`font-sans text-[7px] tracking-[0.04em] uppercase ${active ? "opacity-90" : "opacity-70"}`}
          >
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
