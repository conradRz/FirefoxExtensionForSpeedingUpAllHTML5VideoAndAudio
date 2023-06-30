browser.runtime.onMessage.addListener(function (request) {
  switch (request.command) {
    case "speedUp025":
      return updateElementPlaybackRate(0.25); //even though they return nothing, without "return" it won't work here, oddly enough, and don't want to do break statement
    case "slowDown025":
      return updateElementPlaybackRate(-0.25);
    case "setCustomSpeed":
      return updateElementPlaybackRate(request.rate);
  }
});

function updateElementPlaybackRate(changeValue) {
  return new Promise(function (resolve) {
    const element = getCurrentlyPlayingElement();

    if (!element) {
      resolve();
      return;
    }

    const currentPlaybackRate = element.playbackRate;
    const newPlaybackRate = currentPlaybackRate + changeValue;

    if (newPlaybackRate < 0.75) {
      resolve(currentPlaybackRate);
      return;
    }

    element.playbackRate = newPlaybackRate;

    // Store newPlaybackRate
    browser.storage.local.set({ lastPlaybackRate: newPlaybackRate })
      .then(() => {
        resolve(newPlaybackRate);
      })
      .catch(error => {
        console.error("Error storing playback rate:", error);
        resolve(newPlaybackRate);
      });
  });
}

function getCurrentlyPlayingElement() {
  const elements = document.querySelectorAll("video, audio");
  let lastActiveElement = elements[0]

  for (let element of elements) {
    if (!element.paused) {
      lastActiveElement = element;
      return element;
    }
  }

  return lastActiveElement;
}