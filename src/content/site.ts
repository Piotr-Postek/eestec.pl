/**
 * Typy treści strony. Dane edytujesz w plikach JSON:
 * `content/site.pl.json` oraz `content/site.en.json`
 * (wczytywane przy starcie przez `getSiteContent`).
 */

export type HeroSlide = {
  imageUrl: string;
};

export type AboutSection = {
  eyebrow: string;
  title: string;
  lead: string;
  imageUrl: string;
};

export type EventSlide = {
  title: string;
  dateIso: string;
  dateLabel: string;
  description: string;
  imageUrl: string;
  titleEn?: string;
  dateLabelEn?: string;
  descriptionEn?: string;
};

export type SocialLinks = {
  instagram: string;
  facebook: string;
  linkedin: string;
};

export type FeaturedRibItem = {
  title: string;
  description: string;
  imageUrl: string;
  titleEn?: string;
  descriptionEn?: string;
};

export type SiteContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    slides: HeroSlide[];
  };
  about: AboutSection;
  events: {
    eyebrow: string;
    title: string;
    eyebrowEn?: string;
    titleEn?: string;
    items: EventSlide[];
  };
  featuredEvents: {
    eyebrow: string;
    title: string;
    eyebrowEn?: string;
    titleEn?: string;
    items: FeaturedRibItem[];
  };
  partners: {
    eyebrow: string;
    title: string;
  };
  footer: {
    label: string;
    copyright: string;
    social: SocialLinks;
  };
};
