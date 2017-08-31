QUnit.module('translucent',{
  beforeEach: function(){
    $('<div id="bg"><div id ="cw"><div id="cc" class="tl-card-contents"><h1>Hello Chicago!</h1><div class="content-image"></div><p class="text-contents">Chicago, officially the City of Chicago, is the third-most populous city in the United States, and the fifth-most populous city in North America. With over 2.7 million residents, it is the most populous city in the state of Illinois and the Midwestern United States, and the county seat of Cook County.</p><p class="auto-graph"><a href="https://github.com/byeolbit">https://github.com/byeolbit</a></p></div></div></div>').appendTo('#qunit-fixture');
    this.elem = $('#cw');
  }
});

QUnit.test('is chainable', function(assert) {
  assert.expect(1);
  assert.strictEqual(this.elem.translucent('#bg'), this.elem, 'shold be chainable');
});

QUnit.test('should return jquery collection', function(assert) {
  assert.expect(3);
  var $translucent = this.elem.translucent('#bg');
  assert.ok($translucent instanceof $, 'returns jquery collection');
  assert.strictEqual($translucent[0], this.elem[0], 'collection contains element');
  assert.ok($.data(this.elem[0],'plugin_translucent'), 'collection contains data');
});

QUnit.test('should call blur method', function(assert) {
  var $translucent = this.elem.translucent('#bg');
  var $cardBg = this.elem.find('.tl-card-bg');

  for (var i = 0; i<100; i++) {
    assert.ok($translucent.translucent('blur',i),'call blur method');
    assert.strictEqual($cardBg.css('filter'),'blur('+i+'px)' , 'changed blur to '+i);
  }
});

QUnit.test('should call destroy method', function(assert) {
  var $translucent = this.elem.translucent('#bg');
  assert.ok($translucent.translucent('destroy'),'call destroy method');
  assert.strictEqual($translucent,this.elem,'Destroyed plugin must same as first state');
  assert.strictEqual(undefined, $.data(this.elem[0],'plugin_translucent'),'data on element destroyed');
});

QUnit.module('translucent private methods',{
  beforeEach: function(){
    $('<div id="bg"><div id ="cw"><div id="cc" class="tl-card-contents"><h1>Hello Chicago!</h1><div class="content-image"></div><p class="text-contents">Chicago, officially the City of Chicago, is the third-most populous city in the United States, and the fifth-most populous city in North America. With over 2.7 million residents, it is the most populous city in the state of Illinois and the Midwestern United States, and the county seat of Cook County.</p><p class="auto-graph"><a href="https://github.com/byeolbit">https://github.com/byeolbit</a></p></div></div></div>').appendTo('#qunit-fixture');
    this.elem = $('#cw');
    this.elem.translucent('#bg');
    this.plugin = $.data(this.elem[0], 'plugin_translucent');
  }
});

QUnit.test('_teardown must work', function(assert) {
  this.plugin._teardown(this.plugin);
  assert.strictEqual(undefined,$('#tl-Card-css')[0],'card style at head must be removed');
});

QUnit.test('_initStructure must work', function(assert) {
  var $mock_elem = $('<div id ="m_cw"><div id="m_cc" class="tl-card-contents"></div></div>');
  this.plugin._initStructure($mock_elem);
  var expected = '<div id="m_cw"><div class="tl-card-bg-container"><div class="tl-card-bg"></div></div><div class="tl-card-container"><div id="m_cc" class="tl-card-contents"></div></div></div>';
  var result = $mock_elem.prop('outerHTML');
  assert.strictEqual(result,expected,'');
});

QUnit.module('translucent _styleInit methods test',{
  beforeEach: function(){
    $('<div id="bg"><div id ="cw"><div id="cc" class="tl-card-contents"><h1>Hello Chicago!</h1><div class="content-image"></div><p class="text-contents">Chicago, officially the City of Chicago, is the third-most populous city in the United States, and the fifth-most populous city in North America. With over 2.7 million residents, it is the most populous city in the state of Illinois and the Midwestern United States, and the county seat of Cook County.</p><p class="auto-graph"><a href="https://github.com/byeolbit">https://github.com/byeolbit</a></p></div></div></div>').appendTo('#qunit-fixture');
    this.elem = $('#cw');
    this.elem.translucent('#bg');
    this.plugin = $.data(this.elem[0], 'plugin_translucent');

    this.$test_elem = $('<div id="m_cw"><div class="tl-card-bg-container"><div class="tl-card-bg"></div></div><div class="tl-card-container"><div id="m_cc" class="tl-card-contents"></div></div></div>');
    this.$test_contents = this.$test_elem.find('.tl-card-contents');
    this.$test_container = this.$test_elem.find('.tl-card-container');
    this.test_shadow = 10;
    this.test_color = 'clear';
    this.mock_styleInit = 
      new this.plugin._styleInit(this.$test_elem, this.$test_contents,
                                 this.$test_container, this.test_shadow,
                                 this.test_color);  
  }
});

