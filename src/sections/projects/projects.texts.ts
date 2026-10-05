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
  descriptionLabel: string;
  tryIt: string;
  opensInNewTab: string;
  fictionalBrand: string;
  fictionalBrandNote: string;
  tour: string;
  watchTour: string;
  closeTour: string;
  viewCode: string;
  install: string;
  copyCommand: string;
  commandCopied: string;
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
    descriptionLabel: "Descripción del proyecto",
    tryIt: "Probalo",
    opensInNewTab: "(se abre en otra pestaña)",
    fictionalBrand: "Marca ficticia",
    fictionalBrandNote: "Marca y datos ficticios, para resguardar al cliente.",
    tour: "Recorrido",
    watchTour: "Ver recorrido",
    closeTour: "Cerrar recorrido",
    viewCode: "Ver en GitHub",
    install: "Instalación",
    copyCommand: "Copiar comando",
    commandCopied: "Comando copiado",
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
    descriptionLabel: "About the project",
    tryIt: "Try it",
    opensInNewTab: "(opens in a new tab)",
    fictionalBrand: "Fictional brand",
    fictionalBrandNote: "Brand and data are fictional, to protect the client.",
    tour: "Tour",
    watchTour: "Watch the tour",
    closeTour: "Close the tour",
    viewCode: "View on GitHub",
    install: "Install",
    copyCommand: "Copy the command",
    commandCopied: "Command copied",
  },
} satisfies Record<Locale, ProjectsTexts>;
