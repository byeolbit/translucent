/* 
 * jQuery UI translucent 1.0.7
 * Copyright (c) 2017, Sanggyeong Jo
 * Lisensed under the MIT
 * 
 * Dependencies:
 *  jQuery >= 1.6
 *  jQuery.ui.core >= 1.10.0
 *  jQuery.ui.widget >= 1.10.0
 *  jQuery.ui.mouse >=1.10.0
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
        defaults = {
            filterValue: 10,
            cardColor: 'white',
            shadow: true
        };

    function Translucent(element, bgElement, options) {
        this.element = element;
        this.bgElement = bgElement;
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(Translucent.prototype, {
        init : function(){
            //Init variables
            var self = this;

            self.$element = $(self.element);
            self.$bgElement = $(self.bgElement);

            self.initStructure(self.$element);
            self.setDataAttributes(self.$element);
            //Init style
            self.styleInit(self.$element,
                           self.$cardContents,
                           self.$cardContainer,
                           self.options.shadow,
                           self.options.cardColor);
            
            //Init card background
            self.cardInit(self.$element, self.$bgElement, self.cardBgStyle,
                          self.options.filterValue);

            $(window).resize(function() {
                self.cardInit(self.$element, self.$bgElement, self.cardBgStyle,
                              self.options.filterValue);
            });

            self.observeStyleChange();
            self.sizeChange();
            self.offsetChange();
        },

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

            $.extend(this, { $cardContents : $cardContents,
                             $cardBgContainer : $cardBgContainer,
                             cardBgStyle : cardBgStyle,
                             $cardContainer : $cardContainer });
        },

        setDataAttributes : function($element) {
            $element.attr('data-tl-offset', this.getOffset($element));

            $element.attr('data-tl-size',
                          $element.width() + ' ' + $element.height());
        },

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

        cardInit : function($element, $bgElement, cardBgStyle, filterValue) {

            var bgImg = $bgElement.css('background-image'),
                bgRepeat = $bgElement.css('background-repeat'),
                bgSize = $bgElement.css('background-size'),
                cardHeight = $element.height(),
                cardWidth = $element.width();

            cardBgStyle.cssText = 
                'background-image: ' + bgImg + '; ' +
                'background-repeat: ' + bgRepeat + '; ' +
                'background-size: ' + bgSize + '; ' +
                'filter: blur(' + filterValue + 'px); ' +
                'margin-left: -' + (filterValue) + 'px; ' +
                'margin-top: -' + (filterValue) + 'px; ' +
                'height: ' + (cardHeight + filterValue * 2) + 'px; ' +
                'width: ' + (cardWidth + filterValue * 2) + 'px;';

            this.applyTransparent($element,
                                  $bgElement,
                                  cardBgStyle,
                                  filterValue);
        },

        applyTransparent : function($el, $bgEl, cardBgStyle, filterValue) {
            var bgAtt = $bgEl.css('backgroundAttachment'),
                bgOffset = $bgEl.offset(),
                cardOffset = $el.offset();

            cardBgStyle.backgroundAttachment = bgAtt;

            // If background-attachment is fixed,
            // don't need to track the card offset.
            if (bgAtt == 'fixed') return;

            cardBgStyle.backgroundPosition = 
                (bgOffset.left - (cardOffset.left - filterValue)) + 'px ' +
                (bgOffset.top - (cardOffset.top - filterValue)) + 'px';
        },

        observeStyleChange : function() {
            var self = this,
                element = self.$element[0],
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

            styleObserver.observe(element, { attributeFilter: ['style'] });
        },
        
        sizeChange : function() {
            var self = this,
                element = self.$element[0];

            var sizeObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    self.cardInit(self.$element,
                                  self.$bgElement,
                                  self.cardBgStyle,
                                  self.options.filterValue);
                });
            });

            var sizeConfig = { attributeFilter: ['data-tl-size'] };

            sizeObserver.observe(element, sizeConfig);
        },

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

            var offsetConfig =  { attributeFilter: ['data-tl-offset'] };

            offsetObserver.observe(element, offsetConfig);
        },

        getOffset : function($el){
            return $el.offset().left + '' + $el.offset().top;
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
