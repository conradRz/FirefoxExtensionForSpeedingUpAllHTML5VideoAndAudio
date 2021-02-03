//BUTTON CLICK, SEND REQUEST, GET RESPONSE WITH LIST OF THE VIDEOS
chrome.browserAction.onClicked.addListener(function(tabs) {
  if (allowedAddresses(tabs.url)) {
    chrome.tabs.sendMessage(tabs.id, { command: "getVideosArray" }, function(
      response
    ) {
      setIconBadgeTextFromValue(tabs.id, response);
    });
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
  title: "Slow Down by 0.05",
  contexts: ["all"],
  type: "normal",
  onclick: slowDown005
});

chrome.contextMenus.create({
  title: "Slow Down by 0.1",
  contexts: ["all"],
  type: "normal",
  onclick: slowDown010
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
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { command: "resetSpeed" }, function(
      response
    ) {
      setIconBadgeTextFromValue(tabs[0].id, 1);
    });
  });
}

function slowDown005() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { command: "slowDown005" }, function(
      response
    ) {
      setIconBadgeTextFromValue(tabs[0].id, response);
    });
  });
}

function slowDown010() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { command: "slowDown01" }, function(
      response
    ) {
      setIconBadgeTextFromValue(tabs[0].id, response);
    });
  });
}

function slowDown025() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { command: "slowDown025" }, function(
      response
    ) {
      setIconBadgeTextFromValue(tabs[0].id, response);
    });
  });
}

function slowDown05() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { command: "slowDown05" }, function(
      response
    ) {
      setIconBadgeTextFromValue(tabs[0].id, response);
    });
  });
}

function slowDown1() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { command: "slowDown1" }, function(
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
