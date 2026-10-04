import { projectVideosBaseUrl } from "@/config/projects";

/*
 * The files `just encode-video` writes for each project. The codec strings
 * match its encodes, so each browser picks the file it can play without
 * downloading the other.
 */

const getFolder = (slug: string) => `${projectVideosBaseUrl}/${slug}`;

/** The card clip: 1280×720 at 30 fps. */
export function getClipSources(slug: string) {
  const folder = getFolder(slug);
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

/** The tour: 1920×1080 at 30 fps. */
export function getTourSources(slug: string) {
  const folder = getFolder(slug);
  return [
    {
      src: `${folder}/tour.av1.mp4`,
      type: 'video/mp4; codecs="av01.0.08M.08"',
    },
    {
      src: `${folder}/tour.h264.mp4`,
      type: 'video/mp4; codecs="avc1.640032"',
    },
  ];
}
