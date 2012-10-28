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
    fps: 24,
    layout: [6],
    animationPoints: [
        [1,1],
        [1,6]
    ],
    autoStart: true,
    repeat: 1,
    resetAtEnd: false,
    onComplete: function() {  }
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
        <td>How many frames per second the animation should run at</td>
    </tr>
</table>