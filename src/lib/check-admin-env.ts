/**
 * Zwraca listę problemów z konfiguracją panelu (zmienne w .env.local).
 * Next.js wczytuje .env.local z katalogu projektu (folder `web`).
 */
export function getAdminConfigIssues(): string[] {
  const issues: string[] = [];
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    issues.push(
      "SESSION_SECRET — min. 32 znaki (np. openssl rand -base64 32)"
    );
  }
  const pwd = process.env.ADMIN_PASSWORD;
  if (!pwd || pwd.length < 8) {
    issues.push("ADMIN_PASSWORD — min. 8 znaków (hasło do panelu)");
  }
  return issues;
}
