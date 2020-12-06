'use strict';

const utils = (function() {
  // returns a promise that resolves after the specified number of ms
  function delay(min, max) {
    let ms = Math.random() * (max - min) + min;
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
  function randomError(promise) {
    if (Math.random() < 0.1) {
      return promise.then(() => ({
        isError: true,
        error: {
          status: 500,
          statusText: 'Server error',
          message: 'Server error'
        }
      }));
    } else {
      return promise;
    }
  }
  return {
    delay,
    randomError
  };
})();

export default utils;
export const delay = utils.delay;
export const randomError = utils.randomError;
