/** 1-based page whose start is at or above the scroll position. */
export function getCurrentPage(pageStartOffsets: number[], scrollTop: number) {
  return (
    pageStartOffsets.findLastIndex((offset) => offset <= scrollTop + 1) + 1
  );
}

export function formatPageIndicator(currentPage: number, pageCount: number) {
  return pageCount > 1 ? `${currentPage} / ${pageCount}` : "";
}

/**
 * Keeps the "1 / 2" indicator in sync. The pages are whatever items CSS marks as
 * snap targets, so it works for any number of projects per page.
 */
export function setupPageIndicator(pages: HTMLElement) {
  const indicator = pages.parentElement?.querySelector(
    "[data-project-indicator]",
  );
  if (!indicator) return;
  const items = [...pages.children] as HTMLElement[];

  const update = () => {
    const paddingTop = parseFloat(getComputedStyle(pages).paddingTop);
    const pageStartOffsets = items
      .filter((item) => getComputedStyle(item).scrollSnapAlign !== "none")
      .map((item) => item.offsetTop - paddingTop);
    const currentPage = getCurrentPage(pageStartOffsets, pages.scrollTop);
    indicator.textContent = formatPageIndicator(
      currentPage,
      pageStartOffsets.length,
    );
  };

  pages.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  pages.closest('[role="tabpanel"]')?.addEventListener("panel-shown", update);
  update();
}
