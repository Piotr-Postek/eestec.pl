"use client";

import Link from "next/link";
import type { HeroSlide } from "@/content/site";
import { useFadeCarousel } from "@/hooks/useFadeCarousel";

const INTERVAL_MS = 6000;

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  slides: HeroSlide[];
};

export function HeroCarousel({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  slides,
}: Props) {
  const { index, goTo, next, prev } = useFadeCarousel(
    slides.length,
    INTERVAL_MS
  );

  return (
    <header
      id="start"
      className="relative isolate box-border grid min-h-svh min-h-[100vh] place-items-center overflow-hidden scroll-mt-14 pt-14"
      aria-label="Wstęp"
    >
      <div
        className="absolute inset-0 z-0"
        role="region"
        aria-roledescription="karuzela"
        aria-label="Zdjęcia w tle"
      >
        <div className="absolute inset-0">
          {slides.map((slide, i) => (
            <div
              key={slide.imageUrl + i}
              role="img"
              aria-hidden={index !== i}
              className={`absolute inset-0 bg-cover bg-center transition-[opacity,transform] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                index === i
                  ? "z-[1] opacity-100 scale-100"
                  : "opacity-0 scale-[1.04]"
              }`}
              style={{ backgroundImage: `url("${slide.imageUrl}")` }}
            />
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(120deg,rgba(8,12,22,0.88)_0%,rgba(8,12,22,0.45)_45%,rgba(8,12,22,0.25)_100%),radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(20,40,90,0.35),transparent_55%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-[3] mx-auto max-w-[42rem] px-6 pb-24 pt-8 text-center">
        <p className="mb-3 text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          {eyebrow}
        </p>
        <h1
          className="mb-4 text-[clamp(1.75rem,4.5vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.02em]"
          id="hero-heading"
        >
          {title}
        </h1>
        <p
          className="mx-auto mb-7 max-w-[36ch] text-[1.0625rem] text-[var(--muted)]"
          id="hero-desc"
        >
          {description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-xl border border-transparent bg-[var(--accent)] px-5 py-2.5 text-[0.9375rem] font-semibold text-[#0a0e16] transition-[filter,transform] hover:brightness-110 active:translate-y-px"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>

      <button
        type="button"
        className="absolute left-[max(1rem,env(safe-area-inset-left))] top-1/2 z-[4] grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-[rgba(8,12,22,0.45)] text-xl leading-none text-[var(--text)] backdrop-blur-md transition-[background,border-color] hover:bg-white/12 hover:border-white/40 sm:left-4 max-[640px]:left-2 max-[640px]:size-[2.35rem] max-[640px]:text-xl"
        onClick={prev}
        aria-label="Poprzednie zdjęcie"
      >
        <span aria-hidden>‹</span>
      </button>
      <button
        type="button"
        className="absolute right-[max(1rem,env(safe-area-inset-right))] top-1/2 z-[4] grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-[rgba(8,12,22,0.45)] text-xl leading-none text-[var(--text)] backdrop-blur-md transition-[background,border-color] hover:bg-white/12 hover:border-white/40 sm:right-4 max-[640px]:right-2 max-[640px]:size-[2.35rem]"
        onClick={next}
        aria-label="Następne zdjęcie"
      >
        <span aria-hidden>›</span>
      </button>

      <div
        className="absolute bottom-7 left-1/2 z-[4] flex -translate-x-1/2 flex-col items-center gap-4"
        role="group"
        aria-label="Sterowanie karuzelą"
      >
        <div
          className="flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Wybór slajdu"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={index === i}
              aria-label={`Slajd ${i + 1}`}
              onClick={() => goTo(i)}
              className={`size-2 rounded-full border-0 transition-[background,transform] ${
                index === i
                  ? "scale-[1.15] bg-[var(--accent)]"
                  : "bg-white/35"
              }`}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
