import type { SocialLinks } from "@/content/site";

type Props = {
  label: string;
  copyright: string;
  social: SocialLinks;
};

const iconClass = "size-[1.35rem]";

export function SiteFooter({ label, copyright, social }: Props) {
  return (
    <footer
      id="stopka"
      className="scroll-mt-14 border-t border-white/[0.06] bg-[#080a0e] px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-8"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-[42rem] flex-col items-center gap-5 text-center">
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-[rgba(244,246,249,0.55)]">
          {label}
        </p>
        <ul className="m-0 flex list-none flex-wrap justify-center gap-3 p-0">
          <li>
            <a
              className="grid size-12 place-items-center rounded-full border border-white/[0.08] bg-white/[0.06] text-[var(--muted)] transition-[color,background,border-color,transform] hover:border-[rgba(91,140,255,0.35)] hover:bg-[rgba(91,140,255,0.15)] hover:text-[var(--text)] active:scale-[0.96]"
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram — otwiera się w nowej karcie"
            >
              <svg
                className={iconClass}
                viewBox="0 0 24 24"
                aria-hidden
                focusable="false"
              >
                <path
                  fill="currentColor"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.881.001 1.44 1.44 0 012.881-.001z"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              className="grid size-12 place-items-center rounded-full border border-white/[0.08] bg-white/[0.06] text-[var(--muted)] transition-[color,background,border-color,transform] hover:border-[rgba(91,140,255,0.35)] hover:bg-[rgba(91,140,255,0.15)] hover:text-[var(--text)] active:scale-[0.96]"
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook — otwiera się w nowej karcie"
            >
              <svg
                className={iconClass}
                viewBox="0 0 24 24"
                aria-hidden
                focusable="false"
              >
                <path
                  fill="currentColor"
                  d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              className="grid size-12 place-items-center rounded-full border border-white/[0.08] bg-white/[0.06] text-[var(--muted)] transition-[color,background,border-color,transform] hover:border-[rgba(91,140,255,0.35)] hover:bg-[rgba(91,140,255,0.15)] hover:text-[var(--text)] active:scale-[0.96]"
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn — otwiera się w nowej karcie"
            >
              <svg
                className={iconClass}
                viewBox="0 0 24 24"
                aria-hidden
                focusable="false"
              >
                <path
                  fill="currentColor"
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.064-2.065 2.064 2.064 0 114.128 0 2.062 2.062 0 01-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
          </li>
        </ul>
        <p className="mt-1 text-[0.8125rem] text-[rgba(244,246,249,0.45)]">
          {copyright}
        </p>
      </div>
    </footer>
  );
}
