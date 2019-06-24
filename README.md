# 每日一题[（生活一题）](./life.md)

在这里记录着每天自己遇到的一道印象深刻的前端问题，以及一道生活中随处可见的小问题。

强迫自己形成积累的习惯，鞭挞自己不断前行，共同学习。

### **2019/04/22 - 2019/04/28**

---

- 监听页面关闭或者刷新事件？

  <details>
  <summary>点击</summary>
  这个时候就需要给 a 标签添加一个属性“download”，如：

  ```html
  <a
    href="https://github.com/zxpsuper/Demo/archive/master.zip"
    download="master.zip"
    >点击下载</a
  >
  ```

  </details>

* 如何实现点击按钮下载文件？

  <details>
  <summary>点击</summary>
  这个时候就需要给 a 标签添加一个属性“download”，如：

  ```html
  <a
    href="https://github.com/zxpsuper/Demo/archive/master.zip"
    download="master.zip"
    >点击下载</a
  >
  ```

  </details>

* 立即执行函数 ？

  <details>
  <summary>点击</summary>

  立即执行函数（IIFE）常用于第三方库，好处在于隔离作用域，任何一个第三方库都会存在大量的变量和函数，为了避免变量污染（命名冲突），开发者们想到的解决办法就是使用立即执行函数。

  通过定义一个匿名函数，创建了一个新的函数作用域，相当于创建了一个“私有”的命名空间，该命名空间的变量和方法，不会破坏污染全局的命名空间。此时若是想访问全局对象，将全局对象以参数形式传进去即可

  ```js
  (function() {})();
  ```

  </details>

* 函数柯里化的理解？

  <details>
  <summary>点击</summary>

  在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

  那究竟柯里化有什么作用呢？常见的作用是：参数复用、延迟运行、扁平化

  </details>

### **2019/04/15 - 2019/04/21**

---

- 写一个乱序函数 ？

  <details>
  <summary>点击</summary>

  遍历数组元素，然后将当前元素与以后随机位置的元素进行交换。

  ```js
  function shuffle(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      // es6语法
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
  }
  ```

  </details>

- 什么是惰性函数？

  <details>
  <summary>点击</summary>

  惰性函数就是返回一个重写函数。example:

  ```js
  var foo = function() {
    var t = new Date();
    foo = function() {
      return t;
    };
    return foo();
  };

  foo();
  ```

  </details>

- 静态作用域与动态作用域 ？

  <details>
  <summary>点击</summary>

  静态作用域 —— 函数的作用域基于函数创建的位置。

  动态作用域 —— 函数的作用域基于函数的使用位置。

  ```js
  var value = 1;

  function foo() {
    console.log(value);
  }

  function bar() {
    var value = 2;
    foo();
  }

  bar(); // 输出 1 。JavaScript 采用的是词法作用域，也称为静态作用域。相同的，动态作用域此代码应该输出 2
  ```

  </details>

- 手写一个 function call()函数 ？

  <details>
  <summary>点击</summary>

  ```js
  Function.prototype.call2 = function(context, ...args) {
    // 因为传进来的 context 有可能是 null
    context = context || window;
    // Function.prototype this 为当前运行的函数
    // 让 fn 的上下文为 context
    context.fn = this;

    const result = context.fn(...args);

    delete context.fn;

    return result;
  };
  ```

  <details>

* Vue 组件中的 name 属性的作用 ？

  <details>
  <summary>点击</summary>

  组件在全局用 Vue.component() 注册时，全局 ID 自动作为组件的 name。

  指定 name 选项的另一个好处是便于调试。有名字的组件有更友好的警告信息。另外，当在有 vue-devtools，未命名组件将显示成 <AnonymousComponent>，这很没有语义。通过提供 name 选项，可以获得更有语义信息的组件树。

  </details>

