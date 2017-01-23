$(document).ready(function(){
    var $card = $('#t-card'),
        $cardBg = $('#t-card .card-bg'),
        $targetBg = $('.contents'),
        boundaryCheck = true;
        filterValue = 10; //this decides amount of blur

    cardInit($card, $cardBg, $targetBg, filterValue);
    transparentCard($card, $cardBg, $targetBg, filterValue);

    var $window = $(window);
    $window.resize(function() {
        cardInit($card, $cardBg, $targetBg, filterValue);
        transparentCard($card, $cardBg, $targetBg, filterValue);
    });

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
}

function transparentCard($card, $cardBg, $targetBg, filterValue){
    var bgAtt = $targetBg.css('background-attachment'),
        bgOffset = $targetBg.offset();
        cardOffset = $card.offset(),

    //When using blur filter, edge of background become fade.
    //So, solution is making bigger background area and adjust offset to hide edges.
    $cardBg.css('background-attachment',bgAtt);
    if (bgAtt != 'fixed')
        $cardBg.css('background-position',(bgOffset.left-(cardOffset.left-filterValue))+'px '+(bgOffset.top-(cardOffset.top-filterValue))+'px');
}

function boundaryLimit($card, $targetBg, enable){
    if (!enable) return;

    var cardLeft = $card.offset().left,
        cardRight = cardLeft + $card.width(),
        cardTop = $card.offset().top,
        cardBottom = cardTop + $card.height();

    var leftBoundary = $targetBg.offset().left,
        rightBoundary = leftBoundary+$targetBg.width(),
        topBoundary = $targetBg.offset().top,
        bottomBoundary = topBoundary+$targetBg.height();

    if (cardLeft <= leftBoundary)
        $card.offset({left : leftBoundary});
    
    if (cardRight >= rightBoundary)
        $card.offset({left : rightBoundary-$card.width()});
    
    if (cardTop <= topBoundary)
        $card.offset({top : topBoundary});
    
    if (cardBottom >= bottomBoundary)
        $card.offset({top : bottomBoundary-$card.height()});
    
}