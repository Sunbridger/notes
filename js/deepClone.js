function deepClone(obj){
    if (!obj) return;
    let objClone = Array.isArray(obj) ? [] : {};
    if(typeof obj === 'object'){
        for(const key in obj){
            if(obj.hasOwnProperty(key)){
                //判断ojb子元素是否为对象，如果是，递归复制
                if(obj[key]&&typeof obj[key] ==="object"){
                    objClone[key] = deepClone(obj[key]);
                }else{
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}
// 借用JSON对象的parse和stringify
// function deepClone(obj){
//     if(typeof obj != 'object'||obj==null)return;
//     let _str = JSON.stringify(obj),
//         objClone = JSON.parse(_str);
//     return objClone
// }

// deepCopy(o) {
//     if(typeof o != 'object') return o;
//     let objClone = o instanceof Array?[]:{};
//     for (let i in o) {
//       // 如果不遍历原型链查找的添加if(o.hasOwnProperty(i))判断
//       objClone[i] = deepCopy(o[i]);
//     }
//     return objClone;

//   }

// 能够支持循环引用的深拷贝
function deepCloneMy(obj, map = new WeakMap()) {
    if (!obj || typeof obj !== 'object') return obj;
    const cloneWarp = Array.isArray(obj) ? [] : {};
    if (map.get(obj)) {
        return map.get(obj);
    }
    map.set(obj, cloneWarp);
    Object.keys(obj).forEach((key) => {
        cloneWarp[key] =
            typeof obj[key] === 'object'
            ? deepCloneMy(obj[key], map)
            : obj[key];
    });
    return cloneWarp;
}


let a = [{
    name: 'aaa',
    arr: [1, '2', { n: 9 }],
    obj: {
        age: 5
    }
}];
a.selff = a;

// let b = deepClone(a);
let c = deepCloneMy(a);
console.log(c);