- Hash 路由和 History 路由的区别 ？

  <details>
  <summary>点击</summary>

  1. hash 路由

  hash 路由一个明显的标志是带有#,我们主要是通过监听 url 中的 hash 变化来进行路由跳转。(`window.addEventListener('hashchange', this.refresh, false);`)

  hash 的优势就是兼容性更好,在老版 IE 中都有运行,问题在于 url 中一直存在#不够美观,而且 hash 路由更像是 Hack 而非标准,相信随着发展更加标准化的 History API 会逐步蚕食掉 hash 路由的市场。

  2. history 路由

  history 路由使用 History API 来实现，具体有:

  ```js
  window.history.back(); // 后退
  window.history.forward(); // 前进
  window.history.go(-3); // 后退三个页面
  ```

  `history.pushState`用于在浏览历史中添加历史记录, `history.replaceState`方法的参数与`pushState`方法一模一样，区别是它修改浏览历史中当前纪录,而非添加记录,同样不触发跳转。

  </details>

- Vue 的响应式原理中 `Object.defineProperty` 有什么缺陷？为什么在 Vue3.0 采用了 `Proxy`，抛弃了 `Object.defineProperty`？

  <details>
  <summary>点击</summary>

  1. Object.defineProperty 无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应；

  2. Object.defineProperty 只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。Proxy 可以劫持整个对象，并返回一个新的对象。

  3. Proxy 不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。

  </details>

### **2019/04/08 - 2019/04/14**

---

- 写一个“终极类型”判断函数？

  <details>
  <summary>点击</summary>

  ```js
  function type(obj) {
    var toString = Object.prototype.toString;
    var toType = {};
    var typeArr = [
      'Undefined',
      'Null',
      'Boolean',
      'Number',
      'String',
      'Object',
      'Array',
      'Function',
      'Date',
      'RegExp',
      'Error',
      'Arguments',
    ];
    typeArr.map(function(item, index) {
      toType['[object ' + item + ']'] = item.toLowerCase();
    });

    return typeof obj !== 'object' ? typeof obj : toType[toString.call(obj)];
  }
  ```

  </details>

* 写一个函数，判断各种类型的不同变量是否相等，即“终极等于”函数？

  <details>
  <summary>点击</summary>

  ```js
  const equals = (a, b) => {
    if (a === b) return true;
    if (a instanceof Date && b instanceof Date)
      return a.getTime() === b.getTime();
    if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
      return a === b;
    if (a.prototype !== b.prototype) return false;
    if (Array.isArray(a) && Array.isArray(b)) a.sort(), b.sort();

    let keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;
    return keys.every(k => equals(a[k], b[k]));
  };
  ```

  </details>

- mouseover 和 mouseenter 的区别 ？

  <details>
  <summary>点击</summary>
  mouseover：当鼠标移入元素或其子元素都会触发事件，所以有一个重复触发，冒泡的过程。对应的移除事件是 mouseout

  mouseenter：当鼠标移除元素本身（不包含元素的子元素）会触发事件，也就是不会冒泡，对应的移除事件是 mouseleave

  </details>

- 一句话形容闭包？

  闭包就是能够读取其他函数内部变量的函数，或者子函数在外调用，子函数所在的父函数的作用域不会被释放。

- js 的 new 操作符做了哪些事情 ?

  new 操作符新建了一个空对象，这个对象原型指向构造函数的 prototype，执行构造函数后返回这个对象。

