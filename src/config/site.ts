import type { Locale } from "@/lib/i18n";

interface SiteTexts {
  title: string;
  description: string;
}

export const siteTexts = {
  es: {
    title: "Pablo Ortiz — Desarrollo de software",
    description:
      "Diseño y desarrollo software y sistemas para web, mobile y desktop.",
  },
  en: {
    title: "Pablo Ortiz — Software development",
    description:
      "I design and build software and systems for web, mobile and desktop.",
  },
} satisfies Record<Locale, SiteTexts>;
