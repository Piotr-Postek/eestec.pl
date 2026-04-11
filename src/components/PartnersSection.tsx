"use client";

import { useLocale } from "@/context/LocaleContext";

const PARTNERS = [
  {
    src: "/partners/assa.svg",
    alt: "ASSA",
    href: "https://www.assaabloy.com/",
  },
  {
    src: "/partners/hid.png",
    alt: "HID",
    href: "https://www.hidglobal.com/",
  },
  {
    src: "/partners/hitachi.svg",
    alt: "Hitachi",
    href: "https://www.hitachi.com/",
  },
  {
    src: "/partners/nokia.svg",
    alt: "Nokia",
    href: "https://www.nokia.com/",
  },
] as const;

export function PartnersSection() {
  const { content } = useLocale();
  const { eyebrow, title } = content.partners;

  return (
    <section
      id="partnerzy"
      className="scroll-mt-14 border-t border-white/[0.08] bg-[#080a0e] px-4 py-10 sm:py-12"
      aria-labelledby="partners-heading"
    >
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent)] sm:text-[0.75rem]">
          {eyebrow}
        </p>
        <h2
          id="partners-heading"
          className="mb-8 text-lg font-bold tracking-[-0.02em] sm:mb-10 sm:text-xl md:text-2xl"
        >
          {title}
        </h2>
        <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-x-10 gap-y-8 px-2 sm:gap-x-14 sm:gap-y-10">
          {PARTNERS.map((p) => (
            <li key={p.alt}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block opacity-80 transition-[opacity,transform] hover:opacity-100 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  className="mx-auto h-9 max-w-[9.5rem] object-contain object-center sm:h-10 md:h-11 md:max-w-[11rem]"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
