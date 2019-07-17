# this 的几种使用场景

`JavaScript` 中的 `this` 含义要丰富得多，它可以是全局对象、当前对象或者任意对象，这完全取决于函数的调用方式。`JavaScript` 中函数的调用有以下几种方式：

## 1. 作为对象方法调用

在 `JavaScript` 中，函数也是对象，因此函数可以作为一个对象的属性，此时该函数被称为该对象的方法，在使用这种调用方式时，`this` 被自然绑定到该对象

```js
var test = {
    a:0,
    b:0
    get:function(){
        return this.a;
    }
}
```

## 2. 作为函数调用(全局调用)

函数也可以直接被调用，此时 `this` 绑定到全局对象。在浏览器中，`window` 就是该全局对象。比如下面的例子：函数被调用时，`this` 被绑定到全局对象，接下来执行赋值语句，相当于隐式的声明了一个全局变量。

```js
var x = 10;
function foo() {
  console.log(this); //Window
  console.log(this.x); //10
}
foo();
```

## 3. 作为构造函数调用

`javaScript` 支持面向对象式编程，与主流的面向对象式编程语言不同，`JavaScript` 并没有类（`class`）的概念，而是使用基于原型（`prototype`）的继承方式。相应的，`JavaScript` 中的构造函数也很特殊，如果不使用 `new` 调用，则和普通函数一样。作为又一项约定俗成的准则，构造函数以大写字母开头，提醒调用者使用正确的方式调用。如果调用正确，`this` 绑定到新创建的对象上。

```js
function Foo() {
  this.x = 10;
  console.log(this); //Foo {x:10}
}
var foo = new Foo();
console.log(foo.x); //10
```

## 4. 在 `call` 或者 `apply`，`bind` 中调用

当一个函数被 call、apply 或者 bind 调用时，this 的值就取传入的对象的值。

```js
var obj = {
  x: 10,
};
function foo() {
  console.log(this); //{x: 10}
  console.log(this.x); //10
}
foo.call(obj);
foo.apply(obj);
foo.bind(obj)();
```

## 5. DOM event this

在一个 HTML DOM 事件处理程序里，this 始终指向这个处理程序所绑定的 HTML DOM 节点

```js
function Listener() {
  document.getElementById('foo').addEventListener('click', this.handleClick); //这里的 this 指向 Listener 这个对象。不是强调的是这里的 this
}
Listener.prototype.handleClick = function(event) {
  console.log(this); //<div id="foo"></div>
};
var listener = new Listener();
document.getElementById('foo').click();
```

## 6. 箭头函数中的 this

箭头函数内部的 this 是词法作用域，由上下文确定。

```js
var obj = {
  x: 10,
  foo: function() {
    var fn = () => {
      return () => {
        return () => {
          console.log(this); //Object {x: 10}
          console.log(this.x); //10
        };
      };
    };
    fn()()();
  },
};
obj.foo();
```