- 实现一个深拷贝 ?

  <details>
  <summary>点击</summary>

  ```js
  //所谓深度克隆，就是当对象的某个属性值为object或array的时候，要获得一份copy，而不是直接拿到引用值

  function deepClone1(origin, target) {
    //origin是被克隆对象，target是我们获得copy
    var target = target || {}; //定义target
    for (var key in origin) {
      //遍历原对象
      if (origin.hasOwnProperty(key)) {
        if (Array.isArray(origin[key])) {
          //如果是数组
          target[key] = [];
          deepClone1(origin[key], target[key]); //递归
        } else if (typeof origin[key] === 'object' && origin[key] !== null) {
          target[key] = {};
          deepClone1(origin[key], target[key]); //递归
        } else {
          target[key] = origin[key];
        }
      }
    }
    return target;
  }

  function deepClone2(data) {
    if (!data || !(data instanceof Object) || typeof data === 'function') {
      return data;
    }
    var constructor = data.constructor;
    var result = new constructor();
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        result[key] = deepClone2(data[key]);
      }
    }
    return result;
  }

  function deepClone3(origin, target) {
    var target = target || {},
      toStr = Object.prototype.toString;
    for (var prop in origin) {
      if (origin.hasOwnProperty(prop)) {
        //不能把原型链上的一起拷贝了
        //判断是元素类型还是引用类型
        if (typeof origin[prop] == 'object' && typeof origin[prop] !== 'null') {
          target[prop] = toStr.call(prop) == '[object Array]' ? [] : {};
          arguments.callee(origin[prop], target[prop]); //递归调用
        } else {
          target[prop] = origin[prop]; //原始类型直接复制
        }
      }
    }

    return target;
  }
  function deepClone4(obj) {
    //判断是否是简单数据类型，
    if (typeof obj == 'object') {
      //复杂数据类型
      var result = obj.constructor == Array ? [] : {};
      for (let i in obj) {
        result[i] =
          typeof obj[i] == 'object' && obj[i] !== null
            ? deepClone4(obj[i])
            : obj[i];
      }
    } else {
      //简单数据类型 直接 == 赋值
      var result = obj;
    }
    return result;
  }
  ```

  推荐使用 deepClone2()

  </details>

* 函数的防抖与节流 ？

  <details>
  <summary>点击</summary>

  **防抖**

  所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。（防误触）

  ```js
  // 延缓执行
  function debounce(func, wait) {
    var timeout;

    return function() {
      var context = this;
      var args = arguments;
      console.log(args);
      console.log(func);
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }
  // 立即执行
  function debounce(func, wait) {
    var timeout;

    return function() {
      var context = this;
      var args = arguments;

      if (timeout) clearTimeout(timeout);

      var callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);

      if (callNow) func.apply(context, args);
    };
  }
  ```

  **节流**

  所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。（限制流量）

  ```js
  // 时间戳
  function throttle(func, wait) {
    var previous = 0;

    return function() {
      var now = Date.now();
      var context = this;
      var args = arguments;
      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    };
  }
  // 定时器
  function throttle(func, wait) {
    var timeout;

    return function() {
      var context = this;
      var args = arguments;
      if (!timeout) {
        timeout = setTimeout(function() {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    };
  }
  ```

  </details>

### **2019/04/01 - 2019/04/07**

---

- 为何 `[] == ![]` 结果为 `true`，而 `{} == !{}` 却为 `false`

  <details>
  <summary>点击</summary>

  **首先了解一下类型转化的规则：**

  1、如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false 转换为 0，而 true 转换为 1；

  2、如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值

  3、如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf()（boolean 对象方法）方法或者 toString()方法，用得到的基本类型值按照前面的规则进行比较

  null 和 undefined 是相等的

  4、要比较相等性之前，不能将 null  和  undefined  转换成其他任何值

  5、如果有一个操作数是 NaN，则相等操作符返回 false ，而不相等操作符返回  true。重要提示：即使两个操作数都是 NaN，相等操作符也返回 false 了；因为按照规则， NaN 不等于 NaN （NaN 不等于任何值，包括他本身）

  6、如果两个操作数都是对象，则比较它们是不是同一个对象，如果两个操作数都指向同一个对象，则相等操作符返回 true；否则，返回 false

  7、 `!`可将变量转换成 boolean 类型，null、undefined、NaN 以及空字符串('')取反都为 true，其余都为 false。

  **现在开始分析题目**

  ```js
  [] == ![];
  // 先转化右边 ![],
  // `!`可将变量转换成 boolean 类型，null、undefined、NaN 以及空字符串('')取反都为 true，其余都为 false。
  // 所以 ![] => false => 0

  // 左边 [], 因为[].toString() 为空字符串,所以 [] => ''

  // 综上， '' == 0, 为 true
  ```

  ```js
  {} == !{}
  // 先转化右边 !{},
  // `!`可将变量转换成 boolean 类型，null、undefined、NaN 以及空字符串('')取反都为 true，其余都为 false。
  // 所以 !{} => false => 0

  // 左边 ({}).toString() => "[object Object]"

  // 综上， "[object Object]" == 0, 为 false
  ```

  </details>

