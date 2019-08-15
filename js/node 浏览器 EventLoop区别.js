console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
})

setTimeout(() => {
  console.log(6);
})

console.log(7);
//  在浏览器中是一次执行只取macrotask的一个任务，而在node中是直接将macrotask全部执行
// node中结果： 1 4 7 5 2 6 3
// 浏览器中：1 4 7 5 2 3 6

setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});