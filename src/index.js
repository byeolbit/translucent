import * as _ from './translucent';

/**
 * @constructor
 * @param {string|HTMLElement} element - Target element. Selector or Element can be used.
 * @param {object} options - Option for this plugin.
 */
function Translucent(element, options) {
  NodeList.prototype.forEach = Array.prototype.forEach;
  let _translucent = new _.Translucent(element, options);
  this.blur = _translucent.blur;
  this.destroy = _translucent.destroy;
}

export {Translucent};
