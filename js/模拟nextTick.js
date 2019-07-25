// 存储nextTick
let callbacks = [];
let pending = false;

function nextTick (cb) {
    callbacks.push(cb);

    if (!pending) {
        pending = true;
        setTimeout(flushCallbacks, 0);
    }
}

function flushCallbacks () {
    pending = false;
    const copies = callbacks.slice(0);
    callbacks.length = 0; // 暴力清空数组
    for (let i = 0; i < copies.length; i++) {
        copies[i]();
    }
}
nextTick(() => {
    console.log(2)
});
nextTick(() => {
    console.log(3)
});

console.log(1);
