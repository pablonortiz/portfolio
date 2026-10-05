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
  schema: ({ image }) => {
    const shared = {
      category: z.enum(projectCategories),
      order: z.number().int().positive(),
      year: z.number().int(),
      stack: z.array(z.enum(technologyIds)).nonempty(),
      demo: z.url().optional(),
      /** Made for a client whose identity stays private: the name and the data on screen are made up. */
      fictionalBrand: z.boolean().default(false),
      /** Has a tour video. The videos aren't in git, so the build can't tell on its own. */
      tour: z.boolean().default(false),
    };
    return z.union([
      /** An app: its clip's last frame is the poster. */
      z.object({
        ...shared,
        poster: image(),
        repository: z.url().optional(),
        npmPackage: z.never().optional(),
      }),
      /** An npm package: no video; its page shows how to install it. */
      z.object({
        ...shared,
        npmPackage: z.string(),
        install: z.string(),
        repository: z.url(),
      }),
    ]);
  },
});

const projectTexts = defineCollection({
  loader: glob({ pattern: "*/{es,en}.md", base: projectsBase }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(160),
    problem: z.string(),
    solution: z.string(),
    /** What the tour shows, as its text alternative (the video has no audio). Required when the project has a tour. */
    tourDescription: z.string().optional(),
  }),
});

export const collections = { projects, projectTexts };
