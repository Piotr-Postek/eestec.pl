import type {
  EventSlide,
  FeaturedRibItem,
  SiteContent,
} from "@/content/site";
import { siteContentEn } from "@/content/site.en";

function enLine(
  fromAdmin: string | undefined,
  fromTemplate: string | undefined,
  polish: string
): string {
  const a = fromAdmin?.trim();
  if (a) return a;
  const t = fromTemplate?.trim();
  if (t) return t;
  return polish;
}

/**
 * Wersja angielska: teksty z `site.en.ts` + opcjonalne pola EN z panelu (`data/events.json`).
 * Dla każdej karty: `titleEn` / `dateLabelEn` / `descriptionEn` z admina, inaczej szablon EN
 * po indeksie, inaczej tekst polski.
 */
export function buildEnglishSiteContent(pl: SiteContent): SiteContent {
  const enItems = siteContentEn.events.items;
  const items: EventSlide[] = pl.events.items.map((item, i) => {
    const en = enItems[i];
    return {
      title: enLine(item.titleEn, en?.title, item.title),
      dateIso: item.dateIso,
      dateLabel: enLine(item.dateLabelEn, en?.dateLabel, item.dateLabel),
      description: enLine(item.descriptionEn, en?.description, item.description),
      imageUrl: item.imageUrl,
    };
  });

  return {
    ...siteContentEn,
    hero: {
      ...siteContentEn.hero,
      slides: pl.hero.slides,
    },
    about: {
      ...siteContentEn.about,
      imageUrl: pl.about.imageUrl,
    },
    events: {
      eyebrow: pl.events.eyebrowEn?.trim() || siteContentEn.events.eyebrow,
      title: pl.events.titleEn?.trim() || siteContentEn.events.title,
      items,
    },
    featuredEvents: (() => {
      const enF = siteContentEn.featuredEvents;
      const ribItems: FeaturedRibItem[] = pl.featuredEvents.items.map(
        (item, i) => {
          const en = enF.items[i];
          return {
            title: enLine(item.titleEn, en?.title, item.title),
            description: enLine(
              item.descriptionEn,
              en?.description,
              item.description
            ),
            imageUrl: item.imageUrl,
          };
        }
      );
      return {
        eyebrow:
          pl.featuredEvents.eyebrowEn?.trim() || enF.eyebrow,
        title: pl.featuredEvents.titleEn?.trim() || enF.title,
        items: ribItems,
      };
    })(),
    partners: siteContentEn.partners,
    footer: {
      ...siteContentEn.footer,
      social: pl.footer.social,
    },
  };
}
