// 防抖函数：任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行。
function debounce(fn, interval = 300) {
    let timeout = null;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, interval);
    };
}
// 节流函数：指定时间间隔内只会执行一次任务；
function throttle(fn, interval = 300) {
    let canRun = true;
    return function () {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            canRun = true;
        }, interval);
    };
}


// 测试例子如下所示
// function resizeDiv() {
//   var div = document.getElementById('mydiv')
//   div.style.height = div.offsetWidth + 'px'
//   console.log('resize')
// }
// window.onresize = debounce(resizeDiv)
// 总结：=之所以返回一个函数，因为防抖本身更像是一个函数修饰，所以就做了一次函数柯里化。里面也用到了闭包，闭包的变量是 timer 。
