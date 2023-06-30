browser.runtime.onMessage.addListener(function (request) {
  switch (request.command) {
    case "speedUp025":
      return updateElementPlaybackRate(0.25); //even though they return nothing, without "return" it won't work here, oddly enough, and don't want to do break statement
    case "slowDown025":
      return updateElementPlaybackRate(-0.25);
  }
});

function updateElementPlaybackRate(changeValue) {
  return new Promise(function (resolve) {
    const element = getCurrentlyPlayingElement();

    if (typeof element === 'undefined') {
      resolve();
      return;
    }

    const newPlaybackRate = element.playbackRate + changeValue;
    if (newPlaybackRate < 0.75) {
      resolve(element.playbackRate);
      return;
    }

    element.playbackRate = newPlaybackRate;

    // Store newPlaybackRate
    browser.storage.local.set({ lastPlaybackRate: newPlaybackRate });

    resolve(element.playbackRate);
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