var log = 2;
function  fn() {
  var log;
  console.log(log,'====');
  log = 3;
  console.log(log,'--');
}
log = 22;
fn()
console.log(log);


var log2 = 2;
function  fn2() {
  console.log(log2,'====');
  log2 = 3;
  console.log(log2,'--');
}
log2 = 22;
fn2()
console.log(log2);

setTimeout(() => {
  console.log('定时器啊');
}, 0);
new Promise(resolve=>{
  console.log('resolve');
  resolve('asdasdas')
}).then((p)=>{
  console.log('then',p);
  throw new Error;
  return {a:22} // 类似被resolve包装的
}).then(k=>{
  console.log('then22',k);
}).catch(err=>console.log(err,'err'));
// promise 的一些列都要比setTimeout优先
