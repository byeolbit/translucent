$(document).ready(function(){
    var $card = $('#t-card'),
        $cardBg = $('#t-card .card-bg'),
        $targetBg = $('.contents'),
        bgAttach = false;
        boundaryCheck = true;
        filterValue = 10; //this decides amount of blur
    
    var $bBg = $('#bBg'),
        $bBlur = $('#bBlur'),
        $bFix = $('#bFix'),
        $bTog = $('#bTog'),
        $bNum = $('#bNum');

    var bgImages = ['url("https://upload.wikimedia.org/wikipedia/commons/6/64/ChicagoFromCellularField.jpg")',
                    'url("http://www.chicagosouthloophotel.com/resourcefiles/homeimages/chicago-south-loop-hotel-home1-top.jpg")',
                    'url("http://blog.bestamericanpoetry.com/.a/6a00e54fe4158b8833019aff11d17e970c-pi")'
                    ];
    
    $bNum.attr('placeholder',filterValue);

    $bBlur.click(function(){
        filterValue = $bNum.val();
        cardInit($card, $cardBg, $targetBg, filterValue);
        transparentCard($card, $cardBg, $targetBg, filterValue);
    });

    $bBg.click(function(){
        $targetBg.css('background',bgImages[Math.floor((Math.random() * 10))%3]);
        cardInit($card, $cardBg, $targetBg, filterValue);
        transparentCard($card, $cardBg, $targetBg, filterValue);
    });

    $bFix.click(function(){
        if (!bgAttach){
            $targetBg.css('background-attachment','fixed');
            $cardBg.css('background-position',($targetBg.css('background-position')));
            $bFix.text('bgFixOff');
        }
        else {
            $targetBg.css('background-attachment','inherit');
            $bFix.text('bgFixOn');
        }
        
        bgAttach = !bgAttach;
        
        cardInit($card, $cardBg, $targetBg, filterValue);
        transparentCard($card, $cardBg, $targetBg, filterValue);
    });

    $bTog.click(function(){
        if (boundaryCheck)
            $bTog.text('boundaryOn');
        else
            $bTog.text('boundaryOff');

        boundaryCheck = !boundaryCheck;
        boundaryLimit($card, $targetBg, boundaryCheck);
        transparentCard($card, $cardBg, $targetBg, filterValue);
    });

    var $cb1 = $('#cb1'),
        $cb2 = $('#cb2'),
        $cb3 = $('#cb3'),
        $cb4 = $('#cb4'),
        $cc = $('.card-contents');

    $cb1.click(function(){
        $cc.css('background-color','rgba(255,255,255,0.4)');
    });
    $cb2.click(function(){
        $cc.css('background-color','rgba(120,120,120,0.4)');
    });
    $cb3.click(function(){
        $cc.css('background-color','rgba(30,30,30,0.7)');
    });
    $cb4.click(function(){
        $cc.css('background-color','rgba(0,0,0,0)');
    });


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
        bgOffset = $targetBg.offset(),
        cardOffset = $card.offset();

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