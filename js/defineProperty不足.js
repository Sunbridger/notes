
// let arr = [];

// Object.defineProperty(arr, '0', {
//     get() {
//         console.log(1);
//         return arr[0]
//     },
//     set(value) {
//         console.log(2);
//         arr[0] = value;
//     }
// });

// arr[0] = 2; // set:2
// console.log(arr[0]); // get：2

// $set
function set (target: Array<any> | Object, key: any, val: any): any {
    if (process.env.NODE_ENV !== 'production' &&
      (isUndef(target) || isPrimitive(target))
    ) {
      warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
    }
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.length = Math.max(target.length, key) // 返回两数较大的一个
      target.splice(key, 1, val) // 第key位的值 替换成val这个
      return val
    }
    if (key in target && !(key in Object.prototype)) {
      target[key] = val
      return val
    }
    const ob = (target: any).__ob__
    if (target._isVue || (ob && ob.vmCount)) {
      process.env.NODE_ENV !== 'production' && warn(
        'Avoid adding reactive properties to a Vue instance or its root $data ' +
        'at runtime - declare it upfront in the data option.'
      )
      return val
    }
    if (!ob) {
      target[key] = val
      return val
    }
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
  }

  //总结一下Vue.set数组实现的原理：其实Vue.set()对于数组的处理其实就是调用了splice方法，是不是发现其实很简单~~
  //这里其实才是vue.set()真正处理对象的地方。defineReactive(ob.value, key, val)的意思是给新加的属性添加依赖，以后再直接修改这个新的属性的时候就会触发页面渲染。