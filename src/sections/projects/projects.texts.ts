import type { ProjectCategory } from "@/config/projects";
import type { Locale } from "@/lib/i18n";

interface ProjectsTexts {
  sectionTitle: string;
  tablistLabel: string;
  urlParam: string;
  categories: Record<ProjectCategory, string>;
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
    sectionTitle: "Proyectos",
    tablistLabel: "Plataformas",
    urlParam: "plataforma",
    categories: {
      web: "Web",
      mobile: "Mobile",
      desktop: "Desktop",
      dev: "Dev",
    },
    back: "Proyectos",
    problem: "Problemática",
    solution: "Qué se construyó",
    stack: "Tecnologías",
    technical: "Detalles técnicos",
    tryIt: "Probalo",
    opensInNewTab: "(se abre en otra pestaña)",
  },
  en: {
    sectionTitle: "Projects",
    tablistLabel: "Platforms",
    urlParam: "platform",
    categories: {
      web: "Web",
      mobile: "Mobile",
      desktop: "Desktop",
      dev: "Dev",
    },
    back: "Projects",
    problem: "The problem",
    solution: "What was built",
    stack: "Technologies",
    technical: "Technical details",
    tryIt: "Try it",
    opensInNewTab: "(opens in a new tab)",
  },
} satisfies Record<Locale, ProjectsTexts>;
