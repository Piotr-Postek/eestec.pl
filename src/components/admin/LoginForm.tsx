"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Błąd logowania");
        return;
      }
      router.push("/admin/events");
      router.refresh();
    } catch {
      setError("Brak połączenia z serwerem");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-10">
      <h1 className="mb-2 text-center text-xl font-bold tracking-tight sm:text-2xl">
        Logowanie
      </h1>
      <p className="mb-8 text-center text-sm text-[var(--muted)]">
        Wpisz hasło, aby edytować wydarzenia na stronie głównej.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-[#0e1219] p-6 shadow-lg"
      >
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-[rgba(244,246,249,0.85)]">
            Hasło
          </span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-white/[0.12] bg-[var(--bg)] px-3 py-2.5 text-[var(--text)] outline-none ring-[var(--accent)] focus:border-[var(--accent)] focus:ring-2"
            required
          />
        </label>
        {error ? (
          <p
            className="whitespace-pre-line text-sm leading-relaxed text-red-400"
            role="alert"
          >
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[#0a0e16] transition-[filter] hover:brightness-110 disabled:opacity-60"
        >
          {pending ? "Logowanie…" : "Zaloguj"}
        </button>
      </form>
      <p className="mt-8 text-center text-sm text-[rgba(244,246,249,0.45)]">
        <Link href="/" className="text-[var(--accent)] hover:underline">
          ← Wróć na stronę
        </Link>
      </p>
    </div>
  );
}
