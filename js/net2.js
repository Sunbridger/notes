// 网关主服务开启--------------
var http = require('http'); //引用http模块
var app = http.createServer(function(req, res){
    console.log(req.headers, '服务器33333333接收到的请求头-----');
   res.write("我是服务器33333333") //采用了write模块即写入模块
   res.end() //响应停止，node服务器响应有始有终
});
app.listen(7733, function(){
   console.log("服务器启动成功，浏览器地址：http://127.0.0.1:7733/")
})