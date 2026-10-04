/**
 * The project's tour dialog. Its buttons open and close it on their own
 * (Invoker Commands: `commandfor`); this plays the video when it opens,
 * pauses it when it closes and closes it on a click outside the panel.
 */
export function setupProjectTour(
  dialog: HTMLDialogElement,
  signal: AbortSignal,
) {
  const video = dialog.querySelector<HTMLVideoElement>("[data-tour-video]")!;
  const play = () => video.play().catch(() => undefined);

  dialog.addEventListener(
    "command",
    (event) => {
      if ((event as CommandEvent).command === "show-modal") play();
    },
    { signal },
  );
  dialog.addEventListener("close", () => video.pause(), { signal });
  dialog.addEventListener(
    "click",
    (event) => {
      if (event.target === dialog) dialog.close();
    },
    { signal },
  );

  if (!("commandForElement" in HTMLButtonElement.prototype)) {
    openWithoutCommands(dialog, play, signal);
  }
}

/** Safari before 26.2 and older browsers: the buttons do nothing on their own. */
function openWithoutCommands(
  dialog: HTMLDialogElement,
  play: () => void,
  signal: AbortSignal,
) {
  document
    .querySelector(`[commandfor="${dialog.id}"][command="show-modal"]`)
    ?.addEventListener(
      "click",
      () => {
        dialog.showModal();
        play();
      },
      { signal },
    );
  dialog
    .querySelector('[command="close"]')
    ?.addEventListener("click", () => dialog.close(), { signal });
}
