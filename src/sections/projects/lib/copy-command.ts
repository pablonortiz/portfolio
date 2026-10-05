const feedbackDuration = 2000;

/**
 * The install command's copy button. It needs the Clipboard API, so it starts
 * hidden and shows up only with JS. After copying, it shows a check for a
 * moment and tells screen readers through the panel's status line.
 */
export function setupCopyCommand(
  button: HTMLButtonElement,
  signal: AbortSignal,
) {
  const status = button
    .closest("[data-package-panel]")!
    .querySelector("[data-copy-status]")!;
  let resetTimer: number | undefined;

  const showCopied = () => {
    button.dataset.copied = "";
    status.textContent = button.dataset.copiedLabel!;
    clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      delete button.dataset.copied;
      status.textContent = "";
    }, feedbackDuration);
  };

  button.hidden = false;
  button.addEventListener(
    "click",
    () =>
      navigator.clipboard
        .writeText(button.dataset.command!)
        .then(showCopied)
        // Denied (no permission or an insecure origin): the command stays there to select by hand.
        .catch(() => undefined),
    { signal },
  );
  signal.addEventListener("abort", () => clearTimeout(resetTimer));
}
