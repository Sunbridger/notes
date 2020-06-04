const upload = require('@souche/aliyun-upload');
const space = 'test';
const filename = require('path').resolve(__dirname, '2.txt')
console.log(filename);
upload(space, filename).then(url => {
    console.log(`文件路径：${url}`);
}).catch(e => {
    console.log(e, '---cuowu');
});
