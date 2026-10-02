import type { Section } from "@/config/navigation";
import type { Locale } from "@/lib/i18n";

interface NavigationTexts {
  homeLabel: string;
  navigationLabel: string;
  languageLabel: string;
  darkTheme: string;
  openMenu: string;
  closeMenu: string;
  menuLabel: string;
  links: Record<Section, string>;
}

export const navigationTexts = {
  es: {
    homeLabel: "Pablo Ortiz, inicio",
    navigationLabel: "Principal",
    languageLabel: "Idioma",
    darkTheme: "Tema oscuro",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    menuLabel: "Menú",
    links: { projects: "Proyectos", about: "Sobre mí", contact: "Contacto" },
  },
  en: {
    homeLabel: "Pablo Ortiz, home",
    navigationLabel: "Main",
    languageLabel: "Language",
    darkTheme: "Dark theme",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuLabel: "Menu",
    links: { projects: "Projects", about: "About", contact: "Contact" },
  },
} satisfies Record<Locale, NavigationTexts>;
