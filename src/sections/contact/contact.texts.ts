import type { Locale } from "@/lib/i18n";

interface ContactTexts {
  /** The question, split so its middle part can carry the hand-drawn underline. */
  title: { before: string; underlined: string; after: string };
  text: string;
  cta: string;
  copyEmail: string;
  emailCopied: string;
  linksLabel: string;
  cv: string;
  opensInNewTab: string;
}

export const contactTexts = {
  es: {
    title: { before: "¿", underlined: "Construimos algo", after: "?" },
    text: "Si tenés una idea, un producto en marcha o un problema que necesita solución, hablemos.",
    cta: "Escribime",
    copyEmail: "Copiar mail",
    emailCopied: "Mail copiado",
    linksLabel: "Perfiles y CV",
    cv: "Descargar CV",
    opensInNewTab: "(se abre en otra pestaña)",
  },
  en: {
    title: { before: "Shall we ", underlined: "build something", after: "?" },
    text: "Got an idea, a product in progress or a problem that needs solving? Let's talk.",
    cta: "Get in touch",
    copyEmail: "Copy the email",
    emailCopied: "Email copied",
    linksLabel: "Profiles and CV",
    cv: "Download CV",
    opensInNewTab: "(opens in a new tab)",
  },
} satisfies Record<Locale, ContactTexts>;
