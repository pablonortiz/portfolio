/** Where a project was opened from: its slug, the router's history index then, and the folder's scroll. */
type ReturnPoint = { slug: string; historyIndex: number; scrollTop: number };

const storageKey = "project-return-point";

const currentHistoryIndex = () =>
  (history.state as { index?: number } | null)?.index;

const readReturnPoint = (): ReturnPoint | undefined => {
  try {
    return (
      JSON.parse(sessionStorage.getItem(storageKey) ?? "null") ?? undefined
    );
  } catch {
    // Storage blocked: coming back works like a fresh visit.
    return undefined;
  }
};

const saveReturnPoint = (point: ReturnPoint) => {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(point));
  } catch {
    // Storage blocked: the back link falls back to its href.
  }
};

/** Remembers which card is opened and where the folder was, so coming back can restore it. */
export function rememberReturnPoints(folder: HTMLElement) {
  folder.addEventListener("click", (event) => {
    const card = (event.target as Element).closest<HTMLElement>(
      "[data-project-card]",
    );
    const historyIndex = currentHistoryIndex();
    if (!card || historyIndex === undefined) return;
    saveReturnPoint({
      slug: card.dataset.slug ?? "",
      historyIndex,
      scrollTop: card.closest("[data-project-pages]")?.scrollTop ?? 0,
    });
  });
}

/** Back on the history entry a project was opened from: the folder returns to that page. */
export function restoreReturnPoint(folder: HTMLElement) {
  const point = readReturnPoint();
  if (!point || point.historyIndex !== currentHistoryIndex()) return;
  const pages = folder.querySelector(
    '[role="tabpanel"]:not([hidden]) [data-project-pages]',
  );
  if (pages) pages.scrollTop = point.scrollTop;
}

const cameFromFolder = (slug: string) => {
  const point = readReturnPoint();
  return (
    point?.slug === slug && point.historyIndex + 1 === currentHistoryIndex()
  );
};

/**
 * "← Projects" and Esc go back in history when the previous entry is the
 * folder this project was opened from, so everything returns as it was.
 * Otherwise the link's href applies: the folder on this project's tab.
 */
export function setupProjectBack(link: HTMLAnchorElement, signal: AbortSignal) {
  link.addEventListener("click", (event) => {
    if (!cameFromFolder(link.dataset.slug ?? "")) return;
    event.preventDefault();
    history.back();
  });
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Escape" || document.querySelector("dialog[open]"))
        return;
      link.click();
    },
    { signal },
  );
}
