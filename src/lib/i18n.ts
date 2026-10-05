export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export const localeNames = {
  es: "Español",
  en: "English",
} satisfies Record<Locale, string>;

/** Language and region, as Open Graph writes them. The Spanish is Argentine (voseo). */
export const openGraphLocales = {
  es: "es_AR",
  en: "en_US",
} satisfies Record<Locale, string>;
