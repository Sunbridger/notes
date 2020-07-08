const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();



router.get('/', async (ctx, next) => {
    if (ctx.cookies.get('login')) {
        ctx.body = {
            msg: '登陆成功',
            code: 1
        };
    } else {
        ctx.body = {
            msg: '请登录',
            code: -1
        };
    }
});

router.get('/login', async (ctx, next) => {
    ctx.cookies.set('login', 'sunbridher', {
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
    });
    ctx.body = {
        msg: '登陆成功',
        code: 1
    };
});






// logger

// app.use(async (ctx, next) => {
//   await next();
//   const rt = ctx.response.get('X-Response-Time');
//   console.log(`${ctx.method} ${ctx.url} - ${rt}`);
// });

// // x-response-time

// app.use(async (ctx, next) => {
//   const start = Date.now();
//   await next();
//   const ms = Date.now() - start;
//   ctx.set('X-Response-Time', `${ms}ms`);
// });

// // response

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });


app.use(router.routes());
app.listen(3000, () => {
    console.log(3000);
});
