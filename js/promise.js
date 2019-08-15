new Promise((resolve,reject)=>{
  resolve(2)
}).then(a=>{
  console.log(a);
}).catch(err=>{
  console.log(err,'---err')
})
var process=require('process');
console.log(process.nextTick)
process.nextTick(()=>{
  console.log('errerrerrerrerr')
})
setTimeout(()=>{
  console.log('定时器')
},0)

function errFn(){
  console.log('抛出错误')
  throw '我是错误哦哦哦'
}
try{
  errFn();
}catch(e){
  console.log(e);
}