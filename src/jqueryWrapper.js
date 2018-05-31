import * as _ from './translucent';

(function(factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
      module.exports = factory(require('jquery'), window, document);
  } else {
      factory(jQuery, window, document);
  }
}(function($, window, document, undefined) {

  var pluginName = 'translucent';

  function Translucent(element, options) {
    this.translucent = new _.Translucent(element, options)
  }

  $.extend(Translucent.prototype, {
    blur: this.translucent.blur,
    destroy: this.translucent.destroy,
  });

  $.fn[pluginName] = function (options) {
    if (typeof options === 'object'){
        return this.each(function () {
            //This prevents multiple plugin instanciation.
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Translucent(this, options));
            }
        });
    }
    //This prevents call private methods(mothods start with '_').
    else if (typeof options === 'string' && options[0] !== '_') {
        return this.each(function() {
            var instance = $.data(this, 'plugin_' + pluginName),
                slicedArgs = Array.prototype.slice.call(args, 1);

            if (instance instanceof Translucent &&
                typeof instance[options] === 'function') {
                instance[options].apply(instance, slicedArgs);
            }
        });
    } 
};
}));
