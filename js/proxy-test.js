function reactive(data, cb) {
    let res = null
    let timer = null

    res = data instanceof Array ? []: {}

    for (let key in data) {
      if (typeof data[key] === 'object') {
        res[key] = reactive(data[key], cb)
      } else {
        res[key] = data[key]
      }
    }

    return new Proxy(res, {
      get(target, key) {
        //   if (typeof Reflect.get(target, key) === 'object') {
        //     res[key] = reactive(data[key], cb)
        //   } else {
        //     res[key] = data[key]
        //   }
        return Reflect.get(target, key)
      },
      set(target, key, val) {
        let res = Reflect.set(target, key, val)
        clearTimeout(timer)
        timer = setTimeout(() => {
          cb && cb()
        }, 0)
        return res
      }
    })
  }

  let data = { foo: 'foo', bar: [1, 2] }
  let p = reactive(data, () => {
    console.log('trigger')
  })

  p.bar.push(3)
console.log();
  // trigger
