export const projectCategories = ["web", "mobile", "desktop", "dev"] as const;

export type ProjectCategory = (typeof projectCategories)[number];
