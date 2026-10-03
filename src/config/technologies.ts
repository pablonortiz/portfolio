/**
 * Technologies a project's stack can list (validated in content.config.ts).
 * Each one needs its logo in sections/projects/ui/TechnologyList.astro, or
 * `astro check` fails.
 */
export const technologyNames = {
  astro: "Astro",
  electron: "Electron",
  expo: "Expo",
  nodejs: "Node.js",
  npm: "npm",
  react: "React",
  "react-native": "React Native",
  sqlite: "SQLite",
  "tailwind-css": "Tailwind CSS",
  typescript: "TypeScript",
} as const;

export type TechnologyId = keyof typeof technologyNames;

export const technologyIds = Object.keys(technologyNames) as [
  TechnologyId,
  ...TechnologyId[],
];
