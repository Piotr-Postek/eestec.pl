import type { SiteContent } from "@/content/site";

/** Treść strony po angielsku (zdjęcia / kolejność slajdów biorą się z wersji PL po scaleniu). */
export const siteContentEn: SiteContent = {
  hero: {
    eyebrow: "Welcome",
    title: "Your full-screen headline",
    description:
      "A short line under the headline — describe an event, project, or organisation. Text stays readable over the semi-transparent layer on top of the photos.",
    ctaLabel: "Learn more",
    ctaHref: "#o-nas",
    slides: [],
  },
  about: {
    eyebrow: "Who we are",
    title: "About us",
    lead:
      "We are a community of students in electrical engineering and related fields — we combine passion for technology with hands-on projects and international collaboration. Our goal is to grow skills and build lasting ties in the academic world.",
    imageUrl: "",
  },
  events: {
    eyebrow: "Calendar",
    title: "Events",
    items: [
      {
        title: "Embedded C workshop",
        dateIso: "2026-04-12",
        dateLabel: "12 April 2026",
        description:
          "Hands-on microcontroller programming — from GPIO to serial communication. For students of electrical and related programmes.",
        imageUrl: "",
      },
      {
        title: "Meetup with Kraków tech companies",
        dateIso: "2026-05-03",
        dateLabel: "3 May 2026",
        description:
          "Networking with local tech firms, student project showcases, and conversations about internships.",
        imageUrl: "",
      },
      {
        title: "Soft Skills Weekend",
        dateIso: "2026-05-24",
        dateLabel: "24–25 May 2026",
        description:
          "A two-day workshop on presentations, teamwork, and interview prep — weekend format on the AGH campus.",
        imageUrl: "",
      },
    ],
  },
  featuredEvents: {
    eyebrow: "In the spotlight",
    title: "Our flagship events",
    items: [
      {
        title: "Hardware & embedded workshops",
        description:
          "From soldering irons to microcontrollers — short, intense sessions where we go from a schematic to a working prototype in one day. Less theory on slides, more real hardware in your hands.",
        imageUrl: "",
      },
      {
        title: "Hackathons and team projects",
        description:
          "24–48 hours of code, electronics, and ideas. We mix people from different programmes into teams that present a working demo to judges and the audience at the end.",
        imageUrl: "",
      },
      {
        title: "LC congresses and international trips",
        description:
          "EESTEC is a network of local committees across Europe. We regularly travel to congresses, exchanges, and workshops abroad — people, cultures, and companies from all over the continent.",
        imageUrl: "",
      },
      {
        title: "Meetups and networking",
        description:
          "Company events, themed evenings, and relaxed get-togethers after the semester. A chance to meet seniors, mentors, and partners who genuinely help you grow your career.",
        imageUrl: "",
      },
    ],
  },
  footer: {
    label: "Find us here",
    copyright: "© EESTEC AGH Kraków",
    social: {
      instagram: "https://www.instagram.com/",
      facebook: "https://www.facebook.com/",
      linkedin: "https://www.linkedin.com/",
    },
  },
};
