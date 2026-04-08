import { HomePageClient } from "@/components/HomePageClient";
import { getSiteContentEn, getSiteContentPl } from "@/lib/getSiteContent";

export default function Home() {
  const pl = getSiteContentPl();
  const en = getSiteContentEn();
  return <HomePageClient pl={pl} en={en} />;
}
