$(document).ready(function(){
    var $c = $('#cw');
    $c.offset({left:454, top:-400});
    $c.translucent('.contents',{
        filterValue : 5,
        cardColor : 'clear',
        draggable : true,
        shadow : true
    });
});