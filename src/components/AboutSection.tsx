import Image from "next/image";
import type { AboutSection as AboutSectionType } from "@/content/site";

type Props = {
  about: AboutSectionType;
};

export function AboutSection({ about }: Props) {
  return (
    <section
      className="relative flex min-h-svh min-h-[100vh] scroll-mt-14 flex-col overflow-hidden bg-[var(--bg)] md:grid md:grid-cols-2 md:items-stretch"
      id="o-nas"
      aria-labelledby="about-heading"
    >
      <div className="relative z-[2] flex max-w-[38rem] flex-1 flex-col justify-center px-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(2rem,5vw,4rem)] md:bg-[linear-gradient(90deg,var(--bg)_0%,var(--bg)_78%,rgba(12,15,20,0.55)_100%)]">
        <p className="mb-[0.65rem] text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          {about.eyebrow}
        </p>
        <h2
          className="mb-4 text-[clamp(1.65rem,3.2vw,2.35rem)] font-bold leading-[1.15] tracking-[-0.02em]"
          id="about-heading"
        >
          {about.title}
        </h2>
        <p className="text-[1.0625rem] leading-[1.7] text-[var(--muted)]">
          {about.lead}
        </p>
      </div>

      <div className="relative min-h-56 flex-1 basis-[42%] md:min-h-full md:flex-none">
        <Image
          src={about.imageUrl}
          alt=""
          fill
          className="object-cover"
          sizes="(min-width: 900px) 50vw, 100vw"
          priority
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[clamp(100px,32%,280px)] md:block md:bg-[linear-gradient(90deg,var(--bg)_0%,rgba(12,15,20,0.92)_22%,rgba(12,16,22,0.2)_70%,transparent_100%)] md:backdrop-blur-[22px] md:[-webkit-mask-image:linear-gradient(90deg,#000_0%,#000_42%,rgba(0,0,0,0.65)_78%,transparent_100%)] md:[mask-image:linear-gradient(90deg,#000_0%,#000_42%,rgba(0,0,0,0.65)_78%,transparent_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[40%] bg-[linear-gradient(180deg,transparent_0%,rgba(12,15,20,0.82)_100%)] backdrop-blur-md [mask-image:linear-gradient(180deg,transparent_0%,#000_65%)] [-webkit-mask-image:linear-gradient(180deg,transparent_0%,#000_65%)] md:hidden"
          aria-hidden
        />
      </div>
    </section>
  );
}
