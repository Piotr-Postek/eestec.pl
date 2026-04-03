"use client";

import type { EventSlide } from "@/content/site";
import type { EventsPayload } from "@/lib/events-store";
import { useRouter } from "next/navigation";
import { useState } from "react";

const emptyEvent = (): EventSlide => ({
  title: "Nowe wydarzenie",
  dateIso: new Date().toISOString().slice(0, 10),
  dateLabel: "",
  description: "",
  imageUrl: "https://images.unsplash.com/photo-1540575467063-27aef4e7bd51?auto=format&fit=crop&w=1600&q=80",
  titleEn: "",
  dateLabelEn: "",
  descriptionEn: "",
});

type Props = {
  initial: EventsPayload;
};

export function EventsEditor({ initial }: Props) {
  const router = useRouter();
  const [eyebrow, setEyebrow] = useState(initial.eyebrow);
  const [sectionTitle, setSectionTitle] = useState(initial.title);
  const [eyebrowEn, setEyebrowEn] = useState(initial.eyebrowEn ?? "");
  const [sectionTitleEn, setSectionTitleEn] = useState(initial.titleEn ?? "");
  const [items, setItems] = useState<EventSlide[]>(() =>
    initial.items.map((ev) => ({
      ...ev,
      titleEn: ev.titleEn ?? "",
      dateLabelEn: ev.dateLabelEn ?? "",
      descriptionEn: ev.descriptionEn ?? "",
    }))
  );
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  function updateItem(i: number, patch: Partial<EventSlide>) {
    setItems((prev) =>
      prev.map((row, j) => (j === i ? { ...row, ...patch } : row))
    );
  }

  function addEvent() {
    setItems((prev) => [...prev, emptyEvent()]);
  }

  function removeEvent(i: number) {
    if (items.length <= 1) {
      setError("Musi zostać co najmniej jedno wydarzenie.");
      return;
    }
    setItems((prev) => prev.filter((_, j) => j !== i));
    setError(null);
  }

  async function uploadEventImage(i: number, file: File) {
    setMessage(null);
    setError(null);
    setUploadingIndex(i);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload/event-image", {
        method: "POST",
        body: form,
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        url?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Upload nie powiódł się");
        return;
      }
      if (!data.url) {
        setError("Brak adresu pliku w odpowiedzi serwera");
        return;
      }
      updateItem(i, { imageUrl: data.url });
      setMessage("Zdjęcie wgrane — nie zapomnij zapisać wydarzeń.");
    } catch {
      setError("Brak połączenia z serwerem");
    } finally {
      setUploadingIndex(null);
    }
  }

  async function save() {
    setMessage(null);
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/admin/events", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eyebrow,
          title: sectionTitle,
          eyebrowEn: eyebrowEn.trim() || undefined,
          titleEn: sectionTitleEn.trim() || undefined,
          items,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Zapis nie powiódł się");
        return;
      }
      setMessage("Zapisano. Strona główna została odświeżona.");
      router.refresh();
    } catch {
      setError("Brak połączenia z serwerem");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-xl font-bold tracking-tight md:text-2xl">
          Wydarzenia
        </h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Slider i oś czasu na stronie głównej (sekcja „Wydarzenia”).
        </p>
      </div>

      <div className="mb-6 grid gap-4 rounded-xl border border-white/[0.08] bg-[#0e1219] p-5">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-[rgba(244,246,249,0.85)]">
            Etykieta nad tytułem (np. Kalendarz)
          </span>
          <input
            value={eyebrow}
            onChange={(e) => setEyebrow(e.target.value)}
            className="rounded-lg border border-white/[0.12] bg-[var(--bg)] px-3 py-2 text-[var(--text)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-[rgba(244,246,249,0.85)]">
            Tytuł sekcji
          </span>
          <input
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            className="rounded-lg border border-white/[0.12] bg-[var(--bg)] px-3 py-2 text-[var(--text)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]"
          />
        </label>
        <p className="text-xs font-medium uppercase tracking-wider text-[rgba(244,246,249,0.45)]">
          Angielski (opcjonalnie)
        </p>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-[rgba(244,246,249,0.75)]">
            Etykieta nad tytułem — EN
          </span>
          <input
            value={eyebrowEn}
            onChange={(e) => setEyebrowEn(e.target.value)}
            placeholder="np. Calendar"
            className="rounded-lg border border-white/[0.12] bg-[var(--bg)] px-3 py-2 text-[var(--text)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-[rgba(244,246,249,0.75)]">Tytuł sekcji — EN</span>
          <input
            value={sectionTitleEn}
            onChange={(e) => setSectionTitleEn(e.target.value)}
            placeholder="np. Events"
            className="rounded-lg border border-white/[0.12] bg-[var(--bg)] px-3 py-2 text-[var(--text)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]"
          />
        </label>
      </div>

      <div className="space-y-5">
        {items.map((ev, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/[0.08] bg-[#0e1219] p-5"
          >
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                Wydarzenie {i + 1}
              </span>
              <button
                type="button"
                onClick={() => removeEvent(i)}
                className="text-xs text-red-400/90 hover:text-red-300"
              >
                Usuń
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm sm:col-span-2">
                <span className="text-[rgba(244,246,249,0.75)]">Tytuł</span>
                <input
                  value={ev.title}
                  onChange={(e) => updateItem(i, { title: e.target.value })}
                  className="rounded-lg border border-white/[0.12] bg-[var(--bg)] px-3 py-2 text-[var(--text)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-[rgba(244,246,249,0.75)]">
                  Data (kalendarz)
                </span>
                <input
                  type="date"
                  value={ev.dateIso}
                  onChange={(e) => updateItem(i, { dateIso: e.target.value })}
                  className="rounded-lg border border-white/[0.12] bg-[var(--bg)] px-3 py-2 text-[var(--text)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-[rgba(244,246,249,0.75)]">
                  Data (tekst na stronie)
                </span>
                <input
                  value={ev.dateLabel}
                  onChange={(e) => updateItem(i, { dateLabel: e.target.value })}
                  placeholder="np. 12 kwietnia 2026"
                  className="rounded-lg border border-white/[0.12] bg-[var(--bg)] px-3 py-2 text-[var(--text)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]"
                />
              </label>
              <div className="sm:col-span-2 grid gap-3">
                <span className="text-[rgba(244,246,249,0.75)] text-sm">
                  Zdjęcie wydarzenia
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  {ev.imageUrl ? (
                    <img
                      src={ev.imageUrl}
                      alt=""
                      className="h-20 w-32 rounded-md border border-white/[0.12] object-cover"
                    />
                  ) : null}
                  <div className="flex flex-col gap-2">
                    <input
                      id={`ev-image-file-${i}`}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="sr-only"
                      disabled={uploadingIndex === i}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        e.target.value = "";
                        if (f) void uploadEventImage(i, f);
                      }}
                    />
                    <label
                      htmlFor={`ev-image-file-${i}`}
                      className={`inline-flex w-fit cursor-pointer rounded-lg border border-white/[0.2] bg-white/[0.06] px-3 py-2 text-sm font-medium text-[var(--text)] transition-colors hover:bg-white/[0.1] ${
                        uploadingIndex === i
                          ? "pointer-events-none opacity-50"
                          : ""
                      }`}
                    >
                      {uploadingIndex === i ? "Wgrywanie…" : "Wgraj z dysku"}
                    </label>
                    <p className="text-xs text-[rgba(244,246,249,0.45)]">
                      JPEG, PNG, WebP lub GIF, do 5 MB — na serwerze zapisywane jako WebP.
                    </p>
                  </div>
                </div>
                <label className="flex flex-col gap-1 text-sm">
                  <span className="text-[rgba(244,246,249,0.75)]">
                    Lub adres URL (https)
                  </span>
                  <input
                    value={ev.imageUrl}
                    onChange={(e) => updateItem(i, { imageUrl: e.target.value })}
                    className="rounded-lg border border-white/[0.12] bg-[var(--bg)] px-3 py-2 font-mono text-sm text-[var(--text)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-1 text-sm sm:col-span-2">
                <span className="text-[rgba(244,246,249,0.75)]">Opis</span>
                <textarea
                  value={ev.description}
                  onChange={(e) =>
                    updateItem(i, { description: e.target.value })
                  }
                  rows={4}
                  className="resize-y rounded-lg border border-white/[0.12] bg-[var(--bg)] px-3 py-2 text-[var(--text)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]"
                />
              </label>
              <p className="sm:col-span-2 mt-1 text-xs font-medium uppercase tracking-wider text-[rgba(244,246,249,0.45)]">
                Angielski (opcjonalnie) — na stronie EN; puste pola biorą szablon lub tekst PL
              </p>
              <label className="flex flex-col gap-1 text-sm sm:col-span-2">
                <span className="text-[rgba(244,246,249,0.75)]">Tytuł — EN</span>
                <input
                  value={ev.titleEn ?? ""}
                  onChange={(e) => updateItem(i, { titleEn: e.target.value })}
                  className="rounded-lg border border-white/[0.12] bg-[var(--bg)] px-3 py-2 text-[var(--text)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm sm:col-span-2">
                <span className="text-[rgba(244,246,249,0.75)]">
                  Data (tekst) — EN
                </span>
                <input
                  value={ev.dateLabelEn ?? ""}
                  onChange={(e) =>
                    updateItem(i, { dateLabelEn: e.target.value })
                  }
                  placeholder="np. April 12, 2026"
                  className="rounded-lg border border-white/[0.12] bg-[var(--bg)] px-3 py-2 text-[var(--text)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm sm:col-span-2">
                <span className="text-[rgba(244,246,249,0.75)]">Opis — EN</span>
                <textarea
                  value={ev.descriptionEn ?? ""}
                  onChange={(e) =>
                    updateItem(i, { descriptionEn: e.target.value })
                  }
                  rows={3}
                  className="resize-y rounded-lg border border-white/[0.12] bg-[var(--bg)] px-3 py-2 text-[var(--text)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]"
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={addEvent}
          className="rounded-lg border border-[var(--accent)]/40 bg-[rgba(91,140,255,0.08)] px-4 py-2.5 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[rgba(91,140,255,0.15)]"
        >
          Dodaj wydarzenie
        </button>
        <button
          type="button"
          onClick={() => void save()}
          disabled={pending}
          className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[#0a0e16] transition-[filter] hover:brightness-110 disabled:opacity-60"
        >
          {pending ? "Zapisywanie…" : "Zapisz zmiany"}
        </button>
      </div>

      {message ? (
        <p className="mt-4 text-sm text-emerald-400/95" role="status">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <p className="mt-10 text-xs leading-relaxed text-[rgba(244,246,249,0.4)]">
        Zmiany trafiają do pliku <code className="text-[rgba(244,246,249,0.55)]">data/events.json</code> na serwerze.
        Wgrane zdjęcia lądują w <code className="text-[rgba(244,246,249,0.55)]">public/uploads/events/</code>.
        Na hostingu serverless (np. Vercel) dysk jest zwykle nietrwały — do produkcji warto później podłączyć zewnętrzny
        storage (S3, Cloudinary itd.).
      </p>
    </div>
  );
}
