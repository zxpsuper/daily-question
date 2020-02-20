
## 手动实现call、apply、bind.md

#### call

1. 判断当前 `this` 是否为函数，防止 `Function.prototype.myCall()` 直接调用
2. `context` 为可选参数，如果不传的话默认上下文为 `window`
3. 为 `context` 创建一个 `Symbol`（保证不会重名）属性，将当前函数赋值给这个属性
4. 处理参数，传入第一个参数后的其余参数
5. 调用函数后即删除该 `Symbol` 属性

```js
Function.prototype.myCall = function(context = window, ...args) {
    if (this === Function.prototype) {
        return undefined; // 用于防止 Function.prototype.myCall() 直接调用
    }
    context = context || window;
    const fn = Symbol();
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
};
```

#### apply

`apply` 实现类似 `call`，参数为数组

```js
Function.prototype.myApply = function(context = window, args) {
    if (this === Function.prototype) {
        return undefined; // 用于防止 Function.prototype.myCall() 直接调用
    }
    const fn = Symbol();
    context[fn] = this;
    let result;
    if (Array.isArray(args)) {
        result = context[fn](...args);
    } else {
        result = context[fn]();
    }
    delete context[fn];
    return result;
};
```

#### bind

因为 `bind()` 返回一个方法需手动执行，因此利用闭包实现。

```js
Function.prototype.myBind = function(context, ...args1) {
    if (this === Function.prototype) {
        throw new TypeError('Error');
    }
    const _this = this;
    return function F(...args2) {
        // 判断是否用于构造函数
        if (this instanceof F) {
            return new _this(...args1, ...args2);
        }
        return _this.apply(context, args1.concat(args2));
    };
};
```