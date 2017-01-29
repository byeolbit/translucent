# Translucent
### Transparent card theme - jQuery plugin.
<img src="https://github.com/byeolbit/byeolbit.github.io/raw/master/title.png?raw=true" alt="Title image" style="max-width:100%;">

Demo : https://byeolbit.github.io/translucent

#### **Translucent** is a jQuery plugin for make transparent/translucent design element in webpage.
<br/><br/>
## What you need to use Translucent
- jQuery
- jQuery-UI
- Browser support

####Tested browsers

Firefox 35.0 | Chrome 53.0  | Safari 6 | Edge 38.0 | Opera 40.0
--------|--------|--------|------|-------
<img src="https://github.com/alrra/browser-logos/raw/master/src/firefox/firefox_128x128.png" alt="Firefox"> | <img src="https://github.com/alrra/browser-logos/raw/master/src/chrome/chrome_128x128.png" alt="Chrome"> | <img src="https://github.com/alrra/browser-logos/raw/master/src/safari/safari_128x128.png" alt="Safari"> | <img src="https://github.com/alrra/browser-logos/raw/master/src/edge/edge_128x128.png" alt="Edge"> | <img src="https://github.com/alrra/browser-logos/raw/master/src/opera/opera_128x128.png" alt="Opera">

*※ Not support Internet Explorer. (It does not support CSS filter)*
<br/><br/>
## How to use translucent

### 1. Get plugin
- Download [zip](https://github.com/byeolbit/translucent/archive/master.zip) or [tar.gz](https://github.com/byeolbit/translucent/archive/master.tar.gz) archive.
- npm : `npm install translucent`

### 2. Insert script into your HTML
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
<script src="jquery.ui.translucent.min.js"></script>
```

### 3. Make your background element and card element in HTML

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


### 4. Apply translucent to your card element in script

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
<br/><br/>
## Plugin description
### .translucent( *selector* , [ *options* ] )

#### *Selector*
+ **type** : `string`
+ **description** : Selector for your background element. It can be id or class.

#### *Options*

Attribute | Type | Default | Description
--------- | ---- | ------- | -----------
filterValue | `int` | 5 | This is blur value. Higher value needs more performance.
cardColor | `string` | 'clear' | Color of card. You can use preset or your own color. Preset : `'clear'`, `'white'`, `'grey'`, `'black'`
draggable | `boolean` | true | This decides draggable of element. `ture` applies draggable.
shadow | `boolean` | true | This decides shadow effect of element. `true` applies effect.
<br/>
## Update history

[byeolbit.github.io](https://byeolbit.github.io/translucent/2017/01/28/translucent-update-history.html) 
