var readLine = require('lei-stream').readLine;
var writeLine = require('lei-stream').writeLine;
const getTime = () => {
    const d = new Date();
    const y = d.getFullYear();
    let m = d.getMonth() + 1;
    let day = d.getDate();
    if (m < 10) {
        m = '0' + m;
    }
    if (day < 10) {
        day = '0' + day;
    }
    return y + '-' + m + '-' + day;
};
// const upload = require('../uploadxml');

var counter = 0;
// 一个几百M的文本文件
var inputFile = '/Users/sunbridger/Desktop/oldcar.txt';
let result = '';
let index = 1
let output = writeLine(`./oldcar/sitemap_ershouche1.xml`);
function fn() {
    readLine(inputFile).go(function (data, next) {
        if (counter === 0) {
            result = `<?xml version="1.0" encoding="UTF-8"?>\n\t<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\t<url>\n\t<loc>${data}</loc>\n\t<priority>0.8</priority>\n\t<lastmod>${getTime()}</lastmod>\n\t<changefreq>Daily</changefreq>\n</url>`;
        } else {
            if (counter % 49999 === 0) {
                result = `<url>\n\t<loc>${data}</loc>\n\t<priority>0.8</priority>\n\t<lastmod>${getTime()}</lastmod>\n\t<changefreq>Daily</changefreq>\n</url>\n</urlset>`;
            } else {
                result = `<url>\n\t<loc>${data}</loc>\n\t<priority>0.8</priority>\n\t<lastmod>${getTime()}</lastmod>\n\t<changefreq>Daily</changefreq>\n</url>`;
            }
        }
        counter++;
        output.write(result, () => {
            if (counter % 50000 === 0) {
                counter = 0;
                index++;
                console.log('50000一份结束');
                output.end();
                // upload(`sitemap_ershouche${index}.xml`);
                output = writeLine(`./oldcar/sitemap_ershouche${index}.xml`);
                next();
            } else {
                console.log('借宿了');
                next();
            }
        });
    });
}








  fn();



//   var startTime = Date.now();

//   function msToS (v) {
//     return parseInt(v / 1000, 10);
//   }

//   function getSpentTime () {
//     return Date.now() - startTime;
//   }

// 打印进度
// function printSpeedInfo () {
//     var t = msToS(getSpentTime());
//     var s = counter / t;
//     if (!isFinite(s)) s = counter;
//     console.log('read %s lines, speed: %sL/S', counter, s.toFixed(0));
//   }

//   // 打印内存占用情况
//   function printMemoryUsage () {
//     var info = process.memoryUsage();
//     function mb (v) {
//       return (v / 1024 / 1024).toFixed(2) + 'MB';
//     }
//     console.log('rss=%s, heapTotal=%s, heapUsed=%s', mb(info.rss), mb(info.heapTotal), mb(info.heapUsed));
//   }
// //   setInterval(printMemoryUsage, 1000);

// var fs = require('fs');
// var readstream = fs.createReadStream('/Users/sunbridger/Downloads/新车列表页url-sitemap.txt');
// var through = require('through');

// var size = 0;
// var dest = null;
// var file = 0;

// readstream.setEncoding('utf-8');

// readstream.on('data', function (chunk) {
//     if (size > 9) { //每个文件 9M 左右
//         dest.pause();
//         dest = null;
//         size = 0;
//         file ++;
//     }
//     if (!dest) {
//         dest = through();
//         dest.pipe(fs.createWriteStream('test/' + file +'.txt'));
//         size = fs.statSync('test/' + file + '.txt');
//         console.log(size/1024/1024, '---大小');
//     }
//     dest.queue(chunk);
// }).on('end', function () {
//     // dest.emit('end');
// })
