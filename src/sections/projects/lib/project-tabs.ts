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
  panelOf(tab)?.toggleAttribute("hidden", !selected);
};

const pushCategory = (urlParam: string, category: string) => {
  const url = new URL(location.href);
  url.searchParams.set(urlParam, category);
  history.pushState(null, "", url);
};

/** Accessible tabs (click, arrows, Home/End) whose active category lives in the URL. */
export function setupProjectTabs(folder: HTMLElement) {
  const tabs = [...folder.querySelectorAll<HTMLElement>('[role="tab"]')];
  const urlParam = folder.dataset.urlParam ?? "platform";

  const activate = (tab: HTMLElement, updateUrl: boolean) => {
    if (isSelected(tab)) return;
    tabs.forEach((candidate) => setSelected(candidate, candidate === tab));
    folder.dataset.activeCategory = tab.dataset.category;
    panelOf(tab)?.dispatchEvent(new Event("panel-shown"));
    if (updateUrl) pushCategory(urlParam, tab.dataset.category ?? "");
  };

  const tabForUrl = () => {
    const category = new URL(location.href).searchParams.get(urlParam);
    return tabs.find((tab) => tab.dataset.category === category) ?? tabs[0];
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab, true));
    tab.addEventListener("keydown", (event) => {
      const targetIndex = getKeyboardTargetIndex(event.key, index, tabs.length);
      if (targetIndex === undefined) return;
      event.preventDefault();
      tabs[targetIndex].focus();
      activate(tabs[targetIndex], true);
    });
  });

  window.addEventListener("popstate", () => activate(tabForUrl(), false));
  activate(tabForUrl(), false);
}
