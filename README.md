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

- JavaScript 严格模式下有哪些不同？

  <details>
  <summary>点击</summary>

  - 不允许不使用 var 关键字去创建全局变量，抛出 ReferenceError
  - 不允许对变量使用 delete 操作符，抛 ReferenceError
  - 不可对对象的只读属性赋值，不可对对象的不可配置属性使用 delete 操作符，不可为不可拓展的对象添加属性，均抛 TypeError
  - 对象属性名必须唯一
  - 函数中不可有重名参数
  - 在函数内部对修改参数不会反映到 arguments 中
  - 淘汰 arguments.callee 和 arguments.caller
  - 不可在 if 内部声明函数
  - 抛弃 with 语句

  </details>

- 说出下列代码的输出顺序？

  <details>
  <summary>点击</summary>

  ```html
  <div id="app">
    <span id="name" ref="name">{{ name }}</span>
    <button @click="change">change name</button>
    <div id="content"></div>
  </div>
  <script>
    new Vue({
      el: '#app',
      data() {
        return {
          name: 'SHERlocked93',
        };
      },
      methods: {
        change() {
          const $name = this.$refs.name;
          this.$nextTick(() => console.log('setter前：' + $name.innerHTML));
          this.name = ' name改喽 ';
          console.log('同步方式：' + this.$refs.name.innerHTML);
          setTimeout(() =>
            this.console('setTimeout方式：' + this.$refs.name.innerHTML)
          );
          this.$nextTick(() => console.log('setter后：' + $name.innerHTML));
          this.$nextTick().then(() =>
            console.log('Promise方式：' + $name.innerHTML)
          );
        },
      },
    });
  </script>
  ```

  这里涉及的知识是 vue.\$nextTick()原理，详情可查看[《全面解析 Vue.nextTick 实现原理》](https://mp.weixin.qq.com/s/mCcW4OYj3p3471ghMBylBw)

  ```
  同步方式：SHERlocked93
  setter前：SHERlocked93
  setter后：name改喽
  Promise方式：name改喽
  setTimeout方式：name改喽
  ```

  </details>

* 实现一个 LazyMan，可以按照以下方式调用

  > LazyMan(“Hank”) 输出: Hi! This is Hank!
  >
  > LazyMan(“Hank”).sleep(10).eat(“dinner”) 输出 Hi! This is Hank! // 等待 10 秒.. Wake up after 10 Eat dinner~
  >
  > LazyMan(“Hank”).eat(“dinner”).eat(“supper”) 输出 Hi This is Hank! Eat dinner~ Eat supper~

  <details>
  <summary>点击</summary>

  ```js
  class LazyMan {
    constructor(name) {
      this.name = name;
      this.asyncFun = Promise.resolve();
      console.log(`--------- 我就是 ${this.name}! ---------`);
    }
    sleep(delay) {
      this.asyncFun = this.asyncFun.then(() => {
        return new Promise(resolve => {
          setTimeout(() => {
            console.log(`--------- 我睡了 ${delay / 1000}s 然后 ----------`);
            resolve();
          }, delay);
        });
      });
      return this; //提供 ”链式调用“
    }
    eat(food) {
      this.asyncFun = this.asyncFun.then(() => {
        console.log(`--------- 吃 ${food}~ ---------`);
        return Promise.resolve();
      });
      return this;
    }
  }

  new LazyMan('小皮咖')
    .sleep(4000)
    .eat('豆浆')
    .eat('油条')
    .sleep(2000)
    .eat('炒年糕');
  ```

  </details>

* vue \$set 的作用是？

  向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性

* 手写一个 sleep 函数？

  <details>
  <summary>点击</summary>

  ```js
  // 时间戳版本
  function sleep(time) {
    let startTime = new Date().getTime();
    while (new Date().getTime() - startTime < time) {}
    console.log('sleep ' + time + 'ms');
  }
  // promise
  function sleep2(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('sleep ' + time + 'ms');
        resolve();
      }, time);
    });
  }

  // 测试
  const haha = async () => {
    console.log(11);
    sleep(2000);
    await sleep2(3000);
    console.log(222);
  };

  haha();
  ```

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
