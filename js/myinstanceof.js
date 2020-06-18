/**
 * 之前我们用instanceof的时候，比如a instaceof A其实就是
 * 调用的A对象中的Symbol.hasInstance属性，它指向一个内部方法，现在es6拓展出来，我们可以自己定义啦。
 */
const obj = {
    [Symbol.hasInstance](num) {
      return num % 2 === 0
    }
  }
console.log(1 instanceof obj);// 序号(4)
