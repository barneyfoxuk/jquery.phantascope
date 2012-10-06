(function( $ ){

    var methods = {

        init : function( options ) {

            return this.each(function(){

                var $this = $(this),
                data = $this.data('animatedSprite')

                // If the plugin hasn't been initialized yet
                if ( ! data ) {

                    /*
                         Do more setup stuff here
                    */
                    var data = $.extend( {
                        target : $this,
                        fps: 10,
                        totalFrames: 3,
                        loop: 1,
                        autoStart: true,
                        resetAtEnd: true
                    }, options);

                    data.tickTime = Math.floor(1000/data.fps);

                    $(this).data('animatedSprite', data);

                }

                if(data.autoStart === true) {
                    $this.animatedSprite("play");
                }
            });
        },

        play : function() {
            var $this = $(this);

            var data = $this.data('animatedSprite');

            if($this.hasClass("animating") === false) {

                data.currentLoop = 1;
                data.currentFrame = 1;

                $this.addClass("animating");

                //var tickTime = Math.floor(1000/$(this).data('animatedSprite').fps);

                data.interval = setTimeout(function() {
                    $this.animatedSprite("nextFrame");
                }, data.tickTime);

                $(this).data('animatedSprite', data);
            }
        },

        nextFrame : function() {
            var $this = $(this);

            var data = $this.data('animatedSprite');

            if(data.currentFrame < data.totalFrames) {
                data.currentFrame++;
                $this.animatedSprite("renderCurrentFrame");
                data.interval = setTimeout(function() {
                    $this.animatedSprite("nextFrame");
                }, data.tickTime);
            } else {
                if(data.loop == data.currentLoop) {
                    //clearInterval(data.interval);
                    $this.removeClass("animating")

                    if(data.resetAtEnd === true) {
                        data.currentFrame = 1;
                        $this.animatedSprite("renderCurrentFrame");
                    }
                } else {
                    data.currentLoop++;
                    data.currentFrame = 1;
                    $this.animatedSprite("renderCurrentFrame");
                    data.interval = setTimeout(function() {
                        $this.animatedSprite("nextFrame");
                    }, data.tickTime);
                }
            }

            $this.data('animatedSprite', data);
        },

        renderCurrentFrame : function() {
            var $this = $(this);
            var data = $this.data('animatedSprite');
            $this.css("backgroundPosition", "-"+((data.currentFrame-1)*$this.outerWidth())+"px 0px");
        },

        destroy : function( ) {

            return this.each(function(){

                var $this = $(this);
                $this.removeData('animatedSprite');

            });

        }

    };

    $.fn.animatedSprite = function( method ) {

        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.animatedSprite' );
        }

    };

})( jQuery );