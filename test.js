function insertSort(arr) {
  for(let i = 1; i < arr.length; i++) {  //外循环从1开始，默认arr[0]是有序段
    for(let j = i; j > 0; j--) {  //j = i,将arr[j]依次插入有序段中
      if(arr[j] < arr[j-1]) {
        [arr[j],arr[j-1]] = [arr[j-1],arr[j]];
      } else {
        break;
      }
    }
  }
  return arr;
}

console.log(insertSort([3,2,1,9,6,45,7]));