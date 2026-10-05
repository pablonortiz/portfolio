import type { Locale } from "@/lib/i18n";

/** The steps, in order. Each one's texts come from each language, by its id. */
export const steps = [
  { id: "understand", icon: "search" },
  { id: "design", icon: "workflow" },
  { id: "iterate", icon: "repeat" },
  { id: "deliver", icon: "shield-check" },
] as const;

export type StepId = (typeof steps)[number]["id"];
export type StepIcon = (typeof steps)[number]["icon"];

interface StepTexts {
  title: string;
  text: string;
  /** Where it shows in Pablo's projects: what turns the principle into a fact. */
  proof: string;
}

interface ProcessTexts {
  title: string;
  steps: Record<StepId, StepTexts>;
}

export const processTexts = {
  es: {
    title: "Cómo trabajo",
    steps: {
      understand: {
        title: "Entender antes de construir",
        text: "Primero entender el problema y el contexto, no empezar directamente por código.",
        proof: "Forja partió de los cuadernos y planillas del taller.",
      },
      design: {
        title: "Diseñar algo que pueda crecer",
        text: "Pensar flujos, arquitectura y cómo va a evolucionar el producto.",
        proof:
          "Tesela Catálogo se alimenta del sistema de gestión: los datos se cargan una sola vez.",
      },
      iterate: {
        title: "Construir, probar e iterar",
        text: "Desarrollar en ciclos, validar y corregir.",
        proof:
          "BeatFit: rehecha desde cero con lo que enseñó la primera versión.",
      },
      deliver: {
        title: "Entregar algo mantenible",
        text: "No solamente algo que “funcione hoy”.",
        proof:
          "Tesela Gestión: más de 500 tests, CI y actualizaciones automáticas.",
      },
    },
  },
  en: {
    title: "How I work",
    steps: {
      understand: {
        title: "Understand before building",
        text: "Understand the problem and its context first, instead of starting with code.",
        proof: "Forja started from the workshop's notebooks and spreadsheets.",
      },
      design: {
        title: "Design something that can grow",
        text: "Think through flows, architecture and how the product will evolve.",
        proof:
          "Tesela Catalog feeds on the management system: data is entered once.",
      },
      iterate: {
        title: "Build, test and iterate",
        text: "Develop in cycles, validate and fix.",
        proof:
          "BeatFit: rebuilt from scratch with what the first version taught.",
      },
      deliver: {
        title: "Deliver something maintainable",
        text: "Not just something that “works today.”",
        proof: "Tesela Management: over 500 tests, CI and automatic updates.",
      },
    },
  },
} satisfies Record<Locale, ProcessTexts>;
