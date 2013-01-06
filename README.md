Phantascope
===========

A jQuery plugin for animating sprites.

## Usage

1) Phantascope has only dependancy; jQuery.  You can download your own copy of jQuery at http://jquery.com or link to the Google hosted script:

```html
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.2.min.js"></script>
```

2) Download and include Phantascope in your document as well:

```html
<script src="jquery.phantascope.js"></script>
```

3) Call the Phantascope function in your document ready function, parsing in the required options for your animation

```javascript
$(document).ready(function() {
  $('.sprite').phantascope({
    optionName: value
  });
});
```

4) Enjoy super sweet frame based animations on you webpage!


## Options

<table>
    <tr>
        <th>Option</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><strong>fps</strong></td>
        <td>Int</td>
        <td>24</td>
        <td>The number of frames per second the animation should run at.</td>
    </tr>
    <tr>
        <td><strong>layout</strong></td>
        <td>Array</td>
        <td>[6]</td>
        <td>An array containing the number of frames on each row of the sprite.  The default describes a sprite containing one row of six frames.<br/><br/>For example, a sprite sheet consisting of three rows, the first two containing six frames and the last row containing four frames would be described as: [6,6,4]</td>
    </tr>
    <tr>
        <td><strong>animationPoints</strong></td>
        <td>Array</td>
        <td>[<br/>&nbsp;&nbsp;[1,1],<br />&nbsp;&nbsp;[1,6]<br/>]</td>
        <td>The points through which the animation will play.  Each point is an array, the first value refering to the column, the second to the row.<br/><br/>This default value will play from the first frame to last frame (based upon the default layout of six frames on one row).  You can use as many points as you want, and the animation can play either forward or backwards.<br/><br/>For example, to update the current animation to reverse and play back to the start you would parse these settings: [[1,1], [1,6], [1,1]].</td>
    </tr>
    <tr>
        <td><strong>loop</strong></td>
        <td>Int/String</td>
        <td>1</td>
        <td>Number of times the animation should loop.  For an infinite loop use the string "*".</td>
    </tr>
    <tr>
        <td><strong>autoStart</strong></td>
        <td>Boolean</td>
        <td>false</td>
        <td>Whether to play the animation upon initialisation.</td>
    </tr>
    <tr>
        <td><strong>resetAtEnd</strong></td>
        <td>Boolean</td>
        <td>false</td>
        <td>When complete reset the sprite to the starting frame.</td>
    </tr>
    <tr>
        <td><strong>onComplete</strong></td>
        <td>Function</td>
        <td>null</td>
        <td>Callback fired when the animation is complete.</td>
    </tr>
</table>


## Methods

Method can be called using the following syntax: $('.sprite').spritely("methodName", params).
An example of this would be: $('.sprite').spritely("play", {fps: 30, animationPoints: [[6,1],[1,1]]});

<table>
    <tr>
        <th>Method</th>
        <th>Parameters</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><strong>play</strong></td>
        <td>options (object)</td>
        <td>Start playing the animation from it's current point.  You can also update any of the settings of that animation with the options above.</td>
    </tr>
    <tr>
        <td><strong>update</strong></td>
        <td>options (object)</td>
        <td>Update any of the settings of that animation with the options above.</td>
    </tr>
    <tr>
        <td><strong>gotoFrame</strong></td>
        <td>point (array)</td>
        <td>Move to the specified frame</td>
    </tr>
    <tr>
        <td><strong>pause</strong></td>
        <td><em>none</em></td>
        <td>Pause the animation</td>
    </tr>
    <tr>
        <td><strong>stop</strong></td>
        <td><em>none</em></td>
        <td>Stop the animation</td>
    </tr>
    <tr>
        <td><strong>destroy</strong></td>
        <td><em>none</em></td>
        <td>Remove all plugin functionality from the element</td>
    </tr>
</table>

