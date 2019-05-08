# underscore 诞生记（二）—— 链式调用与混入（mixin）

上篇文章讲述了 underscore 的基本结构搭建，本文继续讲链式调用与混入。

如果你还没看过第一篇文章，请点击 [“underscore 诞生记（一）—— 基本结构搭建”](https://juejin.im/post/5cc281886fb9a0321d73b025)

## 链式调用

在 JQuery 中，我们经常使用到链式调用，如：

```js
$('.div')
  .css('color', 'red')
  .show();
```

那么在 underscore 中，是否支持链式调用呢？答案是支持的，只不过默认不开启链式调用罢了。

想要实现链式调用，通常我们会在支持链式调用的函数中返回对象本身：

```js
let car = {
  run(name) {
    console.log(`${name}老司机开车啦喂！`);
    return this;
  },
  stop() {
    console.log('车停了');
  },
};

car.run('奔驰').stop();

// 奔驰老司机开车啦喂！
// 车停了
```

那么在每个 `_` 方法下都 `return this` , 显然不大优雅缺乏可控性！尝试着写个通用方法 `chain()` 开启链式调用。

```js
_.chain = function(obj) {
  // 获得一个经underscore包裹后的实例
  var instance = _(obj);
  // 标识当前实例支持链式调用
  instance._chain = true;
  return instance;
};

// 小试牛刀
_.chain([1, 2, 3]);
/* 
{
    _chain: true,
    _wrapped: [1, 2, 3]
}
 */
```

返回的为一个实例对象，后面的方法判断 `_chain` 属性是否为 `true`,为 `true` 的话再调用一次 `chain()` 方法再返回原来实例即可。我们在之前用于给 prototype 复制方法的 each() 函数加入判断吧

```js
var ArrayProto = Array.prototype;
var push = ArrayProto.push;
_.each(_.functions(_), function(name) {
  var func = _[name];
  _.prototype[name] = function() {
    var args = [this._wrapped];
    // args = [this._wrapped, arguments[0], arguments[1]...], 相当于用 this._wrapped 代替 obj 实现
    push.apply(args, arguments);
    return this._chain ? _(func.apply(_, args)).chain() : func.apply(_, args);
  };
});
```

有点冗长，将 `return this._chain ? _(func.apply(_, args)).chain() : func.apply(_, args);` 改造下，

```js
// 判断是否需要链式调用
var chainResult = function(instance, obj) {
  return instance._chain ? _(obj).chain() : obj;
};
var ArrayProto = Array.prototype;
var push = ArrayProto.push;
_.each(_.functions(_), function(name) {
  var func = _[name];
  _.prototype[name] = function() {
    var args = [this._wrapped];
    // args = [this._wrapped, arguments[0], arguments[1]...], 相当于用 this._wrapped 代替 obj 实现
    push.apply(args, arguments);
    return chainResult(this, func.apply(_, args));
  };
});
```

好了，试试看效果：

```js
_.chain([1, 2, 3])
  .each(function(item) {
    console.log(item);
  })
  .each(function(item) {
    console.log(item);
  });
// 1 2 3 1 2 3
// {_wrapped: [1,2,3], _chain: true}
```

## 混入（mixin）

underscore 很强大，功能也很齐全，但有时候也不能满足所有人的需求。我们想创建一些方法，让它挂载在 `_` 上，这样我们全局也可以调用到这些方法，作为一款强大的方法库，也应该提供这种接口，让用户自定添加方法，ok， let us do it !

我们先定义一个 mixin 方法

```js
_.mixin = function(obj) {};

// `obj` 为一个类似 `_` 的对象。传入的这个对象，也需要遍历一次，并且复制方法于 prototype 属性上。详细代码如下：
_.mixin = function(obj) {
  _.each(_.functions(obj), function(name) {
    var func = (_[name] = obj[name]);
    _.prototype[name] = function() {
      var args = [this._wrapped];
      push.apply(args, arguments);
      // args = [this._wrapped, arguments[0], arguments[1]...], 相当于用 this._wrapped 代替 obj 实现
      return chainResult(this, func.apply(_, args));
    };
  });
  return _;
};
```

看到这里，你会发现，我们在方法的最后遍历赋值给`_.prototype`方法，其实就是一次`mixin()` 的调用.

```js
_.each(_.functions(_), function(name) {
  var func = _[name];
  _.prototype[name] = function() {
    var args = [this._wrapped];
    // args = [this._wrapped, arguments[0], arguments[1]...], 相当于用 this._wrapped 代替 obj 实现
    push.apply(args, arguments);
    return func.apply(_, args);
  };
});

// 简化为
_.mixin(_);
```

## 最终代码

```js
(function() {
  // root 为挂载对象，为 self 或 global 或 this 或 {}
  var root =
    (typeof self == 'object' && self.self === self && self) ||
    (typeof global == 'object' && global.global === global && global) ||
    this ||
    {};

  var _ = function(obj) {
    // 如果传入的是实例后对象，返回它
    if (obj instanceof _) return obj;
    // 如果还没有实例化，new _(obj)
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // 最大数值
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var ArrayProto = Array.prototype;
  var push = ArrayProto.push;
  // 判断是否为数组
  var isArrayLike = function(collection) {
    var length = collection.length;
    return (
      typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX
    );
  };

  // 判断是否需要链式调用
  var chainResult = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  root._ = _;

  _.VERSION = '1.9.1'; // 给我们的 underscore 一个版本号吧

  /**
   * 字符串倒装
   */
  _.reverse = function(string) {
    return string
      .split('')
      .reverse()
      .join('');
  };

  /**
   * 判断是否为 function
   */
  _.isFunction = function(obj) {
    return typeof obj == 'function' || false;
  };
  // 链式调用方法
  _.chain = function(obj) {
    // 获得一个经underscore包裹后的实例
    var instance = _(obj);
    // 标识当前实例支持链式调用
    instance._chain = true;
    return instance;
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
   * 数组或对象遍历方法，并返回修改后的对象或数组
   * @param iteratee 回调函数
   * @param context 回调函数中this的指向
   */
  _.map = function(obj, iteratee, context) {
    var length = obj.length,
      results = Array(length);
    for (var index = 0; index < length; index++) {
      results[index] = iteratee.call(context, obj[index], index, obj);
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
      // 数组
      length = obj.length;
      for (; i < length; i++) {
        //   这里隐式的调用了一次 callback.call(obj[i], obj[i], i);
        if (callback.call(obj[i], obj[i], i) === false) {
          break;
        }
      }
    } else {
      // 对象
      for (i in obj) {
        if (callback.call(obj[i], obj[i], i) === false) {
          break;
        }
      }
    }

    return obj;
  };
  /*
   * 混入方法 mixin
   */
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = (_[name] = obj[name]);
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        // args = [this._wrapped, arguments[0], arguments[1]...], 相当于用 this._wrapped 代替 obj 实现
        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  };
  _.mixin(_);
})();
```

## 未完待续，静待下篇

[前端进阶小书（advanced_front_end）](https://github.com/zxpsuper/advanced_front_end)

[前端每日一题（daily-question）](https://github.com/zxpsuper/daily-question)

[webpack4 搭建 Vue 应用（createVue）](https://github.com/zxpsuper/createVue)

![](https://user-gold-cdn.xitu.io/2019/4/23/16a483433ed83578?w=281&h=271&f=png&s=29836)
