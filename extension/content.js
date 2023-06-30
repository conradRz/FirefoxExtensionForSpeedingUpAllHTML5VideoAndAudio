browser.runtime.onMessage.addListener(function (request) {
  switch (request.command) {
    case "speedUp025":
      return updateElementPlaybackRate(0.25);
    case "slowDown025":
      return updateElementPlaybackRate(-0.25);
  }
});

function updateElementPlaybackRate(changeValue) {
  return new Promise(function (resolve) {
    var element = getCurrentlyPlayingElement();

    if (typeof element === 'undefined') {
      resolve();
      return;
    }

    var newPlaybackRate = element.playbackRate + changeValue;
    if (newPlaybackRate < 0.75) {
      resolve(element.playbackRate);
      return;
    }

    element.playbackRate = newPlaybackRate;
    resolve(element.playbackRate);
  });
}

function getCurrentlyPlayingElement() {
  var elements = document.querySelectorAll("video, audio");
  var lastActiveElement = undefined;

  if (typeof lastActiveElement === 'undefined') {
    lastActiveElement = elements[0];
  }

  for (var element of elements) {
    if (!element.paused) {
      lastActiveElement = element;
      return element;
    }
  }

  return lastActiveElement;
}