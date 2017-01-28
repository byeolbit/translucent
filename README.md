# Translucent
### Transparent card theme - jQuery plugin.
<img src="https://github.com/byeolbit/byeolbit.github.io/raw/master/title.png?raw=true" alt="Title image" style="max-width:100%;">

Demo : https://byeolbit.github.io/translucent

#### **Translucent** is a jQuery plugin for make transparent/translucent design element in webpage.

## What you need to use Translucent
- jQuery
- jQuery-UI
- Browser support

####Tested browsers

Firefox 35.0 | Chrome 53.0  | Safari 6 | Edge 38.0 | Opera 40.0
--------|--------|--------|------|-------
<img src="https://github.com/alrra/browser-logos/raw/master/src/firefox/firefox_128x128.png" alt="Firefox"> | <img src="https://github.com/alrra/browser-logos/raw/master/src/chrome/chrome_128x128.png" alt="Chrome"> | <img src="https://github.com/alrra/browser-logos/raw/master/src/safari/safari_128x128.png" alt="Safari"> | <img src="https://github.com/alrra/browser-logos/raw/master/src/edge/edge_128x128.png" alt="Edge"> | <img src="https://github.com/alrra/browser-logos/raw/master/src/opera/opera_128x128.png" alt="Opera">

* *Not support Internet Explorer. (It does not support CSS filter)*

## How to use translucent

### Get plugin
- Download [zip](https://github.com/byeolbit/translucent/archive/master.zip) or [tar.gz](https://github.com/byeolbit/translucent/archive/master.tar.gz) archive.
- npm : `npm install translucent`

### Insert script into your HTML
```html
<script src="jquery.ui.translucent.min.js"></script>
```
*※ Don't forget to insert jQuery and jQuery-UI in your page.*

### Make your background element and card element in HTML

```html
<div class="your-background">
    <div class="your-card">
        <div class="tl-card-bg-container">
            <div class="tl-card-bg"></div>
        </div>
        <div class="tl-card">
            <div class="tl-card-contents">
                <!-- your card contents here -->
            </div>
        <div>
    </div>
</div>
```


### Apply translucent to your card element in script

```javascript
$('.your-card').translucent('.your-background');
```
  or you can customize options.


```javascript
$('.your-card').translucent('.your-background',{
    filterValue : 5,     // int
    cardColor : 'clear', // preset color or your own color
    draggable : true,    // true or false
    shadow : true        // true or false
});
```

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

