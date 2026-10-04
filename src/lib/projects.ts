import { getCollection, type CollectionEntry } from "astro:content";

import type { Locale } from "@/lib/i18n";

/** Projects in one language: the shared data (project.yaml) merged with that language's texts. */
export async function getProjects(lang: Locale) {
  const [projects, texts] = await Promise.all([
    getCollection("projects"),
    getCollection("projectTexts"),
  ]);
  const textsById = new Map(texts.map((text) => [text.id, text]));

  return projects
    .map((project) => {
      const text = textsById.get(`${project.id}/${lang}`);
      if (!text) {
        throw new Error(
          `Project "${project.id}" has no "${lang}" texts: add src/content/projects/${project.id}/${lang}.md`,
        );
      }
      const { tourDescription, ...projectTexts } = text.data;
      return {
        slug: project.id,
        ...project.data,
        ...projectTexts,
        tour: getTour(project, tourDescription, lang),
        body: text,
      };
    })
    .sort((first, second) => first.order - second.order);
}

/** The project's tour, if it has one, with what it shows in this language. */
function getTour(
  project: CollectionEntry<"projects">,
  description: string | undefined,
  lang: Locale,
) {
  if (!project.data.tour) return undefined;
  if (!description) {
    throw new Error(
      `Project "${project.id}" has a tour but no "${lang}" description: add tourDescription to src/content/projects/${project.id}/${lang}.md`,
    );
  }
  return { description };
}

export type Project = Awaited<ReturnType<typeof getProjects>>[number];
