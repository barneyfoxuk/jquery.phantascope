$(document).ready(function() {

    $('#sprite').animatedSprite({
        fps: 6,
        startPoint: [1,1],
        endPoint: [6,1],
        loop: 3,
        autoStart: false,
        resetAtEnd: true
    });

    $('#sprite').animatedSprite("play", {startPoint: [1,2], endPoint: [6,2]});

    //navigation
    $(document).keydown(function(e){
        //right
        if (e.keyCode == 39) {


            var left = parseInt($('#sprite').css('left'));
            left+=35;
            console.log(left);
            $('#sprite').animate({left: left}, 1000, "linear");
        }
    });

});

