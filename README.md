# Translucent
### Transparent plastic card - jQuery plugin.
![Title image]
(https://github.com/byeolbit/byeolbit.github.io/blob/master/title.png?raw=true)

Demo : https://byeolbit.github.io/tc_demo

## Update Note

### Change to jQuery plugin - Jan 27 01:34
- Prepairing for release.
- Combine css into script.
- Demo changed to sample. Demo site still working.
- Now it works at Edge browser!
- Little optimization.

### Tidy - Jan 25 00:44
- Tidy code of script.
- Add some comments on script.
- Updating README.md

### Demo updates - Jan 24 01:38
- [Demo] Color change buttons are added at the top of the card.
- [Demo] Adjusting interface(still working)

### Little changes - Jan 24 00:08
- Drag & Drop works on mobile!
- Drop shadow animation during move the card.
- Card color preset class added. You can add color by add these classes to card-content
- CSS code cleaning.

### Little improvements - Jan 23 13:26
- If background-attachment is 'fixed',the tracking of background become smoother.
- Boundary limitation added on demo.
- Now, background is free from body tag.

## Usage (updating)
Dependencies
 - jQuery
 - jQuery-UI

HTML - head
```html
<script src="jquery.ui.translucent.min.js"></script>
```
HTML - card dom structure

    card-wrapper
        tpc-card-background-container
            tpc-card-bg
        tpc-card
            tpc-card-contents

JavaScript
```javascript
$('card-wrapper id here').translucent('background id or class here',{
    filterValue : 5,     // int
    cardColor : 'clear', // preset color or your own color
    draggable : true,    // true or false
    shadow : true        // true or false
});
```

CSS
```css
.tpc-card {
    /* your card width, height here */
}
.tpc-card-contents {
    /* your cumstom style here */
}
```
