import type { Locale } from "@/lib/i18n";

interface ProjectsTexts {
  back: string;
  problem: string;
  solution: string;
  stack: string;
  technical: string;
  tryIt: string;
  opensInNewTab: string;
}

export const projectsTexts = {
  es: {
    back: "Proyectos",
    problem: "Problemática",
    solution: "Qué se construyó",
    stack: "Tecnologías",
    technical: "Detalles técnicos",
    tryIt: "Probalo",
    opensInNewTab: "(se abre en otra pestaña)",
  },
  en: {
    back: "Projects",
    problem: "The problem",
    solution: "What was built",
    stack: "Technologies",
    technical: "Technical details",
    tryIt: "Try it",
    opensInNewTab: "(opens in a new tab)",
  },
} satisfies Record<Locale, ProjectsTexts>;
