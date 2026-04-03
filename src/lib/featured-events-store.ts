import fs from "fs";
import path from "path";
import type { FeaturedRibItem } from "@/content/site";
import { siteContent } from "@/content/site";
import { isAllowedEventImageUrl } from "@/lib/event-image-url";
import {
  FEATURED_RIBS_COUNT,
  type FeaturedEventsPayload,
} from "@/lib/featured-events-shared";

export { FEATURED_RIBS_COUNT, type FeaturedEventsPayload } from "@/lib/featured-events-shared";

const DATA_DIR = path.join(process.cwd(), "data");
const FEATURED_FILE = path.join(DATA_DIR, "featured-events.json");

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function optionalNonEmptyString(v: unknown): string | undefined {
  if (!isNonEmptyString(v)) return undefined;
  return v.trim();
}

export function parseFeaturedEventsPayload(body: unknown): FeaturedEventsPayload {
  if (!body || typeof body !== "object") {
    throw new Error("Nieprawidłowy format JSON");
  }
  const o = body as Record<string, unknown>;
  const eyebrow = isNonEmptyString(o.eyebrow)
    ? o.eyebrow.trim()
    : siteContent.featuredEvents.eyebrow;
  const title = isNonEmptyString(o.title)
    ? o.title.trim()
    : siteContent.featuredEvents.title;
  const eyebrowEn = optionalNonEmptyString(o.eyebrowEn);
  const titleEn = optionalNonEmptyString(o.titleEn);
  const rawItems = o.items;
  if (!Array.isArray(rawItems)) {
    throw new Error("Pole „items” musi być tablicą");
  }
  if (rawItems.length !== FEATURED_RIBS_COUNT) {
    throw new Error(`Sekcja wymaga dokładnie ${FEATURED_RIBS_COUNT} wydarzeń`);
  }
  const items: FeaturedRibItem[] = rawItems.map((row, i) => {
    if (!row || typeof row !== "object") {
      throw new Error(`Kafelek ${i + 1}: nieprawidłowy obiekt`);
    }
    const r = row as Record<string, unknown>;
    const titleEv = isNonEmptyString(r.title) ? r.title.trim() : "";
    const description = isNonEmptyString(r.description) ? r.description.trim() : "";
    const imageUrl = isNonEmptyString(r.imageUrl) ? r.imageUrl.trim() : "";
    if (!titleEv || !description || !imageUrl) {
      throw new Error(`Kafelek ${i + 1}: wypełnij tytuł, opis i zdjęcie`);
    }
    if (!isAllowedEventImageUrl(imageUrl)) {
      throw new Error(
        `Kafelek ${i + 1}: zdjęcie — link https:// lub plik z panelu (/uploads/events/…)`
      );
    }
    const titleEnEv = optionalNonEmptyString(r.titleEn);
    const descriptionEn = optionalNonEmptyString(r.descriptionEn);
    const item: FeaturedRibItem = { title: titleEv, description, imageUrl };
    if (titleEnEv) item.titleEn = titleEnEv;
    if (descriptionEn) item.descriptionEn = descriptionEn;
    return item;
  });
  const payload: FeaturedEventsPayload = { eyebrow, title, items };
  if (eyebrowEn) payload.eyebrowEn = eyebrowEn;
  if (titleEn) payload.titleEn = titleEn;
  return payload;
}

export function readFeaturedEventsFromDisk(): FeaturedEventsPayload | null {
  try {
    if (!fs.existsSync(FEATURED_FILE)) return null;
    const raw = JSON.parse(fs.readFileSync(FEATURED_FILE, "utf8"));
    return parseFeaturedEventsPayload(raw);
  } catch {
    return null;
  }
}

export function writeFeaturedEventsToDisk(payload: FeaturedEventsPayload): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FEATURED_FILE, JSON.stringify(payload, null, 2), "utf8");
}

export function getMergedFeaturedEventsPayload(): FeaturedEventsPayload {
  const saved = readFeaturedEventsFromDisk();
  if (saved) return saved;
  const { eyebrow, title, items } = siteContent.featuredEvents;
  return { eyebrow, title, items };
}
