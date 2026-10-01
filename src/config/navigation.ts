import type { Locale } from "@/lib/i18n";

export const sections = ["projects", "about", "contact"] as const;

export type Section = (typeof sections)[number];

export const sectionIds = {
  es: { projects: "proyectos", about: "sobre-mi", contact: "contacto" },
  en: { projects: "projects", about: "about", contact: "contact" },
} satisfies Record<Locale, Record<Section, string>>;
