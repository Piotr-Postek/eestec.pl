/**
 * Walidacja adresów zdjęć wydarzeń — bez Node/sharp, można importować w komponentach klienckich.
 */

function isHttpsUrl(v: string): boolean {
  try {
    const u = new URL(v.trim());
    return u.protocol === "https:";
  } catch {
    return false;
  }
}

export function isUploadedEventImagePath(url: string): boolean {
  const t = url.trim();
  return /^\/uploads\/events\/[a-f0-9-]+\.(jpe?g|png|webp|gif)$/i.test(t);
}

export function isAllowedEventImageUrl(v: string): boolean {
  const t = v.trim();
  if (isHttpsUrl(t)) return true;
  return isUploadedEventImagePath(t);
}
