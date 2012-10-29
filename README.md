jQuery.phantascope
==================

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
  $('.sprite').Phantascope({
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
        <td>The number of frames per second the animation should run at</td>
    </tr>
    <tr>
        <td><strong>layout</strong></td>
        <td>Array</td>
        <td>[6]</td>
        <td>An array containing the number of frames on each row of the sprite.  The default describes a sprite containing one row of six frames.</td>
    </tr>
    <tr>
        <td><strong>animationPoints</strong></td>
        <td>Array</td>
        <td>[<br/>&nbsp;&nbsp;[1,1],<br />&nbsp;&nbsp;[1,6]<br/>]</td>
        <td>The points through which the animation will play.  Each point is an array, the first value refering to the column, the second to the row.<br/><br/>This default value will play from the first frame to last frame (based upon the default layout of six frames on one row).  You can use as many points as you want, and the animation can play either forward or backwards.<br/><br/>For example. to update the current animation to reverse and play back to the start you would parse these settings: [[1,1], [1,6], [1,1]]</td>
    </tr>
</table>