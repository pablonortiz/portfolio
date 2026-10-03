/**
 * Runs `setup` on the first load and after every client-side navigation:
 * ClientRouter runs each module script only once. The signal aborts right
 * before the page is swapped out, so listeners on window, document or media
 * queries, and observers, tied to it don't outlive their page.
 */
export function onEveryPage(setup: (signal: AbortSignal) => void) {
  document.addEventListener("astro:page-load", () => {
    const controller = new AbortController();
    document.addEventListener("astro:before-swap", () => controller.abort(), {
      once: true,
    });
    setup(controller.signal);
  });
}
