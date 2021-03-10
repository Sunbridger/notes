// function fn(arr, index = 0) {
//     arr[index].click();
// }
// setInterval(() => {
//     let arr = [...document.querySelectorAll('.answer-core')];
//     let len = arr.length + 1;
//     let random = Math.floor(Math.random()*len);
//     fn(arr, random);
// })
var proxy = new Proxy({
    age: 11
}, {
    get: function(target, propKey) {
        console.log(target);
      return 35;
    },
    set: () => {},
    has: () => {}, //拦截for in这个操作
    apply: () => {},
    construct: () => {},
    // 一共类似有13中拦截...
  });

  proxy.time // 35
  proxy.name // 35
  proxy.title // 35
// 关于使用https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf#heading-12 proxy和defineProperty的比较
