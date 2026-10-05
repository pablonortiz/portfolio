// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import { defaultLocale, locales } from "./src/lib/i18n.ts";

// https://astro.build/config
export default defineConfig({
  site: "https://pablonortiz.com",
  integrations: [sitemap()],
  i18n: {
    locales: [...locales],
    defaultLocale,
    routing: { prefixDefaultLocale: true },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Bricolage Grotesque",
      cssVariable: "--font-bricolage",
      weights: [800],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: [400, 600],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["monospace"],
    },
  ],
  redirects: {
    "/": { status: 302, destination: `/${defaultLocale}/` },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
