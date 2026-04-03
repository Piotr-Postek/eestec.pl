import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import {
  adminPassword,
  getAdminConfigIssues,
} from "@/lib/check-admin-env";
import type { AdminSession } from "@/lib/session";
import { getSessionOptions } from "@/lib/session";

/** iron-session wymaga Node; na niektórych hostach domyślnie bywa Edge bez pełnego process.env. */
export const runtime = "nodejs";

const CONFIG_HINT_LOCAL =
  "Lokalnie: plik `.env.local` obok `package.json` (wzór w `.env.example`), potem restart `npm run dev`.";

const CONFIG_HINT_AMPLIFY =
  "AWS Amplify: Hosting → Environment variables — dodaj dokładnie `SESSION_SECRET` i `ADMIN_PASSWORD` dla gałęzi, którą wdrażasz (np. main). Zapisz, potem **Redeploy** (najlepiej „Clear cache and deploy”). Nazwy są **wielkości liter**.";

export async function POST(request: Request) {
  try {
    const configIssues = getAdminConfigIssues();
    if (configIssues.length > 0) {
      return Response.json(
        {
          error:
            "Brak konfiguracji serwera. Ustaw:\n\n" +
            configIssues.map((line) => `• ${line}`).join("\n") +
            "\n\n" +
            CONFIG_HINT_LOCAL +
            "\n\n" +
            CONFIG_HINT_AMPLIFY,
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const password =
      typeof body?.password === "string" ? body.password : "";
    const expected = adminPassword()!;
    if (password !== expected) {
      return Response.json({ error: "Nieprawidłowe hasło" }, { status: 401 });
    }

    const session = await getIronSession<AdminSession>(
      await cookies(),
      getSessionOptions()
    );
    session.isLoggedIn = true;
    await session.save();
    return Response.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Błąd logowania";
    return Response.json({ error: msg }, { status: 500 });
  }
}
