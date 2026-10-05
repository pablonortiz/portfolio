import type { Locale } from "@/lib/i18n";

/** The home's sections with an anchor, in page order. */
export const sections = ["projects", "about", "process", "contact"] as const;

export type Section = (typeof sections)[number];

/** The ones the navigation links to. */
export const navigationSections = [
  "projects",
  "about",
  "contact",
] as const satisfies readonly Section[];

export type NavigationSection = (typeof navigationSections)[number];

export const sectionIds = {
  es: {
    projects: "proyectos",
    about: "sobre-mi",
    process: "como-trabajo",
    contact: "contacto",
  },
  en: {
    projects: "projects",
    about: "about",
    process: "how-i-work",
    contact: "contact",
  },
} satisfies Record<Locale, Record<Section, string>>;

/** Query parameters, named in each language: the projects folder's tab (docs/projects.md §42.1). */
export const queryParams = {
  platform: { es: "plataforma", en: "platform" },
} satisfies Record<string, Record<Locale, string>>;

export const routeSegments = {
  projects: { es: "proyectos", en: "projects" },
} satisfies Record<string, Record<Locale, string>>;
