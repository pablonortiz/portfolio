type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

const allowsClips = () =>
  !matchMedia("(prefers-reduced-motion: reduce)").matches &&
  !(navigator as NavigatorWithConnection).connection?.saveData;

const videoOf = (card: Element) =>
  card.querySelector<HTMLVideoElement>("[data-card-video]");

const restart = (video: HTMLVideoElement) => {
  video.currentTime = 0;
  // Blocked or interrupted (e.g. it left the screen): the frame on display stays.
  video.play().catch(() => undefined);
};

/** Back from its project page: the clip continues from the frame it stopped on. */
const resume = (video: HTMLVideoElement) => {
  delete video.dataset.resume;
  if (!video.ended) video.play().catch(() => undefined);
};

/** Nothing is requested before this, not even the first frame: until then the card shows its still. */
const startLoading = (video: HTMLVideoElement) => {
  video.poster = video.dataset.firstFrame ?? "";
  video.hidden = false;
  video.preload = "auto";
};

/** If the clip's files are missing, the card goes back to its still. */
const fallBackToStillOnError = (video: HTMLVideoElement) =>
  video
    .querySelector("source:last-of-type")
    ?.addEventListener("error", () => (video.hidden = true));

const replayOnHoverAndFocus = (card: Element, video: HTMLVideoElement) => {
  const replayIfEnded = () => {
    if (video.ended) restart(video);
  };
  if (matchMedia("(hover: hover)").matches)
    card.addEventListener("pointerenter", replayIfEnded);
  card.addEventListener("focus", replayIfEnded);
};

const loadWhenEntering = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) =>
  entries.forEach(({ target, isIntersecting }) => {
    const video = videoOf(target);
    if (!isIntersecting || !video) return;
    startLoading(video);
    observer.unobserve(target);
  });

/**
 * Card clips (docs/projects.md §42.3): each one starts loading as its card
 * enters the folder near the screen, plays once when the card is fully in
 * view and rests on its last frame, and plays again when its page comes back
 * or on hover and focus. With reduced motion or data saver, the still stays.
 */
export function setupCardVideos(folder: HTMLElement, signal: AbortSignal) {
  if (!allowsClips()) return;
  const cards = [...folder.querySelectorAll("a:has([data-card-video])")];
  const playedSinceEntering = new WeakSet<Element>();

  const playWhenFullyVisible = (entries: IntersectionObserverEntry[]) =>
    entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
      const video = videoOf(target);
      if (!video) return;
      if (!isIntersecting) {
        video.pause();
        playedSinceEntering.delete(target);
        return;
      }
      if (intersectionRatio < 0.99 || playedSinceEntering.has(target)) return;
      playedSinceEntering.add(target);
      if (video.dataset.resume === undefined) restart(video);
      else resume(video);
    });

  // The cards are observed, not the videos, which stay hidden (without a box) until they load.
  // With the viewport as root, what the folder's own scroll clips away counts as not visible.
  const loader = new IntersectionObserver(loadWhenEntering, {
    rootMargin: "50% 0px",
  });
  const player = new IntersectionObserver(playWhenFullyVisible, {
    threshold: [0, 0.99],
  });

  signal.addEventListener("abort", () => {
    loader.disconnect();
    player.disconnect();
  });

  cards.forEach((card) => {
    const video = videoOf(card);
    if (!video) return;
    // ClientRouter builds the next page with DOMParser, whose videos don't get muted from the
    // attribute; unmuted, the browser blocks play() without a user gesture.
    video.muted = true;
    fallBackToStillOnError(video);
    replayOnHoverAndFocus(card, video);
    loader.observe(card);
    player.observe(card);
  });
}