- RESTful 接口的优缺点

  <details>
  <summary>点击</summary>

  **什么是 restful 接口 ？**

  REST -- REpresentational State Transfer，英语的直译就是“表现层状态转移”，它包含以下三个方面：

  URL 设计: RESTful 的核心思想就是，客户端发出的数据操作指令都是"动词 + 宾语"的结构。比如，GET /articles 这个命令，GET 是动词，/articles 是宾语。

  动词通常就是五种 HTTP 方法，对应 CRUD 操作。

  - GET：读取（Read）
  - POST：新建（Create）
  - PUT：更新（Update）
  - PATCH：更新（Update），通常是部分更新
  - DELETE：删除（Delete）

  状态码: 客户端的每一次请求，服务器都必须给出回应。回应包括 HTTP 状态码和数据两部分。

  服务器回应: API 返回的数据格式，不应该是纯文本，而应该是一个 JSON 对象，因为这样才能返回标准的结构化数据。所以，服务器回应的 HTTP 头的 `Content-Type` 属性要设为 `application/json。`

  **优点**

  简洁明了，一目了然；轻量，直接通过 http，不需要额外的协议，post/get/put/delete 操作

  **缺点**

  当一次更新的内容多的时候需要调用更多的接口。删除也是，如果我想批量删除呢？

  1. 对后端开发人员要求高，业务逻辑有时难以被抽象为资源的增删改查。

  2. 对前端开发人员不友好，API 粒度较粗，难以查询符合特殊要求的数据，同样的业务要比普通的 API 需要更多次 HTTP 请求。

     </details>

* 对视口 viewport 的理解 ?

  <details>
  <summary>点击</summary>

  **视口分为：layout viewport -- 布局视口，visual viewport -- 视觉视口，ideal viewport -- 理想视口**

  如果把移动设备上浏览器的可视区域设为 viewport 的话，某些网站就会因为 viewport 太窄而显示错乱，所以这些浏览器就决定默认情况下把 viewport 设为一个较宽的值，比如 980px，这样的话即使是那些为桌面设计的网站也能在移动浏览器上正常显示了。这个浏览器默认的 viewport 叫做 layout viewport。这个 layout viewport 的宽度可以通过 document.documentElement.clientWidth 来获取。

  layout viewport 的宽度是大于浏览器可视区域的宽度的，所以我们还需要一个 visual viewport 来代表浏览器可视区域的大小。visual viewport 的宽度可以通过 window.innerWidth 来获取

  ideal viewport 即每个设备完美适配的视口。所谓的完美适配指的是，第一不需要用户缩放和横向滚动条就能正常的查看网站的所有内容；第二是无论文字，图片等在不同的设备都能显示出差不多的效果。ideal viewport 并没有一个固定的尺寸，不同的设备拥有有不同的 ideal viewport。

  **mata 标签与 viewport 的关系**

  ```html
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
  />
  ```

  移动设备默认的是 layout viewport , 但是我们需要的是 ideal viewport, 那么通过 meta 标签的作用就是：让当前 viewport 的宽度等于设备的宽度，同时不允许用户手动缩放。

  **meta 标签中 content 的属性和值如下：**

  - width 设置 layout viewport 的宽度，为一个正整数，或字符串"width-device"

  - initial-scale 设置页面的初始缩放值，为一个数字，可以带小数

  - minimum-scale 允许用户的最小缩放值，为一个数字，可以带小数

  - maximum-scale 允许用户的最大缩放值，为一个数字，可以带小数

  - height 设置 layout viewport 的高度，这个属性对我们并不重要，很少使用

  - user-scalable 是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes 代表允许

  </details>

