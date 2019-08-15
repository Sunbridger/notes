// 防抖
function debounce(fn) {  
  var timer = null ;
  var _self = fn  ;
  return function() {
    clearTimeout(timer)    
    var args = arguments // fn所需要的参数 放在return来加入
    console.log(args,'a')
    var _me = this // 当前的this 不用箭头函数 因为要使用当前所处函数arguments 若是箭头的话 则是拿到debounce的参数了 向上查找
    timer = setTimeout(function() {
      _self.call(_me, args)
    }, 200)
  }
}

// 测试例子如下所示
// function resizeDiv() {  
//   var div = document.getElementById('mydiv')
//   div.style.height = div.offsetWidth + 'px'
//   console.log('resize')
// }
// window.onresize = debounce(resizeDiv)
// 总结：=之所以返回一个函数，因为防抖本身更像是一个函数修饰，所以就做了一次函数柯里化。里面也用到了闭包，闭包的变量是 timer 。
