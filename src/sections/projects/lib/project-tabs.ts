import { createPanelSwitcher, type Point } from "./panel-switcher";

/** Tab a key moves to: arrows wrap around, Home and End go to the ends. Undefined for any other key. */
export function getKeyboardTargetIndex(
  key: string,
  index: number,
  count: number,
) {
  return new Map([
    ["ArrowRight", (index + 1) % count],
    ["ArrowLeft", (index - 1 + count) % count],
    ["Home", 0],
    ["End", count - 1],
  ]).get(key);
}

const panelOf = (tab: HTMLElement) =>
  document.getElementById(tab.getAttribute("aria-controls") ?? "");

const isSelected = (tab: HTMLElement) =>
  tab.getAttribute("aria-selected") === "true";

const setSelected = (tab: HTMLElement, selected: boolean) => {
  tab.setAttribute("aria-selected", String(selected));
  tab.tabIndex = selected ? 0 : -1;
};

const pushCategory = (urlParam: string, category: string) => {
  const url = new URL(location.href);
  url.searchParams.set(urlParam, category);
  history.pushState(null, "", url);
};

const centerOf = (element: HTMLElement): Point => {
  const box = element.getBoundingClientRect();
  return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
};

const moveIndicator = (tablist: HTMLElement, tab: HTMLElement) => {
  tablist.style.setProperty("--indicator-x", `${tab.offsetLeft}px`);
  tablist.style.setProperty("--indicator-width", `${tab.offsetWidth}px`);
};

/** Accessible tabs (click, arrows, Home/End) with a sliding indicator, a circular reveal and the active category in the URL. */
export function setupProjectTabs(folder: HTMLElement) {
  const tablist = folder.querySelector<HTMLElement>('[role="tablist"]');
  const tabs = [...folder.querySelectorAll<HTMLElement>('[role="tab"]')];
  const panels = [...folder.querySelectorAll<HTMLElement>('[role="tabpanel"]')];
  const urlParam = folder.dataset.urlParam ?? "platform";
  if (!tablist) return;
  const switchPanel = createPanelSwitcher(panels);

  const selectedTab = () => tabs.find(isSelected) ?? tabs[0];

  const select = (tab: HTMLElement, revealOrigin?: Point) => {
    const previousPanel = panelOf(selectedTab());
    tabs.forEach((candidate) => setSelected(candidate, candidate === tab));
    folder.dataset.activeCategory = tab.dataset.category;
    moveIndicator(tablist, tab);
    const panel = panelOf(tab);
    if (!panel) return;
    switchPanel(panel, previousPanel, revealOrigin);
    panel.dispatchEvent(new Event("panel-shown"));
  };

  const activate = (tab: HTMLElement, origin: Point = centerOf(tab)) => {
    if (isSelected(tab)) return;
    select(tab, origin);
    pushCategory(urlParam, tab.dataset.category ?? "");
  };

  const tabForUrl = () => {
    const category = new URL(location.href).searchParams.get(urlParam);
    return tabs.find((tab) => tab.dataset.category === category) ?? tabs[0];
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", (event) => {
      // Enter and Space also fire "click", with detail 0 (no pointer position).
      const fromPointer = event.detail > 0;
      activate(
        tab,
        fromPointer ? { x: event.clientX, y: event.clientY } : undefined,
      );
    });
    tab.addEventListener("keydown", (event) => {
      const targetIndex = getKeyboardTargetIndex(event.key, index, tabs.length);
      if (targetIndex === undefined) return;
      event.preventDefault();
      tabs[targetIndex].focus();
      activate(tabs[targetIndex]);
    });
  });

  window.addEventListener("popstate", () => {
    const tab = tabForUrl();
    if (isSelected(tab)) return;
    select(tab, centerOf(tab));
  });

  const resizeObserver = new ResizeObserver(() =>
    moveIndicator(tablist, selectedTab()),
  );
  tabs.forEach((tab) => resizeObserver.observe(tab));

  select(tabForUrl());
  tablist.dataset.indicatorReady = "";
}
