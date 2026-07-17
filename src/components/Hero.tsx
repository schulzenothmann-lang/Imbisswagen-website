"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useLocaleSettings } from "./LocaleProvider";

export function Hero() {
  const { t } = useLocaleSettings();
  const heroRef = useRef<HTMLElement>(null);
  const [ctaActive, setCtaActive] = useState(false);
  const [headerActive, setHeaderActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroBlurred = ctaActive || headerActive || scrolled;

  useEffect(() => {
    function updateScrolled() {
      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      setScrolled(rect.top < -80);
    }

    function onPointerOver(event: PointerEvent) {
      if (event.target instanceof Element && event.target.closest("header")) {
        setHeaderActive(true);
      }
    }

    function onPointerOut(event: PointerEvent) {
      const nextTarget = event.relatedTarget;
      if (nextTarget instanceof Element && nextTarget.closest("header")) return;

      if (event.target instanceof Element && event.target.closest("header")) {
        setHeaderActive(false);
      }
    }

    function onFocusIn(event: FocusEvent) {
      if (event.target instanceof Element && event.target.closest("header")) {
        setHeaderActive(true);
      }
    }

    function onFocusOut(event: FocusEvent) {
      const nextTarget = event.relatedTarget;
      if (nextTarget instanceof Element && nextTarget.closest("header")) return;
      setHeaderActive(false);
    }

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    window.addEventListener("resize", updateScrolled);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);

    return () => {
      window.removeEventListener("scroll", updateScrolled);
      window.removeEventListener("resize", updateScrolled);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="group relative isolate flex h-svh w-full items-center justify-center overflow-clip bg-graphit"
    >
      <video
        src="/videos/hero.mp4"
        autoPlay
        muted
        playsInline
        disablePictureInPicture
        className={`absolute inset-0 -z-20 h-full w-full scale-[1.08] object-cover transition-[filter,transform] duration-1000 ease-out ${
          heroBlurred ? "scale-[1.1] blur-[3px]" : "blur-0"
        }`}
      />
      <div className="absolute inset-0 -z-10 bg-graphit/50 mix-blend-multiply" />
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-b from-graphit/75 via-graphit/35 to-graphit/85 transition-opacity duration-1000 ${
          heroBlurred ? "opacity-90" : "opacity-100"
        }`}
      />

      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 pt-16 text-center lg:gap-8 lg:pt-8">
        <Eyebrow onDark className="animate-fade-up" style={{ animationDelay: "1500ms" }}>
          {t("heroKicker")}
        </Eyebrow>
        <h1
          className="animate-fade-up text-6xl leading-[0.95] tracking-normal text-kreide lg:text-8xl"
          style={{ animationDelay: "1580ms" }}
        >
          <span className="font-serif font-medium">{t("heroTitleSerif")}</span>
          <br />
          <span className="font-sans font-black tracking-tight">{t("heroTitleBold")}</span>
        </h1>
        <p
          className="animate-fade-up max-w-lg font-sans text-lg leading-8 text-kreide/80"
          style={{ animationDelay: "1660ms" }}
        >
          {t("heroText")}
        </p>
        <div
          className="animate-fade-up flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "1740ms" }}
          onPointerEnter={() => setCtaActive(true)}
          onPointerLeave={() => setCtaActive(false)}
          onFocus={() => setCtaActive(true)}
          onBlur={() => setCtaActive(false)}
          onPointerDown={() => setCtaActive(true)}
        >
          <Button asChild variant="inverse" size="lg">
            <Link href="/modelle">{t("ctaViewModels")}</Link>
          </Button>
          <Button asChild variant="outlineOnDark" size="lg">
            <Link href="/konfigurator">{t("ctaStartConfigurator")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
