
function cow(n) {
  if (n < 1) {
    return;
  };
  let count = 0;
  if (n > 4) {
    count = cow(n - 1) + cow(n - 3);
  } else {
    count = n;
  }
  return count;
}
let n = 4;
console.log(n + " 年后，牛的数量是： " + cow(n))