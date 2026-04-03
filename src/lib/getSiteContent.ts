import type { SiteContent } from "@/content/site";
import { siteContent } from "@/content/site";
import { getMergedFeaturedEventsPayload } from "@/lib/featured-events-store";
import { getMergedEventsPayload } from "@/lib/events-store";

/**
 * Treść strony: domyślne wartości z `site.ts` + nadpisania z `data/events.json`
 * oraz `data/featured-events.json` (panel administracyjny).
 */
export async function getSiteContent(): Promise<SiteContent> {
  const events = getMergedEventsPayload();
  const featuredEvents = getMergedFeaturedEventsPayload();
  return {
    ...siteContent,
    events,
    featuredEvents,
  };
}
