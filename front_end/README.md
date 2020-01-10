# 前端每日一题

在这里记录着每天自己遇到的一道前端问题。

## 分类

- [2019 年度](./2019)
- [vue 系列](./vue)
- [浏览器相关问题](./浏览器)
- [css](./css)
- [javascript 基础](./javascript)
- [es6 相关](./es6)

## 最新问题

### **2019/08/05 - 2019/08/11** :watch:

- vm.\$set()实现原理是什么?

  <details>
  <summary>点击</summary>

  因为组件是可以复用的,JS 里对象是引用关系,如果组件 data 是一个对象,那么子组件中的 data 属性值会互相污染,产生副作用。

  所以一个组件的 data 选项必须是一个函数,因此每个实例可以维护一份被返回对象的独立的拷贝。new Vue 的实例是不会被复用的,因此不存在以上问题。

  ```js
  export function set(target: Array<any> | Object, key: any, val: any): any {
    // target 为数组
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      // 修改数组的长度, 避免索引>数组长度导致splice()执行有误
      target.length = Math.max(target.length, key); // 利用数组的splice变异方法触发响应式
      target.splice(key, 1, val);
      return val;
    }
    // target为对象, key在target或者target.prototype上 且必须不能在 Object.prototype 上,直接赋值
    if (key in target && !(key in Object.prototype)) {
      target[key] = val;
      return val;
    }
    // 以上都不成立, 即开始给target创建一个全新的属性
    // 获取Observer实例
    const ob = (target: any).__ob__; // target 本身就不是响应式数据, 直接赋值
    if (!ob) {
      target[key] = val;
      return val;
    }
    // 进行响应式处理
    defineReactive(ob.value, key, val);
    ob.dep.notify();
    return val;
  }
  ```

  1. 如果目标是数组,使用 vue 实现的变异方法 splice 实现响应式

  2. 如果目标是对象,判断属性存在,即为响应式,直接赋值

  3. 如果 target 本身就不是响应式,直接赋值

  4. 如果属性不是响应式,则调用 defineReactive 方法进行响应式处理

  </details>

- Vue 组件 data 为什么必须是函数 ?

  <details>
  <summary>点击</summary>

  因为组件是可以复用的,JS 里对象是引用关系,如果组件 data 是一个对象,那么子组件中的 data 属性值会互相污染,产生副作用。

  所以一个组件的 data 选项必须是一个函数,因此每个实例可以维护一份被返回对象的独立的拷贝。new Vue 的实例是不会被复用的,因此不存在以上问题。

  </details>

- vue 是如何对数组方法进行变异的 ?

  <details>
  <summary>点击</summary>

  简单来说,Vue 通过原型拦截的方式重写了数组的 7 个方法,首先获取到这个数组的 ob,也就是它的 Observer 对象,如果有新的值,就调用 observeArray 对新的值进行监听,然后手动调用 notify,通知 render watcher,执行 update

  </details>

- Vue 中的 key 到底有什么用？

  <details>
  <summary>点击</summary>

  key 是给每一个 vnode 的唯一 id,依靠 key,我们的 diff 操作可以更准确、更快速 (对于简单列表页渲染来说 diff 节点也更快,但会产生一些隐藏的副作用,比如可能不会产生过渡效果,或者在某些节点有绑定数据（表单）状态，会出现状态错位。)

  diff 算法的过程中,先会进行新旧节点的首尾交叉对比,当无法匹配的时候会用新节点的 key 与旧节点进行比对,从而找到相应旧节点.

  更准确 : 因为带 key 就不是就地复用了,在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确,如果不加 key,会导致之前节点的状态被保留下来,会产生一系列的 bug。

  更快速 : key 的唯一性可以被 Map 数据结构充分利用,相比于遍历查找的时间复杂度 O(n),Map 的时间复杂度仅仅为 O(1),源码如下:

  </details>

- [computed 和 watch 有什么区别及运用场景?](./vue/computed和watch有什么区别及运用场景.md)
- [computed 的实现原理](./vue/computed的实现原理.md)
