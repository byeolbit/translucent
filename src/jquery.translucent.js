/* 
 * jQuery translucent 1.0.10
 * Copyright (c) 2017, Yeonwoo Jo
 * Lisensed under the MIT
 * 
 * Dependencies:
 *  jQuery >= 1.6
 * 
 * Contacts
 *  Github : github.com/byeolbit
 *  Email : info@byeolbit.com
 *          yeonwoo.jo.92@gmail.com
 *
 * You can find this project at https://github.com/byeolbit/translucent
 */
(function(factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('jquery'), window, document);
    } else {
        factory(jQuery, window, document);
    }
  }(function($, window, document, undefined) {
    var pluginName = 'translucent',
        /**
         * Default values for plugin
         * @type {object}
         */
        defaults = {
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
            shadow: true
        };
  
    /**
     * @constructor
     * @param {string} element - Target element of this plugin.
     * @param {string} bgElement - Background element to blur.
     * @param {object} options - Option for this plugin.
     */
    function Translucent(element, bgElement, options) {
        this.element = element;
        this.bgElement = bgElement;
        this.options = $.extend({}, defaults, options);
  
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }
  
    $.extend(Translucent.prototype, {
        /**
         * Initialize plugin
         * 
         * @private
         */
        init : function(){
            //Init variables
            var self = this;
            
            self.$element = $(self.element);
            self.$bgElement = $(self.bgElement);
            
            $.extend(this, self._initStructure(self.$element));
            
            //Init style
            self._styleInit(self.$element,
                self.$cardContents,
                self.$cardContainer,
                self.options.shadow,
                self.options.cardColor);
                
            var cb_cardBgInit = function(){
                self._cardBgInit(self.$element, self.$bgElement,
                                 self.cardBgStyle,
                                 self.options.filterValue,
                                 self._alignCardBackground);
            };

            //React to window size
            $(window).resize(cb_cardBgInit);
  
            //Wait for full load of css
            $(window).bind('load',function() {
                $.each(self.$element,cb_cardBgInit);
            });
  
            self._observeBackgroundChange();
            self._observeStyleChange();
        },
  
        /**
         * This destroys plugin.
         * 
         * @public
         */
        destroy : function () {
            this.$element.unbind('destroyed',this._teardown(this));
            this.$cardBgContainer.empty().remove();
            this.$cardContents.detach().appendTo(this.$element);
            this.$cardContainer.remove();
            this._teardown(this);
        },
  
        /**
         * Tear down plugin.
         * 
         * @private
         */
        _teardown : function (self) {
            self.styleObserver.disconnect();
            self.bgObserver.disconnect();
            $('#tl-Card-css').remove();
            $.removeData(self.element, 'plugin_'+self._name);
        },
  
        /**
         * Generate elements to make card structure.
         * 
         * @private
         * @param {jQuery} $element - Target element to make card structure.
         * @return {object} - Elements that created in this function.
         */
        _initStructure : function($element) {
            var $cardContents = $element.find('.tl-card-contents').detach(),
                $cardBgContainer =
                    $('<div class = "tl-card-bg-container"></div>').
                    appendTo($element),
                $cardBg =
                    $('<div class = "tl-card-bg"></div>').
                    appendTo($cardBgContainer),
                $cardContainer =
                    $('<div class = "tl-card-container"></div>').
                    appendTo($element);
  
            $cardContents.appendTo($cardContainer);
  
            return { $cardContents : $cardContents,
                     $cardBgContainer : $cardBgContainer,
                     $cardBg : $cardBg,
                     cardBgStyle : $cardBg[0].style,
                     $cardContainer : $cardContainer };
        },
  
        /**
         * Initialize style of elements.
         * 
         * @private
         * @param {jQuery} $element - Target element of this plugin.
         * @param {jQuery} $cardContents - Element that has contents.
         * @param {jQuery} $cardContainer - Container element of cardContents.
         * @param {boolean} shadow - Decides apply shadow effect.
         * @param {string} cardColor - Color of card.
         * 
         * @return {Object} - return local functions
         */
        _styleInit : function($element, $cardContents, $cardContainer,
                              shadow, cardColor) {

            setShadow($cardContainer, shadow);
            setChildrenSize($element);
            setCardColor($cardContents, cardColor);
            setAlign($cardContainer, $element);
            setStyle();
            
            /**
             * Unify size of child elements to parent element.
             * 
             * @private
             * @param {jQuery} $e - Target element
             */
            function setChildrenSize($e) {
                var h = $e.height();
                var w = $e.width();
                $e.children().each(function(){
                    $(this).css({
                        'height': h,
                        'width': w
                    });
                });
            }

            /**
             * If shadow is true, apply shadow effect to element.
             * 
             * @private
             * @param {jQuery} $e - Target element  
             * @param {boolean} shadow - Decides shadow
             */
            function setShadow($e, shadow) {
                if (shadow) {
                    $e.css('box-shadow', 'rgba(0, 0, 0, 0.5) 0px 20px 20px');
                }
            }

            /**
             * Set the background color of element
             * 
             * @private
             * @param {jQuery} $e - Target element 
             * @param {string} cardColor - Preset color or custom style
             */
            function setCardColor($e, cardColor) {
                switch (cardColor) {
                    case 'clear':
                        cardColor = 'rgba(255,255,255,0)';
                        break;
                    case 'white':
                        cardColor = 'rgba(255,255,255,0.4)';
                        break;
                    case 'grey':
                        cardColor = 'rgba(120,120,120,0.4)';
                        break;
                    case 'black':
                        cardColor = 'rgba(30,30,30,0.7)';
                        break;
                }
                $e.css('background-color', cardColor);
            }

            /**
             * Align content to center of target element.
             * 
             * @private
             * @param {jQuery} $e - content element 
             * @param {jQuery} $of - align target
             */
            function setAlign($e, $of) {
                $e.offset({
                    top: $of.offset().top,
                    left: $of.offset().left
                });
            }

            /**
             * Add style to header
             * 
             * @private
             * @return {boolean} - If style added to header, return true
             */
            function setStyle() {
                //escape if style exists in head
                if (document.getElementById('tl-Card-css')) return false;
      
                var style = '<style type=\"text/css\" id="tl-Card-css">' +
                            '.tl-card-container {'+
                            'border: rgba(200,200,200,0.5) solid 1px;' +
                            'border-radius: 10px; overflow: hidden;' +
                            'position: relative; transition:' +
                            ' box-shadow 0.4s ease;} ' +
                            '.tl-card-bg-container {border-radius: 10px;' +
                            'overflow: hidden; position: relative;} ' +
                            '.tl-card-contents {overflow: hidden;' +
                            'position: relative; border-radius: 10px;}' +
                            '</style>';
      
                $(style).appendTo( "head" );

                return true;
            }

            return {
                setAlign: setAlign,
                setChildrenSize: setChildrenSize,
                setCardColor: setCardColor,
                setShadow: setShadow,
                setStyle: setStyle
            }
        },
  
        /**
         * Initialize background of card.
         * 
         * @private
         * @param {jQuery} $element - Target element of this plugin.
         * @param {jQuery} $bgElement - Background element.
         * @param {element.style} cardBgStyle - Style of card background.
         * @param {number} filterValue - Amount of filter.
         * @param {function} alignFunction - Function for align bg-card
         */
        _cardBgInit : function($element, $bgElement,
                               cardBgStyle, filterValue,
                               alignFunction) {
            var bgImg = $bgElement.css('background-image'),
                bgRepeat = $bgElement.css('background-repeat'),
                bgSize = $bgElement.css('background-size'),
                cardHeight = $element.height(),
                cardWidth = $element.width();
  
            cardBgStyle.cssText = 
                'background-image: ' + bgImg + '; ' +
                'background-repeat: ' + bgRepeat + '; ' +
                'filter: blur(' + filterValue + 'px); ' +
                'margin-left: -' + (filterValue) + 'px; ' +
                'margin-top: -' + (filterValue) + 'px; ' +
                'height: ' + (cardHeight + filterValue * 2) + 'px; ' +
                'width: ' + (cardWidth + filterValue * 2) + 'px;';
  
            cardBgStyle.backgroundSize = _getPixelSize($bgElement,
                                                       bgImg,
                                                       bgSize,
                                                       _getNaturalSize);
  
            alignFunction($element, $bgElement, cardBgStyle, filterValue);
  
            /**
             * Get original size of image
             * 
             * @private
             * @param {string} bgUrl - Url of image
             * @return {object} - Return original width and height
             */
            function _getNaturalSize(bgUrl) {
                bgUrl = bgUrl.slice(4, -1).replace(/"/g, "");
  
                var newImage = new Image();
                $(newImage).attr('src',bgUrl);
                
                return { width: newImage.naturalWidth,
                         height: newImage.naturalHeight,
                         src: bgUrl };
            }
  
            /**
             * Get pixel size of background-image from cover and percent.
             * 
             * @private
             * @param {jQuery} $bgElement - Element that has background.
             * @param {string} url - Url of background-image.
             * @param {string} size - CSS background-size property.
             * @param {function} getNaturalSize - Function to get natural size
             * @return {string} - Size changed into pixel.
             */
            function _getPixelSize($bgElement, url, size, getNaturalSize) {
                var bgUrl = $bgElement.css('background-image'),
                    naturalSize = getNaturalSize(bgUrl),
                    bgHeight = $bgElement.height(),
                    bgWidth = $bgElement.width();
  
                if (size === 'cover') {
                    bgWidth = naturalSize.width * (bgHeight/naturalSize.height);
                } else if (size.indexOf('%') !== -1) {
                    bgHeight = naturalSize.height * (bgWidth/naturalSize.width);
                } else {
                    return size;
                }
                return bgWidth+'px '+bgHeight+'px';
            }
        },
  
        /**
         * Align translucent background element.
         * 
         * @private
         * @param {jQuery} $element - Target element of this plugin.
         * @param {jQuery} $bgElement - Background element.
         * @param {element.style} cardBgStyle - Style of card background.
         * @param {number} filterValue - Amount of filter.
         */
        _alignCardBackground : function($element, $bgElement,
                                        cardBgStyle, filterValue) {
            var bgAtt = $bgElement.css('backgroundAttachment'),
                bgOffset = $bgElement.offset(),
                cardOffset = $element.offset();
  
            cardBgStyle.backgroundAttachment = bgAtt;
  
            // If background-attachment is fixed,
            // don't need to track the card offset.
            if (bgAtt === 'fixed') return;
  
            cardBgStyle.backgroundPosition = 
                (bgOffset.left - (cardOffset.left - filterValue)) + 'px ' +
                (bgOffset.top - (cardOffset.top - filterValue)) + 'px';
        },
  
        /**
         * Observe style of background.
         * Init card when it changes.
         * 
         * @private
         */
        _observeBackgroundChange : function() {
            var self = this,
                bgElement = self.$bgElement[0];
  
             self.bgObserver = new MutationObserver(function(mutations) {
                 mutations.forEach(function(mutation) {
                     self._cardBgInit(self.$element,
                                      self.$bgElement,
                                      self.cardBgStyle,
                                      self.options.filterValue,
                                      self._alignCardBackground);
                });
             });
  
             var config = { attributes: true, attributeFilter: ['style'] };
             self.bgObserver.observe(bgElement, config);
        },
  
        /**
         * Observe change of size ond offset.
         * Change style of card when it changes.
         * 
         * @private
         */
        _observeStyleChange : function() {
            var self = this,
                element = self.element,
                offsetData = self.$element.offset(),
                sizeHeight = self.$element.height(),
                sizeWidth = self.$element.width();
  
            self.styleObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (offsetData !== self.$element.offset()) {
                        offsetData = self.$element.offset();
                        self._alignCardBackground(self.$element,
                                                  self.$bgElement,
                                                  self.cardBgStyle,
                                                  self.options.filterValue);
                    }
  
                    var cHeight = self.$element.height(),
                        cWidth = self.$element.width();
  
                    if ((sizeHeight === cHeight) || (sizeWidth === cWidth)) {
                        sizeHeight = cHeight;
                        sizeWidth = cWidth;
                        self._cardBgInit(self.$element,
                                         self.$bgElement,
                                         self.cardBgStyle,
                                         self.options.filterValue,
                                         self._alignCardBackground);
                    }
                });
            });
  
            var config = { attributes: true,
                           childList: true,
                           characterData: true,
                           attributeFilter: ['style'] };
            self.styleObserver.observe(element, config);
        },
  
        /**
         * Change amount of blur
         * 
         * @public
         * @param {number} filterValue - Amount of blur.
         */
        blur : function(filterValue) {
            var self = this;
            this.options.filterValue = filterValue;
  
            self._cardBgInit(self.$element,
                             self.$bgElement,
                             self.cardBgStyle,
                             self.options.filterValue,
                             self._alignCardBackground);
        }
    });
  
    /**
     * Register plugin within jQuery plugins.
     */
    $.fn[pluginName] = function ( options ) {
        var args = arguments;
  
        if ((args[1] === undefined ||
            typeof args[1] === 'object') &&
            options[0] === '#'){
            return this.each(function () {
                //This prevents multiple plugin instanciation.
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName,
                        new Translucent( this, args[0], args[1] ));
                }
            });
        }
        //This prevents call private functions(Functions start with '_').
        else if (typeof options === 'string' &&
                   options[0] !== '_' &&
                   options !== 'init') {
            return this.each(function() {
                var instance = $.data(this, 'plugin_' + pluginName),
                    slicedArgs = Array.prototype.slice.call(args, 1);
  
                if (instance instanceof Translucent &&
                    typeof instance[options] === 'function') {
                    instance[options].apply(instance, slicedArgs);
                }
            });
        } 
    };
  }));
  