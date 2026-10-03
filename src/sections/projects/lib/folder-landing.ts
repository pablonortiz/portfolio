const arrivedRatio = 0.9;
/** Below this it has left: on the Hero's chapter a few pixels of the section still show. */
const leftRatio = 0.1;

/** Module state lives through client-side navigations and resets on a full reload: one landing per visit. */
let hasLanded = false;

const prefersReducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

const visibleRatio = (element: Element) => {
  const box = element.getBoundingClientRect();
  const visibleHeight =
    Math.min(box.bottom, innerHeight) - Math.max(box.top, 0);
  return Math.max(0, visibleHeight) / box.height;
};

/**
 * The folder travels tilted with the page's snap and, once in place,
 * flattens on its own time (CSS transition), whatever the scroll's speed
 * (docs/projects.md §42.6). It lands once per visit, like the Hero's intro.
 * If the page loads with it already in place (back from a project, an
 * anchor), it stays flat: the zoom back needs the cards where they end up.
 * Out of view before its first landing, it tilts again for the arrival.
 */
export function setupFolderLanding(section: HTMLElement, signal: AbortSignal) {
  const folder = section.querySelector<HTMLElement>("[data-folder-rise]");
  if (!folder || hasLanded || prefersReducedMotion()) return;
  if (visibleRatio(section) < arrivedRatio) folder.dataset.landing = "";

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.intersectionRatio < leftRatio) {
        folder.dataset.landing = "";
        return;
      }
      if (
        entry.intersectionRatio < arrivedRatio ||
        folder.dataset.landing === undefined
      )
        return;
      delete folder.dataset.landing;
      hasLanded = true;
      observer.disconnect();
    },
    { threshold: [leftRatio, arrivedRatio] },
  );
  observer.observe(section);
  signal.addEventListener("abort", () => observer.disconnect());
}
