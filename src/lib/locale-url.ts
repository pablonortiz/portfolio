import { getRelativeLocaleUrl } from "astro:i18n";

import type { Locale } from "@/lib/i18n";

/** Same page in another locale: swaps the locale prefix of `pathname`. */
export function getLocalizedPath(pathname: string, targetLocale: Locale) {
  const pathWithoutLocale = pathname.split("/").slice(2).join("/");
  return getRelativeLocaleUrl(targetLocale, pathWithoutLocale);
}
