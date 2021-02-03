chrome.runtime.onMessage.addListener(function (request, sender, response) {
  switch (request.command) {
    case "getVideosArray": videoSpeedUp.updateElementPlaybackRate(0.25, response); break;
    case "resetSpeed": videoSpeedUp.resetElementPlaybackRate(response); break;
    case "slowDown005": videoSpeedUp.updateElementPlaybackRate(-0.05, response); break;
    case "slowDown01": videoSpeedUp.updateElementPlaybackRate(-0.1, response); break;
    case "slowDown025": videoSpeedUp.updateElementPlaybackRate(-0.25, response); break;
    case "slowDown05": videoSpeedUp.updateElementPlaybackRate(-0.5, response); break;
    case "slowDown1": videoSpeedUp.updateElementPlaybackRate(-1, response); break;
  }
});

var videoSpeedUp = function () {
  var lastActiveElement = undefined;

  function updateElementPlaybackRate(changeValue, response, elementToChange) {
    var elementToChange = returnCurrentlyPlayingElement(lastActiveElement);

    if (typeof elementToChange === 'undefined') { return }
    elementToChange.playbackRate += changeValue;
    response(elementToChange.playbackRate);
  }

  function resetElementPlaybackRate(response) {
    var element = returnCurrentlyPlayingElement(lastActiveElement);
    if (typeof element === 'undefined') { return }
    element.playbackRate = 1;
    lastActiveElement = element;
    response(element.playbackRate);
  }

  function returnCurrentlyPlayingElement(lastActiveElement) {
    var element;
    var elements = document.querySelectorAll("video,audio");
    if (typeof lastActiveElement === 'undefined') {
      element = elements[0];
    } else {
      element = lastActiveElement;
    }
    for (e in Object.getOwnPropertyNames(elements)) {
      if (!elements[e].paused) {
        element = elements[e];
        return element;
      }
    }
    return element;
  }

  return {
    updateElementPlaybackRate: updateElementPlaybackRate,
    resetElementPlaybackRate: resetElementPlaybackRate
  }
}()