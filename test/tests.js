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

QUnit.test('teardown must works', function(assert) {
  var $translucent = this.elem.translucent('#bg');
  assert.ok($translucent.translucent('destroy'),'call destroy method');
  var plugin = $.data(this.elem[0], 'plugin_translucent');
  //assert.strictEqual($translucent.styleObserver,this.elem,'Destroyed plugin must same as first state');
});