"use client";

import { useLocale } from "@/context/LocaleContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Link from "next/link";

const NAV = {
  pl: {
    aria: "Nawigacja strony głównej",
    intro: "Wstęp",
    about: "O nas",
    events: "Wydarzenia",
    featured: "Główne wydarzenia",
    partners: "Partnerzy",
    contact: "Kontakt",
  },
  en: {
    aria: "Main page navigation",
    intro: "Home",
    about: "About",
    events: "Events",
    featured: "Flagship events",
    partners: "Partners",
    contact: "Contact",
  },
} as const;

const linkClass =
  "rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-white/[0.06] hover:text-[var(--text)]";

export function SiteHeader() {
  const { locale } = useLocale();
  const labels = NAV[locale];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.08] bg-[#080a0e]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link
          href="#start"
          className="text-[0.95rem] font-semibold tracking-tight text-[var(--text)] hover:text-[var(--accent)]"
        >
          EESTEC AGH
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <nav
            className="flex flex-wrap items-center gap-1 sm:gap-2"
            aria-label={labels.aria}
          >
            <Link href="#start" className={linkClass}>
              {labels.intro}
            </Link>
            <Link href="#o-nas" className={linkClass}>
              {labels.about}
            </Link>
            <Link href="#wydarzenia" className={linkClass}>
              {labels.events}
            </Link>
            <Link href="#glowne-wydarzenia" className={linkClass}>
              {labels.featured}
            </Link>
            <Link href="#partnerzy" className={linkClass}>
              {labels.partners}
            </Link>
            <Link href="#stopka" className={linkClass}>
              {labels.contact}
            </Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
