var http=require("http");
var server=http.createServer();
const fs = require('fs');
const path = require('path');
server.on("request",function(req,res){
    console.log(req.headers.referer, 'req');
	// res.setHeader('content-Type','text/plain; charset=utf-8');
	// res.write("hello world!! 你好啊世界");
    // res.end();
    res.writeHead(200,{'Content-Type':'text/html'})
	fs.readFile(path.resolve(__dirname, './test-csrf.html'),'utf-8',function(err,data){
        res.end(data)
    });
});

server.listen(8989,function(){
	console.log("服务器启动啦 请访问：  http://localhost:8989");
});
