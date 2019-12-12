
class LazyMan {
  constructor(name) {
    this.name = name
    this.asyncFun = Promise.resolve()
    console.log(`--------- 我就是 ${this.name}! ---------`)
  }
  sleep(delay) {
    this.asyncFun = this.asyncFun.then(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(`--------- 我睡了 ${delay / 1000}s 然后 ----------`)
          resolve()
        }, delay);
      })
    })
    return this; //提供 ”链式调用“
  }
  eat(food) {
    this.asyncFun = this.asyncFun.then(() => {
      console.log(`--------- 吃 ${food}~ ---------`)
      return Promise.resolve()
    })
    return this;
  }
}

new LazyMan('小菜比').sleep(4000).eat('豆浆').eat('油条').sleep(2000).eat('炒年糕')

let sum = 0, tax = 0
for (let i = 0; i < 200; i++) {
  if (document.getElementById(`mini-7$${i}$3`)) {

    sum += +(document.getElementById(`mini-7$${i}$3`).innerHTML)
    tax += +(document.getElementById(`mini-7$${i}$4`).innerHTML)
  }
}
console.log(`今年总收入=${sum}, 今年总个税=${tax}`)