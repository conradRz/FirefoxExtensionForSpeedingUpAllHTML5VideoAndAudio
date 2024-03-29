browser.runtime.onMessage.addListener(function (request) {
  switch (request.command) {
    case "speedUp025":
      return updateElementsPlaybackRate(0.25); //even though they return nothing, without "return" it won't work here, oddly enough, and don't want to do break statement
    case "slowDown025":
      return updateElementsPlaybackRate(-0.25);
  }
});

let elements;
let newPlaybackRate = 1;

async function updateElementsPlaybackRate(changeValue, wasThisCalledOnPageLoad = false) {
  elements = document.querySelectorAll("video, audio");

  if (elements.length === 0) {
    return "";
  }

  if (wasThisCalledOnPageLoad) {
    newPlaybackRate = changeValue + 1;
  } else {
    const storageData = await browser.storage.local.get({ lastPlaybackRate: 1 });
    newPlaybackRate = storageData.lastPlaybackRate + changeValue;
  }

  for (const element of elements) {
    element.playbackRate = newPlaybackRate;
  }

  if (!wasThisCalledOnPageLoad) {
    try {
      await browser.storage.local.set({ lastPlaybackRate: newPlaybackRate });
    } catch (error) {
      console.error("Error storing playback rate:", error);
    }
  }

  return newPlaybackRate;
}

let firstRun = true;

/**
  * This function will be called periodically.
  * Check if the URL has changed, as changed URL, doesn't mean that the content script is reloaded. Popstate and hashchange event listeners don't fire or url change
  */
const init = async () => {
  browser.storage.local.get({ selectedOption: "all" }).then(result => {
    if (result.selectedOption === "all") {
      browser.storage.local.get({ lastPlaybackRate: 1 }).then(data => {
        const lastPlaybackRate = data.lastPlaybackRate;
        // if lastPlaybackRate is 1, then do nothing, as that's the default playback of newly loaded media anyway
        if (lastPlaybackRate !== 1) {
          elements = document.querySelectorAll("video, audio");
          const hasPlaybackRateOne = Array.from(elements).some(element => element.playbackRate === 1);

          if (hasPlaybackRateOne) { //that means there is at least one new element which has the default playback speed, so we need to sped it up
            const changePlaybackByRate = lastPlaybackRate - 1;
            updateElementsPlaybackRate(changePlaybackByRate, true).then(response => browser.runtime.sendMessage({ command: "updateBadgeText", value: response }));
          }
        }
      });
    } else if (firstRun) {
      browser.runtime.sendMessage({ command: "updateBadgeText", value: null, tabId: "currentTab" });
      firstRun = false;
    }
  });
  // Call periodically again
  setTimeout(init, 1000)
}

init()