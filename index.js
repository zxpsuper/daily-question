function deepClone(origin, target) {
  //origin是被克隆对象，target是我们获得copy
  var target = target || {}; //定义target
  for (var key in origin) {
    //遍历原对象
    if (origin.hasOwnProperty(key)) {
      if (Array.isArray(origin[key])) {
        //如果是数组
        target[key] = [];
        deepClone(origin[key], target[key]); //递归
      } else if (typeof origin[key] === "object" && origin[key] !== null) {
        target[key] = {};
        deepClone(origin[key], target[key]); //递归
      } else {
        target[key] = origin[key];
      }
    }
  }
  return target;
}

function deepClone2(data) {
  if (!data || !(data instanceof Object) || typeof data === "function") {
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
      if (typeof origin[prop] == "object" && typeof origin[prop] !== "null") {
        target[prop] = toStr.call(prop) == "[object Array]" ? [] : {};
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
  if (typeof obj == "object") {
    //复杂数据类型
    console.log(obj);
    var result = obj.constructor == Array ? [] : {};
    for (let i in obj) {
      result[i] =
        typeof obj[i] == "object" && obj[i] !== null
          ? deepClone4(obj[i])
          : obj[i];
    }
  } else {
    //简单数据类型 直接 == 赋值
    var result = obj;
  }
  return result;
}

let arr = [1, 2, 3, 4];
let data = {
  wo: 1,
  shi: 2,
  zhong: {
    guo: 2,
    haha: null
  }
};
// console.log(deepClone(arr));
// console.log(deepClone(data));

// console.log(deepClone2(arr));
// console.log(deepClone2(data));

// console.log(deepClone3(arr));
// console.log(deepClone3(data));
console.log(deepClone4(arr));
console.log(deepClone4(data));
