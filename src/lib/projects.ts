import { getCollection } from "astro:content";

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
      return { slug: project.id, ...project.data, ...text.data, body: text };
    })
    .sort((first, second) => first.order - second.order);
}

export type Project = Awaited<ReturnType<typeof getProjects>>[number];
