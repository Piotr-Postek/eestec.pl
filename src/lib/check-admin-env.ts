/**
 * Odczyt zmiennych w runtime (lokalnie: `.env.local` obok `package.json`;
 * produkcja: zmienne w panelu hosta, np. AWS Amplify → Environment variables).
 */
function sessionSecret(): string | undefined {
  return process.env["SESSION_SECRET"];
}

function adminPassword(): string | undefined {
  return process.env["ADMIN_PASSWORD"];
}

export function getAdminConfigIssues(): string[] {
  const issues: string[] = [];
  const secret = sessionSecret();
  if (!secret || secret.length < 32) {
    issues.push(
      "SESSION_SECRET — min. 32 znaki (np. openssl rand -base64 32)"
    );
  }
  const pwd = adminPassword();
  if (!pwd || pwd.length < 8) {
    issues.push("ADMIN_PASSWORD — min. 8 znaków (hasło do panelu)");
  }
  return issues;
}

export { adminPassword };
