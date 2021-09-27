class Sequence {
    constructor() {
      this.middlewares = []
    }

    use(middleware) {
      if (typeof middleware !== 'function') {
        throw new TypeError('执行必须为方法')
      }
      this.middlewares.push(middleware)
    }

    /**
     * 递归执行，代码来源 ko-compose，去掉上下文逻辑
     * https://github.com/koajs/compose
     **/
    exec(next) {
      const middlewares = this.middlewares
      let index = -1
      function dispatch (i, x) {
        if (i <= index) {
          return Promise.reject(new Error('next方法执行了多次'))
        }
        index = i
        let fn = middlewares[i]
        if (i === middlewares.length) {
          fn = next
        }
        if (!fn) {
          return Promise.resolve()
        }
        try {
          return Promise.resolve(fn((x) => dispatch(i + 1, x), x))
        } catch (err) {
          return Promise.reject(err)
        }
      }
      return dispatch(0)
    }
  }


  const seq = new Sequence;

  seq.use(next => {
      setTimeout(() => {
          next && next();
      }, 100);
  });

  seq.use((next) => {
    setTimeout(() => {
        next && next({ name: 'xdxsx'});
    }, 200);
});

seq.exec(function lastFu (next, i) {
    console.log(next, i, '我是next代码');
})




