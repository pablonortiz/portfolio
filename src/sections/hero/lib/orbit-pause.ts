const prefersReducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The orbit spins with no end, so it has to be possible to pause it
 * (WCAG 2.2.2, docs/hero.md §10): hover and keyboard focus pause it while they
 * last (CSS), and a tap or click toggles a pause until the next one. With
 * reduced motion it doesn't spin, so it isn't made focusable.
 */
export function setupOrbitPause(orbit: HTMLElement) {
  if (prefersReducedMotion()) return;
  orbit.tabIndex = 0;
  orbit.addEventListener("click", () => orbit.toggleAttribute("data-paused"));
}
