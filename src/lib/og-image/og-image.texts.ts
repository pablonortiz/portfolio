import { siteName } from "@/config/site";
import type { Locale } from "@/lib/i18n";

interface OgImageTexts {
  appAlt: (title: string, category: string) => string;
  packageAlt: (title: string) => string;
}

export const ogImageTexts = {
  es: {
    appAlt: (title, category) =>
      `${title}, proyecto ${category} de ${siteName}`,
    packageAlt: (title) => `${title}, paquete de npm de ${siteName}`,
  },
  en: {
    appAlt: (title, category) =>
      `${title}, a ${category} project by ${siteName}`,
    packageAlt: (title) => `${title}, an npm package by ${siteName}`,
  },
} satisfies Record<Locale, OgImageTexts>;
