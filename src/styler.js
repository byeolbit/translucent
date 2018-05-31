import {COLOR, STYLE_SHEET, getOffset, getPixelSize, getOriginSize} from './util';

class Styler {
  /**
   * Initialize style
   * 
   * @param {HTMLElement} element - Target element of this plugin.
   * @param {boolean} shadow - Decides apply shadow effect.
   * @param {string} cardColor - Color of card.
   */
  static init(element, shadow, cardColor) {
    let contentsContainer = element.querySelector('.tl-card-contents-container'),
        contents = element.querySelector('.tl-card-contents');
    this.setShadow(contentsContainer, shadow);
    this.setChildrenSize(element);
    this.setCardColor(contents, cardColor);
    this.setAlign(contentsContainer, element);
  }

  /**
   * Unify size of child elements to parent element.
   * @param {HTMLElement} element - Target element
   */
  static setChildrenSize(element) {
    let h = element.clientHeight,
        w = element.clientWidth,
        children = element.children;
    
    for (let child of children) {
      child.style.height = `${h}px`;
      child.style.width = `${w}px`;
    }
  }

  /**
   * If shadow is true, apply shadow effect to element.
   * 
   * @param {HTMLElement} element - Target element  
   * @param {boolean} shadow - Decides shadow
   */
  static setShadow(element, shadow) {
    if (shadow) {
      element.style.boxShadow = 'rgba(0, 0, 0, 0.5) 0px 20px 20px';
    }
  }

  /**
   * Set the background color of element
   * 
   * @private
   * @param {HTMLElement} element - Target element 
   * @param {string} cardColor - Preset color or custom style
   */
  static setCardColor(element, cardColor) {
    switch (cardColor) {
    case 'clear':
        cardColor = COLOR.CLEAR;
        break;
    case 'white':
        cardColor = COLOR.WHITE;
        break;
    case 'grey':
        cardColor = COLOR.GREY;
        break;
    case 'black':
        cardColor = COLOR.BLACK;
        break;
    }
    element.style.backgroundColor = cardColor;
  }

  /**
   * Align content to center of target element.
   * 
   * @param {HTMLElement} element - content element 
   */
  static setAlign(element, baseElement) {
    element.style.top = `-${baseElement.clientHeight}px`;
    element.style.left = `0px`;
  }

  /**
   * Initialize background of card.
   * 
   * @param {HTMLElement} element - Target element of this plugin.
   * @param {HTMLElement} bgElement - Background element.
   * @param {CSSStyleDeclaration} cardBgStyle - Style of background card element.
   * @param {number} filterValue - Amount of filter.
   * @param {function} alignCallback - callback for align bg-card
   */
  static cardBgInit(element, bgElement, cardBgStyle, filterValue, alignCallback) {
    let style = window.getComputedStyle(bgElement,null),
        img = style['backgroundImage'],
        repeat = style['backgroundRepeat'],
        size = style['backgroundSize'],
        cardHeight = element.clientHeight,
        cardWidth = element.clientWidth;

    cardBgStyle.cssText = `background-image: ${img};
      background-repeat: ${repeat};
      filter: blur(${filterValue}px);
      margin-left: -${filterValue}px;
      margin-top: -${filterValue}px;
      height: ${cardHeight + filterValue * 2}px;
      width: ${cardWidth + filterValue * 2}px;`;

    cardBgStyle.backgroundSize = getPixelSize(bgElement, img, size, getOriginSize);
    alignCallback(element, bgElement, cardBgStyle, filterValue);
  }

  /**
   * Align translucent background element.
   * 
   * @private
   * @param {HTMLElement} element - Target element of this plugin.
   * @param {HTMLElement} bgElement - Background element.
   * @param {CSSStyleDeclaration} cardBgStyle - Style of background card element.
   * @param {number} filterValue - Amount of filter.
   */
  static alignCardBackground(element, bgElement, cardBgStyle, filterValue) {
    let bgAttatchment = bgElement.style.backgroundAttachment,
        bgOffset = getOffset(bgElement),
        cardOffset = getOffset(element),
        style = bgElement.style;

    cardBgStyle.backgroundAttachment = bgAttatchment;

    // If background-attachment is fixed,
    // don't need to track the card offset.
    if (bgAttatchment === 'fixed') return;

    cardBgStyle.backgroundPosition = 
      (bgOffset.left - (cardOffset.left - filterValue)) + 'px ' +
      (bgOffset.top - (cardOffset.top - filterValue)) + 'px';
  }
}

export {Styler};
