"use client";

import { AboutSection } from "@/components/AboutSection";
import { EventsSlider } from "@/components/EventsSlider";
import { MainEventsRibsSection } from "@/components/MainEventsRibsSection";
import { BoardSection } from "@/components/BoardSection";
import { HeroCarousel } from "@/components/HeroCarousel";
import { HomeScrollIndicators } from "@/components/HomeScrollIndicators";
import { PartnersSection } from "@/components/PartnersSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { LocaleProvider, useLocale } from "@/context/LocaleContext";
import type { MapBranchCountry } from "@/content/mapBranches";
import type { SiteContent } from "@/content/site";

function HomeSections({
  mapBranches,
}: {
  mapBranches: Record<string, MapBranchCountry>;
}) {
  const { content, locale } = useLocale();
  const { hero, about, events, featuredEvents, board, footer } = content;

  return (
    <>
      <SiteHeader />
      <HomeScrollIndicators />
      <HeroCarousel
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        ctaLabel={hero.ctaLabel}
        ctaHref={hero.ctaHref}
        slides={hero.slides}
      />
      <main>
        <AboutSection
          about={about}
          mapBranches={mapBranches}
          locale={locale}
        />
        <EventsSlider
          eyebrow={events.eyebrow}
          title={events.title}
          items={events.items}
        />
        <MainEventsRibsSection
          eyebrow={featuredEvents.eyebrow}
          title={featuredEvents.title}
          items={featuredEvents.items}
        />
      </main>
      <PartnersSection />
      <BoardSection board={board} />
      <SiteFooter
        label={footer.label}
        copyright={footer.copyright}
        social={footer.social}
      />
    </>
  );
}

type Props = {
  pl: SiteContent;
  en: SiteContent;
  mapBranches: Record<string, MapBranchCountry>;
};

export function HomePageClient({ pl, en, mapBranches }: Props) {
  return (
    <LocaleProvider pl={pl} en={en}>
      <HomeSections mapBranches={mapBranches} />
    </LocaleProvider>
  );
}
