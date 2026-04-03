import type { FeaturedRibItem } from "@/content/site";

export const FEATURED_RIBS_COUNT = 4;

export type FeaturedEventsPayload = {
  eyebrow: string;
  title: string;
  eyebrowEn?: string;
  titleEn?: string;
  items: FeaturedRibItem[];
};
