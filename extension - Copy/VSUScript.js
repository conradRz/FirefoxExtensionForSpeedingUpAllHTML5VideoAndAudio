chrome.runtime.onMessage.addListener(function (request, sender, response) {
  switch (request.command) {
    case "speedUp025": videoSpeedUp.updateElementPlaybackRate(0.25, response); break;
    case "resetSpeed": videoSpeedUp.resetElementPlaybackRate(response); break;
    case "slowDown025": videoSpeedUp.updateElementPlaybackRate(-0.25, response); break;
  }
});

var videoSpeedUp = function () {
  var lastActiveElement = undefined;

  function updateElementPlaybackRate(changeValue, response) {
    var elementToChange = returnCurrentlyPlayingElement(lastActiveElement);

    if (typeof elementToChange === 'undefined') { return }
    if ((elementToChange.playbackRate + changeValue) <= 0.75) {
      response(elementToChange.playbackRate);
      return;
    } //new, do nothing, as you don't want to go below x1 speed
    elementToChange.playbackRate += changeValue;
    response(elementToChange.playbackRate);
  }

  function resetElementPlaybackRate(response) {
    var element = returnCurrentlyPlayingElement(lastActiveElement);
    if (typeof element === 'undefined') { return }
    if (element.playbackRate != 1) {
      response(element.playbackRate);
      return;
    } //new, do nothing if you already have a custom speed set up
    element.playbackRate = 2.5;
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