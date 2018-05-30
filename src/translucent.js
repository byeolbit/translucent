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
   * @param {HTMLElement} element - Target element of this plugin.
   * @param {object} option - Option for this plugin.
   */
  constructor(element, option) {
    this.element = element;
    this.options = {...DEFAULTS, ...option};
    this.bgElement = options.bgElement || element.parentElement;

    this.init();
  }

  init() {
  }

  _initStructure(element) {
    // init contents
    let contents = element.innerHTML
    let cardContents = document.createElement('div');
    cardContents.setAttribute('class', 'tl-card-contents');
    cardContents.innerHTML = contents;
    
    let cardContainer = document.createElement('div');
    cardContainer.setAttribute('class', 'tl-card-contents-container');
    cardContainer.appendChild(cardContents);
    
    // init background
    let cardBg = document.createElement('div');
    cardBg.setAttribute('class', 'tl-card-bg');
    let cardBgContainer = document.createElement('div');
    cardBgContainer.setAttribute('class', 'tl-card-bg-container');
    cardBgContainer.appendChild(cardBg);
    
    element.appendChild(cardContents);

    let cardContainer = document.createElement('div');
    cardContainer.setAttribute('class', 'tl-card-container'); 
  }
}