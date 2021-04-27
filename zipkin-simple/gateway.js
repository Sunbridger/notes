const express = require('express');


const myMiddleWareForZipKin = require('./zipkin-middleware')('gateway');

const httpProxy = require('http-proxy');

const app = express();
 
var proxy = httpProxy.createProxyServer();
 
app.get('/', async (ctx, next) => ctx.body = JSON.stringify({
    status: 'UP'
}));

//consul& k8s 健康检查
app.get('/health', async (ctx) => {
    proxy.web(ctx.req, ctx.res, {
        target: 'http://127.0.0.1:7777/s3/gets1'
    });
});



app.use(myMiddleWareForZipKin.zipkinMiddleware);



app.listen(5555);

console.log('网关开在5555 端口');