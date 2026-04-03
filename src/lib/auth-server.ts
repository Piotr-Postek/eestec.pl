import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { AdminSession } from "@/lib/session";
import { getSessionOptions } from "@/lib/session";

export async function getAdminSession() {
  return getIronSession<AdminSession>(await cookies(), getSessionOptions());
}

export async function requireAdminPage() {
  const session = await getAdminSession();
  if (session.isLoggedIn !== true) {
    redirect("/admin/login");
  }
}

export async function requireAdminApi(): Promise<
  { ok: true; session: Awaited<ReturnType<typeof getAdminSession>> } | { ok: false; response: Response }
> {
  const session = await getAdminSession();
  if (session.isLoggedIn !== true) {
    return {
      ok: false,
      response: Response.json({ error: "Brak autoryzacji" }, { status: 401 }),
    };
  }
  return { ok: true, session };
}
