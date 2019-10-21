function merge(...args) {
  let arr = [];
  for (let i = 0; i < args.length; i++) {
    arr = arr.concat(args[i]);
    console.log(args[i]);
  }
  return [...new Set(arr)];
}

console.log(merge([0, 1, 2, 3], [1, 2, 3, 8], [1, 10])); // [1]
