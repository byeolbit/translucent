import {getElement, getOffset} from './util';
import {Styler} from './styler';
import './translucent.style.css';

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
}

class Translucent {
  /**
   * @constructor
   * @param {string|HTMLElement} element - Target element. Selector or Element can be used.
   * @param {object} options - Option for this plugin.
   */
  constructor(element, options) {
    // If element is selector, get the HTMLElement
    this.element = getElement(element);
    this.options = {...DEFAULTS, ...options};
    this.bgElement = options.bgElement || element.parentElement;

    this._initStructure(this.element);

    Styler.init(
      this.element,
      this.options.filterValue,
      this.options.cardColor
    );

    let bgInitCallback =
      Styler.cardBgInit.bind(
        this,
        this.element,
        this.bgElement,
        this.cardBgStyle,
        this.options.filterValue,
        Styler.alignCardBackground
      )

    window.onresize = bgInitCallback;
    window.onload = bgInitCallback;

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
    let originOffset = getOffset(this.element),
        originWidth = this.element.clientWidth,
        originHeight = this.element.clientHeight;
    
    this.styleObserver = new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        if (originOffset.top !== this.element.offsetTop
            || originOffset.left !== this.element.offsetLeft) {
          Styler.alignCardBackground(
            this.element,
            this.bgElement,
            this.cardBgStyle,
            this.options.filterValue
          );
        }

        let height = this.element.clientHeight,
            width = this.element.clientWidth;
        
        if (originHeight !== height || originWidth !== width) {
          originWidth = width;
          originHeight = height;
          Styler.cardBgInit(
            this.element,
            this.bgElement,
            this.cardBgStyle,
            this.options.filterValue,
            Styler.alignCardBackground
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
  }

  /**
   * Change amount of blur
   * 
   * @public
   * @param {number} filterValue - Amount of blur.
   */
  blur(filterValue) {
    this.options.filterValue = filterValue;
    Styler.cardBgInit(
      this.element,
      this.bgElement,
      this.cardBgStyle,
      this.options.filterValue,
      Styler.alignCardBackground
    );
  }
}

export {Translucent};
