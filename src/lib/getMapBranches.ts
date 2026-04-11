import fs from "fs";
import path from "path";
import type { MapBranchesFile } from "@/content/mapBranches";

export function getMapBranches(): MapBranchesFile["countries"] {
  const fp = path.join(process.cwd(), "content", "map-branches.json");
  const raw = fs.readFileSync(fp, "utf8");
  const data = JSON.parse(raw) as MapBranchesFile;
  return data.countries;
}
