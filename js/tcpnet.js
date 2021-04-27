var net = require('net');
//获取本地时间字符串
function getDateStr() {
    return (new Date()).toLocaleString();
}
// 创建TCP代理
function proxyTCP(key, conf) {
    let [bind, server] = [conf.bind, conf.server];
    // 创建一个唯一的tcp服务
    let tcpServer = net.createServer((c) => {
        console.info(`[${getDateStr()}] [${key}] [INFO] - TCP Client connect ${c.remoteAddress}:${c.remotePort}`);
        console.log(c, '-----c');
        // 通过注册中心获取该
        // 创建一个客户端 转发到对应的服务
        // 四层是IP级别的 所以写域名无用
        let ips = Math.random() > .5 ? ['127.0.0.1', 7700] : ['127.0.0.1', 7733];
        let client = net.connect({ port: ips[1], host: ips[0] }, () => {
          // 客户端接收到的信息吐给tcp服务
          c.pipe(client);
        });
        client.pipe(c);
        client.on('error', (err) => {
            console.error(`[${getDateStr()}] [${key}] [ERROR] - ${err}`);
            c.destroy();
        });
        c.on('error', (err) => {
            console.error(`[${getDateStr()}] [${key}] [ERROR] -  ${err}`);
            client.destroy();
        });
    });
    tcpServer.listen({ host: bind[0], port: bind[1], }, () => {
        console.info(`[${getDateStr()}] [${key}] [INFO] - TCP Server start ${bind[0]}:${bind[1]}`);
    });
    return tcpServer;
}

const proxyConfig = {
    "我是TCP服务器11111": {
        mode: "tcp",
        bind: ["127.0.0.1", 9821],
        server: Math.random() > .5 ? ['127.0.0.1', 7700] : ['127.0.0.1', 7733],
    },
};

const servers = {};

for (let k in proxyConfig) {
    let conf = proxyConfig[k];
    if (conf.mode == "tcp") {
        servers[k] = proxyTCP(k, conf);
    }
}
