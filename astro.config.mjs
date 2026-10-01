// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import { defaultLocale, locales } from "./src/lib/i18n.ts";

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: [...locales],
    defaultLocale,
    routing: { prefixDefaultLocale: true },
  },
  redirects: {
    "/": { status: 302, destination: `/${defaultLocale}/` },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
