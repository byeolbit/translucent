import {getElement, getOffset} from './util';
import {Styler} from './styler';
import './translucent.style.css';

NodeList.prototype.forEach = Array.prototype.forEach;

const DEFAULTS = {
  /** 
   * Amount of blur minimum is 0
   * @type {number}
   * @defaultvalue
   */
  filterValue: 10,

  /**
   * Color of card
   * @type {string}
   * @defaultvalue
   */
  cardColor: 'white',

  /**
   * Shadow effect of card
   * @type {boolean}
   * @defaultvalue
   */
  shadow: true,

  bgElement: undefined
}

class Translucent {
  /**
   * @constructor
   * @param {string|HTMLElement} element - Target element. Selector or Element can be used.
   * @param {object} options - Option for this plugin.
   */
  constructor(element, options) {
    this.origin = element.outerHTML;
    // If element is selector, get the HTMLElement
    this.element = getElement(element);
    this.options = {...DEFAULTS, ...options};
    this.bgElement = this.options.bgElement || element.parentElement;

    this._initStructure(this.element);

    this.styler = new Styler(this.element, this.options.shadow, this.options.cardColor);

    this.bgInitCallback =
      this.styler.cardBgInit.bind(
        this,
        this.element,
        this.bgElement,
        this.cardBgStyle,
        this.options.filterValue,
        this.styler.alignCardBackground
      );

    window.addEventListener('onresize', this.bgInitCallback);
    window.addEventListener('onload', this.bgInitCallback);
      
    this.bgInitCallback();
    this._observeStyleChange();
  }

  /**
   * Build DOM structure of card
   * @param {HTMLElement} element target element
   */
  _initStructure(element) {
    // init contents
    let contents = element.innerHTML,
        cardContent = document.createElement('div'),
        cardContentContainer = document.createElement('div'),
        cardBg = document.createElement('div'),
        cardBgContainer = document.createElement('div');

    cardContent.setAttribute('class', 'tl-card-contents');
    cardContent.innerHTML = contents;
    
    cardContentContainer.setAttribute('class', 'tl-card-contents-container');
    cardContentContainer.appendChild(cardContent);
    
    // init background
    cardBg.setAttribute('class', 'tl-card-bg');
    cardBgContainer.setAttribute('class', 'tl-card-bg-container');
    cardBgContainer.appendChild(cardBg);
    
    element.innerHTML = '';
    element.appendChild(cardBgContainer);
    element.appendChild(cardContentContainer);

    
    this.cardBgStyle = cardBg.style
  }

  _observeStyleChange() {
    let bgElementStyle = window.getComputedStyle(this.bgElement, null),
        originOffset = getOffset(this.element),
        originWidth = this.element.clientWidth,
        originHeight = this.element.clientHeight,
        originImg = bgElementStyle['backgroundImage'],
        originFilter = bgElementStyle['filter'],
        originAttatchment = bgElementStyle['backgroundAttachment'];
    
    this.styleObserver = new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        if (originOffset.top !== this.element.offsetTop
            || originOffset.left !== this.element.offsetLeft) {
          this.styler.alignCardBackground(
            this.element,
            this.bgElement,
            this.cardBgStyle,
            this.options.filterValue
          );
        }

        let height = this.element.clientHeight,
            width = this.element.clientWidth;
        
        if (originHeight !== height
            || originWidth !== width
            || originImg !== bgElementStyle['backgroundImage']
            || originFilter !== bgElementStyle['filter']
            || originAttatchment !== bgElementStyle['backgroundAttachment']) {
          originWidth = width;
          originHeight = height;
          originImg = bgElementStyle['backgroundImage'];
          originFilter = bgElementStyle['filter'];
          
          this.styler.cardBgInit(
            this.element,
            this.bgElement,
            this.cardBgStyle,
            this.options.filterValue,
            this.styler.alignCardBackground
          );
        }
        return;
      }
    });

    let config = {
      attributes: true,
      childList: true,
      characterData: true,
      attributeFilter: ['style']
    }

    this.styleObserver.observe(this.element, config);
    this.styleObserver.observe(this.bgElement, config);
  }

  /**
   * Change amount of blur
   * 
   * @public
   * @param {number} filterValue - Amount of blur.
   */
  blur(filterValue) {
    this.options.filterValue = filterValue;
    this.styler.cardBgInit(
      this.element,
      this.bgElement,
      this.cardBgStyle,
      this.options.filterValue,
      this.styler.alignCardBackground
    );
  }

  destroy() {
    window.removeEventListener('onresize', this.bgInitCallback);
    window.removeEventListener('onload', this.bgInitCallback);
  }
}

export {Translucent};
