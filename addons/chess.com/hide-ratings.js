"use strict";

const hideElement = (className) => {
  const userTaglineRatings = document.getElementsByClassName(className);
  for (let i = 0; i < userTaglineRatings.length; i++) {
    userTaglineRatings[i].style.display = "none";
  }
};

const hideRatings = () => {
  hideElement("live-game-start-component");
  hideElement("live-game-over-component");
  hideElement("user-tagline-rating");
  hideElement("user-rating");
};

const observeDOM = (() => {
  const MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver;

  return (obj, callback) => {
    // define new observer
    const obs = new MutationObserver((mutations, observer) => {
      if (mutations[0].addedNodes.length || mutations[0].removedNodes.length)
        callback();
    });
    // let the observer observe DOM obj for changes in children
    obs.observe(obj, { childList: true, subtree: true });
  };
})();

// Observe DOM for change to update replacement
observeDOM(document, hideRatings);
