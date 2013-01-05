$(document).ready(function() {

    var $sonic = $('#sonic'),
        lastKeyDown = null;

    $sonic.phantascope({
        fps: 12,
        layout: [11,10,10,8,8,6],
        animationPoints: [
            [7,1],
            [11,1]
        ],
        loop: "*",
        autoStart: true
    });

    $('body').keydown(function(e) {
        //$sonic.phantascope("pause");
        if(lastKeyDown != e.keyCode)
        {
            console.log(e.keyCode);
            if(e.keyCode == 39) {
                $sonic.phantascope("play", {
                    animationPoints: [
                        [1,2],
                        [3,2]
                    ]
                });
            }

            lastKeyDown = e.keyCode;
        }
    });

    $('body').keyup(function(e) {
        $sonic.phantascope("play", {
            animationPoints: [
                [7,1],
                [11,1]
            ]
        });
        lastKeyDown = null;
    });



    // $(document).mousemove(function(e) {
    //     var xPercenage = e.pageX/winWidth;
    //     var fps = Math.floor((xPercenage*200)+30);
    //     $('.sprite').animatedSprite("update", {fps: fps});
    // });

});

