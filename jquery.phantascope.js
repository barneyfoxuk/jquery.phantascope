/*
 * http://barneyfoxuk.github.com/jquery.phantascope/
 * jQuery plugin for animating sprite sheets
 *
 * Copyright (c) 2012 Barney Fox - http://www.barneyfox.com/
 * Licensed under the MIT license.
 */

(function( $ ){

    /*
     *  Private Methods
     */
     var calculateFrameIndex = function(layout, point) {
        var index = 0,
            col = point[0],
            row = point[1];

        for(var i = 0; i < row-1; i++) {
            index += layout[i];
        }

        index += col;
        return index;
     };

     var isPlayingForward = function(layout, currentPoint, endPoint) {
        var currentPointIndex = calculateFrameIndex(layout, currentPoint);
        var endPointIndex = calculateFrameIndex(layout, endPoint);

        if(currentPointIndex < endPointIndex) {
            return true;
        } else {
            return false;
        }
     };

     /*
      * Main bit of functionaility for the plugin.  Could do with some refactoring!
      */
     var onNextFrame = function($this) {

        var data = $this.data('phantascope'),
            currentColumn = data.currentPoint[0],
            currentRow = data.currentPoint[1],
            nextAnimationPoint = data.animationPoints[data.animationPointIndex+1];

        //check there is a next point - if not end the animation
        if(!nextAnimationPoint) {
            $this.removeClass("animating");
            if(data.onComplete)
                data.onComplete();
        }
        //if we've hit the next animation point
        else if(currentColumn == nextAnimationPoint[0] && currentRow == nextAnimationPoint[1]) {
            //if there's no more animation points its the end of the animation
            if(data.animationPointIndex == (data.animationPoints.length-2)) {
                $this.removeClass("animating");

                //check if we need to loop
                if(data.loop === "*" || data.currentLoopIndex < data.loop) {
                    data.currentLoopIndex++;
                    $this.data('phantascope', data);
                    $this.phantascope("play", {animationPoints: data.animationPoints, animationPointIndex: 0});

                } else {
                    if(data.onComplete)
                        data.onComplete();
                }

                //check if we need to reset
                if(data.resetAtEnd) {
                    data.currentPoint = data.animationPoints[0];
                    $this.data('phantascope', data);
                    renderCurrentFrame($this);
                }

            } else {
                data.animationPointIndex++;
                data.currentPoint = data.animationPoints[data.animationPointIndex];
                $this.data('phantascope', data);
                nextFrame($this);
            }
        }
        else {
            var playingForward = isPlayingForward(data.layout, data.currentPoint, nextAnimationPoint);
            var newRow;

            if(playingForward) {
                //is end of row
                if(currentColumn == data.layout[currentRow-1]) {
                    //move to next row
                    data.currentPoint = [1, currentRow+1];
                } else {
                    //move to next frame
                    data.currentPoint = [currentColumn+1, currentRow];
                }
            } else {
                //is start of row
                if(currentColumn == 1) {
                    //move to prev row
                    newRow = currentRow-1;
                    data.currentPoint = [data.layout[newRow], newRow];
                } else {
                    //move to next frame
                    data.currentPoint = [currentColumn-1, currentRow];
                }
            }

            $this.data('phantascope', data);
            renderCurrentFrame($this);
            nextFrame($this);
        }

        //console.log("data.currentPoint", data.currentPoint);


    };



    var renderCurrentFrame = function($this) {
        var data = $this.data('phantascope');
        $this.css("backgroundPosition", "-"+((data.currentPoint[0]-1)*$this.outerWidth())+"px "+((data.currentPoint[1]-1)*-$this.outerHeight())+"px");
    };


    var nextFrame = function($this) {

        var data = $this.data('phantascope');
        //console.log("nextFrame", data.currentPoint);
        data.interval = setTimeout(function() {
            onNextFrame($this);
        }, Math.floor(1000/data.fps));
    };


    /*
     *  Publice Methods
     */

    var publicMethods = {

        init: function( options ) {

            return this.each(function(){

                var $this = $(this),
                data = $this.data('phantascope');

                // If the plugin hasn't been initialized yet
                if ( !data ) {

                    //set up some defaults
                    var data = $.extend( {
                        target : $this,
                        fps: 24,
                        layout: [6],
                        animationPoints: [
                            [1,1],
                            [1,6]
                        ],
                        loop: 1,
                        autoStart: false,
                        resetAtEnd: false,
                        onComplete: null

                    }, options);

                    //data.tickTime = Math.floor(1000/data.fps);
                    data.currentLoopIndex = 1;

                    data.animationPointIndex = 0;
                    data.currentPoint = data.animationPoints[0];

                    $(this).data('phantascope', data);

                }

                if(data.autoStart === true) {
                    $this.phantascope("play");
                }
            });
        },

        play: function(options) {

            //console.log("play", options);

            var $this = $(this);
            var data = $this.data('phantascope');

            if(data.interval)
                clearInterval(data.interval);

            if(options)
                data = $.extend(data, options);

            if(options && options.animationPoints) {
                data.currentLoopIndex = 1;
                data.animationPointIndex = 0;
                data.currentPoint = data.animationPoints[0];
            }


            $this.addClass("animating");
            renderCurrentFrame($this);

            nextFrame($this);

            $(this).data('phantascope', data);
        },

        update: function(options) {

            var $this = $(this);
            var data = $this.data('phantascope');

            if(options)
                data = $.extend(data, options);

             $(this).data('phantascope', data);

        },

        gotoFrame: function(point) {

            var $this = $(this);
            var data = $this.data('phantascope');
            data.currentPoint = point;
            $(this).data('phantascope', data);
            renderCurrentFrame($this);

        },

        pause: function() {

            var $this = $(this);
            var data = $this.data('phantascope');
            clearInterval(data.interval);

        },

        stop: function() {

            var $this = $(this);
            var data = $this.data('phantascope');
            clearInterval(data.interval);
            data.animationPointIndex = 0;
            data.currentPoint = data.animationPoints[0];
            $(this).data('phantascope', data);
            renderCurrentFrame($this);

        },

        destroy: function( ) {

            return this.each(function(){

                var $this = $(this);
                $this.removeData('phantascope');

            });

        }

    };



    $.fn.phantascope = function( method ) {

        if ( publicMethods[method] ) {
            return publicMethods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return publicMethods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.phantascope' );
        }

    };

})( jQuery );