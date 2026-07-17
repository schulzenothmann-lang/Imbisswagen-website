import * as React from "react";

import { cn } from "@/lib/utils";

const aspectClasses = {
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-video",
  "3/4": "aspect-[3/4]",
  square: "aspect-square",
} as const;

interface MediaPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Seitenverhältnis; ohne Angabe füllt der Platzhalter den Parent (dann h-full o. ä. via className setzen). */
  aspect?: keyof typeof aspectClasses;
  /** Wasserzeichen-Text. */
  label?: string;
}

/** Einheitlicher Platzhalter für noch fehlende Fotos — wird später zentral gegen <Image> getauscht. */
function MediaPlaceholder({ aspect, label = "MINO", className, ...props }: MediaPlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-graphit/5",
        aspect && aspectClasses[aspect],
        className
      )}
      {...props}
    >
      <span className="font-sans text-4xl font-black tracking-tight text-graphit/10 select-none lg:text-5xl">
        {label}
      </span>
    </div>
  );
}

export { MediaPlaceholder };
