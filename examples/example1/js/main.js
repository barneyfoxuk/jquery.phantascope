(function($) {
    $.fn.clickToggle = function(func1, func2) {
        var funcs = [func1, func2];
        this.data('toggleclicked', 0);
        this.click(function() {
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };
}(jQuery));

$(document).ready(function() {

    var $sprites,
        winWidth = $(window).width()-80,
        winHeight = $(window).height()-80;

    for(var i = 0; i < 10; i++) {
        $('body').append('<div class="sprite" style="left: '+Math.floor(Math.random()*winWidth)+'px; top: '+Math.floor(Math.random()*winHeight)+'px;"></div>');
    }

    $sprites = $('.sprite');

    $.each($sprites, function(i,n) {
        if(i%2 === 0) {
           $(n).phantascope({
                fps: Math.floor(Math.random()*100)+30,
                animationPoints: [
                    [1,1],
                    [8,4]
                ],
                layout: [8, 8, 8, 8],
                loop: "*",
                autoStart: true,
                resetAtEnd: true
            });
       } else {
            $(n).phantascope({
                fps: Math.floor(Math.random()*100)+30,
                animationPoints: [
                    [8,4],
                    [1,1]
                ],
                layout: [8, 8, 8, 8],
                loop: "*",
                autoStart: true,
                resetAtEnd: true
            });
       }

    });

    $sprites.clickToggle(function() {
        $(this).phantascope("pause");
    }, function() {
        $(this).phantascope("play");
    });

});

