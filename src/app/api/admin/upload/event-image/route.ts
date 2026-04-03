import { requireAdminApi } from "@/lib/auth-server";
import {
  EVENT_IMAGE_MAX_BYTES,
  saveEventImageFile,
} from "@/lib/event-image-upload";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if (!auth.ok) return auth.response;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Nieprawidłowe żądanie" }, { status: 400 });
  }

  const file = form.get("file");
  if (!file || typeof (file as Blob).arrayBuffer !== "function") {
    return Response.json({ error: "Brak pliku" }, { status: 400 });
  }

  const blob = file as File;
  if (blob.size > EVENT_IMAGE_MAX_BYTES) {
    return Response.json(
      { error: `Plik za duży (maks. ${EVENT_IMAGE_MAX_BYTES / (1024 * 1024)} MB)` },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await blob.arrayBuffer());

  try {
    const { url } = await saveEventImageFile(buffer);
    return Response.json({ url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Zapis nie powiódł się";
    return Response.json({ error: msg }, { status: 400 });
  }
}
