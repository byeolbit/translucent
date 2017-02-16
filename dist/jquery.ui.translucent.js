/* 
 * jQuery translucent 1.0.8
 * Copyright (c) 2017, Sanggyeong Jo
 * Lisensed under the MIT
 * 
 * Dependencies:
 *  jQuery >= 1.6
 * 
 * Contacts
 *  Github : github.com/byeolbit
 *  Email : info@byeolbit.com
 *          sanggyeong.jo@gmail.com
 *
 * You can find this project at https://github.com/byeolbit/translucent.js
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
         */
        init : function(){
            //Init variables
            var self = this;

            self.$element = $(self.element);
            self.$bgElement = $(self.bgElement);

            $.extend(this, self.initStructure(self.$element));
            self.setDataAttributes(self.$element);

            //Init style
            self.styleInit(self.$element,
                           self.$cardContents,
                           self.$cardContainer,
                           self.options.shadow,
                           self.options.cardColor);
            
            //Init card background
            self.cardBgInit(self.$element, self.$bgElement, self.cardBgStyle,
                          self.options.filterValue);

            $(window).resize(function() {
                self.cardBgInit(self.$element, self.$bgElement, self.cardBgStyle,
                              self.options.filterValue);
            });

            self.observeBackgroundChange();
            self.observeStyleChange();
            self.sizeChange();
            self.offsetChange();
        },

        /**
         * Generate elements to make card structure.
         * 
         * @param {jQuery} $element - target element to make card structure.
         * @return {object} - elements that created in this function.
         */
        initStructure : function($element) {
            var $cardContents = $element.find('.tl-card-contents').detach(),
                $cardBgContainer =
                    $('<div class = "tl-card-bg-container"></div>').
                    appendTo($element),
                cardBgStyle =
                    $('<div class = "tl-card-bg"></div>').
                    appendTo($cardBgContainer)[0].style,
                $cardContainer =
                    $('<div class = "tl-card-container"></div>').
                    appendTo($element);

            $cardContents.appendTo($cardContainer);

            return { $cardContents : $cardContents,
                     $cardBgContainer : $cardBgContainer,
                     cardBgStyle : cardBgStyle,
                     $cardContainer : $cardContainer };
        },

        /**
         * Attatch data attributes to target element
         * 
         * @param {jQuery} $element - Element that attach data attributes.
         */
        setDataAttributes : function($element) {
            $element.attr('data-tl-offset', this.getOffset($element));

            $element.attr('data-tl-size',
                          $element.width() + ' ' + $element.height());
        },

        /**
         * Initialize style of elements.
         * 
         * @param {jQuery} $element - Target element of this plugin.
         * @param {jQuery} $cardContents - Element that has contents.
         * @param {jQuery} $cardContainer - Container element of cardContents.
         * @param {boolean} shadow - Decides apply shadow effect.
         * @param {string} cardColor - Color of card.
         */
        styleInit : function($element, $cardContents, $cardContainer,
                             shadow, cardColor) {
            if (shadow) {
                $cardContainer.
                     css('box-shadow', '0px 20px 20px rgba(0,0,0,0.5)');
            }

            $element.children().each(function(){
                $(this).css({
                    'height': $element.height(),
                    'width': $element.width()
                });
            });

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

            $cardContents.css('background-color', cardColor);
            
            //align card content
            $cardContainer.position({
                my: 'center',
                at: 'center',
                of: $element
            });

            //escape if style exists in head
            if (document.getElementById('tl-Card-css')) return;

            var style = '<style type=\"text/css\" id="tl-Card-css">' +
                        '.tl-card-container {'+
                        'border: rgba(200,200,200,0.5) solid 1px;' +
                        'border-radius: 10px; overflow: hidden;' +
                        'position: relative; transition:' +
                        ' box-shadow 0.4s ease;} ' +
                        '.tl-card-bg-container {border-radius: 10px;' +
                        'overflow: hidden; position: relative;} ' +
                        '.tl-card-contents {overflow: hidden;' +
                        'position: relative; border-radiu: 10px;}' +
                        '</style>';

            $(style).appendTo( "head" );
        },

        /**
         * Initialize background of card
         * 
         * @param {jQuery} $element - Target element of this plugin.
         * @param {jQuery} $bgElement - Background element.
         * @param {element.style} cardBgStyle - Style of card background.
         * @param {number} filterValue - Amount of filter.
         */
        cardBgInit : function($element, $bgElement, cardBgStyle, filterValue) {
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

            if (bgSize == 'cover') {
                var naturalSize = getNaturalSize(bgImg),
                    bgHeight = $bgElement.height(),
                    bgWidth = naturalSize.width * (bgHeight/naturalSize.height);

                cardBgStyle.backgroundSize = bgWidth+'px '+bgHeight+'px';

            } else if (bgSize.indexOf('%') != -1) {
                var naturalSize = getNaturalSize(bgImg),
                    bgWidth = $bgElement.width();
                    bgHeight = naturalSize.height * (bgWidth/naturalSize.width);
                
                cardBgStyle.backgroundSize = bgWidth+'px '+bgHeight+'px';

            } else {
                cardBgStyle.backgroundSize = bgSize;
            }

            this.applyTransparent($element,
                                  $bgElement,
                                  cardBgStyle,
                                  filterValue);

            /**
             * Get original size of image
             * 
             * @param {string} bgUrl - Url of image
             * @return {object} - Return original width and height
             */
            function getNaturalSize(bgUrl) {
                bgUrl = bgUrl.slice(4, -1).replace(/"/g, "");
                bgUrl = '.'+bgUrl.substring(bgUrl.lastIndexOf('/'),
                                             bgUrl.length);

                var newImage = new Image();
                newImage.src = bgUrl;
                
                return { width: newImage.naturalWidth,
                         height: newImage.naturalHeight}
            }
        },

        /**
         * Apply translucent background to background element.
         * 
         * @param {jQuery} $element - Target element of this plugin.
         * @param {jQuery} $bgElement - Background element.
         * @param {element.style} cardBgStyle - Style of card background.
         * @param {number} filterValue - Amount of filter.
         */
        applyTransparent : function($element, $bgElement,
                                    cardBgStyle, filterValue) {
            var bgAtt = $bgElement.css('backgroundAttachment'),
                bgOffset = $bgElement.offset(),
                cardOffset = $element.offset();

            cardBgStyle.backgroundAttachment = bgAtt;

            // If background-attachment is fixed,
            // don't need to track the card offset.
            if (bgAtt == 'fixed') return;

            cardBgStyle.backgroundPosition = 
                (bgOffset.left - (cardOffset.left - filterValue)) + 'px ' +
                (bgOffset.top - (cardOffset.top - filterValue)) + 'px';
        },

        /**
         * Observe style of background.
         * Init card when it changes.
         */
        observeBackgroundChange : function() {
            var self = this,
                bgElement = self.$bgElement[0];

             var bgObserver = new MutationObserver(function(mutations) {
                 mutations.forEach(function(mutation) {
                     self.cardBgInit(self.$element,
                                     self.$bgElement,
                                     self.cardBgStyle,
                                     self.options.filterValue);
                })
             });

             var config = { attributes: true, attributeFilter: ['style'] };
             bgObserver.observe(bgElement, config);
        },

        /**
         * Observe change of size ond offset.
         * Change data attributes when it changes.
         */
        observeStyleChange : function() {
            var self = this,
                element = self.element,
                offsetData = self.$element.offset(),
                sizeHeight = self.$element.height(),
                sizeWidth = self.$element.width();

            var styleObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (self.$element.offset() !== offsetData) {
                        offsetData = self.$element.offset();
                        self.$element.attr('data-tl-offset',
                                       self.getOffset(self.$element));
                    }

                    var cHeight = self.$element.height(),
                        cWidth = self.$element.width();

                    if ((sizeHeight == cHeight) || (sizeWidth == cWidth)) {
                        sizeHeight = cHeight;
                        sizeWidth = cWidth;
                        self.$element.attr('data-tl-size',
                                           cWidth + ' ' + cHeight);
                    }
                });
            });

            var config = { attributes: true, attributeFilter: ['style'] };
            styleObserver.observe(element, config);
        },
        
        /**
         * Observe change of size.
         * Init the cardBackground for changed size.
         */
        sizeChange : function() {
            var self = this,
                element = self.$element[0];

            var sizeObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    self.cardBgInit(self.$element,
                                    self.$bgElement,
                                    self.cardBgStyle,
                                    self.options.filterValue);
                });
            });

            var sizeConfig = { attributes: true,
                               attributeFilter: ['data-tl-size'] };
            sizeObserver.observe(element, sizeConfig);
        },

        /**
         * Observe change of offset.
         * Apply translucent to Cardbackground for changed offset.
         */
        offsetChange: function() {
            var self = this;
            var element = self.$element[0];

            var offsetObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    self.applyTransparent(self.$element,
                                          self.$bgElement,
                                          self.cardBgStyle,
                                          self.options.filterValue);
                });
            });

            var offsetConfig =  {  attributes: true,
                                   attributeFilter: ['data-tl-offset'] };
            offsetObserver.observe(element, offsetConfig);
        },

        /**
         * Get the offset of target element.
         * 
         * @param {jQuery} $element - Target element to get offset.
         * @return {string} - Offset data changed to string.
         */
        getOffset : function($element){
            return $element.offset().left + '' + $element.offset().top;
        }
    });

    $.fn[pluginName] = function ( bgElement, options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Translucent( this, bgElement, options ));
            }
        });
    }
}));
