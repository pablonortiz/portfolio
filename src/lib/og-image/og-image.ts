import { siteName, siteTexts } from "@/config/site";
import type { Locale } from "@/lib/i18n";
import { isPackage, type Project } from "@/lib/projects";
import { projectsTexts } from "@/sections/projects/projects.texts";

import { cardSize } from "./elements";
import { ogImageTexts } from "./og-image.texts";

export interface OgImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

// The paths match the endpoints in src/pages/og/.
const ogImage = (path: string, alt: string): OgImage => ({
  url: new URL(path, import.meta.env.SITE).href,
  alt,
  ...cardSize,
});

export const homeOgImage = (lang: Locale) =>
  ogImage(`/og/${lang}.png`, `${siteName} — ${siteTexts[lang].description}`);

export function projectOgImage(project: Project, lang: Locale) {
  const texts = ogImageTexts[lang];
  const alt = isPackage(project)
    ? texts.packageAlt(project.title)
    : texts.appAlt(
        project.title,
        projectsTexts[lang].categories[project.category],
      );
  return ogImage(`/og/${lang}/${project.slug}.png`, alt);
}
