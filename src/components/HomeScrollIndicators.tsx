"use client";

import { useLocale } from "@/context/LocaleContext";
import { useEffect, useState } from "react";

const SECTION_IDS = [
  "start",
  "o-nas",
  "wydarzenia",
  "glowne-wydarzenia",
  "partnerzy",
  "zarzad",
  "stopka",
] as const;

type SectionId = (typeof SECTION_IDS)[number];

const UI = {
  pl: {
    progressAria: "Nawigacja po sekcjach strony",
    backToTop: "Wróć na górę",
    labels: {
      start: "Wstęp",
      "o-nas": "O nas",
      wydarzenia: "Wydarzenia",
      "glowne-wydarzenia": "Główne wydarzenia",
      partnerzy: "Partnerzy",
      zarzad: "Zarząd",
      stopka: "Kontakt",
    } satisfies Record<SectionId, string>,
  },
  en: {
    progressAria: "Page sections navigation",
    backToTop: "Back to top",
    labels: {
      start: "Home",
      "o-nas": "About",
      wydarzenia: "Events",
      "glowne-wydarzenia": "Flagship events",
      partnerzy: "Partners",
      zarzad: "Board",
      stopka: "Contact",
    } satisfies Record<SectionId, string>,
  },
} as const;

/** Odstęp od absolutnego dołu dokumentu — wtedy wskaż „Kontakt” (stopka). */
const SCROLL_END_EPSILON = 88;
const LINE_FALLBACK = 0.44;
const BACK_TOP_SHOW_AFTER = 420;

const IO_THRESHOLDS = [
  0, 0.02, 0.05, 0.08, 0.11, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65,
  0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1,
];

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function documentScrollHeight(): number {
  const doc = document.documentElement;
  const body = document.body;
  return Math.max(doc.scrollHeight, body.scrollHeight, doc.clientHeight);
}

function isScrolledToDocumentEnd(): boolean {
  return window.scrollY + window.innerHeight >= documentScrollHeight() - SCROLL_END_EPSILON;
}

function pickByScrollLine(): SectionId {
  const line = window.innerHeight * LINE_FALLBACK;
  let current: SectionId = SECTION_IDS[0];
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= line) current = id;
  }
  return current;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

export function HomeScrollIndicators() {
  const { locale } = useLocale();
  const copy = UI[locale];

  const [activeId, setActiveId] = useState<SectionId>("start");
  const [backTopVisible, setBackTopVisible] = useState(false);

  useEffect(() => {
    const entriesMap = new Map<Element, IntersectionObserverEntry>();

    const computeActive = () => {
      if (isScrolledToDocumentEnd()) {
        setActiveId("stopka");
        return;
      }

      let winner = 0;
      let maxR = -1;
      for (let i = 0; i < SECTION_IDS.length; i++) {
        const id = SECTION_IDS[i];
        const el = document.getElementById(id);
        if (!el) continue;
        const ent = entriesMap.get(el);
        const r = ent?.isIntersecting ? ent.intersectionRatio : 0;
        if (r > maxR + 0.0001) {
          maxR = r;
          winner = i;
        } else if (Math.abs(r - maxR) <= 0.0001 && r > 0 && i > winner) {
          winner = i;
        }
      }

      if (maxR < 0.002) {
        setActiveId(pickByScrollLine());
        return;
      }

      setActiveId(SECTION_IDS[winner]);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          entriesMap.set(e.target, e);
        }
        computeActive();
      },
      {
        root: null,
        rootMargin: "-12% 0px -22% 0px",
        threshold: IO_THRESHOLDS,
      }
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    const onScrollOrResize = () => {
      computeActive();
      setBackTopVisible(window.scrollY > BACK_TOP_SHOW_AFTER);
    };

    computeActive();
    setBackTopVisible(window.scrollY > BACK_TOP_SHOW_AFTER);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <>
      <nav
        className="pointer-events-none fixed left-0 top-1/2 z-[35] hidden -translate-y-1/2 md:block"
        aria-label={copy.progressAria}
        style={{
          paddingLeft: "max(0.35rem, env(safe-area-inset-left))",
        }}
      >
        <ul className="pointer-events-auto relative flex flex-col gap-2.5 py-2 md:gap-3 md:py-3">
          <span
            className="absolute left-2 top-2 bottom-2 w-px bg-white/[0.14] md:left-2.5"
            aria-hidden
          />
          {SECTION_IDS.map((id) => {
            const active = activeId === id;
            return (
              <li key={id} className="relative z-[1]">
                <a
                  href={`#${id}`}
                  className="group flex items-center justify-center rounded-lg p-1 outline-none ring-[var(--accent)] focus-visible:ring-2 md:p-1.5"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(id);
                  }}
                  aria-label={copy.labels[id]}
                  aria-current={active ? "location" : undefined}
                >
                  <span
                    className="relative flex h-4 w-4 shrink-0 items-center justify-center md:h-5 md:w-5"
                    aria-hidden
                  >
                    <span
                      className={`rounded-full border-2 transition-all duration-300 ${
                        active
                          ? "h-3 w-3 scale-100 border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_12px_rgba(91,140,255,0.55)] md:h-3.5 md:w-3.5"
                          : "h-2 w-2 scale-100 border-white/35 bg-[#0c0f14] group-hover:border-white/55 group-hover:bg-white/10 md:h-2.5 md:w-2.5"
                      }`}
                    />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed z-[35] flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.14] bg-[#0a0c10]/95 text-[var(--text)] shadow-[0_8px_28px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 md:h-12 md:w-12 ${
          backTopVisible
            ? "pointer-events-auto bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] opacity-100 translate-y-0 md:bottom-8 md:right-8"
            : "pointer-events-none bottom-6 right-6 opacity-0 translate-y-4"
        }`}
        aria-hidden={!backTopVisible}
        tabIndex={backTopVisible ? 0 : -1}
        aria-label={copy.backToTop}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}
