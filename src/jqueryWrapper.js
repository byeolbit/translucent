import * as _ from './translucent';

var pluginName = 'translucent';

function Translucent(element, options) {
  let translucent = new _.Translucent(element, options);
  this.blur = translucent.blur.bind(translucent);
  this.destroy = translucent.destroy.bind(translucent);
}

$.fn[pluginName] = function (options) {
  var args = arguments;

  if (typeof options === 'object'){
    return this.each(function () {
      //This prevents multiple plugin instanciation.
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Translucent(this, options));
      }
    });
  }
  //This prevents call private methods(mothods start with '_').
  else if (typeof options === 'string' && options[0] !== '_') {
    return this.each(function() {
        var instance = $.data(this, 'plugin_' + pluginName),
            slicedArgs = Array.prototype.slice.call(args, 1);

        if (instance instanceof Translucent && typeof instance[options] === 'function') {
          instance[options].apply(instance, slicedArgs);
        }
      });
  } 
};

