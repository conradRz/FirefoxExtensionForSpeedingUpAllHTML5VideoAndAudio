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

let currentUrl = ''

/**
  * This function will be called periodically.
  * Check if the URL has changed, as changed URL, doesn't mean that the content script is reloaded.
  */
const init = async () => {
  const newUrl = location.href
  if (currentUrl !== newUrl) {
    browser.storage.local.get({ selectedOption: "all" }).then(result => {
      if (result.selectedOption === "all") {
        browser.storage.local.get({ lastPlaybackRate: 1 }).then(data => {
          const lastPlaybackRate = parseFloat(data.lastPlaybackRate);
          if (lastPlaybackRate !== 1) {
            const newPlaybackRate = Math.max(lastPlaybackRate - 1, 0);
            updateElementPlaybackRate(newPlaybackRate).then(response => browser.runtime.sendMessage({ command: "updateBadgeText", value: response }));
          }
        });
      }
    });
    currentUrl = newUrl;
  }

  // Call periodically again
  setTimeout(init, 1000)
}

init()