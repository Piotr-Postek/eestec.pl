/**
 * Jedno źródło treści strony. Docelowo można zastąpić odczytem z API / bazy
 * (panel administracyjny zapisuje tutaj lub w DB).
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
  /** Wersje EN z panelu admina — puste = szablon z `site.en` (po indeksie) albo tekst PL. */
  titleEn?: string;
  dateLabelEn?: string;
  descriptionEn?: string;
};

export type SocialLinks = {
  instagram: string;
  facebook: string;
  linkedin: string;
};

/** Kafelek w sekcji „Nasze główne wydarzenia” (układ 4 żeber). */
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
    /** Karuzela wstępu — dowolna liczba slajdów (≥ 1). */
    slides: HeroSlide[];
  };
  about: AboutSection;
  events: {
    eyebrow: string;
    title: string;
    /** Nagłówki sekcji po angielsku (panel); brak = domyślne z `site.en`. */
    eyebrowEn?: string;
    titleEn?: string;
    /** Slider wydarzeń — dowolna liczba pozycji (≥ 1). */
    items: EventSlide[];
  };
  /** Sekcja u dołu strony — cztery „żebra” z grafiką i opisem po najechaniu. */
  featuredEvents: {
    eyebrow: string;
    title: string;
    eyebrowEn?: string;
    titleEn?: string;
    items: FeaturedRibItem[];
  };
  footer: {
    label: string;
    copyright: string;
    social: SocialLinks;
  };
};

export const siteContent: SiteContent = {
  hero: {
    eyebrow: "Witamy",
    title: "Twój nagłówek na pełnym ekranie",
    description:
      "Krótki opis pod nagłówkiem — możesz tu opisać wydarzenie, projekt lub organizację. Tekst jest czytelny dzięki półprzezroczystemu tłu nad zdjęciami.",
    ctaLabel: "Dowiedz się więcej",
    ctaHref: "#o-nas",
    slides: [
      {
        imageUrl:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1540575467063-27aef4e7bd51?auto=format&fit=crop&w=1920&q=80",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80",
      },
    ],
  },
  about: {
    eyebrow: "Kim jesteśmy",
    title: "O nas",
    lead:
      "Jesteśmy społecznością studentów inżynierii elektrycznej i pokrewnych kierunków — łączymy pasję do technologii z praktyką, projektami i międzynarodową współpracą. Naszym celem jest rozwój kompetencji i budowanie trwałych relacji w środowisku akademickim.",
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
  },
  events: {
    eyebrow: "Kalendarz",
    title: "Wydarzenia",
    items: [
      {
        title: "Warsztaty Embedded C",
        dateIso: "2026-04-12",
        dateLabel: "12 kwietnia 2026",
        description:
          "Praktyczne zajęcia z programowania mikrokontrolerów — od GPIO po komunikację szeregową. Dla studentów kierunków elektrycznych i pokrewnych.",
        imageUrl:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
      },
      {
        title: "Integracja z LC Kraków",
        dateIso: "2026-05-03",
        dateLabel: "3 maja 2026",
        description:
          "Spotkanie networkingowe z lokalnymi firmami technologicznymi, prezentacje projektów studenckich i możliwość rozmów o praktykach.",
        imageUrl:
          "https://images.unsplash.com/photo-1540575467063-27aef4e7bd51?auto=format&fit=crop&w=1600&q=80",
      },
      {
        title: "Soft Skills Weekend",
        dateIso: "2026-05-24",
        dateLabel: "24–25 maja 2026",
        description:
          "Dwudniowy warsztat z prezentacji, pracy w zespole i przygotowania do rozmów rekrutacyjnych — w formule weekendowej na terenie AGH.",
        imageUrl:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
      },
    ],
  },
  featuredEvents: {
    eyebrow: "W centrum uwagi",
    title: "Nasze główne wydarzenia",
    items: [
      {
        title: "Warsztaty hardware & embedded",
        description:
          "Od lutownicy po mikrokontrolery — krótkie, intensywne sesje, na których w jeden dzień przechodzimy od schematu do działającego prototypu. Bez slidów z teorii, za to z realnym sprzętem w rękach.",
        imageUrl:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Hackathony i projekty zespołowe",
        description:
          "24–48 godzin kodu, elektroniki i pomysłów. Łączymy ludzi z różnych kierunków w zespoły, które na koniec dnia prezentują działające demo przed jury i widownią.",
        imageUrl:
          "https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Kongresy LC i wyjazdy międzynarodowe",
        description:
          "EESTEC to sieć lokalnych komitetów w całej Europie. Regularnie wyjeżdżamy na kongresy, wymiany i warsztaty za granicą — poznajesz ludzi, kultury i firmy z całego kontynentu.",
        imageUrl:
          "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Integracje i networking",
        description:
          "Spotkania z firmami, wieczory tematyczne i luźne integracje po semestrze. To moment, żeby poznać starszych kolegów, mentorów i partnerów, którzy realnie pomagają w rozwoju kariery.",
        imageUrl:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  footer: {
    label: "Znajdziesz nas tutaj",
    copyright: "© EESTEC AGH Kraków",
    social: {
      instagram: "https://www.instagram.com/",
      facebook: "https://www.facebook.com/",
      linkedin: "https://www.linkedin.com/",
    },
  },
};
