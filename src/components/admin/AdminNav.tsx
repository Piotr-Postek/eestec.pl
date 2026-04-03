"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const linkBase =
  "rounded-lg px-3 py-2 text-sm font-medium transition-colors";
const linkInactive = "text-[var(--muted)] hover:bg-white/[0.06] hover:text-[var(--text)]";
const linkActive = "bg-white/[0.08] text-[var(--text)]";

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const onLogin = pathname === "/admin/login";

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#080a0e]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/admin/events"
          className="text-[0.95rem] font-semibold tracking-tight text-[var(--text)] hover:text-[var(--accent)]"
        >
          Panel EESTEC
        </Link>
        <nav
          className="flex flex-wrap items-center gap-1 sm:gap-2"
          aria-label="Menu panelu"
        >
          <Link
            href="/admin/events"
            className={`${linkBase} ${
              pathname === "/admin/events" ? linkActive : linkInactive
            }`}
          >
            Wydarzenia
          </Link>
          <Link
            href="/admin/featured"
            className={`${linkBase} ${
              pathname === "/admin/featured" ? linkActive : linkInactive
            }`}
          >
            Główne wydarzenia
          </Link>
          <Link
            href="/"
            className={`${linkBase} ${linkInactive}`}
          >
            Strona główna
          </Link>
          {!onLogin ? (
            <button
              type="button"
              onClick={() => void logout()}
              className={`${linkBase} text-[var(--muted)] hover:bg-red-500/10 hover:text-red-300`}
            >
              Wyloguj
            </button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
