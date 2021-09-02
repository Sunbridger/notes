// 函数参数默认值
function test(num = 1) {
  console.log(typeof num);
}

test();          // 'number' (num is set to 1)
test(undefined); // 'number' (num is set to 1 too)

// test with other falsy values:
test('');        // 'string' (num is set to '')
test(null);      // 'object' (num is set to null)


// 解构赋值


const data = {
    success: true,
    result: null,
}

const { result = {}, success } = data;

if (success) {
    // 业务层面操作result.xxx属性 报错
    console.log(result);
}