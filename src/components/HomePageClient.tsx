"use client";

import { AboutSection } from "@/components/AboutSection";
import { EventsSlider } from "@/components/EventsSlider";
import { MainEventsRibsSection } from "@/components/MainEventsRibsSection";
import { HeroCarousel } from "@/components/HeroCarousel";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { LocaleProvider, useLocale } from "@/context/LocaleContext";
import type { SiteContent } from "@/content/site";

function HomeSections() {
  const { content } = useLocale();
  const { hero, about, events, featuredEvents, footer } = content;

  return (
    <>
      <SiteHeader />
      <HeroCarousel
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        ctaLabel={hero.ctaLabel}
        ctaHref={hero.ctaHref}
        slides={hero.slides}
      />
      <main>
        <AboutSection about={about} />
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
};

export function HomePageClient({ pl, en }: Props) {
  return (
    <LocaleProvider pl={pl} en={en}>
      <HomeSections />
    </LocaleProvider>
  );
}
