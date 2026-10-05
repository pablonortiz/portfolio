const feedbackDuration = 2000;

/**
 * A button that copies a text (data-copy). It needs the Clipboard API, so it
 * starts hidden and shows up only with JS. After copying, it shows its copied
 * state (data-copied) for a moment and tells screen readers through the
 * status line it names (data-copy-status, that element's id).
 */
export function setupCopyButton(
  button: HTMLButtonElement,
  signal: AbortSignal,
) {
  const status = document.getElementById(button.dataset.copyStatus!)!;
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
        .writeText(button.dataset.copy!)
        .then(showCopied)
        // Denied (no permission or an insecure origin): the text stays there to select by hand.
        .catch(() => undefined),
    { signal },
  );
  signal.addEventListener("abort", () => clearTimeout(resetTimer));
}
