import { HomePageClient } from "@/components/HomePageClient";
import { getSiteContent } from "@/lib/getSiteContent";
import { buildEnglishSiteContent } from "@/lib/localize";

export default async function Home() {
  const pl = await getSiteContent();
  const en = buildEnglishSiteContent(pl);

  return <HomePageClient pl={pl} en={en} />;
}
