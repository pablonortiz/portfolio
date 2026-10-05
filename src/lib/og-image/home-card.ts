import type { Locale } from "@/lib/i18n";
import { heroTexts } from "@/sections/hero/hero.texts";

import { box, colors, domain, fontFamilies, frame } from "./elements";

/** The home's card: the Hero's words, without the photo. */
export function homeCard(lang: Locale) {
  const texts = heroTexts[lang];
  const platforms = Object.values(texts.platforms).join(" · ");

  return frame(
    {
      flexDirection: "column",
      justifyContent: "space-between",
      // A soft glow of the accent where the Hero has the photo.
      backgroundImage: `radial-gradient(circle at 88% 22%, ${colors.accent}55, ${colors.accent}00 55%)`,
    },
    box(
      { flexDirection: "column" },
      box(
        { fontSize: 36, color: colors.muted },
        `${texts.greeting} ${texts.intro}`,
      ),
      box(
        {
          fontFamily: fontFamilies.display,
          fontWeight: 800,
          fontSize: 128,
          letterSpacing: "-0.025em",
        },
        texts.name,
      ),
      box(
        { flexDirection: "column", marginTop: 24, fontSize: 52 },
        ...texts.taglineLines.map((line) => box({}, line)),
      ),
    ),
    box(
      { justifyContent: "space-between", alignItems: "baseline" },
      box({ fontSize: 28, color: colors.muted }, platforms),
      domain(),
    ),
  );
}
