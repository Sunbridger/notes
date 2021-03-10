/**
 * 之前我们用instanceof的时候，比如a instaceof A其实就是
 * 调用的A对象中的Symbol.hasInstance属性，它指向一个内部方法，现在es6拓展出来，我们可以自己定义啦。
 */
// const obj = {
//     [Symbol.hasInstance](num) {
//       return num % 2 === 0
//     }
//   }
// console.log(1 instanceof obj);// 序号(4)


// let obj = {
//     name: 'ss',
//     age: 1,
//     [Symbol.iterator]: () => {
//         const index = 1;
//         return {
//             next: () => ({
//                 value: index,
//                 done: true
//             })
//         }
//     }
// };
// for (let val of obj) {
//     console.log(val);
// }

let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();
console.log(iter, '---', typeof arr[Symbol.iterator]);

let c = {
    name: () => {}
};

console.log([c.name]());

// Symbol.hasInstance
// 对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，
// 判断是否为该对象的实例时，会调用这个方法。
// 比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)。
