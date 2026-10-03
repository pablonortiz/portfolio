import { getRelativeLocaleUrl } from "astro:i18n";

import { routeSegments, sectionIds, type Section } from "@/config/navigation";
import type { Locale } from "@/lib/i18n";

const translateSegment = (segment: string, targetLocale: Locale) => {
  const translations = Object.values(routeSegments).find((translation) =>
    Object.values(translation).includes(segment),
  );
  return translations?.[targetLocale] ?? segment;
};

/** Same page in another locale: swaps the locale prefix and translates the route segments. */
export function getLocalizedPath(pathname: string, targetLocale: Locale) {
  const segments = pathname
    .split("/")
    .slice(2)
    .map((segment) => translateSegment(segment, targetLocale));
  return getRelativeLocaleUrl(targetLocale, segments.join("/"));
}

export function getSectionPath(
  lang: Locale,
  section: Section,
  params?: Record<string, string>,
) {
  const search = params ? `?${new URLSearchParams(params)}` : "";
  return `${getRelativeLocaleUrl(lang)}${search}#${sectionIds[lang][section]}`;
}

export function getProjectPath(lang: Locale, slug: string) {
  return getRelativeLocaleUrl(lang, `${routeSegments.projects[lang]}/${slug}`);
}
