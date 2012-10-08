(function( $ ){


    /*
     *  Private Methods
     */

     var onNextFrame = function($this) {

        var data = $this.data('animatedSprite'),
            currentColumn = data.currentPoint[0],
            currentRow = data.currentPoint[1],
            startPoint = data.startPoint,
            endPoint = data.endPoint;


        //console.log("data.currentPoint", data.currentPoint, "data.endPoint", data.endPoint);


        //end of animation
        if(currentColumn == data.endPoint[0] && currentRow == data.endPoint[1]) {

            $this.removeClass("animating");

            //check if we need to reverse
            if(data.reverseAtEnd) {
                $this.animatedSprite("play", endPoint, startPoint);
            }

            //check if we need to loop
            if(data.loop === "*" || data.currentLoopIndex < data.loop) {
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
            //is last row
            if(currentRow == data.layout.length) {
            }
            //is not last row
            else {
                //move to next row
                data.currentPoint = [1, currentRow+1];
                renderCurrentFrame($this);
                nextFrame($this);
            }
        }
        //is not end of row
        else {
            data.currentPoint = [currentColumn+1, currentRow];
            renderCurrentFrame($this);
            nextFrame($this);
        }

        $this.data('animatedSprite', data);
    };



    var renderCurrentFrame = function($this) {
        var data = $this.data('animatedSprite');
        $this.css("backgroundPosition", "-"+((data.currentPoint[0]-1)*$this.outerWidth())+"px "+((data.currentPoint[1]-1)*-$this.outerHeight())+"px");
    };


    var nextFrame = function($this) {
        var data = $this.data('animatedSprite');

        data.interval = setTimeout(function() {
            onNextFrame($this);
        }, Math.floor(1000/data.fps));
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
                        endPoint: [10,6],
                        repeat: 3,
                        reverseAtEnd: false,
                        resetAtEnd: true,
                        onComplete: function() {  }

                    }, options);

                    //data.tickTime = Math.floor(1000/data.fps);
                    data.currentLoopIndex = 1;

                    $(this).data('animatedSprite', data);

                }

                if(data.autoStart === true) {
                    $this.animatedSprite("play");
                }
            });
        },

        play : function(options) {

            var $this = $(this);
            var data = $this.data('animatedSprite');

            if(options)
                data = $.extend(data, options);

            data.currentPoint = data.startPoint;

            $(this).data('animatedSprite', data);

            if($this.hasClass("animating") === false) {

                $this.addClass("animating");

                //var tickTime = Math.floor(1000/$(this).data('animatedSprite').fps);

                nextFrame($this);

                $(this).data('animatedSprite', data);
            }
        },

        update : function(options) {

            var $this = $(this);
            var data = $this.data('animatedSprite');

            if(options)
                data = $.extend(data, options);

             $(this).data('animatedSprite', data);

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