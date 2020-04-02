const http = require('http');
http.createServer((req, res) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('hello Sunbridger this is docker running!');
    response.end();
}).listen(8888);
