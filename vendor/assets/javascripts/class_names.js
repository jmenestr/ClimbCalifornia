(function (root) {
  'use strict';

  var hasOwn = {}.hasOwnProperty;
  console.log("class names");
  function classNames () {
    var classes = '';

    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;

      var argType = typeof arg;

      if (argType === 'string' || argType === 'number') {
        classes += ' ' + arg;
      } else if (Array.isArray(arg)) {
        classes += ' ' + classNames.apply(null, arg);
      } else if (argType === 'object') {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes += ' ' + key;
          }
        }
      }
    }

    return classes.substr(1);
  }

  
    root.classNames = classNames;
})(this);