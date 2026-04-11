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

/** Członek zarządu — zdjęcie, imię i nazwisko, funkcja; opcjonalnie `link` / `email`. */
export type BoardMember = {
  name: string;
  role: string;
  imageUrl: string;
  /** np. https://… */
  link?: string;
  /** adres e-mail → link mailto */
  email?: string;
};

export type BoardSectionContent = {
  eyebrow: string;
  title: string;
  /** Krótki akapit pod tytułem (opcjonalny). */
  intro?: string;
  members: BoardMember[];
};

/** Wpis dla kraju na mapie — klucz = ISO 3166-1 alpha-2 (np. PL, DE). */
export type BranchCountryRow = {
  name: string;
  branches: number;
};

/** Mapa Europy z liczbą oddziałów EESTEC (dane z JSON). */
export type BranchesMapSection = {
  eyebrow: string;
  title: string;
  intro?: string;
  hint: string;
  branchWordPlOne: string;
  branchWordPlFew: string;
  branchWordPlMany: string;
  branchWordEnSingular: string;
  branchWordEnPlural: string;
  countries: Record<string, BranchCountryRow>;
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
  board: BoardSectionContent;
  branchesMap: BranchesMapSection;
  footer: {
    label: string;
    copyright: string;
    social: SocialLinks;
  };
};
