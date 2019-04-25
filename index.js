(function() {
  var root =
    (typeof self == "object" && self.self == self && self) ||
    (typeof global == "object" && global.global == global && global) ||
    this ||
    {};

  var ArrayProto = Array.prototype;

  var push = ArrayProto.push;

  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  if (typeof exports != "undefined" && !exports.nodeType) {
    if (typeof module != "undefined" && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  _.VERSION = "0.1";

  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

  // 判断数组或者对象
  var isArrayLike = function(collection) {
    var length = collection.length;
    return (
      typeof length == "number" && length >= 0 && length <= MAX_ARRAY_INDEX
    );
  };

  // 需要链式调用的处理函数
  var chainResult = function(instance, obj) {
    return instance._chain ? _.chain(obj) : obj;
  };

  // 回调函数,若不存在，返回原值；存在即调用 回调优化函数 optimizeCb
  var cb = function(value, context) {
    if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
    if (value == null) return _.identity;
    return optimizeCb(value, context);
  };

  // callback 优化，处理 context 存在与否的不同情况，若存在，将this 指向 context
  var optimizeCb = function(func, context) {
    // 如果没有传入 context，就返回 func 函数
    if (context === void 0) return func;
    return function() {
      return func.apply(context, arguments);
    };
  };

  /**
   * 我们自定义的 _.iteratee 函数来处理 value 和 context。默认 iteratee = builtinIteratee, 当然我们也可以自定义
   */
  _.iteratee = builtinIteratee = function(value, context) {
    return cb(value, context);
  };

  /**
   * 拿到什么返回什么
   */
  _.identity = function(value) {
    return value;
  };

  var nativeIsArray = Array.isArray;

  /**
   * 判断是否为数组
   */
  _.isArray =
    nativeIsArray ||
    function(obj) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    };

  /**
   * 判断是否为 对象 或 function
   */
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === "function" || (type === "object" && !!obj);
  };

  /**
   * 判断是否为 function
   */
  _.isFunction = function(obj) {
    return typeof obj == "function" || false;
  };

  /**
   * 数组或对象遍历方法，并返回修改后的对象或数组
   */
  _.map = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);

    var length = obj.length,
      results = Array(length);
    for (var index = 0; index < length; index++) {
      results[index] = iteratee(obj[index], index, obj);
    }

    return results;
  };

  /**
   * 数组或对象遍历方法
   */
  _.each = function(obj, callback) {
    var length,
      i = 0;

    if (isArrayLike(obj)) {
      length = obj.length;
      for (; i < length; i++) {
        if (callback.call(obj[i], obj[i], i) === false) {
          break;
        }
      }
    } else {
      for (i in obj) {
        if (callback.call(obj[i], obj[i], i) === false) {
          break;
        }
      }
    }

    return obj;
  };

  /**
   * 链式调用函数
   */
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };
  /**
   * 获取一个随机数
   */
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };
  /**
   * 获取_的所有属性函数名
   */
  _.functions = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  /**
   * 字符串倒装
   */
  _.reverse = function(string) {
    return string
      .split("")
      .reverse()
      .join("");
  };

  /**
   * 混入，将方法集合混入到 _ 中
   */
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = (_[name] = obj[name]);
      _.prototype[name] = function() {
        var args = [this._wrapped];

        push.apply(args, arguments);

        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  };
  _.prototype.value = function() {
    return this._wrapped;
  };
  _.mixin(_);
})();
