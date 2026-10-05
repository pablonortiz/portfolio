import type { APIRoute, GetStaticPaths, InferGetStaticParamsType } from "astro";

import { locales } from "@/lib/i18n";
import { homeCard } from "@/lib/og-image/home-card";
import { cardResponse } from "@/lib/og-image/render";

export const getStaticPaths = (() =>
  locales.map((lang) => ({ params: { lang } }))) satisfies GetStaticPaths;

type Params = InferGetStaticParamsType<typeof getStaticPaths>;

export const GET: APIRoute = ({ params }) =>
  cardResponse(homeCard((params as Params).lang));
