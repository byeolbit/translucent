export const isElement = (el) => {
  return el instanceof HTMLElement;
}


/**
  * Get HTMLElement from selector or HTMLElement
  * @param {string|HTMLElement} element Selector or element
  * @return {HTMLElement}
  */
 export const getElement = (element) => {
  // case of HTMLElement
  let _element = element;

  // case of selector
  if (typeof element === 'string') {
    _element = document.querySelector(element);
  }

  if (isElement(_element)) {
    return _element;
  } else {
    throw `element: ${element} is not exists`;
  }
}

export const STYLE_SHEET =
`.tl-card-container {
    border: rgba(200,200,200,0.5) solid 1px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    transition: box-shadow 0.4s ease;
  }

  .tl-card-bg-container {
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  } 

  .tl-card-contents {
    overflow: hidden;
    position: relative;
    border-radius: 10px;
  }`;

export const COLOR = {
  CLEAR: 'rgba(255,255,255,0)',
  WHITE: 'rgba(255,255,255,0.4)',
  GREY: 'rgba(120,120,120,0.4)',
  BLACK: 'rgba(30,30,30,0.7)'
}

/**
 * Get original size of image
 * 
 * @private
 * @param {string} bgUrl - Url of image
 * @return {object} - Return original width and height
 */
export const getOriginSize = (bgUrl) => {
  bgUrl = bgUrl.slice(4, -1).replace(/"/g, "");

  let newImage = new Image();
  newImage.setAttribute('src', bgUrl);
  
  return { 
    width: newImage.naturalWidth,
    height: newImage.naturalHeight,
    src: bgUrl
  };
};

/**
 * Get pixel size of background-image from cover and percent.
 * 
 * @private
 * @param {HTMLElement} bgElement - Element that has background.
 * @param {string} url - Url of background-image.
 * @param {string} size - CSS background-size property.
 * @param {function} getOriginSize - Callback to get natural size
 * @return {string} - Size changed into pixel.
 */
export const getPixelSize = (bgElement, url, size, getOriginSize) => {
  let bgUrl = bgElement.style.backgroundImage,
      originSize = getOriginSize(bgUrl),
      bgHeight = bgElement.clientHeight,
      bgWidth = bgElement.clientWidth;

  if (size === 'cover') {
    bgWidth = originSize.width * (bgHeight/originSize.height);
  } else if (size.indexOf('%') !== -1) {
    bgHeight = originSize.height * (bgWidth/originSize.width);
  } else {
    return size;
  }
  return bgWidth+'px '+bgHeight+'px';
}

/**
 * Return offset top and left of element
 * @param {HTMLElement} element 
 * @return {object}
 */
export const getOffset = (element) => {
  return {
    top: element.offsetTop,
    left: element.offsetLeft
  }
}