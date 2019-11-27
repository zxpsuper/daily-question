// 判断是否为NaN
var NumberIsNaN =
  Number.isNaN ||
  function NumberIsNaN(value) {
    return value !== value;
  };
// 默认同一类型最大订阅数量为10
var defaultMaxListeners = 10;
function $getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventBus.defaultMaxListeners;
  return that._maxListeners;
}

// 警告方法
function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}
class EventBus {
  constructor() {
    this.init();
  }

  init() {
    if (
      this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events
    ) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
  }
  _addListener(target, type, listener, prepend) {
    var m; // 同一类型的最大订阅数量
    var events; // 多种订阅类型事件集合
    var existing; // 当前类型订阅事件，events[type]
    // 判断是否传入的函数是否为函数
    if (typeof listener !== 'function') {
      throw new TypeError(
        'The "listener" argument must be of type Function. Received type ' +
          typeof listener
      );
    }

    events = target._events;
    if (events === undefined) {
      // 进行一次初始化
      events = target._events = Object.create(null);
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener !== undefined) {
        target.emit(
          'newListener',
          type,
          listener.listener ? listener.listener : listener
        );

        // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object
        events = target._events;
      }
      existing = events[type];
    }

    if (existing === undefined) {
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      // 在这里判断订阅的类型已经存在的情况，已经存在就将event[type]由function变为数组
      if (typeof existing === 'function') {
        // 判断是否是后来者函数前置
        existing = events[type] = prepend
          ? [listener, existing]
          : [existing, listener];
      } else if (prepend) {
        // 这种情况，event[type]已经是数组了，因此从数组头部插入函数
        existing.unshift(listener);
      } else {
        // 与上面相反，从数组尾部插入
        existing.push(listener);
      }

      // 获取最大订阅数量
      m = $getMaxListeners(target);
      if (m > 0 && existing.length > m && !existing.warned) {
        existing.warned = true;
        var w = new Error(
          'Possible EventBus memory leak detected. ' +
            existing.length +
            ' ' +
            String(type) +
            ' listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit'
        );
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        ProcessEmitWarning(w);
      }
    }

    return target;
  }
  on(type, listener) {
    this._addListener(this, type, listener, false);
  }
  emit(type) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
    // 上述也可以写成代码如下
    // var args = Array.prototype.slice.call(arguments, 1);
    var doError = type === 'error';

    var events = this._events;
    if (events !== undefined) doError = doError && events.error === undefined;
    else if (!doError) return false;

    // 错误处理，抛出错误
    if (doError) {
      var er;
      if (args.length > 0) er = args[0];
      if (er instanceof Error) {
        // 如果是Error类型的错误，就直接抛出
        throw er;
      }
      // 如果不是，则包装成错误对象并抛出
      var err = new Error(
        'Unhandled error.' + (er ? ' (' + er.message + ')' : '')
      );
      err.context = er;
      throw err;
    }
  }
}

Object.defineProperty(EventBus, 'defaultMaxListeners', {
  enumerable: true, // 此属性是否可以被枚举（使用for...in或Object.keys()）
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
          arg +
          '.'
      );
    }
    defaultMaxListeners = arg;
  },
});

let t = new EventBus();
t.on('haha', function(text) {
  console.log(text);
});
t.emit('haha', 'text');
