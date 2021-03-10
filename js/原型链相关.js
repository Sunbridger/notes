function Person1() {
  
}
function Person2() {
  
}
console.log(Person1.constructor===Person2.constructor,Person2.constructor);

let p1 = new Person1
let p2 = new Person2
console.log(p1.constructor===Person1,'p1.constructor===Person1');
console.log(p1.__proto__.__proto__===Object.prototype)
