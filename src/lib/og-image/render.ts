import { readFile } from "node:fs/promises";

import satori from "satori";
import sharp from "sharp";

import { cardSize, fontFamilies, type CardElement } from "./elements";

// Relative to the project root, where the build runs: the bundled code doesn't live next to the fonts.
const fontsFolder = "src/lib/og-image/fonts";

const fontFiles = [
  {
    name: fontFamilies.display,
    weight: 800,
    file: "bricolage-grotesque-800.woff",
  },
  { name: fontFamilies.sans, weight: 400, file: "inter-400.woff" },
  { name: fontFamilies.sans, weight: 600, file: "inter-600.woff" },
  { name: fontFamilies.mono, weight: 400, file: "geist-mono-400.woff" },
] as const;

const fonts = Promise.all(
  fontFiles.map(async ({ name, weight, file }) => ({
    name,
    weight,
    style: "normal" as const,
    data: await readFile(`${fontsFolder}/${file}`),
  })),
);

/** The card as a PNG response: Satori draws it as SVG, and sharp rasterizes it. */
export async function cardResponse(card: CardElement) {
  const svg = await satori(card, { ...cardSize, fonts: await fonts });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
}
