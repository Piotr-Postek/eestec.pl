"use client";

import type { EventSlide } from "@/content/site";
import { useLocale } from "@/context/LocaleContext";
import { useFadeCarousel } from "@/hooks/useFadeCarousel";

const INTERVAL_MS = 8000;

const UI = {
  pl: {
    carousel: "Nadchodzące wydarzenia",
    prev: "Poprzednie wydarzenie",
    next: "Następne wydarzenie",
    timeline: "Oś czasu",
    timelineAria: "Oś czasu wydarzeń",
  },
  en: {
    carousel: "Upcoming events",
    prev: "Previous event",
    next: "Next event",
    timeline: "Timeline",
    timelineAria: "Event timeline",
  },
} as const;

type Props = {
  eyebrow: string;
  title: string;
  items: EventSlide[];
};

export function EventsSlider({ eyebrow, title, items }: Props) {
  const { locale } = useLocale();
  const u = UI[locale];

  const { index, goTo, next, prev } = useFadeCarousel(
    items.length,
    INTERVAL_MS
  );

  return (
    <section
      className="grid min-h-[100svh] min-h-[100vh] scroll-mt-14 grid-rows-[auto_minmax(0,1fr)_auto] gap-2 bg-[var(--bg)] px-3 py-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:gap-3 sm:px-4 sm:py-4"
      id="wydarzenia"
      aria-labelledby="events-heading"
    >
      <div className="mx-auto max-w-[40rem] shrink-0 text-center">
        <p className="mb-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent)] sm:text-[0.75rem]">
          {eyebrow}
        </p>
        <h2
          className="text-lg font-bold tracking-[-0.02em] sm:text-xl md:text-2xl"
          id="events-heading"
        >
          {title}
        </h2>
      </div>

      <div
        className="relative isolate mx-auto flex min-h-0 w-full max-w-[72rem] flex-col"
        role="region"
        aria-roledescription="karuzela"
        aria-label={u.carousel}
      >
        <div className="relative h-full min-h-0 flex-1 overflow-hidden rounded-lg border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.3)] sm:rounded-xl max-[640px]:-mx-1 max-[640px]:rounded-none">
          <div className="absolute inset-0">
            {items.map((ev, i) => (
              <article
                key={ev.title + ev.dateIso}
                aria-hidden={index !== i}
                className={`absolute inset-0 grid content-end transition-opacity duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  index === i
                    ? "z-[1] opacity-100"
                    : "pointer-events-none z-0 opacity-0"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8s] ease-out ${
                    index === i ? "scale-100" : "scale-[1.03]"
                  }`}
                  style={{ backgroundImage: `url("${ev.imageUrl}")` }}
                />
                <div
                  className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(8,12,22,0.15)_0%,rgba(8,12,22,0.5)_40%,rgba(8,12,22,0.93)_100%),linear-gradient(90deg,rgba(8,12,22,0.55)_0%,transparent_50%)]"
                  aria-hidden
                />
                <div className="relative z-[2] max-w-[34rem] px-3 py-3 sm:px-5 sm:py-4">
                  <h3 className="mb-1 text-base font-bold leading-tight tracking-[-0.02em] sm:mb-1.5 sm:text-lg md:text-xl">
                    {ev.title}
                  </h3>
                  <time
                    className="mb-1.5 block text-[0.8125rem] font-semibold tracking-[0.03em] text-[var(--accent)] sm:text-sm"
                    dateTime={ev.dateIso}
                  >
                    {ev.dateLabel}
                  </time>
                  <p className="line-clamp-3 text-[0.8125rem] leading-snug text-[var(--muted)] sm:line-clamp-4 sm:text-sm sm:leading-relaxed">
                    {ev.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="absolute left-[max(0.5rem,env(safe-area-inset-left))] top-1/2 z-[3] grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-[rgba(8,12,22,0.5)] text-lg leading-none text-[var(--text)] backdrop-blur-md transition-[background,border-color] hover:bg-white/12 hover:border-white/40 sm:left-2 sm:size-10 sm:text-xl"
          onClick={prev}
          aria-label={u.prev}
        >
          <span aria-hidden>‹</span>
        </button>
        <button
          type="button"
          className="absolute right-[max(0.5rem,env(safe-area-inset-right))] top-1/2 z-[3] grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-[rgba(8,12,22,0.5)] text-lg leading-none text-[var(--text)] backdrop-blur-md transition-[background,border-color] hover:bg-white/12 hover:border-white/40 sm:right-2 sm:size-10"
          onClick={next}
          aria-label={u.next}
        >
          <span aria-hidden>›</span>
        </button>
      </div>

      <div
        className="mx-auto w-full max-w-4xl shrink-0 px-1 pt-1"
        aria-label={u.timelineAria}
        role="tablist"
      >
        <p className="mb-1.5 text-center text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[rgba(244,246,249,0.4)] sm:text-[0.7rem]">
          {u.timeline}
        </p>
        <div className="relative px-0.5 sm:px-2">
          <div
            className="pointer-events-none absolute left-[5%] right-[5%] top-[3rem] z-0 h-px bg-gradient-to-r from-transparent via-white/22 to-transparent sm:left-[3%] sm:right-[3%]"
            aria-hidden
          />
          <div
            className="relative z-[1] grid w-full gap-0.5"
            style={{
              gridTemplateColumns: `repeat(${Math.max(items.length, 1)}, minmax(0, 1fr))`,
            }}
          >
            {items.map((ev, i) => {
              const active = index === i;
              return (
                <button
                  key={ev.title + ev.dateIso + i}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`${ev.title}, ${ev.dateLabel}`}
                  onClick={() => goTo(i)}
                  className="group flex flex-col items-center gap-2 rounded-md pb-0.5 pt-0.5 outline-none transition-[color] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--bg)]"
                >
                  <span
                    className={`flex min-h-[2rem] max-w-[10rem] items-end justify-center px-0.5 text-center text-[0.7rem] leading-tight sm:min-h-[2.25rem] sm:max-w-[11rem] sm:text-[0.8125rem] ${
                      active
                        ? "font-semibold text-[var(--accent)]"
                        : "text-transparent [text-shadow:none]"
                    }`}
                  >
                    {active ? ev.dateLabel : "\u00a0"}
                  </span>
                  <div
                    className="flex h-4 w-full items-center justify-center"
                    aria-hidden
                  >
                    <span
                      className={`rounded-full transition-[width,height,background-color,box-shadow] ${
                        active
                          ? "size-3 bg-[var(--accent)] shadow-[0_0_0_3px_rgba(91,140,255,0.25)] sm:size-[13px]"
                          : "size-1.5 bg-white/35 group-hover:bg-white/55 sm:size-2"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
