browser.commands.onCommand.addListener(function (command) { //on command press. It works.
  if (command == "video-speed-up") {
    speedUp025()
  }
  if (command == "video-speed-down") {
    slowDown025()
  }
});

browser.webNavigation.onHistoryStateUpdated.addListener(resetSpeed); //works, but not on the first video
//browser.webNavigation.onReferenceFragmentUpdated.addListener(resetSpeed);//don't use that
//browser.webNavigation.onDOMContentLoaded.addListener(resetSpeed);
browser.webNavigation.onCompleted.addListener(resetSpeed);

async function resetSpeed() {
  await new Promise(r => setTimeout(r, 1000)); 
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { command: "resetSpeed" }, function (
      response
    ) {
      setIconBadgeTextFromValue(tabs[0].id, response);
    });
  });
}

function speedUp025() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { command: "speedUp025" }, function (
      response
    ) {
      setIconBadgeTextFromValue(tabs[0].id, response);
    });
  });
}

function slowDown025() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { command: "slowDown025" }, function (
      response
    ) {
      setIconBadgeTextFromValue(tabs[0].id, response);
    });
  });
}

function setIconBadgeTextFromValue(tabId, value) {
  var formattedStringToSet = !isNaN(value)
    ? (Math.round(value * 100) / 100).toString()
    : "";
  chrome.browserAction.setBadgeText({
    text: formattedStringToSet,
    tabId: tabId
  });
}