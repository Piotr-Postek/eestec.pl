import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { getAdminConfigIssues } from "@/lib/check-admin-env";
import type { AdminSession } from "@/lib/session";
import { getSessionOptions } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const configIssues = getAdminConfigIssues();
    if (configIssues.length > 0) {
      return Response.json(
        {
          error:
            "Brak konfiguracji serwera. W katalogu projektu `web` utwórz plik `.env.local` i wpisz:\n\n" +
            configIssues.map((line) => `• ${line}`).join("\n") +
            "\n\nSkopiuj szablon z pliku `.env.example`, zapisz, potem zatrzymaj i uruchom ponownie `npm run dev`.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const password =
      typeof body?.password === "string" ? body.password : "";
    const expected = process.env.ADMIN_PASSWORD!;
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
