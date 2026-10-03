const prefersReducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Links to a section of this page scroll there smoothly, so the transition
 * tied to that scroll can be seen. Not through CSS `scroll-behavior`: the
 * router restores the scroll when coming back from another page, and it would
 * animate too, under the view transition. With reduced motion, the usual jump.
 */
export function scrollSmoothlyOnClick(link: HTMLAnchorElement) {
  link.addEventListener("click", (event) => {
    const target = document.getElementById(new URL(link.href).hash.slice(1));
    if (!target || prefersReducedMotion()) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
}
