export const projectCategories = ["web", "mobile", "desktop", "dev"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

/** Where `just encode-video` output is served from; the hosting is still to be defined (docs/projects.md §42.7). */
export const projectVideosBaseUrl = "/videos";
