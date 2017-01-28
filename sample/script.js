$(document).ready(function(){
    var $c = $('#cw');
    $c.position({
        my: 'center',
        at: 'center',
        of: '#bgEl'
    });
    $c.translucent('#bgEl',{
        filterValue : 5,
        cardColor : 'white',
        draggable : true,
        shadow : true
    });
});