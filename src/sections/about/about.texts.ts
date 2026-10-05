import type { Locale } from "@/lib/i18n";

/** The timeline, oldest first. Today has no year: its label comes from each language's texts. */
export const milestones = [
  { id: "school", year: 2019, icon: "graduation-cap" },
  { id: "english", year: 2020, icon: "languages" },
  { id: "radio", year: 2021, icon: "radio" },
  { id: "first-app", year: 2022, icon: "smartphone" },
  { id: "janis", year: 2022, icon: "briefcase" },
  { id: "freelance", year: 2024, icon: "handshake" },
  { id: "management-system", year: 2026, icon: "receipt" },
  { id: "npm", year: 2026, icon: "package" },
  { id: "today", year: undefined, icon: "map-pin" },
] as const;

export type MilestoneId = (typeof milestones)[number]["id"];
export type MilestoneIcon = (typeof milestones)[number]["icon"];

export interface MilestoneTexts {
  title: string;
  detail?: string;
}

interface AboutTexts {
  label: string;
  intro: string;
  phrase: string;
  today: string;
  milestones: Record<MilestoneId, MilestoneTexts>;
}

export const aboutTexts = {
  es: {
    label: "Sobre mí",
    intro: "Empecé construyendo cosas porque quería entender cómo funcionaban.",
    phrase: "Con el tiempo, eso se convirtió en mi profesión.",
    today: "Hoy",
    milestones: {
      school: {
        title: "Egreso del secundario",
        detail: "Instituto Inmaculada Concepción",
      },
      english: {
        title: "Inglés: Cambridge B2 First",
        detail: "180 (nivel C1)",
      },
      radio: { title: "Desarrollador en Radio Nacional" },
      "first-app": {
        title: "Primera app publicada",
        detail: "Android e iOS",
      },
      janis: { title: "Desarrollador mobile en Janis Commerce" },
      freelance: {
        title: "Empiezo como freelance",
        detail: "Apps, sistemas y sitios para empresas",
      },
      "management-system": {
        title: "Sistema de gestión en producción",
        detail: "Con facturación electrónica",
      },
      npm: {
        title: "Herramientas open source para devs",
        detail: "Tres paquetes en npm",
      },
      today: {
        title:
          "Apps mobile en Janis Commerce, y sistemas y herramientas propias",
      },
    },
  },
  en: {
    label: "About me",
    intro:
      "I started building things because I wanted to understand how they worked.",
    phrase: "Over time, that became my profession.",
    today: "Today",
    milestones: {
      school: {
        title: "High school diploma",
        detail: "Instituto Inmaculada Concepción",
      },
      english: {
        title: "English: Cambridge B2 First",
        detail: "180 (C1 level)",
      },
      radio: { title: "Developer at Radio Nacional" },
      "first-app": {
        title: "First app published",
        detail: "Android and iOS",
      },
      janis: { title: "Mobile developer at Janis Commerce" },
      freelance: {
        title: "Going freelance",
        detail: "Apps, systems and websites for businesses",
      },
      "management-system": {
        title: "A management system in production",
        detail: "With electronic invoicing",
      },
      npm: {
        title: "Open source tools for developers",
        detail: "Three npm packages",
      },
      today: {
        title: "Mobile apps at Janis Commerce, plus my own systems and tools",
      },
    },
  },
} satisfies Record<Locale, AboutTexts>;
