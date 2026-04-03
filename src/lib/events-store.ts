import fs from "fs";
import path from "path";
import type { EventSlide } from "@/content/site";
import { siteContent } from "@/content/site";
import { isAllowedEventImageUrl } from "@/lib/event-image-url";

export { isAllowedEventImageUrl };

const DATA_DIR = path.join(process.cwd(), "data");
const EVENTS_FILE = path.join(DATA_DIR, "events.json");

export type EventsPayload = {
  eyebrow: string;
  title: string;
  eyebrowEn?: string;
  titleEn?: string;
  items: EventSlide[];
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function optionalNonEmptyString(v: unknown): string | undefined {
  if (!isNonEmptyString(v)) return undefined;
  return v.trim();
}

/** Walidacja i normalizacja danych z panelu */
export function parseEventsPayload(body: unknown): EventsPayload {
  if (!body || typeof body !== "object") {
    throw new Error("Nieprawidłowy format JSON");
  }
  const o = body as Record<string, unknown>;
  const eyebrow = isNonEmptyString(o.eyebrow)
    ? o.eyebrow.trim()
    : siteContent.events.eyebrow;
  const title = isNonEmptyString(o.title) ? o.title.trim() : siteContent.events.title;
  const eyebrowEn = optionalNonEmptyString(o.eyebrowEn);
  const titleEn = optionalNonEmptyString(o.titleEn);
  const rawItems = o.items;
  if (!Array.isArray(rawItems)) {
    throw new Error("Pole „items” musi być tablicą");
  }
  if (rawItems.length < 1) {
    throw new Error("Potrzeba co najmniej jednego wydarzenia");
  }
  if (rawItems.length > 30) {
    throw new Error("Maksymalnie 30 wydarzeń");
  }
  const items: EventSlide[] = rawItems.map((row, i) => {
    if (!row || typeof row !== "object") {
      throw new Error(`Wydarzenie ${i + 1}: nieprawidłowy obiekt`);
    }
    const r = row as Record<string, unknown>;
    const titleEv = isNonEmptyString(r.title) ? r.title.trim() : "";
    const dateIso = isNonEmptyString(r.dateIso) ? r.dateIso.trim() : "";
    const dateLabel = isNonEmptyString(r.dateLabel) ? r.dateLabel.trim() : "";
    const description = isNonEmptyString(r.description) ? r.description.trim() : "";
    const imageUrl = isNonEmptyString(r.imageUrl) ? r.imageUrl.trim() : "";
    if (!titleEv || !dateIso || !dateLabel || !description || !imageUrl) {
      throw new Error(`Wydarzenie ${i + 1}: wypełnij wszystkie pola`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateIso)) {
      throw new Error(`Wydarzenie ${i + 1}: data ISO musi być w formacie RRRR-MM-DD`);
    }
    if (!isAllowedEventImageUrl(imageUrl)) {
      throw new Error(
        `Wydarzenie ${i + 1}: zdjęcie — link https:// lub plik wgrany z panelu (/uploads/events/…)`
      );
    }
    const titleEnEv = optionalNonEmptyString(r.titleEn);
    const dateLabelEn = optionalNonEmptyString(r.dateLabelEn);
    const descriptionEn = optionalNonEmptyString(r.descriptionEn);
    const slide: EventSlide = {
      title: titleEv,
      dateIso,
      dateLabel,
      description,
      imageUrl,
    };
    if (titleEnEv) slide.titleEn = titleEnEv;
    if (dateLabelEn) slide.dateLabelEn = dateLabelEn;
    if (descriptionEn) slide.descriptionEn = descriptionEn;
    return slide;
  });
  const payload: EventsPayload = { eyebrow, title, items };
  if (eyebrowEn) payload.eyebrowEn = eyebrowEn;
  if (titleEn) payload.titleEn = titleEn;
  return payload;
}

export function readEventsFromDisk(): EventsPayload | null {
  try {
    if (!fs.existsSync(EVENTS_FILE)) return null;
    const raw = JSON.parse(fs.readFileSync(EVENTS_FILE, "utf8"));
    return parseEventsPayload(raw);
  } catch {
    return null;
  }
}

export function writeEventsToDisk(payload: EventsPayload): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(EVENTS_FILE, JSON.stringify(payload, null, 2), "utf8");
}

export function getMergedEventsPayload(): EventsPayload {
  const saved = readEventsFromDisk();
  if (saved) return saved;
  const { eyebrow, title, items } = siteContent.events;
  return { eyebrow, title, items };
}
