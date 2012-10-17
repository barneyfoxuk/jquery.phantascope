$(document).ready(function() {

    $('.sprite').phantascope({
        fps: 45,
        layout: [6,6,6,6,6],
        animationPoints: [
            [1,1],
            [6,5]
        ],
        loop: "*",
        autoStart: true
    });



    // $(document).mousemove(function(e) {
    //     var xPercenage = e.pageX/winWidth;
    //     var fps = Math.floor((xPercenage*200)+30);
    //     $('.sprite').animatedSprite("update", {fps: fps});
    // });

});

