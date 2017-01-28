/* 
 * jQuery UI translucent 1.0.3
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
    $.fn.translucent = function(bgElement, options) {
        var settings = $.extend({
            filterValue: 10,
            cardColor: 'white',
            draggable: true,
            shadow: true
        }, options);

        this.each(function() {
            var cardColor = settings.cardColor,
                draggable = settings.draggable,
                filterValue = settings.filterValue,
                shadow = settings.shadow;

            var $this = $(this);

            var $card = $this.children('.tl-card'),
                $cardCt = $this.children('.tl-card-bg-container'),
                $cardCont = $card.children('.tl-card-contents'),
                $cardBg = $cardCt.children('.tl-card-bg'),
                $targetBg = $(bgElement),
                $window = $(window),
                bgAttach;

            var cssColorClear = {
                    'background-color': 'rgba(255,255,255,0)'
                },
                cssColorWhite = {
                    'background-color': 'rgba(255,255,255,0.4)'
                },
                cssColorGrey = {
                    'background-color': 'rgba(120,120,120,0.4)'
                },
                cssColorBlack = {
                    'background-color': 'rgba(30,30,30,0.7)'
                }

            $card.css({
                'border': 'rgba(200,200,200,0.5) solid 1px',
                'border-radius': '10px',
                'height': $this.height(),
                'overflow': 'hidden',
                'position': 'relative',
                'transition': 'box-shadow 0.4s ease',
                'width': $this.width()
            });

            if (shadow) {
                $card.css({
                    'box-shadow': '0px 20px 20px rgba(0,0,0,0.5)'
                });
            }

            $cardCt.css({
                'border-radius': '10px',
                'position': 'relative',
                'overflow': 'hidden'
            });

            $cardCont.css({
                'border-radiu': '10px',
                'height': $this.height(),
                'overflow': 'hidden',
                'position': 'relative',
                'width': $this.width()
            });

            cardInit();

            $card.position({
                my: 'center',
                at: 'center',
                of: this
            });

            cardInit();

            switch (cardColor) {
                case 'clear':
                    $cardCont.css(cssColorClear);
                    break;
                case 'white':
                    $cardCont.css(cssColorWhite);
                    break;
                case 'grey':
                    $cardCont.css(cssColorGrey);
                    break;
                case 'black':
                    $cardCont.css(cssColorBlack);
                    break;
                default:
                    $cardCont.css('background-color', cardColor);
            }

            //Card background reacts to change of window size
            $window.resize(function() {
                cardInit();
            });

            $this.resize(function() {
                cardInit();
            });

            if (draggable) {
                $this.css({ 'cursor': 'move' });
                $this.draggable({
                    containment: bgElement,
                    start: function(event, ui) {
                        if (shadow) {
                            $card.css({
                                'box-shadow': '0px 40px 30px rgba(0,0,0,0.7)'
                            });
                        }
                    },
                    drag: function(event, ui) {
                        applyTransparent();
                    },
                    stop: function(event, ui) {
                        if (shadow) {
                            $card.css({
                                'box-shadow': '0px 20px 20px rgba(0,0,0,0.5)'
                            });
                        }
                        applyTransparent();
                    }
                });
            }

            //Initialize card.
            function cardInit() {
                var bgImg = $targetBg.css('background-image'),
                    bgRepeat = $targetBg.css('background-repeat'),
                    bgSize = $targetBg.css('background-size'),
                    cardHeight = $this.height(),
                    cardWidth = $this.width();

                $cardBg.css('background-image', bgImg);
                $cardBg.css('background-repeat', bgRepeat);
                $cardBg.css('background-size', bgSize);
                $cardBg.css('filter', 'blur(' + filterValue + 'px)');
                $cardBg.css('margin-left', '-' + (filterValue) + 'px');
                $cardBg.css('margin-top', '-' + (filterValue) + 'px');
                $cardBg.height(cardHeight + filterValue * 2);
                $cardBg.width(cardWidth + filterValue * 2);

                applyTransparent();
            }

            // Blurred background tracks offset of card.
            function applyTransparent() {
                var bgAtt = $targetBg.css('background-attachment'),
                    bgOffset = $targetBg.offset(),
                    cardOffset = $this.offset();

                $cardBg.css('background-attachment', bgAtt);
                $cardCt.offset({
                    left: cardOffset.left + 1,
                    top: cardOffset.top +1
                });

                // If background-attachment is fixed,
                // don't need to track the card offset.
                if (bgAtt != 'fixed') {
                    $cardBg.css('background-position',
                                (bgOffset.left -
                                (cardOffset.left - filterValue)) + 'px ' +
                                (bgOffset.top -
                                (cardOffset.top - filterValue)) + 'px');
                }
            }
        });
    }
}));
