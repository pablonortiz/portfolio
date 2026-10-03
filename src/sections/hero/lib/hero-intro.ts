/**
 * The Hero's intro plays once per visit. This module loads with the first page
 * that shows the Hero, so from then on every navigation marks the incoming
 * page and its Hero appears in its final state. A visit that starts on another
 * page still gets the intro the first time it reaches the Hero, and a full
 * reload is a new visit.
 */
export function skipIntroOnLaterNavigations() {
  document.addEventListener("astro:before-swap", (event) =>
    event.newDocument.documentElement.setAttribute("data-hero-intro-seen", ""),
  );
}
