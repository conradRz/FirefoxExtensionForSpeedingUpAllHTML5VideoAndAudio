browser.commands.onCommand.addListener(function (command) {
  if (command == "video-speed-up") {
    speedUp025();
  } else if (command == "video-speed-down") {
    slowDown025();
  }
});

function speedUp025() {
  browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
    sendMessageToContentScript(tabs[0].id, { command: "speedUp025" })
      .then(response => setIconBadgeTextFromValue(tabs[0].id, response));
  });
}

function slowDown025() {
  browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
    sendMessageToContentScript(tabs[0].id, { command: "slowDown025" })
      .then(response => setIconBadgeTextFromValue(tabs[0].id, response));
  });
}

function setIconBadgeTextFromValue(tabId, value) {
  const formattedStringToSet = !isNaN(value) ? (Math.round(value * 100) / 100).toString() : "";
  browser.browserAction.setBadgeText({ text: formattedStringToSet, tabId: tabId });
}

function sendMessageToContentScript(tabId, message) {
  return browser.tabs.sendMessage(tabId, message)
    .then(response => response)
    .catch(error => console.error("Error sending message to content script:", error));
}