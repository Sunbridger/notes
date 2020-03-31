// let topmoban = `<?xml version="1.0" encoding="UTF-8"?>\n\t<sitemapindex>`;
// let botmoban = `\n\t</sitemapindex>`;
// let moban = `\n<sitemap>\n\t<loc>http://www.tangehce.com/sitemaps/sitemap_xinche2.xml</loc>\n\t<lastmod>2020-3-12</lastmod>\n</sitemap>`;

const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const root = './oldcar';
const result = [];
const mavenServerUrl = 'https://repo.souche-inc.com/repository/raw-packages/f2e/sitemap/';
//获取此文件夹下所有的文件(数组)
var files = fs.readdirSync(root);

//遍历这些文件或者文件夹
for(let i = 0; i < files.length; i++) {
    result.push(files[i]);
}
result.forEach(name => {
    if (!name.includes('concat')) {
        let packMavenUrl = `${mavenServerUrl}${name}`;
        let p = `/Users/sunbridger/Desktop/mycode/notesoldcar/${name}`;
        shell.exec(`curl -I -o /dev/null -s -w '%{http_code}'  --max-time 10 --user sdev:7J48qUFA6m2E8uJx  --upload-file ${p} ${packMavenUrl}`, function(code, stdout, stderr) {
            if (code === 0) {
                console.log(`执行成功!\n`);
            } else {
                console.log(`执行失败!\n`);
            }
        });
    }
});
// let str = '<?xml version="1.0" encoding="UTF-8"?>\n\t<sitemapindex>';
// result.forEach(name => {
//     str += `<sitemap>\n\t<loc>http://www.tangehce.com/sitemaps/${name}</loc>\n\t<lastmod>2020-3-12</lastmod>\n</sitemap>`;
// });
// str += '\n\t</sitemapindex>';
// fs.writeFileSync('./sitemap_tangeche.xml', str);
