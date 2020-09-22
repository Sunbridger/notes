// // 10 fs.createReadStream 从文件流中读取数据
let fs = require('fs');
let path = require('path');
let fileReadStream = fs.createReadStream('/Users/sunbridger/Desktop/weibodata/hots.ibd', 'utf-8');
let count = 0;
let str = '';
//读取数据内置的事件监听
fileReadStream.on('data',(chunk) => {
    console.log(`${++count}接收到：${chunk.length}`);
    console.log(chunk.toString('utf8'));
    str += chunk;
})
fileReadStream.on('end',() => {
    console.log('---结束---');
    console.log(`最终读取到数据为:${str}`);
    writeData(str);
})
fileReadStream.on('error',(error) => {
    console.log(error)
})

function writeData(str){
    //11 fs.createWriteStream 写入文件
    // 创建一个可以写入的流，写入到文件 package22.json 中
    let writerStream = fs.createWriteStream(path.resolve(__dirname, './readidb.txt'));
    // 使用 utf8 编码写入数据
    writerStream.write(str,'UTF8');
    // 标记文件末尾
    writerStream.end();
    // 处理流事件 --> finish 事件
    writerStream.on('finish',() => { //finish - 所有数据已被写入到底层系统时触发。
        console.log('写入完成');
    })
    writerStream.on('error',(err) => {
        console.log(err.stack);
    })
    console.log("程序执行完毕");
}

// let fs = require('fs');

// //12 管道流来读取写入
// // 创建一个可读流
// var readerStream = fs.createReadStream('/Users/sunbridger/Desktop/weibodata/hots.ibd');
// // 创建一个可写流
// var writerStream = fs.createWriteStream('./readidb.txt');
// // 管道读写操作
// // 读取 package.json 文件内容，并将内容写入到 package22.json 文件中
// readerStream.pipe(writerStream);
