Function.prototype.call2 = function(context = window) {
    // 首先要获取调用call的函数，用this可以获取
    context.fn = this;
    const result = context.fn(...[...arguments].slice(1));//2.函数是可以有返回值的！
    delete context.fn;
    return result;
}
Function.prototype.apply2 = function(context = window, arr = []) {
    // 首先要获取调用call的函数，用this可以获取
    context.fn = this;
    const result = context.fn(...arr);//2.函数是可以有返回值的！
    delete context.fn;
    return result;
}

// 测试一下
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.apply2(foo, ['sun', 999]); // 1
