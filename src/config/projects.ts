export const projectCategories = ["web", "mobile", "desktop", "dev"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

/**
 * Where `just encode-video` output is served from: Cloudflare R2, uploaded
 * with `just upload-videos` (docs/projects.md §42.7). In development, the
 * local copy, so a fresh encode shows up without uploading it.
 */
export const projectVideosBaseUrl = import.meta.env.DEV
  ? "/videos"
  : "https://media.pablonortiz.com/videos";
