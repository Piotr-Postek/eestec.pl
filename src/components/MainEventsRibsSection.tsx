"use client";

import type { FeaturedRibItem } from "@/content/site";
import { useCallback, useEffect, useRef, useState } from "react";

/** Równoległobok: góra i dół poziome, lewy i prawy bok tą samą „pochyłość” (równoległe). */
const RIB_CLIP =
  "polygon(12% 0%, 84% 0%, 89% 100%, 17% 100%)";

/** Jak w `EventsSlider` — płynne pojawianie treści. */
const FADE_MS = 450;
const FADE_EASE = "cubic-bezier(0.22,1,0.36,1)";

type Props = {
  eyebrow: string;
  title: string;
  items: FeaturedRibItem[];
};

export function MainEventsRibsSection({ eyebrow, title, items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const coarsePointerRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const set = () => {
      coarsePointerRef.current = mq.matches;
    };
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const handleRibClick = useCallback((i: number) => {
    if (!coarsePointerRef.current) return;
    setOpenIndex((p) => (p === i ? null : i));
  }, []);

  return (
    <section
      id="glowne-wydarzenia"
      className="scroll-mt-14 border-t border-white/[0.08] bg-[#06080d] px-0 py-10 pb-14 sm:py-14 sm:pb-20"
      aria-labelledby="featured-ribs-heading"
    >
      <div className="mx-auto mb-6 max-w-6xl px-4 text-center sm:mb-8">
        <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent)] sm:text-[0.75rem]">
          {eyebrow}
        </p>
        <h2
          id="featured-ribs-heading"
          className="text-xl font-bold tracking-[-0.02em] sm:text-2xl md:text-3xl"
        >
          {title}
        </h2>
      </div>

      <div
        className="mx-auto flex w-full max-w-[100rem] flex-col gap-3 px-2 sm:px-3 md:flex-row md:gap-0 md:px-4"
        style={{ perspective: "1400px" }}
        onMouseLeave={() => setOpenIndex(null)}
      >
        {items.map((item, i) => {
          const open = openIndex === i;
          const flexClass =
            openIndex === null
              ? "md:flex-[1_1_0%]"
              : open
                ? "md:flex-[2.75_1_0%]"
                : "md:flex-[0.4_1_0%] md:min-w-0 md:opacity-[0.92]";

          return (
            <article
              key={item.title + i}
              style={{
                zIndex: open ? 32 : i + 1,
                transition: `flex ${FADE_MS}ms ${FADE_EASE}, opacity ${FADE_MS}ms ${FADE_EASE}, filter ${FADE_MS}ms ${FADE_EASE}`,
              }}
              className={`group/rib relative min-h-[220px] flex-1 md:min-h-[min(72vh,640px)] ${flexClass}`}
              onMouseEnter={() => setOpenIndex(i)}
              onClick={() => handleRibClick(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleRibClick(i);
                }
              }}
              tabIndex={0}
              role="group"
              aria-expanded={open}
              aria-label={item.title}
              aria-describedby={open ? `rib-desc-${i}` : undefined}
            >
              <div
                className="relative mx-auto h-full min-h-[inherit] w-full max-w-md md:max-w-none"
                style={{
                  transform: "rotateX(2deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className={`pointer-events-none absolute -inset-x-[2px] bottom-0 top-3 z-[1] opacity-80 transition-[filter] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:top-5 ${
                    openIndex !== null && open ? "grayscale-0" : "grayscale"
                  }`}
                  style={{
                    clipPath: RIB_CLIP,
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, transparent 22%, transparent 78%, rgba(0,0,0,0.45) 100%)",
                  }}
                  aria-hidden
                />
                <div
                  className={`absolute inset-x-0 bottom-0 top-3 z-[0] overflow-hidden shadow-[0_24px_48px_rgba(0,0,0,0.45)] transition-[filter] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:top-5 ${
                    openIndex !== null && open ? "grayscale-0" : "grayscale"
                  }`}
                  style={{ clipPath: RIB_CLIP }}
                >
                  <div
                    className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-700 ease-out group-hover/rib:md:scale-100"
                    style={{ backgroundImage: `url("${item.imageUrl}")` }}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-[#06080d]/55 to-transparent"
                    aria-hidden
                  />
                </div>

                <div
                  className={`absolute inset-x-0 bottom-0 z-[3] flex flex-col justify-end px-4 pb-5 pt-20 transition-opacity duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:px-5 md:pb-8 md:pt-28 ${
                    open
                      ? "pointer-events-auto opacity-100"
                      : "pointer-events-none opacity-0"
                  }`}
                  aria-hidden={!open}
                >
                  <h3 className="text-base font-bold leading-tight tracking-[-0.02em] text-[var(--text)] drop-shadow-md sm:text-lg md:text-xl">
                    {item.title}
                  </h3>
                  <p
                    id={`rib-desc-${i}`}
                    className="mt-2 text-sm leading-relaxed text-[var(--muted)] md:mt-3 md:text-[0.9375rem]"
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mx-auto mt-4 max-w-6xl px-4 text-center text-[0.65rem] text-[rgba(244,246,249,0.35)] md:hidden">
        Stuknij kafelek, aby zobaczyć opis.
      </p>
    </section>
  );
}
