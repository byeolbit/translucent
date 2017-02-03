/* 
 * jQuery UI translucent 1.0.4
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

            var $card = $this.find('.tl-card'),
                $cardCt = $this.find('.tl-card-bg-container'),
                $cardCont = $card.find('.tl-card-contents'),
                $targetBg = $(bgElement),
                $window = $(window),
                bgAttach,
                cardBgStyle = $cardCt.find('.tl-card-bg')[0].style;

            styleInit();

            cardInit();

            //Card background reacts to change of window size
            $window.resize(function() {
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

            function styleInit() {
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
                    'height': $this.height(),
                    'overflow': 'hidden',
                    'position': 'relative',
                    'width': $this.width()
                });

                $cardCont.css({
                    'border-radiu': '10px',
                    'height': $this.height(),
                    'overflow': 'hidden',
                    'position': 'relative',
                    'width': $this.width()
                });

                switch (cardColor) {
                    case 'clear':
                        $cardCont.css('background-color', 'rgba(255,255,255,0)');
                        break;
                    case 'white':
                        $cardCont.css('background-color', 'rgba(255,255,255,0.4)');
                        break;
                    case 'grey':
                        $cardCont.css('background-color', 'rgba(120,120,120,0.4)');
                        break;
                    case 'black':
                        $cardCont.css('background-color', 'rgba(30,30,30,0.7)');
                        break;
                    default:
                        $cardCont.css('background-color', cardColor);
                }
                
                $card.position({
                    my: 'center',
                    at: 'center',
                    of: $this
                });

            }

            //Initialize card.
            function cardInit() {
                var bgImg = $targetBg.css('background-image'),
                    bgRepeat = $targetBg.css('background-repeat'),
                    bgSize = $targetBg.css('background-size'),
                    cardHeight = $this.height(),
                    cardWidth = $this.width();

                cardBgStyle.cssText = 
                    'background-image: ' + bgImg + '; ' +
                    'background-repeat: ' + bgRepeat + '; ' +
                    'background-size: ' + bgSize + '; ' +
                    'filter: blur(' + filterValue + 'px); ' +
                    'margin-left: -' + (filterValue) + 'px; ' +
                    'margin-top: -' + (filterValue) + 'px; ' +
                    'height: ' + (cardHeight + filterValue * 2) + 'px; ' +
                    'width: ' + (cardWidth + filterValue * 2) + 'px;';

                applyTransparent();
            }

            // Blurred background tracks offset of card.
            function applyTransparent() {
                var bgAtt = $targetBg.css('background-attachment'),
                    bgOffset = $targetBg.offset(),
                    cardOffset = $this.offset();

                cardBgStyle.backgroundAttachment = bgAtt+'';
                // If background-attachment is fixed,
                // don't need to track the card offset.
                if (bgAtt != 'fixed') {
                    cardBgStyle.backgroundPosition = 
                                (bgOffset.left -
                                (cardOffset.left - filterValue)) + 'px ' +
                                (bgOffset.top -
                                (cardOffset.top - filterValue)) + 'px';
                }
            }
        });
    }
}));