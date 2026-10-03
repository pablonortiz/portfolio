const pixelsPerSecond = 30;
const tapTolerance = 6;
const keyboardStep = 48;

type PauseReason = "hover" | "focus" | "drag" | "user";

/** Position within one loop: dragging backwards gives negative times. */
export function wrapTime(time: number, loopDuration: number) {
  return ((time % loopDuration) + loopDuration) % loopDuration;
}

export const pixelsToTime = (pixels: number) =>
  (pixels / pixelsPerSecond) * 1000;

const prefersReducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The track holds the list and, while moving, a copy right after it. Moving
 * the track by one list plus the gap lands the copy where the list was, so
 * the loop has no seam. The copy is hidden from screen readers and inert.
 */
const createLoop = (track: HTMLElement, list: HTMLElement) => {
  const copy = list.cloneNode(true) as HTMLElement;
  copy.setAttribute("aria-hidden", "true");
  copy.inert = true;
  track.append(copy);
  const distance =
    list.offsetWidth + parseFloat(getComputedStyle(track).columnGap);
  const duration = pixelsToTime(distance);
  const animation = track.animate(
    [
      { transform: `translateX(${-distance}px)` },
      { transform: "translateX(0)" },
    ],
    { duration, iterations: Infinity },
  );
  return { animation, copy, duration };
};

type Loop = ReturnType<typeof createLoop>;

/** Starts and stops the loop with the overflow, and pauses it while any reason holds. */
const createStripController = (
  strip: HTMLElement,
  track: HTMLElement,
  list: HTMLElement,
) => {
  const pauses = new Set<PauseReason>();
  let loop: Loop | undefined;
  let loopListWidth = 0;

  const sync = () => {
    if (pauses.size > 0) loop?.animation.pause();
    else loop?.animation.play();
  };

  const start = (progress = 0) => {
    loop = createLoop(track, list);
    loopListWidth = list.offsetWidth;
    loop.animation.currentTime = progress * loop.duration;
    strip.dataset.moving = "";
    strip.tabIndex = 0;
    strip.setAttribute("role", "region");
    strip.setAttribute("aria-label", strip.dataset.label ?? "");
    sync();
  };

  const stop = () => {
    loop?.animation.cancel();
    loop?.copy.remove();
    loop = undefined;
    delete strip.dataset.moving;
    ["tabindex", "role", "aria-label"].forEach((name) =>
      strip.removeAttribute(name),
    );
  };

  const progress = () =>
    loop ? Number(loop.animation.currentTime) / loop.duration : 0;

  /** Moves only if the list doesn't fit; a new list width (fonts loading) restarts it where it was. */
  const refresh = () => {
    const overflows = list.offsetWidth > strip.clientWidth;
    if (!overflows) return stop();
    if (loop && list.offsetWidth === loopListWidth) return;
    const previousProgress = progress();
    stop();
    start(previousProgress);
  };

  return {
    refresh,
    stop,
    isMoving: () => loop !== undefined,
    setPaused: (reason: PauseReason, paused: boolean) => {
      if (paused) pauses.add(reason);
      else pauses.delete(reason);
      sync();
    },
    togglePaused: (reason: PauseReason) => {
      if (pauses.has(reason)) pauses.delete(reason);
      else pauses.add(reason);
      sync();
    },
    moveBy: (pixels: number) => {
      if (!loop) return;
      loop.animation.currentTime = wrapTime(
        Number(loop.animation.currentTime) + pixelsToTime(pixels),
        loop.duration,
      );
    },
  };
};

type StripController = ReturnType<typeof createStripController>;

/**
 * Dragging moves the strip and resumes it on release; a tap or click without
 * moving toggles a pause that lasts until the next one. If the browser takes
 * the gesture over (the page was being scrolled), it isn't a tap.
 */
const bindDrag = (strip: HTMLElement, controller: StripController) =>
  strip.addEventListener("pointerdown", (downEvent) => {
    if (!controller.isMoving() || downEvent.button !== 0) return;
    let lastX = downEvent.clientX;
    let travelled = 0;
    strip.setPointerCapture(downEvent.pointerId);
    controller.setPaused("drag", true);

    const move = (moveEvent: PointerEvent) => {
      const step = moveEvent.clientX - lastX;
      lastX = moveEvent.clientX;
      travelled += Math.abs(step);
      controller.moveBy(step);
    };
    const end = (endEvent: PointerEvent) => {
      strip.removeEventListener("pointermove", move);
      strip.removeEventListener("pointerup", end);
      strip.removeEventListener("pointercancel", end);
      controller.setPaused("drag", false);
      if (endEvent.type === "pointerup" && travelled <= tapTolerance)
        controller.togglePaused("user");
    };
    strip.addEventListener("pointermove", move);
    strip.addEventListener("pointerup", end);
    strip.addEventListener("pointercancel", end);
  });

/** Hover pauses only with a mouse, and focus only from the keyboard: a click must not leave it focused and paused. */
const bindHoverAndFocus = (strip: HTMLElement, controller: StripController) => {
  strip.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") controller.setPaused("hover", true);
  });
  strip.addEventListener("pointerleave", () =>
    controller.setPaused("hover", false),
  );
  strip.addEventListener("focusin", () =>
    controller.setPaused("focus", strip.matches(":focus-visible")),
  );
  strip.addEventListener("focusout", () =>
    controller.setPaused("focus", false),
  );
};

const bindKeyboard = (strip: HTMLElement, controller: StripController) =>
  strip.addEventListener("keydown", (event) => {
    const direction = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!direction || !controller.isMoving()) return;
    event.preventDefault();
    controller.moveBy(direction * keyboardStep);
  });

/**
 * Technology strip (docs/projects.md §42.5): if the list doesn't fit, it
 * moves right in a loop; hover, keyboard focus, dragging or a tap pause it.
 * With reduced motion it stays a still list that scrolls sideways.
 */
export function setupTechnologyStrip(strip: HTMLElement, signal: AbortSignal) {
  const track = strip.querySelector<HTMLElement>("[data-technology-track]");
  const list = track?.querySelector<HTMLElement>("ul");
  if (!track || !list || prefersReducedMotion()) return;
  const controller = createStripController(strip, track, list);

  bindDrag(strip, controller);
  bindHoverAndFocus(strip, controller);
  bindKeyboard(strip, controller);

  const resizeObserver = new ResizeObserver(controller.refresh);
  resizeObserver.observe(strip);
  resizeObserver.observe(list);
  signal.addEventListener("abort", () => {
    resizeObserver.disconnect();
    controller.stop();
  });
}