QUnit.test('setShadow test', function(assert) {
    
  // setShadow test
  this.mock_styleInit.setShadow(this.$test_elem,false);
  assert.strictEqual(this.$test_elem.css('box-shadow'),'',
                     'Shadow must not be aplliied');
  this.mock_styleInit.setShadow(this.$test_elem,true);
  assert.strictEqual(this.$test_elem.css('box-shadow'),
                     'rgba(0, 0, 0, 0.5) 0px 20px 20px',
                     'Shadow must be aplliied');
  
});

QUnit.test('setChildrenSize test', function(assert) {
  for(var size = 0; size<1000; size++){
    this.$test_elem.css({'width':size, 'height':size});
    this.mock_styleInit.setChildrenSize(this.$test_elem);
    this.$test_elem.children().each(function(){
      assert.strictEqual($(this).width(),size,'children width must be the parent width');
      assert.strictEqual($(this).height(),size,'children height must be the parent width');
    })
  }
});

QUnit.test('setCardColor test', function(assert) {
  var preset_color = ['clear', 'white', 'grey', 'black'];
  var preset_rgba = ['rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0.4)',
                     'rgba(120, 120, 120, 0.4)', 'rgba(30, 30, 30, 0.7)']
  
  // preset color test
  for(var testCase=0; testCase<preset_color.length; testCase++){
    this.mock_styleInit.setCardColor(this.$test_elem, preset_color[testCase]);
    assert.strictEqual(this.$test_elem.css('background-color'),
                       preset_rgba[testCase],
                       'Background color must set to preset color');
  }
});

QUnit.test('setAlign test', function(assert) {
  var $container = this.$test_elem.find('.tl-card-container');
  for(var tx = 0; tx<=2000; tx+=200){
    for(var ty = 0; ty<=2000; ty+=200){
      this.$test_elem.appendTo('#qunit-fixture');
      this.$test_elem.offset({top:tx, left:ty});
      this.mock_styleInit.setAlign($container, this.$test_elem);
      assert.strictEqual($container.offset().top,
                         this.$test_elem.offset().top,
                         'container top offset must same as test_elem');
      assert.strictEqual($container.offset().left,
                         this.$test_elem.offset().left,
                         'container left offset must same as test_elem');
    }
  }
});

QUnit.test('setStyle test', function(assert) {
  $('#tl-Card-css').remove();  
  assert.ok(this.mock_styleInit.setStyle(),'setStyle call');
  var style = '<style type=\"text/css\" id="tl-Card-css">' +
              '.tl-card-container {'+
              'border: rgba(200,200,200,0.5) solid 1px;' +
              'border-radius: 10px; overflow: hidden;' +
              'position: relative; transition:' +
              ' box-shadow 0.4s ease;} ' +
              '.tl-card-bg-container {border-radius: 10px;' +
              'overflow: hidden; position: relative;} ' +
              '.tl-card-contents {overflow: hidden;' +
              'position: relative; border-radius: 10px;}' +
              '</style>';
  assert.strictEqual($('#tl-Card-css').prop('outerHTML'),style,'must have style element');
  assert.notOk(this.mock_styleInit.setStyle(),'style element already exists');
});

QUnit.module('translucent _cardBgInit methods test',{
  beforeEach: function(){
    $('<div id="bg"><div id ="cw"><div id="cc" class="tl-card-contents"><h1>Hello Chicago!</h1><div class="content-image"></div><p class="text-contents">Chicago, officially the City of Chicago, is the third-most populous city in the United States, and the fifth-most populous city in North America. With over 2.7 million residents, it is the most populous city in the state of Illinois and the Midwestern United States, and the county seat of Cook County.</p><p class="auto-graph"><a href="https://github.com/byeolbit">https://github.com/byeolbit</a></p></div></div></div>').appendTo('#qunit-fixture');
    this.elem = $('#cw');
    this.elem.translucent('#bg');
    this.plugin = $.data(this.elem[0], 'plugin_translucent');

    this.$bgElem = $('#bg');
    this.test_cardBg = $('.tl-card-bg')[0];
    function _alignCardBackground($element, $bgElement, cardBgStyle, filterValue){};
    this.mock_cardBgInit = 
      new this.plugin._cardBgInit(this.elem, this.$bgElem,
                                  this.test_cardBg.style, 10, _alignCardBackground);
  }
});

QUnit.test('cardBgInit test', function(assert) {
  var mock_getNaturalSize = 
    new Function('bgUrl',
                 mocking(this.plugin._cardBgInit.toString(),'_getNaturalSize'));
  
  var testUrl = 'url("http://localhost:9876/base/test/bg.jpg")';
  assert.strictEqual(
    mock_getNaturalSize(testUrl).src,
    'http://localhost:9876/base/test/bg.jpg',
    '_getNaturalSize parse url');

  var mock_getPixelSize = 
    new Function('$bgElement',
                 'url',
                 'size',
                 'getNaturalSize',
                 mocking(this.plugin._cardBgInit.toString(),'_getPixelSize'));
  
  assert.ok(
    mock_getPixelSize(this.$bgElem, testUrl,'cover', mock_getNaturalSize),
      'call _getPixelSize by cover');
    
});