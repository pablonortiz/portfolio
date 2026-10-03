type Theme = "light" | "dark";

/** Theme in effect: the visitor's choice if there is one, otherwise the system's. */
export function resolveTheme(
  chosenTheme: string | undefined,
  systemPrefersDark: boolean,
): Theme {
  if (chosenTheme === "light" || chosenTheme === "dark") return chosenTheme;
  return systemPrefersDark ? "dark" : "light";
}

export const getOppositeTheme = (theme: Theme): Theme =>
  theme === "dark" ? "light" : "dark";

const saveTheme = (theme: Theme) => {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Storage can be blocked (private mode, site settings): the theme still applies to this visit.
  }
};

/** Two-state toggle that follows the system theme until the visitor picks one. */
export function setupThemeToggle(toggle: HTMLElement, signal: AbortSignal) {
  const root = document.documentElement;
  const systemDark = matchMedia("(prefers-color-scheme: dark)");

  const currentTheme = () =>
    resolveTheme(root.dataset.theme, systemDark.matches);

  const syncPressed = () =>
    toggle.setAttribute("aria-pressed", String(currentTheme() === "dark"));

  toggle.addEventListener("click", () => {
    const nextTheme = getOppositeTheme(currentTheme());
    root.dataset.theme = nextTheme;
    saveTheme(nextTheme);
    syncPressed();
  });

  systemDark.addEventListener("change", syncPressed, { signal });
  syncPressed();
}
