# TransparentCard
### Transparent plastic card theme made with CSS, jQuery.
![Title image]
(https://github.com/byeolbit/TransparentCard/blob/master/title.png?raw=true)

Demo : https://byeolbit.github.io/tc_demo

## Update Note

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

## How to use (updating)

### Setting
```javascript
var cardElement = 'your card id',
    bgElement = 'your background element id or class',
    boundaryCheck = true or false,
    filterValue = 10;
```

Example(default setting) : 
```javascript
var cardElement = '#t-card',
    bgElement = '.contents',
    boundaryCheck = true,
    filterValue = 10;
```

### Applying color to card

#### 1. Append color preset class to "card-contents" class.

There are four color preset classes.
* card-color-white
* card-color-grey
* card-color-black
* card-color-clear

Example(apply white color) :
```html
<div class="card-contents card-color-white">
```

#### 2. Append background-color to "card-contents" class in css

```css
.card-contents {
    background-color: rgba(255,255,255,0.4);
    color:white;
    font-family: sans-serif;
    height: inherit;
    position: absolute;
    text-align: center;
    text-shadow: 0px 4px 4px rgba(0,0,0,0.6);
    width: inherit;
    z-index: 2;
}
```
