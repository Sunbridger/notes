const express = require('express');
const myMiddleWareForZipKin = require('./zipkin-middleware')('s1');
const app = express();

app.use(myMiddleWareForZipKin.zipkinMiddleware);

app.get('/s1/api', (req, res) => {
  res.send(`${new Date().toString()} 调用了s1服务的api接口`);
});

app.get('/s1/gets2', (req, res) => {
  myMiddleWareForZipKin.get('http://localhost:9999/s2/api')
      .then((response) => {
        res.send(response);
      })

});

app.listen(8888, () => {
  console.log('s1 服务开启在 8888 端口');
});