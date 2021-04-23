const express = require('express');
const myMiddleWareForZipKin = require('./zipkin-middleware')('s3');
const app = express();

app.use(myMiddleWareForZipKin.zipkinMiddleware);

app.get('/s3/api', (req, res) => {
  res.send({
    data: `${new Date().toString()} 调用了s3服务的api接口ooo`
  });
});


app.get('/s3/gets1', (req, res) => {
  myMiddleWareForZipKin.zipkinAxios.get('http://localhost:8888/s1/gets2')
      .then(() => res.send(`${new Date().toString()} http://localhost:8888/s1/api 返回的信息`))
});

app.listen(7777, () => {
  console.log('s3 服务开启在 7777 端口');
});