(function( $ ){


    /*
     *  Private Methods
     */

     var nextFrame2 = function($this) {

        var data = $this.data('animatedSprite'),
            currentColumn = data.currentPoint[0],
            currentRow = data.currentPoint[1],
            startPoint = data.startPoint,
            endPoint = data.endPoint;


        console.log("data.currentPoint", data.currentPoint, "data.endPoint", data.endPoint);


        //end of animation
        if(currentColumn == data.endPoint[0] && currentRow == data.endPoint[1]) {
            console.log("end of animation");

            $this.removeClass("animating");

            //check if we need to reverse
            if(data.reverseAtEnd) {
                $this.animatedSprite("play", endPoint, startPoint);
            }

            //check if we need to loop
            if(data.currentLoopIndex < data.loop) {
                console.log("we need to loop");
                data.currentLoopIndex++;
                $this.animatedSprite("play");
            }

            if(data.currentLoopIndex == data.loop && !data.reverseAtEnd) {
                data.onComplete();
            }

            //check if we need to reset
            if(data.resetAtEnd) {
                data.currentPoint = startPoint;
                renderCurrentFrame($this);
            }
        }
        //is end of row
        else if(currentColumn == data.layout[currentRow-1]) {
            console.log(data.layout[currentRow]);
            console.log("is end of row");
            //is last row
            if(currentRow == data.layout.length) {
                console.log("is last row");
            }
            //is not last row
            else {
                console.log("is not lst row");
                //move to next row
                data.currentPoint = [1, currentRow+1];
                renderCurrentFrame($this);
                bufferNextFrame($this);
            }
        }
        //is not end of row
        else {
            console.log("currentRow", currentRow);
            console.log("currentColumn", currentColumn);
            data.currentPoint = [currentColumn+1, currentRow];
            renderCurrentFrame($this);
            bufferNextFrame($this);
        }

        $this.data('animatedSprite', data);
    };

    var bufferNextFrame = function($this) {
        var data = $this.data('animatedSprite');

        data.interval = setTimeout(function() {
            nextFrame2($this);
        }, data.tickTime);
    }

    var nextFrame = function($this) {

        var data = $this.data('animatedSprite');

        if(data.currentFrame < data.totalFrames) {
            data.currentFrame++;
            renderCurrentFrame($this);
            data.interval = setTimeout(function() {
                nextFrame($this);
            }, data.tickTime);
        } else {
            if(data.repeat == data.currentLoop) {
                $this.removeClass("animating");

                if(data.resetAtEnd === true) {
                    data.currentFrame = 1;
                    renderCurrentFrame($this);
                }
            } else {
                data.currentLoop++;
                data.currentFrame = 1;
                renderCurrentFrame($this);
                data.interval = setTimeout(function() {
                    nextFrame($this);
                }, data.tickTime);
            }
        }

        $this.data('animatedSprite', data);
    };

    var renderCurrentFrame = function($this) {
        var data = $this.data('animatedSprite');
        $this.css("backgroundPosition", "-"+((data.currentPoint[0]-1)*$this.outerWidth())+"px "+((data.currentPoint[1]-1)*-$this.outerHeight())+"px");
    };



    /*
     *  Publice Methods
     */

    var publicMethods = {

        init : function( options ) {

            return this.each(function(){

                var $this = $(this),
                data = $this.data('animatedSprite')

                // If the plugin hasn't been initialized yet
                if ( !data ) {

                    /*
                         Do more setup stuff here
                    */
                    var data = $.extend( {
                        target : $this,
                        fps: 10,
                        autoStart: true,
                        layout: [6,6,2],
                        startPoint: [1,1],
                        endPoint: [6,2],
                        repeat: 3,
                        reverseAtEnd: false,
                        resetAtEnd: true,
                        onComplete: function() {  }

                    }, options);

                    data.tickTime = Math.floor(1000/data.fps);
                    data.currentLoopIndex = 1;

                    $(this).data('animatedSprite', data);

                }

                if(data.autoStart === true) {
                    $this.animatedSprite("play");
                }
            });
        },

        play : function(options) {
            console.log("play", options);

            var $this = $(this);
            var data = $this.data('animatedSprite');

            if(options)
                data = $.extend(data, options);

            data.currentPoint = data.startPoint;
            console.log(data.currentPoint);

            $(this).data('animatedSprite', data);

            if($this.hasClass("animating") === false) {


                $this.addClass("animating");

                //var tickTime = Math.floor(1000/$(this).data('animatedSprite').fps);

                data.interval = setTimeout(function() {
                    //$this.animatedSprite("nextFrame");
                    nextFrame2($this);
                }, data.tickTime);

                $(this).data('animatedSprite', data);
            }
        },

        destroy : function( ) {

            return this.each(function(){

                var $this = $(this);
                $this.removeData('animatedSprite');

            });

        }

    };



    $.fn.animatedSprite = function( method ) {

        if ( publicMethods[method] ) {
            return publicMethods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return publicMethods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.animatedSprite' );
        }

    };

})( jQuery );