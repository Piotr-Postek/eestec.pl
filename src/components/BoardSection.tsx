"use client";

import type { BoardSectionContent } from "@/content/site";

type Props = {
  board: BoardSectionContent;
};

export function BoardSection({ board }: Props) {
  const { eyebrow, title, intro, members } = board;

  return (
    <section
      id="zarzad"
      className="scroll-mt-14 border-t border-white/[0.08] bg-[#06080d] px-4 py-10 sm:py-12 md:py-14"
      aria-labelledby="board-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-1 text-center text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent)] sm:text-[0.75rem]">
          {eyebrow}
        </p>
        <h2
          id="board-heading"
          className="text-center text-lg font-bold tracking-[-0.02em] sm:text-xl md:text-2xl"
        >
          {title}
        </h2>
        {intro ? (
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-[var(--muted)] md:text-[0.9375rem]">
            {intro}
          </p>
        ) : null}

        <ul className="mt-8 grid list-none grid-cols-2 gap-3 sm:gap-4 md:mt-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {members.map((m, i) => {
            const href =
              m.link?.trim() ||
              (m.email?.trim()
                ? `mailto:${m.email.trim()}`
                : undefined);

            const body = (
              <>
                <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-white/[0.06]">
                  <img
                    src={m.imageUrl}
                    alt={m.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex min-h-0 flex-1 flex-col gap-1 px-1.5 pb-4 pt-3 text-center sm:px-2">
                  <p className="shrink-0 text-[0.8125rem] font-semibold leading-tight text-[var(--text)] sm:text-sm">
                    {m.name}
                  </p>
                  <p className="min-h-0 flex-1 text-[0.65rem] leading-snug text-[var(--muted)] sm:text-[0.7rem]">
                    {m.role}
                  </p>
                  {m.email?.trim() ? (
                    <p className="shrink-0 break-all text-[0.6rem] leading-snug text-[var(--accent)] sm:text-[0.65rem]">
                      {m.email.trim()}
                    </p>
                  ) : null}
                </div>
              </>
            );

            return (
              <li
                key={`${m.name}-${i}`}
                className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-white/[0.09] bg-white/[0.03] shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
              >
                {href ? (
                  <a
                    href={href}
                    className="flex h-full min-h-0 flex-1 flex-col text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080d]"
                    aria-label={`${m.name}, ${m.role} — link`}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {body}
                  </a>
                ) : (
                  <article className="flex h-full min-h-0 flex-1 flex-col">
                    {body}
                  </article>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
