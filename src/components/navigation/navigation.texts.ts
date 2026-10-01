import type { Locale } from "@/lib/i18n";

interface NavigationLink {
  sectionId: string;
  label: string;
}

interface NavigationTexts {
  homeLabel: string;
  navigationLabel: string;
  languageLabel: string;
  openMenu: string;
  closeMenu: string;
  menuLabel: string;
  links: NavigationLink[];
}

export const navigationTexts = {
  es: {
    homeLabel: "Pablo Ortiz, inicio",
    navigationLabel: "Principal",
    languageLabel: "Idioma",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    menuLabel: "Menú",
    links: [
      { sectionId: "proyectos", label: "Proyectos" },
      { sectionId: "sobre-mi", label: "Sobre mí" },
      { sectionId: "contacto", label: "Contacto" },
    ],
  },
  en: {
    homeLabel: "Pablo Ortiz, home",
    navigationLabel: "Main",
    languageLabel: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuLabel: "Menu",
    links: [
      { sectionId: "projects", label: "Projects" },
      { sectionId: "about", label: "About" },
      { sectionId: "contact", label: "Contact" },
    ],
  },
} satisfies Record<Locale, NavigationTexts>;
