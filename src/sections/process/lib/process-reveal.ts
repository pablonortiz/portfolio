/** Enough of the section in view for its first steps to be seen as they appear. */
const shownRatio = 0.3;

/** Module state lives through client-side navigations and resets on a full reload: one reveal per visit. */
let hasRevealed = false;

const prefersReducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The line draws itself and the steps appear as it reaches them, once, when
 * the section comes into view (docs/process.md §44). Their timing is CSS's;
 * this only holds them back (data-pending) until then. Shown is the base
 * state: without JS or with reduced motion they're just there.
 */
export function setupProcessReveal(section: HTMLElement, signal: AbortSignal) {
  if (hasRevealed || prefersReducedMotion()) return;
  section.dataset.pending = "";

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.intersectionRatio < shownRatio) return;
      delete section.dataset.pending;
      hasRevealed = true;
      observer.disconnect();
    },
    { threshold: shownRatio },
  );
  observer.observe(section);
  signal.addEventListener("abort", () => observer.disconnect());
}
