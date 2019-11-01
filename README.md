# 每日一题[（生活一题）](./life.md):books:

[3 月至 5 月每日一题](./3-5.md)

在这里记录着每天自己遇到的一道印象深刻的前端问题，以及一道生活中随处可见的小问题。

强迫自己形成积累的习惯，鞭挞自己不断前行，共同学习。

### **2019/06/17 - 2019/06/23** :watch:

---

- 正则的贪婪模式和混淆模式？

- `getBoundingClientRect()` 的作用？

  用于获取某个元素相对于视窗的位置集合。集合中有**top**, **right**, **bottom**, **left** 等属性。

### **2019/06/10 - 2019/06/16** :watch:

---

- 为什么 var 可以重复声明？

  因为编译器会在判断有已经声明的同名变量时忽略 var，然后直接赋值

- requestAnimationFrame 实现的动画如何清除？

    <details>
    <summary>点击</summary>

  使用 cancelAnimationFrame，如下：

  ```js
  let animate = requestAnimationFrame(animateFunc);

  cancelAnimationFrame(animate);
  ```

    </details>

- js 动画为何推荐用 **requestAnimationFrame** 而不用 **setTimeout** ?

    <details>
    <summary>点击</summary>

  requestAnimationFrame，顾名思义就是请求动画帧. 以屏幕刷新频率（一般是每秒 60 帧）更新动画，符合人眼的**视觉停留效应**

  为何不用 **setTimeout** ？

  利用 **seTimeout** 实现的动画在某些低端机上会出现卡顿、抖动的现象。 这种现象的产生有两个原因：

  - setTimeout 的执行时间并不是确定的。在 Javascript 中， setTimeout 任务被放进了异步队列中，只有当主线程上的任务执行完以后，才会去检查该队列里的任务是否需要开始执行，因此 setTimeout 的实际执行时间一般要比其设定的时间晚一些。

  - 刷新频率受屏幕分辨率和屏幕尺寸的影响，因此不同设备的屏幕刷新频率可能会不同，而 setTimeout 只能设置一个固定的时间间隔，这个时间不一定和屏幕的刷新时间相同。

  以上两种情况都会导致 setTimeout 的执行步调和屏幕的刷新步调不一致，从而引起丢帧现象。

  requestAnimationFrame 还有以下两个优势：

  - CPU 节能：使用 setTimeout 实现的动画，当页面被隐藏或最小化时，setTimeout 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费 CPU 资源。而 requestAnimationFrame 则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统步伐走的 requestAnimationFrame 也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了 CPU 开销。

  - 函数节流：在高频率事件(resize,scroll 等)中，为了防止在一个刷新间隔内发生多次函数执行，使用 requestAnimationFrame 可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。一个刷新间隔内函数执行多次时没有意义的，因为显示器每 16.7ms 刷新一次，多次绘制并不会在屏幕上体现出来。

    </details>

* 如何获取页面某个元素的背景色 background-color?

- 首屏渲染白屏的原因可能有哪些？

- 为何要控制 http 的请求个数？

- 淘宝 flex 的原理？

### **2019/06/03 - 2019/06/09** :watch:

---

- 缓存策略？

- 为什么要将 小图标 转化为 base64 ?

- webpack 流程是怎样子的？

- xss 攻击如何防止窃取 cookie ?

- xss 攻击会造成怎样的影响 ?

* 如何防止网络攻击？

* 网络攻击有哪些？

![](https://raw.githubusercontent.com/zxpsuper/daily-question/master/image/fork_and_star.jpg)
