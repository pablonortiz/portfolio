import type { Locale } from "@/lib/i18n";

export const contactEmail = "pablonortiz05@hotmail.com";

export const profileLinks = {
  linkedin: "https://www.linkedin.com/in/pablo-ortiz-7884751aa/",
  github: "https://github.com/pablonortiz",
};

/** One per language, in public/cv/. */
export const cvPaths = {
  es: "/cv/CV_Pablo_Ortiz_ES.pdf",
  en: "/cv/CV_Pablo_Ortiz_EN.pdf",
} satisfies Record<Locale, string>;
