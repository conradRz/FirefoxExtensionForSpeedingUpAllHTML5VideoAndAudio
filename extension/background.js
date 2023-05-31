browser.commands.onCommand.addListener(function (command) {
  if (command == "video-speed-up") {
    speedUp025();
  }
  if (command == "video-speed-down") {
    slowDown025();
  }
});

browser.webNavigation.onCompleted.addListener(resetSpeed);
//browser.tabs.onActivated.addListener(resetSpeed); //this, uncommented, would reset speed when navigating back to a sped up tab, which for my use, is not intended behaviour

async function resetSpeed() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const response = await sendMessageToContentScript(tabs[0].id, { command: "resetSpeed" });
  setIconBadgeTextFromValue(tabs[0].id, response);
}

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