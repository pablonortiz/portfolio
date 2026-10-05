import { siteName } from "@/config/site";

export type Style = Record<string, string | number>;

/** The element tree Satori lays out: the shape of a React element, without React. */
export interface CardElement {
  type: "div" | "img";
  props: { style: Style; children?: (CardElement | string)[]; src?: string };
}

export const cardSize = { width: 1200, height: 630 };

/** The site's dark theme (global.css), in hex: Satori doesn't read oklch. */
export const colors = {
  background: "#070614",
  foreground: "#f1f1f8",
  muted: "#9c9cb1",
  border: "#252437",
  accent: "#9f84ff",
  terminal: "#05040c",
  terminalForeground: "#ebeaf5",
  terminalAccent: "#cbaaff",
};

export const fontFamilies = {
  display: "Bricolage Grotesque",
  sans: "Inter",
  mono: "Geist Mono",
};

/** A box. Satori only lays out with flexbox, so every box is flex. */
export const box = (
  style: Style,
  ...children: (CardElement | string)[]
): CardElement => ({
  type: "div",
  props: { style: { display: "flex", ...style }, children },
});

export const image = (src: string, style: Style): CardElement => ({
  type: "img",
  props: { src, style },
});

/** The background and margins every card shares. */
export const frame = (style: Style, ...children: CardElement[]) =>
  box(
    {
      ...cardSize,
      padding: 72,
      backgroundColor: colors.background,
      color: colors.foreground,
      fontFamily: fontFamilies.sans,
      ...style,
    },
    ...children,
  );

export const domain = () =>
  box(
    { fontFamily: fontFamilies.mono, fontSize: 28, color: colors.accent },
    new URL(import.meta.env.SITE).host,
  );

/** Name and domain, at the bottom of the cards that don't show the name large. */
export const signature = () =>
  box(
    { alignItems: "baseline", gap: 20 },
    box({ fontSize: 28, fontWeight: 600 }, siteName),
    domain(),
  );
