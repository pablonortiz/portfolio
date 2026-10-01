export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export const localeNames = {
  es: "Español",
  en: "English",
} satisfies Record<Locale, string>;
