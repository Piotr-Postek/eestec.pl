"use client";

import { useLocale } from "@/context/LocaleContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const NAV = {
  pl: {
    aria: "Nawigacja strony głównej",
    language: "Język",
    openMenu: "Otwórz menu",
    closeMenu: "Zamknij menu",
    intro: "Wstęp",
    about: "O nas",
    events: "Wydarzenia",
    featured: "Główne wydarzenia",
    partners: "Partnerzy",
    board: "Zarząd",
    europe: "Europa",
    contact: "Kontakt",
  },
  en: {
    aria: "Main page navigation",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    intro: "Home",
    about: "About",
    events: "Events",
    featured: "Flagship events",
    partners: "Partners",
    board: "Board",
    europe: "Europe",
    contact: "Contact",
  },
} as const;

const NAV_HREFS = [
  { href: "#start", labelKey: "intro" as const },
  { href: "#o-nas", labelKey: "about" as const },
  { href: "#wydarzenia", labelKey: "events" as const },
  { href: "#glowne-wydarzenia", labelKey: "featured" as const },
  { href: "#partnerzy", labelKey: "partners" as const },
  { href: "#zarzad", labelKey: "board" as const },
  { href: "#mapa-europy", labelKey: "europe" as const },
  { href: "#stopka", labelKey: "contact" as const },
];

const linkClass =
  "rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-white/[0.06] hover:text-[var(--text)]";

const mobileLinkClass =
  "block rounded-xl px-4 py-3.5 text-base font-medium text-[var(--text)] transition-colors hover:bg-white/[0.08] active:bg-white/[0.1]";

const SCROLL_DELTA = 8;
const SCROLL_TOP_SHOW = 56;

export function SiteHeader() {
  const { locale } = useLocale();
  const labels = NAV[locale];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);

  const lastScrollY = useRef(0);
  const mobileOpenRef = useRef(false);
  mobileOpenRef.current = mobileOpen;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      setNarrow(mq.matches);
      if (mq.matches) setHiddenByScroll(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => {
      if (window.matchMedia("(max-width: 767px)").matches || mobileOpenRef.current) {
        setHiddenByScroll(false);
        lastScrollY.current = window.scrollY;
        return;
      }

      const y = window.scrollY;
      const prev = lastScrollY.current;
      const delta = y - prev;

      if (y < SCROLL_TOP_SHOW) {
        setHiddenByScroll(false);
      } else if (delta > SCROLL_DELTA) {
        setHiddenByScroll(true);
      } else if (delta < -SCROLL_DELTA) {
        setHiddenByScroll(false);
      }

      lastScrollY.current = y;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const headerTransform =
    !narrow && hiddenByScroll ? "-translate-y-full" : "translate-y-0";

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b border-white/[0.08] bg-[#080a0e]/90 backdrop-blur-md transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${headerTransform}`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link
            href="#start"
            className="text-[0.95rem] font-semibold tracking-tight text-[var(--text)] hover:text-[var(--accent)]"
            onClick={closeMobile}
          >
            EESTEC AGH
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <nav
              className="hidden items-center gap-1 md:flex md:gap-2"
              aria-label={labels.aria}
            >
              {NAV_HREFS.map(({ href, labelKey }) => (
                <Link key={href} href={href} className={linkClass}>
                  {labels[labelKey]}
                </Link>
              ))}
            </nav>

            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04] text-[var(--text)] transition-colors hover:bg-white/[0.08] md:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-site-nav"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? labels.closeMenu : labels.openMenu}
            >
              {mobileOpen ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 top-14 z-40 bg-black/55 backdrop-blur-sm md:hidden"
            aria-label={labels.closeMenu}
            onClick={closeMobile}
          />
          <div
            id="mobile-site-nav"
            className="fixed left-0 right-0 top-14 z-[41] max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b border-white/[0.08] bg-[#080a0e]/98 backdrop-blur-lg md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={labels.aria}
          >
            <nav className="mx-auto flex max-w-6xl flex-col px-2 py-4">
              {NAV_HREFS.map(({ href, labelKey }) => (
                <Link
                  key={href}
                  href={href}
                  className={mobileLinkClass}
                  onClick={closeMobile}
                >
                  {labels[labelKey]}
                </Link>
              ))}
            </nav>
            <div className="mx-auto max-w-6xl border-t border-white/[0.08] px-4 py-4">
              <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                {labels.language}
              </p>
              <LanguageSwitcher />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
