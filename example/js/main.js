$(document).ready(function() {

    $('#sprite').animatedSprite({
        fps: 6,
        totalFrames: 6,
        loop: 1000,
        autoStart: true,
        resetAtEnd: true
    });


    //navigation
    $(document).keydown(function(e){
        //right
        if (e.keyCode == 39) {
            $('#sprite').animatedSprite("play");
            var left = parseInt($('#sprite').css('left'));
            left+=35;
            console.log(left);
            $('#sprite').animate({left: left}, 1000, "linear");
        }
    });

});

