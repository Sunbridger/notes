var http = require('http')
var fs = require('fs')

http.get('http://repo.souche-inc.com/repository/raw-packages/f2e/tgcpc/newlist.zip', function (response) {
    response.setEncoding('binary');  //二进制binary
    var Data = '';
    response.on('data', function (data) {    //加载到内存
    console.log(data);
        Data += data;
    }).on('end', function () {          //加载完
        fs.writeFile('./aaaa.xml', Data , function () {
            console.log('ok')
        });
    })
});
