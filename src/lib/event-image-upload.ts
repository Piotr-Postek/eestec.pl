import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

export const EVENT_IMAGE_MAX_BYTES = 5 * 1024 * 1024;

/** Ścieżka publiczna zapisanych plików (prefix). */
export const EVENT_UPLOAD_PUBLIC_PREFIX = "/uploads/events/";

/** Jakość WebP — kompromis rozmiar / wygląd (0–100). */
const WEBP_QUALITY = 82;

/**
 * Dekoduje wejściowy obraz (JPEG, PNG, WebP, GIF itd.) i zapisuje jako WebP,
 * żeby ograniczyć rozmiar na dysku.
 */
export async function saveEventImageFile(
  buffer: Buffer
): Promise<{ url: string }> {
  let out: Buffer;
  try {
    out = await sharp(buffer, {
      failOn: "error",
      limitInputPixels: 268_435_456,
    })
      .rotate()
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toBuffer();
  } catch {
    throw new Error("Nieobsługiwany lub uszkodzony obraz");
  }

  const name = `${randomUUID()}.webp`;
  const dir = path.join(process.cwd(), "public", "uploads", "events");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, name), out);
  return { url: `${EVENT_UPLOAD_PUBLIC_PREFIX}${name}` };
}
