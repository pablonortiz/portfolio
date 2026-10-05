import {
  queryParams,
  sectionIds,
  sections,
  type Section,
} from "@/config/navigation";
import type { Locale } from "@/lib/i18n";

/** The section being read: the last one whose start has passed the upper third of the screen. */
function sectionInView(lang: Locale) {
  const readingLine = innerHeight / 3;
  let current: Section | undefined;
  for (const section of sections) {
    const start = document.getElementById(sectionIds[lang][section]);
    if (start && start.getBoundingClientRect().top <= readingLine) {
      current = section;
    }
  }
  return current;
}

/** The current query, with each known parameter renamed to the other language (the values are the same in both). */
function translateQuery(from: Locale, to: Locale) {
  const query = new URLSearchParams(location.search);
  for (const names of Object.values(queryParams)) {
    const value = query.get(names[from]);
    if (value === null) continue;
    query.delete(names[from]);
    query.set(names[to], value);
  }
  return query.toString();
}

/**
 * The other language's link keeps where the visitor is: the folder's tab and
 * the section being read, which the URL alone doesn't say (scrolling doesn't
 * change it). Worked out when the link is used, so it's always current; the
 * path, already translated, comes from the server. Without JS, the link goes
 * to the same page's top in the other language.
 */
export function setupLanguageSwitch(
  link: HTMLAnchorElement,
  signal: AbortSignal,
) {
  const from = link.dataset.langFrom as Locale;
  const to = link.dataset.langTo as Locale;
  const keepPlace = () => {
    const target = new URL(link.href);
    target.search = translateQuery(from, to);
    const section = sectionInView(from);
    target.hash = section ? sectionIds[to][section] : "";
    link.href = target.href;
  };
  // Before the router reads the link (it listens on the document) and before a new tab opens.
  for (const type of ["click", "auxclick", "contextmenu"]) {
    link.addEventListener(type, keepPlace, { signal });
  }
}
