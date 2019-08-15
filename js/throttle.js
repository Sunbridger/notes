// 节流
function throttle(fn, gapTime) {
 let _lastTime = null;
 return function () {
 let _nowTime = new Date()
   if (_nowTime - _lastTime > gapTime ) {
    fn();
    _lastTime = _nowTime
   }
 }
}

// 平台长时间未操作 强制退出  平台每秒自动监测一遍
let fn = ()=>{
 console.log('boom')
}
setInterval(throttle(fn,15000),1000)