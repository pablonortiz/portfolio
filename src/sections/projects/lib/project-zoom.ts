const arrivalAttribute = "data-project-arrival";

/** Clicks the router turns into a navigation in this tab (not a new tab or window). */
const isPlainClick = (event: MouseEvent) =>
  event.button === 0 &&
  !event.metaKey &&
  !event.ctrlKey &&
  !event.shiftKey &&
  !event.altKey;

/** The clip stops on the frame that was showing; the card's clip setup continues it on the way back. */
const freezeClip = (video: HTMLVideoElement) => {
  video.pause();
  video.dataset.resume = "";
};

/**
 * The project page arrives sharp (the frame the card was showing) and blurs
 * only once the zoom ends: the flag goes on the incoming document's root,
 * which the router copies over, and comes off when the transition finishes.
 */
const markArrival = (href: string) =>
  document.addEventListener(
    "astro:before-swap",
    (event) => {
      if (event.to.pathname !== new URL(href, location.href).pathname) return;
      event.newDocument.documentElement.setAttribute(arrivalAttribute, "");
      event.viewTransition.finished.finally(() =>
        document.documentElement.removeAttribute(arrivalAttribute),
      );
    },
    { once: true },
  );

/** Opening a project from its card (docs/projects.md §42.4). */
export function setupProjectZoom(folder: HTMLElement) {
  folder.addEventListener("click", (event) => {
    const card = (event.target as Element).closest<HTMLAnchorElement>(
      "[data-project-card]",
    );
    if (!card || !isPlainClick(event)) return;
    const clip = card.querySelector<HTMLVideoElement>("[data-card-video]");
    // An npm package's card has no frame to arrive with: it zooms into its page's install panel, which has to be visible.
    if (!clip) return;
    freezeClip(clip);
    markArrival(card.href);
  });
}

/**
 * The backdrop's own video only stands in for a clip arriving from a card.
 * Persistence works both ways: leaving a project page reached directly, the
 * stand-in would take the card's place in the folder and the card would never
 * play. So right before each swap, stand-ins stop being persisted.
 */
export function releaseClipPlaceholders() {
  document.addEventListener("astro:before-swap", () =>
    document
      .querySelectorAll("[data-clip-placeholder]")
      .forEach((video) =>
        video.removeAttribute("data-astro-transition-persist"),
      ),
  );
}
