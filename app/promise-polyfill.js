/* This is needed for supporting browsers that do not provide a Promise
 * implementation natively.  JQuery uses Promises, so a polyfill is required
 * for the app to work in IE11, Firefox, etc.
 *
 * This module should be packaged into the vendor.js file created by webpack.
 * See webpack.config.js.
 */

import Promise from 'promise-polyfill';

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}