* 移动端的像素?

  <details>
  <summary>点击</summary>

  1、物理像素（设备像素）

  红蓝绿可以调配出任何颜色，通常说的手机像素就是由许多红蓝绿组成的一个小块，1 个小块表示 1 个像素。一个物理像素是显示器(手机屏幕)上最小的物理显示单元，通过控制每个像素点的颜色，使屏幕显示出不同的图像。屏幕从工厂出来那天起，它上面的物理像素点就固定不变了，单位 pt - 固定单位。

  比如：iPhone6、7、8 的分辨率为 1334\*750 像素表示,横向 750 个像素,纵向 1334 个像素

  2、CSS 像素

  CSS 和 JS 使用的抽象单位，浏览器内的一切长度都是以 CSS 像素为单位的，CSS 像素的单位是 px。

  一倍屏：当设备像素比为 1:1 时，使用 1（1×1）个设备像素显示 1 个 CSS 像素；

  二倍屏：当设备像素比为 2:1 时，使用 4（2×2）个设备像素显示 1 个 CSS 像素；

  三倍屏：当设备像素比为 3:1 时，使用 9（3×3）个设备像素显示 1 个 CSS 像素。

  3、像素密度（PPI）

  每英寸像素取值，也就是衡量单位物理面积内拥有像素值的情况。

  ![](https://math.jianshu.com/math?formula=PPI%3D%5Cfrac%7B%5Csqrt%7B%E9%95%BF%E5%BA%A6%E5%83%8F%E7%B4%A0%5E2%2B%E5%AE%BD%E5%BA%A6%E5%83%8F%E7%B4%A0%5E2%7D%7D%7B%E5%B1%8F%E5%B9%95%E8%8B%B1%E5%AF%B8%E6%95%B0%7D)

  ppi 越高，每英寸像素点越多，图像越清晰；我们可以类比物体的密度，密度越大，单位体积的质量就越大，ppi 越高，单位面积的像素越多。

  ppi 在 120-160 之间的手机被归为低密度手机，160-240 被归为中密度，240-320 被归为高密度，320 以上被归为超高密度（例如：苹果的 Retina 屏幕）

    </details>

* `__proto__`和 `prototype` 的区别 ？

  <details>
  <summary>点击</summary>

  1. 在 JS 里，万物皆对象。方法（Function）是对象，方法的原型(Function.prototype)是对象。因此，它们都会具有对象共有的特点。即：**对象具有属性`__proto__`，可称为隐式原型，一个对象的隐式原型指向构造该对象的构造函数的原型，这也保证了实例能够访问在构造函数原型中定义的属性和方法。**

  2. 方法(Function)方法这个特殊的对象，除了和其他对象一样有上述 proto 属性之外，还有自己特有的属性——原型属性（prototype），这个属性是一个指针，指向一个对象，这个对象的用途就是包含所有实例共享的属性和方法（我们把这个对象叫做原型对象）。原型对象也有一个属性，叫做 constructor，这个属性包含了一个指针，指回原构造函数。

  </details>

- 双精度浮点数是如何保存的 ?

  <details>
      <summary>点击</summary>

  在计算机中，浮点表示法，分为三大部分：

  第一部分用来存储符号位（sign），用来区分正负数，0 表示正数
  第二部分用来存储指数（exponent）
  第三部分用来存储小数（fraction）, 多出的末尾如果是 1 需要进位;

  双精度浮点数一共占据 64 位：

  符号位（sign）占用 1 位
  指数位（exponent）占用 11 位
  小数位（fraction）占用 52 位

  举个例子：0.1 的二进制为

  ```js
  0.00011001100110011001100110011001100110011001100110011001 10011...
  ```

  转化为 2 进制科学计数法

  ```js
  1.1001100110011001100110011001100110011001100110011001 * (2 ^ -4);
  ```

  也就是说 0.1 的：

  - 符号位为：0
  - 小数位为：1001100110011001100110011001100110011001100110011001
  - 指数位为：-4

  指数位为负数的怎么保存？为了减少不必要的麻烦，IEEE 规定了一个偏移量，对于指数部分，每次都加这个偏移量进行保存，这样即使指数是负数，那么加上这个偏移量也变为正数啦。为了使所有的负指数加上这个偏移量都能够变为正数，IEEE 规定 1023 为双精度的偏移量。

  因此指数部分为 -4 + 1023 = 1019， 转化成 11 位二进制为：01111111011

  因此 0.1 在内存中的保存为：

  ```js
    0 01111111011 1001100110011001100110011001100110011001100110011001
  ```

  </details>

* 如何找出字符串中出现最多的字母 （ababccdeajxac）?

  <details>
  <summary>点击</summary>

  最先想到的解法是用 map 纪录每个字符的次数，然后找出最多的即可：

  ```js
  function getMaxNumberOfChar(str) {
    return (str + '').split('').reduce(
      function(pre, cur, index, arr) {
        cur in pre ? pre[cur]++ : (pre[cur] = 1);
        pre[cur] > pre.value && ((pre.char = cur), (pre.value = pre[cur]));
        return pre;
      },
      { value: 0 }
    );
  }
  getMaxNumberOfChar('ababccdeajxac'); // Object {value: 4, a: 4, char: "a", b: 2, c: 3…}
  ```

  此外，可以考虑用正则来辅助处理：

  ```js
  function getMaxNumberOfChar(str) {
    return (str + '')
      .split('')
      .sort()
      .join('')
      .match(/(\w)\1*/g)
      .reduce(
        function(pre, cur) {
          return cur.length > pre.value
            ? { value: cur.length, char: cur[0] }
            : pre;
        },
        { value: 0 }
      );
  }
  getMaxNumberOfChar('ababccdeajxac'); // Object {value: 4, char: "a"}
  ```

  这里拓展一下 reduce 函数的用法

  ```js
  // reduce 函数
  // array.reduce(function(accumulator, currentValue, currentIndex, arr), initialValue)
  // reducer回调函数本身接受几个参数，第一个参数是 accumulator 累加器，第二个是数组中的 item，第三个参数是该项的索引，最后一个参数是原始数组的引用。
  // initialValue 为reduce初始值，否则视数组第一个值为初始值，选填
  const array1 = [1, 2, 3, 4];

  // 1 + 2 + 3 + 4
  console.log(
    array1.reduce((accumulator, currentValue) => {
      console.log(accumulator, currentValue);
      return accumulator + currentValue;
    })
  );
  ```

  </details>

### **2019/03/27 - 2019/03/31**

---

- 请问这句语句 `var args=[].slice.call(arguments,1)` 是什么意思？

  <details>
  <summary>点击</summary>

  先看原函数：

  ```js
  function a() {
    var args = [].slice.call(arguments, 1);
    console.log(args);
  }

  a('haha', 1, 2, 3, 4, 5); // log出[1, 2, 3, 4, 5]
  a('run', '-g', '-b'); // log出['-g', '-b']
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

  </details>

- AST（抽象语法树）？

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

* 为什么 `0.1 + 0.2 !== 0.3` ?

    <details>
      <summary>点击</summary>

  ### IEEE-754 精度问题

  所有使用 IEEE-754 数字实现的编程语言都有这个问题。

  0.1 和 0.2 的二进制浮点数表示并不是精确的，所以相加后不等于 0.3。这个相加的结果接近 0.30000000000000004。

  首先将 0.1 转化为 2 进制

  ```js
  // 0.1  十进制 -> 二进制
  0.1 * 2 = 0.2  取0
  0.2 * 2 = 0.4  取0
  0.4 * 2 = 0.8  取0
  0.8 * 2 = 1.6  取1
  0.6 * 2 = 1.2  取1
  0.2 * 2 = 0.4  取0
  0.4 * 2 = 0.8  取0
  0.8 * 2 = 1.6  取1
  0.6 * 2 = 1.2  取1
  //0.000110011(0011)`   0.1二进制(0011)里面的数字表示循环

  ```

  你会发现 0.1 转二级制会一直无线循环下去，根本算不出一个正确的二进制数。

  所以我们得出 0.1 = 0.000110011(0011)，那么 0.2 的演算也基本如上所示，所以得出 0.2 = 0.00110011(0011)

  六十四位中符号位占一位，整数位占十一位，其余五十二位都为小数位。因为 0.1 和 0.2 都是无限循环的二进制了，所以在小数位末尾处需要判断是否进位（就和十进制的四舍五入一样）

  那么把这两个二进制加起来会得出 0.010011....0100 , 这个值算成十进制就是 0.30000000000000004

    </details>

---

![](https://raw.githubusercontent.com/zxpsuper/daily-question/master/image/fork_and_star.jpg)
