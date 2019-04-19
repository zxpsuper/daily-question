var overtime = (function() {
  var args = [];

  return function() {
    console.log(JSON.stringify(arguments));
    if (arguments.length === 0) {
      var time = 0;
      for (var i = 0, l = args.length; i < l; i++) {
        time += args[i];
      }
      return time;
    } else {
      [].push.apply(args, arguments);
    }
  };
})();

overtime(12)();
