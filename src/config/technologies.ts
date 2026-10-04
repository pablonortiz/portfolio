/**
 * Technologies a project's stack can list (validated in content.config.ts).
 * Each one needs its logo in sections/projects/ui/TechnologyList.astro, or
 * `astro check` fails.
 */
export const technologyNames = {
  astro: "Astro",
  dart: "Dart",
  electron: "Electron",
  expo: "Expo",
  flutter: "Flutter",
  nodejs: "Node.js",
  npm: "npm",
  react: "React",
  "react-native": "React Native",
  redux: "Redux",
  sqlite: "SQLite",
  supabase: "Supabase",
  "tailwind-css": "Tailwind CSS",
  "tanstack-query": "TanStack Query",
  typescript: "TypeScript",
  zustand: "Zustand",
} as const;

export type TechnologyId = keyof typeof technologyNames;

export const technologyIds = Object.keys(technologyNames) as [
  TechnologyId,
  ...TechnologyId[],
];
