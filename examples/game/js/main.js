$(document).ready(function() {


    var $wrapper = $('#game-example-wrapper'),
        $character = $('#character'),
        currentKeyDown = null,
        moveInterval,
        //each animation object is a set of Phantascope options we parse to the 'play' method
        animations = {
            'stopped': {
                animationPoints: [
                    [1,2]
                ],
                loop: '1'
            },
            'teleportIn': {
                animationPoints: [
                    [1,1],
                    [17,1]
                ],
                loop: 1,
                onComplete: null
            },
            'running': {
                animationPoints: [
                    [7,7],
                    [17,7]
                ],
                loop: '*'
            },
            'climb': {
                animationPoints: [
                    [2,5],
                    [7,5]
                ],
                loop: '*'
            },
            'teleport': {
                animationPoints: [
                    [1,6],
                    [17,6]
                ],
                loop: 1,
                onComplete: function() {
                    $character.css('left', Math.floor(Math.random()*($wrapper.width()-$character.width())));
                    $character.css('top', Math.floor(Math.random()*($wrapper.height()-$character.height())));
                    setTimeout(function() {
                        animateCharacter('teleportIn');
                    }, 500);
                }
            }
        };


    var animateCharacter = function(state) {
        $character.phantascope("play", animations[state]);
    };


    $('body').keydown(function(e) {

        e.preventDefault();

        if(e.keyCode != currentKeyDown) {
            currentKeyDown = e.keyCode;
            clearInterval(moveInterval);
            //right arrow
            if(e.keyCode == 39) {
                //$character.css('left', '+=1');
                //$character.css('left', $character.css('left')+2);
                $character.removeClass('left');
                animateCharacter('running');

                moveInterval = setInterval(function() {
                    $character.css('left', '+=3');
                }, 10);
            }
            //left arrow
            if(e.keyCode == 37) {
                $character.addClass('left');
                animateCharacter('running');

                moveInterval = setInterval(function() {
                    $character.css('left', '-=3');
                }, 10);
            }
            //up arrow
            else if(e.keyCode == 38) {
                animateCharacter('climb');

                moveInterval = setInterval(function() {
                    $character.css('top', '-=3');
                }, 10);
            }
             //down arrow
            else if(e.keyCode == 40) {
                animateCharacter('teleport');
            }
        }
    });

    $('body').keyup(function(e) {
        currentKeyDown = null;

        if(e.keyCode == 39 || e.keyCode == 38 || e.keyCode == 37) {
            clearInterval(moveInterval);
            animateCharacter('stopped');
        }

    });


    // initiate plugin
    $character.phantascope({
        fps: 16,
        layout: [17,12,11,13,14,17,17,5]
    });

    animateCharacter('teleportIn');



});

