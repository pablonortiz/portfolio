import type {
  APIRoute,
  GetStaticPaths,
  InferGetStaticParamsType,
  InferGetStaticPropsType,
} from "astro";

import { locales } from "@/lib/i18n";
import { projectCard } from "@/lib/og-image/project-card";
import { cardResponse } from "@/lib/og-image/render";
import { getProjects } from "@/lib/projects";

export const getStaticPaths = (async () => {
  const pathsPerLocale = await Promise.all(
    locales.map(async (lang) =>
      (await getProjects(lang)).map((project) => ({
        params: { lang, slug: project.slug },
        props: { project },
      })),
    ),
  );
  return pathsPerLocale.flat();
}) satisfies GetStaticPaths;

type Params = InferGetStaticParamsType<typeof getStaticPaths>;
type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute = async ({ params, props }) => {
  const { lang } = params as Params;
  const { project } = props as Props;
  return cardResponse(await projectCard(project, lang));
};
