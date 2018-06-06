# Translucent [![Build Status](https://travis-ci.org/byeolbit/translucent.svg?branch=master)](https://travis-ci.org/byeolbit/translucent) [![codecov](https://codecov.io/gh/byeolbit/translucent/branch/master/graph/badge.svg)](https://codecov.io/gh/byeolbit/translucent)
### Transparent card theme
<img src="https://github.com/byeolbit/byeolbit.github.io/raw/master/title.png?raw=true" alt="Title image" style="max-width:100%;">

Demo : https://byeolbit.github.io/translucent

#### **Translucent** is a plugin for make transparent/translucent design element in webpage.



## What you need to use Translucent
- Browser support

#### Tested browsers

Firefox 35.0 | Chrome 53.0  | Safari 6 | Edge 38.0 | Opera 40.0
--------|--------|--------|------|-------
<img src="https://github.com/alrra/browser-logos/raw/master/src/firefox/firefox_128x128.png" alt="Firefox"> | <img src="https://github.com/alrra/browser-logos/raw/master/src/chrome/chrome_128x128.png" alt="Chrome"> | <img src="https://github.com/alrra/browser-logos/raw/master/src/safari/safari_128x128.png" alt="Safari"> | <img src="https://github.com/alrra/browser-logos/raw/master/src/edge/edge_128x128.png" alt="Edge"> | <img src="https://github.com/alrra/browser-logos/raw/master/src/opera/opera_128x128.png" alt="Opera">

*※ Not support Internet Explorer. (It does not support CSS filter)*

<br/>
<br/>

## How to use translucent

### 1. Insert script into your HTML
```html
<script src="https://cdn.jsdelivr.net/npm/translucent@1.0.11/dist/translucent.min.js"></script>
```

### 2. Make your background element and card element in HTML

```html
<div class="your-background">
    <div class="your-element">
        <!-- your card contents here -->
    </div>
</div>
```


### 3. Apply translucent to your card element in script

```javascript
let yourElement = document.body.querySelector('.your-element');
let translucent = new Translucent(yourElement);
```
or you can customize options.


```javascript
let translucent = new Translucent(yourElement, {
    bgElement : '.your-background', // id or class name
    filterValue : 5,     // int
    cardColor : 'clear', // preset color or your own color
    shadow : true        // true or false
});
```

<br/>

## Plugin description

### Translucent( *element* , [ *options* ] )
Apply translucent card them to element.

#### *element*
+ **type** : `HTMLElement`
+ **description** : HTML element that you want to apply translucent

#### *Options*

Attribute | Type | Default | Description
--------- | ---- | ------- | -----------
bgElement | `string` | parent of target element | Background element.
filterValue | `number` | 10 | This is blur value.
cardColor | `string` | 'white' | Color of card. You can use preset or your own color. Preset : `'clear'`, `'white'`, `'grey'`, `'black'`
shadow | `boolean` | true | This decides shadow effect of element. `true` applies effect.

### Translucent.blur( *value* )
Change amount of blur for background.

#### *Value*
+ **type** : `number`
+ **description** : Value for blur background. 0 will get clear background.

#### Example
```javascript
// Apply 20 blur to background
translucent.blur(20);
```

### Translucent.destroy( *void* )
Destroy translucent from the element.

#### Example
```javascript
Translucent.destroy();
```

<br/>


## How to use translucent (jQuery plugin)

### 1. Insert script into your HTML
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/translucent@1.0.11/dist/jquery.translucent.min.js"></script>
```

### 2. Make your background element and card element in HTML

```html
<div class="your-background">
    <div class="your-element">
        <!-- your card contents here -->
    </div>
</div>
```


### 3. Apply translucent to your card element in script

```javascript
$('.your-element').translucent();
```
or you can customize options.


```javascript
$('.your-element').translucent({
    background: '.your-background', // id or class name
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
bgElement | `string` | parent of target element | Background element.
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
