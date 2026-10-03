import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

import { projectCategories } from "./config/projects";
import { technologyIds } from "./config/technologies";

const projectsBase = "./src/content/projects";

const projects = defineCollection({
  loader: glob({
    pattern: "*/project.yaml",
    base: projectsBase,
    generateId: ({ entry }) => entry.split("/")[0],
  }),
  schema: ({ image }) =>
    z.object({
      category: z.enum(projectCategories),
      order: z.number().int().positive(),
      year: z.number().int(),
      stack: z.array(z.enum(technologyIds)).nonempty(),
      poster: image(),
      demo: z.url().optional(),
      repository: z.url().optional(),
      npmPackage: z.string().optional(),
    }),
});

const projectTexts = defineCollection({
  loader: glob({ pattern: "*/{es,en}.md", base: projectsBase }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(160),
    problem: z.string(),
    solution: z.string(),
  }),
});

export const collections = { projects, projectTexts };
