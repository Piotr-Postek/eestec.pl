import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/auth-server";
import {
  getMergedFeaturedEventsPayload,
  parseFeaturedEventsPayload,
  writeFeaturedEventsToDisk,
} from "@/lib/featured-events-store";

export async function GET() {
  const auth = await requireAdminApi();
  if (!auth.ok) return auth.response;
  try {
    const data = getMergedFeaturedEventsPayload();
    return Response.json(data);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Błąd odczytu";
    return Response.json({ error: msg }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const auth = await requireAdminApi();
  if (!auth.ok) return auth.response;
  try {
    const body = await request.json();
    const payload = parseFeaturedEventsPayload(body);
    writeFeaturedEventsToDisk(payload);
    revalidatePath("/");
    return Response.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Zapis nie powiódł się";
    return Response.json({ error: msg }, { status: 400 });
  }
}
