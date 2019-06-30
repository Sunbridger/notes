//koa 上手
const Koa = require('koa');
const app = new Koa();
app.use(async (ctx,next)=>{
    ctx.body = {
        host:ctx.request.header.host
    };
    console.log(ctx.request.response,'response');
});
app.listen(3636,()=>{
    console.log('监听3636')
});
