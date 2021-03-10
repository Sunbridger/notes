

//worker.js
var http = require('http')

const port = Math.round(1026 + Math.random() * 10000)
http
    .createServer((req, res) => {
        res.end('hahahaha')
    })
    .listen(port, '127.0.0.1', () => {
        console.log(`我是pid:${process.pid},我监听:${port}`)
    })
