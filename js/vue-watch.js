const data = {
    a: 1,
    b: 3,
    c: {
        n: 2
    },
    n: 4444
}

function walk(data) {
    for (let key in data) {
        const dep = []
        let val = data[key]
        // 如果 val 是对象，递归调用 walk 函数将其转为访问器属性
        const nativeString = Object.prototype.toString.call(val)
        if (nativeString === '[object Object]') {
            walk(val)
        }
        Object.defineProperty(data, key, {
            set(newVal) {
                // 如果值没有变什么都不做
                if (newVal === val) return
                // 使用新值替换旧值
                val = newVal
                dep.forEach(fn => fn())
            },
            get() {
                dep.push(Target)
                return val  // 将该值返回
            }
        })
    }
}

walk(data);


// Target 是全局变量
let Target = null
function $watch(exp, fn) {
    // 将 Target 的值设置为 fn
    Target = fn
    if (exp.includes('.')) {
        exp.split('.').reduce((nowObj, currentData, currentIndex) => {
            return nowObj[currentData];
        }, data);
    } else {
        // 读取字段值，触发 get 函数
        data[exp]
    }
}
$watch('a', () => {
    console.log('谁在修改data.a')
})
$watch('c', () => {
    console.log('谁在修改data.c')
})
$watch('c.n', () => {
    console.log('谁在修改data.c.n')
})
// $watch('n', () => {
//     console.log('谁在修改data.n')
// })

// console.log(data.a);
// console.log(data.c.n);
// console.log(data.n);
data.c.n ='asd'
