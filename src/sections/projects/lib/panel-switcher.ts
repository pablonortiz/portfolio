export type Point = { x: number; y: number };

/** Radius a circle centered at `origin` (relative to the box) needs to cover the whole box. */
export function getCoveringRadius(
  origin: Point,
  width: number,
  height: number,
) {
  return Math.hypot(
    Math.max(origin.x, width - origin.x),
    Math.max(origin.y, height - origin.y),
  );
}

/** CSS time ("800ms", ".8s") in milliseconds. */
export function toMilliseconds(cssTime: string) {
  const value = parseFloat(cssTime);
  return cssTime.trim().endsWith("ms") ? value : value * 1000;
}

const prefersReducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

const growCircle = (panel: HTMLElement, origin: Point) => {
  const motion = getComputedStyle(document.documentElement);
  const box = panel.getBoundingClientRect();
  const center = { x: origin.x - box.left, y: origin.y - box.top };
  const radius = getCoveringRadius(center, box.width, box.height);
  return panel.animate(
    {
      clipPath: [
        `circle(0px at ${center.x}px ${center.y}px)`,
        `circle(${radius}px at ${center.x}px ${center.y}px)`,
      ],
    },
    {
      duration: toMilliseconds(motion.getPropertyValue("--duration-slow")),
      easing: motion.getPropertyValue("--ease-in-out").trim(),
    },
  );
};

/**
 * Switches between panels. With an origin, the selected panel grows from it as
 * a circle while the previous one stays visible (and inert) underneath.
 */
export function createPanelSwitcher(panels: HTMLElement[]) {
  let runningReveal: Animation | undefined;

  const render = (selected: HTMLElement, leaving?: HTMLElement) =>
    panels.forEach((panel) => {
      const isLeaving = panel === leaving;
      panel.hidden = panel !== selected && !isLeaving;
      panel.inert = isLeaving;
      panel.toggleAttribute("data-leaving", isLeaving);
    });

  return (
    selected: HTMLElement,
    previous: HTMLElement | null,
    origin?: Point,
  ) => {
    runningReveal?.finish();
    const animate =
      origin && previous && previous !== selected && !prefersReducedMotion();
    render(selected, animate ? previous : undefined);
    if (!animate) return;

    const animation = growCircle(selected, origin);
    runningReveal = animation;
    animation.addEventListener("finish", () => {
      if (animation === runningReveal) render(selected);
    });
  };
}
