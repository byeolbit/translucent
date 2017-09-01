# Translucent [![Build Status](https://travis-ci.org/byeolbit/translucent.svg?branch=master)](https://travis-ci.org/byeolbit/translucent) [![codecov](https://codecov.io/gh/byeolbit/translucent/branch/master/graph/badge.svg)](https://codecov.io/gh/byeolbit/translucent)
### Transparent card theme - jQuery plugin. 
<img src="https://github.com/byeolbit/byeolbit.github.io/raw/master/title.png?raw=true" alt="Title image" style="max-width:100%;">

Demo : https://byeolbit.github.io/translucent

#### **Translucent** is a jQuery plugin for make transparent/translucent design element in webpage.



## What you need to use Translucent
- jQuery
- Browser support

#### Tested browsers

Firefox 35.0 | Chrome 53.0  | Safari 6 | Edge 38.0 | Opera 40.0
--------|--------|--------|------|-------
<img src="https://github.com/alrra/browser-logos/raw/master/src/firefox/firefox_128x128.png" alt="Firefox"> | <img src="https://github.com/alrra/browser-logos/raw/master/src/chrome/chrome_128x128.png" alt="Chrome"> | <img src="https://github.com/alrra/browser-logos/raw/master/src/safari/safari_128x128.png" alt="Safari"> | <img src="https://github.com/alrra/browser-logos/raw/master/src/edge/edge_128x128.png" alt="Edge"> | <img src="https://github.com/alrra/browser-logos/raw/master/src/opera/opera_128x128.png" alt="Opera">

*※ Not support Internet Explorer. (It does not support CSS filter)*

<br/>
<br/>

## How to use translucent

### 1. Get plugin
- Download [compressed version](https://github.com/byeolbit/translucent/releases/download/1.0.10/jquery.translucent-1.0.10.min.js) or [non-compressed version](https://github.com/byeolbit/translucent/releases/download/1.0.10/jquery.translucent-1.0.10.js)

### 2. Insert script into your HTML
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="jquery.translucent.min.js"></script>
```

### 3. Make your background element and card element in HTML

```html
<div id="your-background">
    <div class="your-card">
        <div class="tl-card-contents">
            <!-- your card contents here -->
        </div>
    </div>
</div>
```


### 4. Apply translucent to your card element in script

```javascript
$('.your-card').translucent('#your-background');
```
or you can customize options.


```javascript
$('.your-card').translucent('#your-background',{
    filterValue : 5,     // int
    cardColor : 'clear', // preset color or your own color
    shadow : true        // true or false
});
```

<br/>

## Plugin description

### .translucent( *selector* , [ *options* ] )
Apply translucent card them to element.

#### *Selector*
+ **type** : `string`
+ **description** : Selector for your background element. It must be id.

#### *Options*

Attribute | Type | Default | Description
--------- | ---- | ------- | -----------
filterValue | `number` | 10 | This is blur value.
cardColor | `string` | 'white' | Color of card. You can use preset or your own color. Preset : `'clear'`, `'white'`, `'grey'`, `'black'`
shadow | `boolean` | true | This decides shadow effect of element. `true` applies effect.

### .translucent( *'blur'* , *value* )
Change amount of blur for background.

#### *Value*
+ **type** : `number`
+ **description** : Value for blur background. 0 will get clear background.

#### Example
```javascript
// Apply 20 blur to background
$('.your-element').translucent('blur', 20);
```

### .translucent( *'destroy'* )
Destroy translucent from the element.

#### Example
```javascript
$('.your-element').translucent('destroy');
```

<br/>

## Update history

[byeolbit.github.io](https://byeolbit.github.io/translucent/2017/01/28/translucent-update-history.html) 
