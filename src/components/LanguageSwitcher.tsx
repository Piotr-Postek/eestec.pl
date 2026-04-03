"use client";

import type { Locale } from "@/context/LocaleContext";
import { useLocale } from "@/context/LocaleContext";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  function select(next: Locale) {
    setLocale(next);
  }

  return (
    <div
      className="flex shrink-0 items-center rounded-lg border border-white/[0.12] bg-[#0a0c10]/80 p-0.5 text-xs font-semibold"
      role="group"
      aria-label="Język strony"
    >
      <button
        type="button"
        onClick={() => select("pl")}
        aria-pressed={locale === "pl"}
        className={`rounded-md px-2.5 py-1.5 transition-colors ${
          locale === "pl"
            ? "bg-[var(--accent)] text-[#0a0e16]"
            : "text-[var(--muted)] hover:text-[var(--text)]"
        }`}
      >
        PL
      </button>
      <button
        type="button"
        onClick={() => select("en")}
        aria-pressed={locale === "en"}
        className={`rounded-md px-2.5 py-1.5 transition-colors ${
          locale === "en"
            ? "bg-[var(--accent)] text-[#0a0e16]"
            : "text-[var(--muted)] hover:text-[var(--text)]"
        }`}
      >
        EN
      </button>
    </div>
  );
}
