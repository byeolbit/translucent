/* 
 * TransparentCard design           
 * Sanggyeong Jo                    
 * Jan 24. 2017                     
 *                                  
 * Contacts                         
 * Github : github.com/byeolbit     
 * Email : info@byeolbit.com        
 *         sanggyeong.jo@gmail.com
 *
 * You can find this project at https://github.com/byeolbit/transparentCard
 */  

/************************************
 * Setting values                   *
 *                                  *
 * cardElement(string)              *
 *  - Id of card element            *
 * bgElement(string)                *
 *  - Id or class of background     *
 * boundaryCheck(boolean)           *
 *  - Lock a card in background     *
 * filterValue(int)                 *
 *  - Amount of blur                *
 ************************************/

var cardElement = '#t-card',
    bgElement = '.contents',
    boundaryCheck = true,
    filterValue = 10;

$(document).ready(function(){

    var $card = $(cardElement),
        $cardBg = $(cardElement + ' .card-bg'),
        $targetBg = $(bgElement),
        $window = $(window),
        bgAttach;
    
    cardInit($card, $cardBg, $targetBg, filterValue);

    //Card background reacts to change of window size
    $window.resize(function() {
        cardInit($card, $cardBg, $targetBg, filterValue);
    });

    //If you don't want drag&drop, you can delete this.
    $card.draggable({
        drag:function(event, ui){
            boundaryLimit($card, $targetBg, boundaryCheck);
            transparentCard($card, $cardBg, $targetBg, filterValue);
        },
        stop:function(event, ui){
            boundaryLimit($card, $targetBg, boundaryCheck);
        }
    });
});

//Initialize card.
function cardInit($card, $cardBg, $targetBg, filterValue){
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

    transparentCard($card, $cardBg, $targetBg, filterValue);
}

// Blurred background tracks offset of card.
function transparentCard($card, $cardBg, $targetBg, filterValue){
    var bgAtt = $targetBg.css('background-attachment'),
        bgOffset = $targetBg.offset();
        cardOffset = $card.offset(),

    $cardBg.css('background-attachment',bgAtt);

    // If background-attachment is fixed, don't need to track the card offset.
    if (bgAtt != 'fixed') {
        $cardBg.css('background-position',
                    (bgOffset.left-(cardOffset.left-filterValue))+'px '+
                    (bgOffset.top-(cardOffset.top-filterValue))+'px');
    }
}

// This prevents that card go outside of background element.
function boundaryLimit($card, $targetBg, enable){
    // If setting value is false, exit function.
    if (!enable) return;

    var cardLeft = $card.offset().left,
        cardRight = cardLeft + $card.width(),
        cardTop = $card.offset().top,
        cardBottom = cardTop + $card.height();

    var leftBoundary = $targetBg.offset().left,
        rightBoundary = leftBoundary+$targetBg.width(),
        topBoundary = $targetBg.offset().top,
        bottomBoundary = topBoundary+$targetBg.height();

    if (cardLeft <= leftBoundary) {
        $card.offset({left : leftBoundary});
    }
    
    if (cardRight >= rightBoundary) {
        $card.offset({left : rightBoundary-$card.width()});
    }
    
    if (cardTop <= topBoundary) {
        $card.offset({top : topBoundary});
    }
    
    if (cardBottom >= bottomBoundary) {
        $card.offset({top : bottomBoundary-$card.height()});
    }
}