### 19-TOP-k 问题

> 问题: 输入 n 个整数，找出其中最大的 K 个数。例如输入 4,5,1,6,2,7,3,8 这 8 个数字，则最大的 4 个数字是 8,7,6,5,。

比较简单的是将这些数字组合成一个数组，然后进行从大到小进行排序，取前 K 个即可。

### 选择算法

对整个数组进行排序有点浪费，我们只是取前 K 个，后面剩下的不进行排序也行。因此，对此数组使用选择算法获取前 K 个数即可。

```js
function getLargeNumber(array, k) {
  if (array == null || k <= 0 || k > array.length) {
    return [];
  }
  let length = array.length,
    i,
    j,
    maxIndex,
    maxValue,
    temp;
  for (i = 0; i < k; i++) {
    maxIndex = i;
    maxValue = array[maxIndex];
    for (j = i + 1; j < length; j++) {
      //通过循环选出最小的
      if (array[j] > maxValue) {
        maxIndex = j;
        maxValue = array[maxIndex];
      }
    }
    // 交换位置
    temp = array[i];
    array[i] = maxValue;
    array[maxIndex] = temp;
  }
  return array.slice(0, k);
}
// 测试一下
var nums = [8, 9, 2, 15, 7, 1];
console.log(getLargeNumber(nums, 3)); // [15,9,8]
```

### 快排算法

我们可以利用快排中 partion 函数的思想来做做题。

因为 partion 可以使得序列分为 2 部分：左边的值都小于哨兵，右边的值都大于哨兵。所以我们只要找到处于第 k 位置的哨兵即可，也就是说找到第 k 大的值所在的位置即可，那么它的左边的 k-1 值都小于等于第 k 大值。显然，前 k 个值即为我们所求的最小 k 个数。在我们的划分过程有 3 种情况：

1. 哨兵的位置大于 k，说明第 k 大的数在左边，继续递归处理左部分即可。
2. 哨兵的位置小于 k，说明第 K 大的数在右边，继续递归处理有部分即可。
3. 哨兵的位置等于 k，说明该哨兵即为第 K 大的值，其左边 k-1 个数都小于等于它，因此输出前 k 个即为所求的结果。

```js
var nums = [8, 9, 2, 15, 7, 1, 13, 35, 24];

function getLargeNumber(array, k) {
  if (array == null || k <= 0 || k > array.length) {
    return [];
  }

  partition(array, 0, array.length - 1, k - 1);
  return array.slice(0, k);
}
function partition(array, low, high, k) {
  if (low < high) {
    // 获取 low 至 high 之间一个随机数
    let pivot = Math.floor(Math.random() * (high - low + 1)) + low;

    // 此随机数对应的元素与最后一位暂时交换（后面会再交换一次），我们先找到有多少个数大于此随机数，大的话从左到右排列
    swap(array, pivot, high);
    let index = low;
    for (let i = low; i < high; i++) {
      if (array[i] > array[high]) {
        // 这里便是一次选择排序
        swap(array, i, index);
        index++;
      }
    }
    // 交换数组第index个和刚才置于数组末尾的随机数组元素，这样array[index]左边的数都比array[index]大
    swap(array, index, high);

    // 如果index > k，说明我们刚才排的范围过大，应该缩小范围再次递归寻找
    // 如果 index < k，说明我们刚才拍的范围过小，应该扩大范围再次递归寻找
    if (index > k) {
      partition(array, low, index - 1, k);
    } else if (index < k) {
      partition(array, index + 1, high, k);
    }
  }
}

function swap(array, one, two) {
  [array[one], array[two]] = [array[two], array[one]];
}
console.log(getLargeNumber(nums, 3)); // [35,24,15]
```

### 最小堆

我们知道，最小堆的顶部结点为该堆的最小值，因此我们创建一个具有 K 的节点的最小堆（可以先取该数组的前 K 个元素）调整为最小堆。

之后将第 K + 1 个元素与堆顶对比，如果大于堆顶元素，则说明堆顶元素不是第 K 大的值，因此将堆顶元素替换为第 K + 1 个元素，并调整此最小堆，以此类推至数组的最后一个元素，则最后整个最小堆即为所求答案。

```js
// 建立堆
function buildHeap(nums) {
  // 注意这里的头节点是从0开始的，所以最后一个非叶子结点是 parseInt(nums.length/2)-1
  let start = parseInt(nums.length / 2) - 1;
  let size = nums.length;
  // 从最后一个非叶子结点开始调整，直至堆顶。
  for (let i = start; i >= 0; i--) {
    adjustHeap(nums, i, size);
  }
  return nums;
}
// 调整最小堆，使index的值小于于左右节点
function adjustHeap(nums, index, size) {
  // 交换后可能会破坏堆结构，需要循环使得每一个父节点都大于左右结点
  while (true) {
    let min = index;
    let left = index * 2 + 1; // 左节点
    let right = index * 2 + 2; // 右节点
    if (left < size && nums[min] > nums[left]) min = left;
    if (right < size && nums[min] > nums[right]) min = right;
    // 如果左右结点大于当前的结点则交换，并再循环一遍判断交换后的左右结点位置是否破坏了堆结构（比左右结点小了）
    if (index !== min) {
      [nums[index], nums[min]] = [nums[min], nums[index]];
      index = min;
    } else {
      break;
    }
  }
}
// 获取最大的前K个数
function getLargeNumber(nums, k) {
  // 创建一个具有 K 的节点的最小堆（可以先取该数组的前 K 个元素）调整为最小堆。
  let minHeap = buildHeap(nums.slice(0, k));
  for (let i = k; i < nums.length; i++) {
    // 将第 i 个元素与堆顶对比，如果大于堆顶元素，则说明堆顶元素不是第 K 大的值，因此将堆顶元素替换为第 i 个元素
    if (minHeap[0] < nums[i]) {
      minHeap[0] = nums[i];
      // 替换后调整此最小堆
      adjustHeap(minHeap, 0, k);
    }
  }
  return minHeap;
}
var nums = [8, 9, 2, 15, 7, 1, 13, 35, 24];

console.log(getLargeNumber(nums, 4)); // [13,15,24,35]
```
