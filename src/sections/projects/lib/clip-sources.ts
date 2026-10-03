import { projectVideosBaseUrl } from "@/config/projects";

/**
 * A project's card clip as written by `just encode-video`. The codec strings
 * match its encodes (1280×720 at 30 fps), so each browser picks the file it
 * can play without downloading the other.
 */
export function getClipSources(slug: string) {
  const folder = `${projectVideosBaseUrl}/${slug}`;
  return {
    firstFrame: `${folder}/clip-start.avif`,
    sources: [
      {
        src: `${folder}/clip.av1.mp4`,
        type: 'video/mp4; codecs="av01.0.05M.08"',
      },
      {
        src: `${folder}/clip.h264.mp4`,
        type: 'video/mp4; codecs="avc1.64001F"',
      },
    ],
  };
}
