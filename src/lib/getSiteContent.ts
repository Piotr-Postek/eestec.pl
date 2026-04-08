import fs from "fs";
import path from "path";
import type { SiteContent } from "@/content/site";

function readSiteFile(name: "site.pl.json" | "site.en.json"): SiteContent {
  const fp = path.join(process.cwd(), "content", name);
  const raw = fs.readFileSync(fp, "utf8");
  return JSON.parse(raw) as SiteContent;
}

export function getSiteContentPl(): SiteContent {
  return readSiteFile("site.pl.json");
}

export function getSiteContentEn(): SiteContent {
  return readSiteFile("site.en.json");
}
