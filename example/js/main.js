$(document).ready(function() {

    var winWidth = $(window).width(),
        winHeight = $(window).height();

    for(var i = 0; i < 10; i++) {
        $('body').append('<div class="sprite" style="left: '+Math.floor(Math.random()*winWidth)+'px; top: '+Math.floor(Math.random()*winHeight)+'px;"></div>');
    };

    $.each($('.sprite'), function(i,n) {
        if(i%2 == 0) {
           $(n).animatedSprite({
                fps: Math.floor(Math.random()*100)+30,
                startPoint: [8,4],
                endPoint: [1,1],
                layout: [8, 8, 8, 8],
                loop: "*",
                autoStart: true,
                resetAtEnd: true
            });
       } else {
            $(n).animatedSprite({
                fps: Math.floor(Math.random()*100)+30,
                startPoint: [1,1],
                endPoint: [8,4],
                layout: [8, 8, 8, 8],
                loop: "*",
                autoStart: true,
                resetAtEnd: true
            });
       }

    });

    //$('#sprite').animatedSprite("play", {startPoint: [1,2], endPoint: [6,2]});




    // $(document).mousemove(function(e) {
    //     var xPercenage = e.pageX/winWidth;
    //     var fps = Math.floor((xPercenage*200)+30);
    //     $('.sprite').animatedSprite("update", {fps: fps});
    // });

});

