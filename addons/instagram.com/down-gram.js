'use strict';

const download = event => {
  try {
    const { target } = event;
    const srcset = target.getAttribute('srcset') || '';
    const urls = srcset
      .split(',')
      .map((item, index) => {
        item = item.trim();
        let [url = '', size = ''] = item.split(' ');
        try {
          size = parseInt(size.replace(/w/g, ''), 10) || 0;
        } catch (error) {
          console.error(error);
          size = 0;
        }
        return { url, size };
      })
      .sort((a, b) => (a.size > b.size ? -1 : 1));
    const [{ url = '' }] = urls;
    window.open(url, '_blank');
  } catch (errror) {
    console.error('download()', error);
  }
};

const setUp = (layerClass = '', imageClass = '', zIndex = 0) => {
  try {
    const layers = document.getElementsByClassName(`${layerClass}`);
    for (let i = 0; i < layers.length; i++) {
      const layer = layers[i];
      if (layer) {
        layer.style.zIndex = -10;
      }
    }

    const imgs = document.querySelectorAll(`img.${imageClass}`);

    for (let j = 0; j < imgs.length; j++) {
      const img = imgs[j];

      img.style.cursor = 'crosshair';
      if (zIndex) img.style.zIndex = zIndex;

      img.removeEventListener('click', () => {}, false);
      img.addEventListener('click', download, false);
    }
  } catch (error) {
    console.error('setUp()', error);
  }
};

const downGram = () => {
  try {
    setUp('_9AhH0', 'FFVAD'); // post
    setUp('c6YEx', 'y-yJ5', 10); // story
  } catch (error) {
    console.error('downGram()', error);
  }
};

const observeDOM = (() => {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  return (obj, callback) => {
    // define new observer
    const obs = new MutationObserver((mutations, observer) => {
      if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) callback();
    });
    // let the observer observe DOM obj for changes in children
    obs.observe(obj, { childList: true, subtree: true });
  };
})();

// Observe DOM for change to update replacement
observeDOM(document, downGram);
