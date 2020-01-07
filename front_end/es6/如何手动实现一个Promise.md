# 如何手动实现一个 Promise ?

  promise 的三种状态 pending, resolve, reject

```js
function MyPromise(callback) {
  let that = this;
  //定义初始状态
  //Promise状态
  that.status = 'pending';
  //value
  that.value = 'undefined';
  //reason 是一个用于描述Promise被拒绝原因的值。
  that.reason = 'undefined';
  //用来解决异步问题的数组
  that.onFullfilledArray = [];
  that.onRejectedArray = [];

  //定义resolve
  function resolve(value) {
    //当status为pending时，定义Javascript值，定义其状态为fulfilled
    if (that.status === 'pending') {
      that.value = value;
      that.status = 'resolved';
      that.onFullfilledArray.forEach(func => {
        func(that.value);
      });
    }
  }

  //定义reject
  function reject(reason) {
    //当status为pending时，定义reason值，定义其状态为rejected
    if (that.status === 'pending') {
      that.reason = reason;
      that.status = 'rejected';
      that.onRejectedArray.forEach(func => {
        func(that.reason);
      });
    }
  }

  //捕获callback是否报错
  try {
    callback(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  let that = this;
  //需要修改下，解决异步问题，即当Promise调用resolve之后再调用then执行onFulfilled(that.value)。
  //用两个数组保存下onFulfilledArray
  if (that.status === 'pending') {
    that.onFullfilledArray.push(value => {
      onFulfilled(value);
    });

    that.onRejectedArray.push(reason => {
      onRejected(reason);
    });
  }

  if (that.status === 'resolved') {
    onFulfilled(that.value);
  }

  if (that.status === 'rejected') {
    onRejected(that.reason);
  }
};
```


