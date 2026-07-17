import * as React from "react";

import { cn } from "@/lib/utils";

interface EyebrowProps extends React.HTMLAttributes<HTMLElement> {
  /** Auf dunklen Sektionen (Hero-Video, ClosingCta) hellen Ton verwenden. */
  onDark?: boolean;
}

function Eyebrow({ onDark = false, className, ...props }: EyebrowProps) {
  return (
    <small
      className={cn(
        "block font-sans text-xs font-semibold tracking-[0.14em] uppercase",
        onDark ? "text-kreide/60" : "text-graphit/55",
        className
      )}
      {...props}
    />
  );
}

export { Eyebrow };
