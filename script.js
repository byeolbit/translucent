$(document).ready(function(){
    var $card = $('#t-card'),
        $cardBg = $('#t-card .card-bg'),
        filterValue = 10; //this decides amount of blur
    
    transparentCard($card, $cardBg, filterValue);

    var $window = $(window);
    $window.resize(function() {
        transparentCard($card, $cardBg, filterValue);
    });

    $card.draggable({
        drag:function(event, ui){
            transparentCard($card, $cardBg, filterValue);
        }
    });

});

function transparentCard($card, $cardBg, filterValue){

    var cardWidth = $card.width(),
        cardHeight = $card.height(),
        cardOffset = $card.offset(),
        $body = $('body'), //because target backround-img is in body
        bgImg = $body.css('background-image'),
        bgSize = $body.css('background-size');

    //When using blur filter, edge of background become fade.
    //So, solution is making bigger background area and adjust offset to hide edges.
    $cardBg.width(cardWidth+filterValue*2);
    $cardBg.height(cardHeight+filterValue*2);
    $cardBg.css('background-image',bgImg);
    $cardBg.css('background-size',bgSize);
    $cardBg.css('background-position','-'+(cardOffset.left-filterValue)+'px -'+(cardOffset.top-filterValue)+'px');
    $cardBg.css('margin-left','-'+(filterValue)+'px');
    $cardBg.css('margin-top','-'+(filterValue)+'px');
    $cardBg.css('filter','blur('+filterValue+'px)');
}
