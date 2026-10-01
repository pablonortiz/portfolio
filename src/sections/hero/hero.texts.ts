import type { Locale } from "@/lib/i18n";

export type Platform = "web" | "mobile" | "desktop";

interface HeroTexts {
  greeting: string;
  name: string;
  taglineLines: [string, string];
  photoAlt: string;
  platformsLabel: string;
  platforms: Record<Platform, string>;
  cta: string;
}

const platforms = { web: "Web", mobile: "Mobile", desktop: "Desktop" };

export const heroTexts = {
  es: {
    greeting: "Hola, soy",
    name: "Pablo Ortiz",
    taglineLines: ["Diseño y desarrollo", "software y sistemas"],
    photoAlt: "Retrato de Pablo Ortiz",
    platformsLabel: "Plataformas",
    platforms,
    cta: "Conocé mis proyectos",
  },
  en: {
    greeting: "Hi, I'm",
    name: "Pablo Ortiz",
    taglineLines: ["I design and build", "software and systems"],
    photoAlt: "Portrait of Pablo Ortiz",
    platformsLabel: "Platforms",
    platforms,
    cta: "Explore my projects",
  },
} satisfies Record<Locale, HeroTexts>;
