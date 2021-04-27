// const net = require('net');
// const HOST = '127.0.0.1';
// const PORT = 3000;

// // 创建一个 TCP 服务实例
// const server = net.createServer();

// // 监听端口
// server.listen(PORT, HOST);

// server.on('listening', () => {
//     console.log(`服务已开启在 ${HOST}:${PORT}`);
// });

// server.on('connection', socket => {
//   console.log(socket, '------');
//     // data 事件就是读取数据
//     socket.on('data', buffer => {
//         const msg = buffer.toString();
//         console.log(msg);

//         // write 方法写入数据，发回给客户端
//         socket.write(Buffer.from('你好 ' + msg));
//     });
// })

// server.on('close', () => {
//     console.log('Server Close!');
// });

// server.on('error', err => {
//     if (err.code === 'EADDRINUSE') {
//         console.log('地址正被使用，重试中...');

//         setTimeout(() => {
//             server.close();
//             server.listen(PORT, HOST);
//         }, 1000);
//     } else {
//         console.error('服务器异常：', err);
//     }
// });

var net = require('net');
//获取本地时间字符串
function getDateStr() {
    return (new Date()).toLocaleString();
}




// 网关主服务开启--------------
var http = require('http'); //引用http模块
var app = http.createServer(function(req, res){
    console.log(req.headers, '服务1111111请求进来了-----');
   res.write("我是服务1111111") //采用了write模块即写入模块
   res.end() //响应停止，node服务器响应有始有终
});
app.listen(7700, function(){
   console.log("服务器启动成功，浏览器地址：http://127.0.0.1:7700/")
})
// // 网关主服务关闭--------------



// 创建TCP代理
// function proxyTCP() {

//     let tcpServer = net.createServer((socket) => {
//         console.info(`[${getDateStr()}]  [INFO] - TCP Client connect ${socket.remoteAddress}:${socket.remotePort}`);
//         let client = net.connect({ 
//             host: 'www.baidu.com',
//             port: 80, 
//         });
//         socket.pipe(client);
//     });

//     // 网关对外暴露的
//     tcpServer.listen({ host: '127.0.0.1', port: 7700, }, () => {
//         console.info(`[${getDateStr()}] [INFO] - TCP Server start 127.0.0.1:7700`);
//     });
//     return tcpServer;
// }
// proxyTCP();

// const proxyConfig = {
//     "测试机 1.21": {
//         mode: "tcp",
//         bind: ["0.0.0.0", 8087],
//         server: ['192.168.1.21', 9003]
//     },
//     "远程桌面 1.21": {
//         mode: "tcp",
//         bind: ["0.0.0.0", 13389],
//         server: ['192.168.1.21', 3389]
//     },
//     "路由器 1.1": {
//         mode: "tcp",
//         bind: ["0.0.0.0", 8080],
//         server: ['192.168.1.1', 80]
//     }
// };

// const servers = {};

// for (let k in proxyConfig) {
//     let conf = proxyConfig[k];
//     if (conf.mode == "tcp") {
//         servers[k] = proxyTCP(k, conf);
//     }
// }