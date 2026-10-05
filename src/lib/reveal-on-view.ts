/** Module state lives through client-side navigations and resets on a full reload: each one reveals once per visit. */
const revealed = new Set<string>();

const prefersReducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Holds an element back (data-pending) until enough of it is in view, once
 * per visit; its CSS animates the way out of that state. Shown is the base
 * state: without JS or with reduced motion it's just there. data-reveal names
 * it, for the once-per-visit record.
 */
export function revealOnView(
  element: HTMLElement,
  signal: AbortSignal,
  visibleRatio = 0.3,
) {
  const name = element.dataset.reveal!;
  if (revealed.has(name) || prefersReducedMotion()) return;
  element.dataset.pending = "";

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.intersectionRatio < visibleRatio) return;
      delete element.dataset.pending;
      revealed.add(name);
      observer.disconnect();
    },
    { threshold: visibleRatio },
  );
  observer.observe(element);
  signal.addEventListener("abort", () => observer.disconnect());
}
