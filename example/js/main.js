$(document).ready(function() {

    var winWidth = $(window).width();

    $.each($('.sprite'), function(i,n) {
        $(n).animatedSprite({
            fps: 30,
            startPoint: [1,1],
            endPoint: [8,4],
            layout: [8, 8, 8, 8],
            loop: "*",
            autoStart: true,
            resetAtEnd: true
        })
    });

    //$('#sprite').animatedSprite("play", {startPoint: [1,2], endPoint: [6,2]});

    $(document).mousemove(function(e) {
        var xPercenage = e.pageX/winWidth;
        var fps = Math.floor((xPercenage*200)+30);
        $('.sprite').animatedSprite("update", {fps: fps});
    });

});

