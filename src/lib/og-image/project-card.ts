import sharp, { type Region } from "sharp";

import type { Locale } from "@/lib/i18n";
import {
  isPackage,
  type AppProject,
  type PackageProject,
  type Project,
} from "@/lib/projects";
import { projectsTexts } from "@/sections/projects/projects.texts";

import {
  box,
  type CardElement,
  colors,
  domain,
  fontFamilies,
  frame,
  image,
  signature,
} from "./elements";

interface PosterFormat {
  width: number;
  height: number;
  crop?: Region;
}

const widePoster: PosterFormat = { width: 576, height: 324 };

/** The mobile posters (1280×720) show a phone in the middle: cropped to it, it fills the card's height. */
const phonePoster: PosterFormat = {
  width: 250,
  height: 486,
  crop: { left: 465, top: 20, width: 350, height: 680 },
};

/** A project's card: its name and platform, with the poster or, for a package, how to run it. */
export async function projectCard(project: Project, lang: Locale) {
  return isPackage(project)
    ? packageCard(project, lang)
    : appCard(project, lang, await poster(project));
}

function appCard(project: AppProject, lang: Locale, posterImage: CardElement) {
  // Beside a phone there's room for the summary; beside a wide poster, only for the name.
  const heading = showsPhone(project)
    ? [title(project.title, 80), summary(project.summary)]
    : [title(project.title, 64)];
  return frame(
    { alignItems: "center", gap: 48 },
    box(
      {
        flex: 1,
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
      },
      box(
        { flexDirection: "column", gap: 16 },
        category(project, lang),
        ...heading,
      ),
      signature(),
    ),
    posterImage,
  );
}

function packageCard(project: PackageProject, lang: Locale) {
  return frame(
    { flexDirection: "column", justifyContent: "space-between" },
    box(
      { flexDirection: "column", gap: 16 },
      category(project, lang),
      title(project.title, 72),
      summary(project.summary),
    ),
    box(
      { justifyContent: "space-between", alignItems: "center" },
      runCommand(project.npmPackage),
      domain(),
    ),
  );
}

const category = (project: Project, lang: Locale) =>
  box(
    {
      fontFamily: fontFamilies.mono,
      fontSize: 26,
      letterSpacing: "0.12em",
      color: colors.accent,
    },
    projectsTexts[lang].categories[project.category].toUpperCase(),
  );

const title = (text: string, fontSize: number) =>
  box(
    {
      fontFamily: fontFamilies.display,
      fontWeight: 800,
      fontSize,
      lineHeight: 1.05,
      letterSpacing: "-0.025em",
    },
    text,
  );

const summary = (text: string) =>
  box({ fontSize: 30, lineHeight: 1.4, color: colors.muted }, text);

const showsPhone = (project: AppProject) => project.category === "mobile";

/** The packages are MCP servers that run with npx: the shortest true command. */
const runCommand = (npmPackage: string) =>
  box(
    {
      gap: 16,
      padding: "18px 28px",
      borderRadius: 14,
      backgroundColor: colors.terminal,
      border: `1px solid ${colors.border}`,
      fontFamily: fontFamilies.mono,
      fontSize: 28,
      color: colors.terminalForeground,
    },
    box({ color: colors.terminalAccent }, "$"),
    `npx -y ${npmPackage}`,
  );

/** The poster at its size in the card, so the SVG doesn't carry the full image. */
async function poster(project: AppProject) {
  const format = showsPhone(project) ? phonePoster : widePoster;
  const source = sharp(`src/content/projects/${project.slug}/poster.png`);
  const jpeg = await (format.crop ? source.extract(format.crop) : source)
    .resize(format.width, format.height)
    .jpeg({ quality: 85 })
    .toBuffer();
  return image(`data:image/jpeg;base64,${jpeg.toString("base64")}`, {
    width: format.width,
    height: format.height,
    borderRadius: 20,
    border: `1px solid ${colors.border}`,
  });
}
