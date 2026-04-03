import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { getSessionOptions } from "@/lib/session";
import type { AdminSession } from "@/lib/session";

export async function POST() {
  const session = await getIronSession<AdminSession>(
    await cookies(),
    getSessionOptions()
  );
  session.destroy();
  return Response.json({ ok: true });
}
