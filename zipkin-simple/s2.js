const express = require('express');
const myMiddleWareForZipKin = require('./zipkin-middleware')('s2');
const app = express();

app.use(myMiddleWareForZipKin.zipkinMiddleware);

app.get('/s2/api', (req, res) => {
  res.send({
    data: `${new Date().toString()} 调用了s2服务的api接口ooo`
  });
});


app.get('/s2/gets1', (req, res) => {
  myMiddleWareForZipKin.zipkinAxios.get('http://localhost:8888/s1/gets2')
      .then(() => res.send(`${new Date().toString()} http://localhost:8888/s1/api 返回的信息`))
});

app.listen(9999, () => {
  console.log('s2 服务开启在 9999 端口');
});