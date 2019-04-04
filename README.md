# 每日一题[（生活一题）](./life.md)

在这里记录着每天自己遇到的一道印象深刻的前端问题，以及一道生活中随处可见的小问题。

强迫自己形成积累的习惯，鞭挞自己不断前行，共同学习。

### **2019/03/27 - 2019/03/31**

- 请问这句语句 `var args=[].slice.call(arguments,1)` 是什么意思？

  <details>
  <summary>点击</summary>

  先看原函数：

  ```js
  function a() {
    var args = [].slice.call(arguments, 1);
    console.log(args);
  }

  a("haha", 1, 2, 3, 4, 5); // log出[1, 2, 3, 4, 5]
  a("run", "-g", "-b"); // log出['-g', '-b']
  ```

  1. 首先，函数 call() 方法，第一个参数改变函数的 this 指向，后面剩余参数传入原函数 slice 中
  2. arguments 是什么？
     > arguments 是函数中的一个类数组的参数集合对象
     > 如： {'0': 'haha', '1': 1, '2': 2}
  3. slice 为数组可从已有的数组中返回选定的元素。
     > 此题为从 index = 1 往后
  4. 综上，这句语句的作用是——**将函数中的实参值转化成数组**
     </details>

- 连等赋值问题

  ```js
  var a = { n: 1 };
  var b = a;
  a.x = a = { n: 2 };
  // a ? b ? a.x ? 结果是什么？
  ```

    <details>
      <summary>点击</summary>

      我们可以先尝试交换下连等赋值顺序（a = a.x = {n: 2};），可以发现输出不变，即顺序不影响结果。

      那么现在来解释对象连等赋值的问题：按照 es5 规范，题中连等赋值等价于
      a.x = (a = { n: 2 });，按优先获取左引用（lref），然后获取右引用（rref）的顺序，a.x 和 a 中的 a 都指向了{ n: 1 }。至此，至关重要或者说最迷惑的一步明确。(a = {n: 2})执行完成后，变量 a 指向{n: 2}，**并返回{n: 2}**;接着执行 a.x = { n: 2 }，这里的 a 就是 b（指向{ n: 1 }），所以 b.x 就指向了{ n: 2 }。

      赋值时有返回该值， 如 `a = 4 // return 4` , 赋值变量 `let n = 5 //return undefinded`

      ```js
      a = { n: 2 };
      b = { n: 1, x: { n: 2 } };
      a.x = undefinded;
      ```

    </details>

- 如何手动实现一个 Promise ?

    <details>
    <summary>点击</summary>
    promise 的三种状态 pending, resolve, reject

  ```js
  function MyPromise(callback) {
    let that = this;
    //定义初始状态
    //Promise状态
    that.status = "pending";
    //value
    that.value = "undefined";
    //reason 是一个用于描述Promise被拒绝原因的值。
    that.reason = "undefined";
    //用来解决异步问题的数组
    that.onFullfilledArray = [];
    that.onRejectedArray = [];

    //定义resolve
    function resolve(value) {
      //当status为pending时，定义Javascript值，定义其状态为fulfilled
      if (that.status === "pending") {
        that.value = value;
        that.status = "resolved";
        that.onFullfilledArray.forEach(func => {
          func(that.value);
        });
      }
    }

    //定义reject
    function reject(reason) {
      //当status为pending时，定义reason值，定义其状态为rejected
      if (that.status === "pending") {
        that.reason = reason;
        that.status = "rejected";
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
    if (that.status === "pending") {
      that.onFullfilledArray.push(value => {
        onFulfilled(value);
      });

      that.onRejectedArray.push(reason => {
        onRejected(reason);
      });
    }

    if (that.status === "resolved") {
      onFulfilled(that.value);
    }

    if (that.status === "rejected") {
      onRejected(that.reason);
    }
  };
  ```

  </details>

* AST（抽象语法树）？

  <details>
    <summary>点击</summary>

  **什么是 AST（抽象语法树）？**

  > It is a hierarchical program representation that presents source code structure according to the grammar of a programming language, each AST node corresponds to an item of a source code.
  >
  > 它是一种分层程序表示，它根据编程语言的语法呈现源代码结构，每个 AST 节点对应一个源代码项。

  Babel,Webpack，vue-cli 和 esLint 等很多的工具和库的核心都是通过 Abstract Syntax Tree (抽象语法树)这个概念来实现对代码的检查、分析等操作的。

  解析（parsing），转译（transforming），生成（generation）。

  将源码解析成 AST 抽象语法树，再对此语法树进行相应的转译，最后生成我们所需要的代码。

  第三方的生成 AST 库有很多，这里推荐几个——esprima, babylon(babel 使用)

  其转化的内容大致是这样的：

  ```json
  {
    "type": "Program",
    "start": 0,
    "end": 16,
    "body": [
      {
        "type": "FunctionDeclaration",
        "start": 0,
        "end": 16,
        "id": {
          "type": "Identifier",
          "start": 9,
          "end": 12,
          "name": "ast"
        },
        "expression": false,
        "generator": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 14,
          "end": 16,
          "body": []
        }
      }
    ],
    "sourceType": "module"
  }
  ```

  **AST 的使用场景**

  - 代码语法的检查、代码风格的检查、代码的格式化、代码的高亮、代码错误提示、代码自动补全等等.
  - 代码混淆压缩
  - 优化变更代码，改变代码结构使达到想要的结构
    </details>

![](https://raw.githubusercontent.com/zxpsuper/daily-question/master/image/fork_and_star.jpg)
