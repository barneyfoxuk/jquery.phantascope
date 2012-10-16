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

     var onNextFrame = function($this) {

        var data = $this.data('phantascope'),
            currentColumn = data.currentPoint[0],
            currentRow = data.currentPoint[1],
            startPoint = data.startPoint,
            endPoint = data.endPoint;


        //console.log("data.currentPoint", data.currentPoint, "data.endPoint", data.endPoint);


        //end of animation
        if(currentColumn == data.endPoint[0] && currentRow == data.endPoint[1]) {

            $this.removeClass("animating");

            //check if we need to loop
            if(data.loop === "*" || data.currentLoopIndex < data.loop) {
                data.currentLoopIndex++;
                $this.phantascope("play");
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
        else {
            var playingForward = isPlayingForward(data.layout, data.currentPoint, data.endPoint);
            var newRow;

            if(playingForward) {
                //is end of row
                if(currentColumn == data.layout[currentRow-1]) {
                    //move to next row
                    data.currentPoint = [1, currentRow+1];
                    renderCurrentFrame($this);
                    nextFrame($this);
                } else {
                    data.currentPoint = [currentColumn+1, currentRow];
                    renderCurrentFrame($this);
                    nextFrame($this);
                }
            } else {
                //is start of row
                if(currentColumn == 1) {
                    //move to prev row
                    newRow = currentRow-1;
                    data.currentPoint = [data.layout[newRow], newRow];
                    renderCurrentFrame($this);
                    nextFrame($this);
                } else {
                    data.currentPoint = [currentColumn-1, currentRow];
                    renderCurrentFrame($this);
                    nextFrame($this);
                }
            }


        }

        //console.log("data.currentPoint", data.currentPoint);

        $this.data('phantascope', data);
    };



    var renderCurrentFrame = function($this) {
        var data = $this.data('phantascope');
        $this.css("backgroundPosition", "-"+((data.currentPoint[0]-1)*$this.outerWidth())+"px "+((data.currentPoint[1]-1)*-$this.outerHeight())+"px");
    };


    var nextFrame = function($this) {
        var data = $this.data('phantascope');

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
                data = $this.data('phantascope')

                // If the plugin hasn't been initialized yet
                if ( !data ) {

                    /*
                         Do more setup stuff here
                    */
                    var data = $.extend( {
                        target : $this,
                        fps: 24,
                        autoStart: true,
                        layout: [6],
                        startPoint: [1,1],
                        endPoint: [1,6],
                        repeat: 1,
                        resetAtEnd: true,
                        onComplete: function() {  }

                    }, options);

                    //data.tickTime = Math.floor(1000/data.fps);
                    data.currentLoopIndex = 1;

                    $(this).data('phantascope', data);

                }

                if(data.autoStart === true) {
                    $this.phantascope("play");
                }
            });
        },

        play: function(options) {

            var $this = $(this);
            var data = $this.data('phantascope');

            if(options)
                data = $.extend(data, options);

            //console.log(data);

            data.currentPoint = data.startPoint;

            $(this).data('phantascope', data);

            if($this.hasClass("animating") === false) {

                $this.addClass("animating");

                //var tickTime = Math.floor(1000/$(this).data('phantascope').fps);

                nextFrame($this);

                $(this).data('phantascope', data);
            }
        },

        update: function(options) {

            var $this = $(this);
            var data = $this.data('phantascope');

            if(options)
                data = $.extend(data, options);

             $(this).data('phantascope', data);

        },

        gotoFrame: function(point) {
            console.log("gotoFrame");
            var $this = $(this);
            var data = $this.data('phantascope');
            data.currentPoint = point;
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