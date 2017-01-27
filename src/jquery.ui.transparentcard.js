/* 
 * jQuery UI TransparentCard 0.1
 * Copyright 2017, Sanggyeong Jo
 * Lisensed under the MIT
 * 
 * Dependencies:
 *  jQuery >= 1.6
 *  jQuery.ui.core
 *  jQuery.ui.widget
 *  jQuery.ui.mouse
 * 
 * Contacts
 *  Github : github.com/byeolbit
 *  Email : info@byeolbit.com
 *          sanggyeong.jo@gmail.com
 *
 * You can find this project at https://github.com/byeolbit/transparentCard
 */

(function($){ 
    $.fn.transparentCard = function(bgElement, options){
        var settings = $.extend({
            filterValue : 10,
            cardColor : 'white',
            draggable : true,
            shadow : true
        }, options);

        this.each( function() {
            var $this = $(this),
                filterValue = settings.filterValue,
                cardColor = settings.cardColor,
                draggable = settings.draggable,
                shadow = settings.shadow;

            var $card = $this.children('.tpc-card'),
                $cardCt = $this.children('.tpc-card-background-container'),
                $cardCont = $card.children('.tpc-card-contents'),
                $cardBg =  $cardCt.children('.tpc-card-bg'),
                $targetBg = $(bgElement),
                $window = $(window),
                bgAttach;
            
            var cssColorClear = {
                    'background-color' : 'rgba(255,255,255,0)'
                },
                cssColorWhite = {
                    'background-color' : 'rgba(255,255,255,0.4)'
                },
                cssColorGrey = {
                    'background-color' : 'rgba(120,120,120,0.4)'
                },
                cssColorBlack = {
                    'background-color' : 'rgba(30,30,30,0.7)'
                }

            $card.css({
                'border': 'rgba(200,200,200,0.5) solid 1px',
                'border-radius' : '10px',
                'overflow' : 'hidden',
                'position' : 'relative',
                'transition' : 'box-shadow 0.4s ease',
            });

            if (shadow){
                $card.css({
                    'box-shadow' : '0px 20px 20px rgba(0,0,0,0.5)'
                });
            }

            $cardCt.css({
                'border-radius': '10px',
                'position': 'relative',
                'overflow': 'hidden'
            });

            $cardCont.css({
                'border-radiu' : '10px',
                'height' : $card.height(),
                'position' : 'relative',
                'width' : $card.width(),
                'overflow' : 'hidden'
            });

            $card.offset({left:500, top:30});

            cardInit($card, $cardBg, $cardCt, $targetBg, filterValue);

            switch (cardColor) {
                case 'clear' :
                    $cardCont.css(cssColorClear);
                    break;
                case 'white' :
                    $cardCont.css(cssColorWhite);
                    break;
                case 'grey' :
                    $cardCont.css(cssColorGrey);
                    break;
                case 'black' :
                    $cardCont.css(cssColorBlack);
                    break;
                default :
                    $cardCont.css('background-color',cardColor);
            }

            //Card background reacts to change of window size
            $window.resize(function() {
                cardInit($card, $cardBg, $cardCt, $targetBg, filterValue);
            });

            if (draggable){
                $card.css({'cursor' : 'move'});
                $card.draggable({
                    containment:bgElement,
                    start:function(event,ui){
                        if (shadow){
                            $card.css({
                                'box-shadow' : '0px 40px 30px rgba(0,0,0,0.7)'
                            });
                        }
                    },
                    drag:function(event, ui){
                        applyTransparent($card, $cardBg, $cardCt,
                                         $targetBg, filterValue);
                    },
                    stop:function(event, ui){
                        if (shadow){
                            $card.css({
                                'box-shadow' : '0px 40px 30px rgba(0,0,0,0.7)'
                            });
                        }
                        applyTransparent($card, $cardBg, $cardCt,
                                         $targetBg, filterValue);
                    }
                });
            }

            //Initialize card.
            function cardInit($card, $cardBg, $cardCt, $targetBg, filterValue){
                var bgImg = $targetBg.css('background-image'),
                    bgRepeat = $targetBg.css('background-repeat'),
                    bgSize = $targetBg.css('background-size'),
                    cardHeight = $card.height(),
                    cardWidth = $card.width();

                $cardBg.css('background-image',bgImg);
                $cardBg.css('background-repeat',bgRepeat);
                $cardBg.css('background-size',bgSize);
                $cardBg.css('filter','blur('+filterValue+'px)');
                $cardBg.css('margin-left','-'+(filterValue)+'px');
                $cardBg.css('margin-top','-'+(filterValue)+'px');
                $cardBg.height(cardHeight+filterValue*2);
                $cardBg.width(cardWidth+filterValue*2);

                applyTransparent($card, $cardBg, $cardCt,
                                 $targetBg, filterValue);
            }

            // Blurred background tracks offset of card.
            function applyTransparent($card, $cardBg, $cardCt, 
                                      $targetBg, filterValue){
                var bgAtt = $targetBg.css('background-attachment'),
                    bgOffset = $targetBg.offset();
                    cardOffset = $card.offset(),

                $cardCt.offset({left:cardOffset.left+1,top:cardOffset.top+1});
                $cardBg.css('background-attachment',bgAtt);

                // If background-attachment is fixed,
                // don't need to track the card offset.
                if (bgAtt != 'fixed') {
                    $cardBg.css('background-position',
                                (bgOffset.left-
                                (cardOffset.left-filterValue))+'px '+
                                (bgOffset.top-
                                (cardOffset.top-filterValue))+'px');
                }
            }
        });
    }
}(jQuery));