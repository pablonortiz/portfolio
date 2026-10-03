/**
 * Runs `setup` on every page: right away (module scripts run once the
 * document is parsed, and also when a navigation brings a module in for the
 * first time) and after each later swap. `astro:after-swap` fires before the
 * browser captures the new page for the view transition, so whatever `setup`
 * restores (a tab, a scroll position) is already in place for the animation;
 * `astro:page-load` would come after it. The signal aborts right before the
 * page is swapped out, so listeners on window, document or media queries, and
 * observers, tied to it don't outlive their page.
 */
export function onEveryPage(setup: (signal: AbortSignal) => void) {
  const run = () => {
    const controller = new AbortController();
    document.addEventListener("astro:before-swap", () => controller.abort(), {
      once: true,
    });
    setup(controller.signal);
  };
  run();
  document.addEventListener("astro:after-swap", run);
}
