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

console.log(getLargeNumber(nums, 4));
