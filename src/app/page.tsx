import { HomePageClient } from "@/components/HomePageClient";
import { getMapBranches } from "@/lib/getMapBranches";
import { getSiteContentEn, getSiteContentPl } from "@/lib/getSiteContent";

export default function Home() {
  const pl = getSiteContentPl();
  const en = getSiteContentEn();
  const mapBranches = getMapBranches();
  return (
    <HomePageClient pl={pl} en={en} mapBranches={mapBranches} />
  );
}
