browser.commands.onCommand.addListener(function (command) { //on command press. It works.
  if (command == "video-speed-up") {
    speedUp025()
  }
  if (command == "video-speed-down") {
    slowDown025()
  }
});


//UTILITY FUNCTIONS
function allowedAddresses(p) {
  if (typeof p !== "undefined") {
    return p.substr(0, 4) === "http" || p.substr(0, 4) === "file";
  }
}

// CREATE MENUS
chrome.contextMenus.create({
  title: "Reset Speed",
  contexts: ["all"],
  type: "normal",
  onclick: resetSpeed
});

chrome.contextMenus.create({
  title: "Slow Down by 0.25",
  contexts: ["all"],
  type: "normal",
  onclick: slowDown025
});

chrome.contextMenus.create({
  title: "Slow Down by 0.5",
  contexts: ["all"],
  type: "normal",
  onclick: slowDown05
});

chrome.contextMenus.create({
  title: "Slow Down by 1",
  contexts: ["all"],
  type: "normal",
  onclick: slowDown1
});

function resetSpeed() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { command: "resetSpeed" }, function (
      response
    ) {
      setIconBadgeTextFromValue(tabs[0].id, 1);
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

function slowDown05() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { command: "slowDown05" }, function (
      response
    ) {
      setIconBadgeTextFromValue(tabs[0].id, response);
    });
  });
}

function slowDown1() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { command: "slowDown1" }, function (
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