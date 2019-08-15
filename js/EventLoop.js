// console.log('script start');

// setTimeout(function() {
//   console.log('setTimeout');
// }, 0);

// Promise.resolve().then(function() {
//   console.log('promise1');
// }).then(function() {
//   console.log('promise2');
// });
// console.log('script end');
// 同步任务最优先
//  promise 属于微任务
// setTimeout属于宏任务
/*
异步任务分为两个队列：宏任务队列Tasks 微任务队列Microtasks
同步任务执行结束后优先进入微任务，执行完所有的微任务后再进入宏任务（再执行宏任务的时候还得检测微任务是否为null 也就是setTimeout内包含promise的类似情况有
 */

 setTimeout(() => {
   console.log('定时器1');
   Promise.resolve().then(()=>{
     console.log('then11');
   })
 }, 0);
 setTimeout(() => {
   console.log('定时器2');
   new Promise(resolve=>{
     console.log('reso222')
     resolve();
   }).then(a=>{
     console.log(a,'endd222');
   })
 }, 0);