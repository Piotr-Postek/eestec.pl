import { FeaturedEventsEditor } from "@/components/admin/FeaturedEventsEditor";
import { requireAdminPage } from "@/lib/auth-server";
import { getMergedFeaturedEventsPayload } from "@/lib/featured-events-store";

export const metadata = {
  title: "Główne wydarzenia — panel",
};

export default async function AdminFeaturedPage() {
  await requireAdminPage();
  const initial = getMergedFeaturedEventsPayload();
  return <FeaturedEventsEditor initial={initial} />;
}
