# 每日一题[（生活一题）](./life.md)

在这里记录着每天自己遇到的一道印象深刻的前端问题，以及一道生活中随处可见的小问题。

强迫自己形成积累的习惯，鞭挞自己不断前行，共同学习。

### **2019/03/27 - 2019/03/31**

- 请问这句语句 `var args=[].slice.call(arguments,1)` 是什么意思？

  <details>
  <summary>答案</summary>

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
      <summary>答案如下</summary>

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

- AST 语法是什么？
  <details>
    <summary>请点击</summary>
  </details>
