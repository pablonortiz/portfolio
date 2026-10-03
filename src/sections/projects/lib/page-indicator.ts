/** 1-based page whose start is at or above the scroll position. */
export function getCurrentPage(pageStartOffsets: number[], scrollTop: number) {
  return (
    pageStartOffsets.findLastIndex((offset) => offset <= scrollTop + 1) + 1
  );
}

export function formatPageIndicator(currentPage: number, pageCount: number) {
  return pageCount > 1 ? `${currentPage} / ${pageCount}` : "";
}

/** The pages are whatever items CSS marks as snap targets, so this works for any number of projects per page. */
const getPageStartOffsets = (pages: HTMLElement) => {
  const paddingTop = parseFloat(getComputedStyle(pages).paddingTop);
  return [...pages.children]
    .filter((item) => getComputedStyle(item).scrollSnapAlign !== "none")
    .map((item) => (item as HTMLElement).offsetTop - paddingTop);
};

const pagesOf = (panel: Element | undefined) =>
  panel?.querySelector<HTMLElement>("[data-project-pages]") ?? null;

/** Keeps the folder's "1 / 2" indicator in sync with the pages of the panel on display. */
export function setupPageIndicator(folder: HTMLElement) {
  const indicator = folder.querySelector("[data-project-indicator]");
  const panels = [...folder.querySelectorAll<HTMLElement>('[role="tabpanel"]')];
  if (!indicator) return;
  let activePages = pagesOf(panels.find((panel) => !panel.hidden));

  const update = () => {
    if (!activePages) return;
    const pageStartOffsets = getPageStartOffsets(activePages);
    const currentPage = getCurrentPage(pageStartOffsets, activePages.scrollTop);
    indicator.textContent = formatPageIndicator(
      currentPage,
      pageStartOffsets.length,
    );
  };

  panels.forEach((panel) => {
    pagesOf(panel)?.addEventListener("scroll", update, { passive: true });
    panel.addEventListener("panel-shown", () => {
      activePages = pagesOf(panel);
      update();
    });
  });
  window.addEventListener("resize", update);
  update();
}
