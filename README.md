# 前端每日一题 :books:

## 项目介绍

- 在这里记录着每天自己遇到的一道印象深刻的前端问题，一道生活中随处可见的小问题。

- 强迫自己形成积累的习惯，鞭挞自己不断前行，共同学习。

- 贵在坚持与积累，充电加油只为遇到更好的自己

- 欢迎大家到 Issues 交流，鼓励 PR，感谢 Star、感谢 watch，大家有啥好的建议可以加我微信一起交流讨论！

<img src="./image/wechat.png" style="width: 320px; margin: 0 auto; display: block">

**备注：**

> 在 github 项目的右上角，有三个按钮,分别是 watch、star、fork，新来的同学注意不要用错了，无休止的邮件提醒会给你造成不必要的信息干扰。
>
> 当你选择 Watching，表示你以后会关注这个项目的全部动态，以后只要这个项目发生变动，被别人提交了 pull request、被发起了 issue 等情况你都会收到邮件通知。
>
> star 相当于是点赞或收藏，方便以后查找。
>
> fork 表示你想要补充完善这个项目的内容。

![](./image/fork_and_star.jpg)

## 项目模块

|           模块            | 描述                                         |
| :-----------------------: | :------------------------------------------- |
| [每日一题](./front_end/)  | 记录着自己工作上遇到的前端问题               |
|    [生活一题](./life/)    | 记录着自己生活上遇到的奇奇怪怪形形色色的问题 |
|  [每日一文](./article/)   | 记录着自己工作或者生活上看到的好文           |
| [前端算法](./algorithm//) | 保存着一些前端算法题目及答案                 |

## 最新问题 :question:

- `async await`在事件队列中是怎样的存在？

  <details>
  <summary>点击</summary>

  从字面意思上看await就是等待，await 等待的是一个表达式，这个表达式的返回值可以是一个 promise 对象也可以是其他值。

  很多人以为 await 会一直等待之后的表达式执行完之后才会继续执行后面的代码，实际上 await 是一个让出线程的标志。await 后面的表达式会先执行一遍，将 await 后面的代码加入到 microtask中，然后就会跳出整个 async 函数来执行后面的代码。

  由于因为 async await 本身就是 promise+generato r的语法糖。所以 await 后面的代码是 microtask。所以
    ```js
    async function async1() {
      console.log('async1 start');
      await async2();
      console.log('async1 end');
    }
    // 等价于
    async function async1() {
      console.log('async1 start');
      Promise.resolve(async2()).then(() => {
                    console.log('async1 end');
            })
    }
    ```
  </details>

- 深度优先遍历和广度优先遍历?

  <details>
  <summary>点击</summary>

  深度优先：找到一个节点后，把它的后辈都找出来，最常用递归法。

  广度优先：找到一个节点后，把他同级的兄弟节点都找出来放在前边，把孩子放到后边，最常用 while

  </details>


- `['1', '2', '3'].map(parseInt)` 的输出结果是什么？

  <details>
  <summary>点击</summary>

  第一眼看到这个题目的时候，脑海跳出的答案是 `[1, 2, 3]`，但是真正的答案是`[1, NaN, NaN]`。

  首先让我们回顾一下，map 函数的第一个参数 callback：

  `var new_array = arr.map(function callback(currentValue[, index[, array]]) { // Return element for new_array }[, thisArg])`

  这个 callback 一共可以接收三个参数，其中第一个参数代表当前被处理的元素，而第二个参数代表该元素的索引。

  而parseInt则是用来解析字符串的，使字符串成为指定基数的整数。
  `parseInt(string, radix)`
  接收两个参数，第一个表示被处理的值（字符串），第二个表示为解析时的基数。

  了解这两个函数后，我们可以模拟一下运行情况
  ```js
  parseInt('1', 0) //radix为0时，且string参数不以“0x”和“0”开头时，按照10为基数处理。这个时候返回1

  parseInt('2', 1) //基数为1（1进制）表示的数中，最大值小于2，所以无法解析，返回NaN

  parseInt('3', 2) //基数为2（2进制）表示的数中，最大值小于3，所以无法解析，返回NaN
  ```
  map函数返回的是一个数组，所以最后结果为 `[1, NaN, NaN]`

  </details>

- `a.b.c.d` 和 `a['b']['c']['d']`，哪个性能更高？

  <details>
  <summary>点击</summary>

  a.b.c.d 比 a['b']['c']['d'] 性能高点，后者还要考虑 [ ] 中是变量的情况，再者，从两种形式的结构来看，显然编译器解析前者要比后者容易些，自然也就快一点。

  ![两者的 AST 对比](https://user-images.githubusercontent.com/9009389/56872978-501d9a00-6a61-11e9-9e69-85ff00c031fc.png)

  </details>
  
- vue Diff 的比较逻辑

  
  <details>
  <summary>点击</summary>

    Vue 只会对**新旧节点**中 **父节点是相同节点** 的 **那一层子节点** 进行比较

    也可以说成是

    **只有两个新旧节点是相同节点的时候，才会去比较他们各自的子节点**

    最大的根节点一开始可以直接比较

    这也叫做 **同层级比较**，并不需要递归，虽然好像降低了一些复用性，也是为了避免过度优化，是一种很高效的 Diff 算法


    **比较逻辑：**
    
    1、能不移动，尽量不移动

    2、没得办法，只好移动

    3、实在不行，新建或删除

  </details>

- 组件的 data 为什么要写成函数形式？

  <details>
  <summary>点击</summary>

    Vue 的组件都是可复用的，一个组件创建好后，可以在多个地方复用，而不管复用多少次，组件内的 data 都应该是相互隔离，互不影响的，所以组件每复用一次，data 就应该复用一次，每一处复用组件的 data 改变应该对其他复用组件的数据不影响。

    为了实现这样的效果，data 就不能是单纯的对象，而是以一个函数返回值的形式，所以每个组件实例可以维护独立的数据拷贝，不会相互影响。

  </details>

## 日志 :ledger:

- **2019-03-27** —— 启动 daily-question（前端每日一题项目）

- **2019-12-16** —— 添加 **_前端算法_** 模块

- **2020-01-07** —— 优化项目结构，使其分类清晰，便于阅读

- **2020-01-10** —— 利用 nodejs 为每个分类文件夹自动生成 readme 文件

## 关于作者 :boy:

作者： 小皮咖

Email：zxpscau@163.com

Github: https://github.com/zxpsuper

知乎：https://www.zhihu.com/people/super-32-94-54/activities

掘金：https://juejin.im/user/5af17df4518825672a02e1f5

对内容有任何疑问，欢迎联系我。
