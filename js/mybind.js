function mybind (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  var _this = this
  var args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments));
  }
}

// function foo() {
//     console.log(this)
// }
// foo.mybind=mybind
// var func =  foo.mybind({a:1});
// func()


function  Person() {
  if(this instanceof Person){
    console.log('okkk')
  }
}
let a={}
let bindhou = Person; //这个时候已经绑定好了this
bindhou();