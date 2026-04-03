import { EventsEditor } from "@/components/admin/EventsEditor";
import { requireAdminPage } from "@/lib/auth-server";
import { getMergedEventsPayload } from "@/lib/events-store";

export const metadata = {
  title: "Wydarzenia — panel",
};

export default async function AdminEventsPage() {
  await requireAdminPage();
  const initial = getMergedEventsPayload();
  return <EventsEditor initial={initial} />;
}
