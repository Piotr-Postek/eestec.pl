import { AboutEuropeMap } from "@/components/AboutEuropeMap";
import type { MapBranchCountry } from "@/content/mapBranches";
import type { AboutSection as AboutSectionType } from "@/content/site";

type Props = {
  about: AboutSectionType;
  mapBranches: Record<string, MapBranchCountry>;
  locale: "pl" | "en";
};

export function AboutSection({ about, mapBranches, locale }: Props) {
  return (
    <section
      className="relative scroll-mt-14 overflow-hidden bg-[var(--bg)]"
      id="o-nas"
      aria-labelledby="about-heading"
    >
      {/* Na bardzo szerokich ekranach treść nie rozjeżdża się na cały viewport — wyższa max-width + większy tekst/mapę niżej */}
      <div className="mx-auto flex min-h-svh min-h-[100vh] w-full max-w-[min(100%,92rem)] flex-col md:flex-row md:items-center md:gap-[clamp(1rem,3vw,2.5rem)] xl:max-w-[min(100%,104rem)] 2xl:max-w-[min(100%,118rem)]">
        <div className="relative z-[2] flex w-full max-w-[38rem] flex-1 flex-col justify-center px-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(2rem,5vw,4rem)] md:min-h-0 md:w-0 md:flex-1 md:bg-[linear-gradient(90deg,var(--bg)_0%,var(--bg)_72%,rgba(12,15,20,0.35)_93%,var(--bg)_100%)] xl:max-w-[44rem] xl:px-10 2xl:max-w-[50rem] 2xl:px-14 2xl:py-16">
          <p className="mb-[0.65rem] text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)] xl:text-[0.875rem]">
            {about.eyebrow}
          </p>
          <h2
            className="mb-4 text-[clamp(1.65rem,3.2vw,2.35rem)] font-bold leading-[1.15] tracking-[-0.02em] xl:text-[clamp(1.85rem,2.4vw,2.65rem)] 2xl:text-[clamp(2rem,2.2vw,2.85rem)]"
            id="about-heading"
          >
            {about.title}
          </h2>
          <p className="text-[1.0625rem] leading-[1.7] text-[var(--muted)] xl:text-[1.125rem] xl:leading-[1.75] 2xl:text-[1.1875rem] 2xl:leading-[1.8]">
            {about.lead}
          </p>
        </div>

        <div className="relative flex min-h-56 w-full flex-1 basis-[42%] flex-col items-center justify-center bg-[var(--bg)] md:min-h-0 md:w-0 md:flex-1 md:basis-0">
          <AboutEuropeMap mapBranches={mapBranches} locale={locale} />
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[clamp(100px,32%,280px)] md:block md:bg-[linear-gradient(90deg,var(--bg)_0%,rgba(12,15,20,0.92)_22%,rgba(12,16,22,0.2)_70%,transparent_100%)] md:backdrop-blur-[22px] md:[-webkit-mask-image:linear-gradient(90deg,#000_0%,#000_42%,rgba(0,0,0,0.65)_78%,transparent_100%)] md:[mask-image:linear-gradient(90deg,#000_0%,#000_42%,rgba(0,0,0,0.65)_78%,transparent_100%)] xl:w-[min(32%,320px)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[40%] bg-[linear-gradient(180deg,transparent_0%,rgba(12,15,20,0.82)_100%)] backdrop-blur-md [mask-image:linear-gradient(180deg,transparent_0%,#000_65%)] [-webkit-mask-image:linear-gradient(180deg,transparent_0%,#000_65%)] md:hidden"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
