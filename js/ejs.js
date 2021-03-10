const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const data = {
  title: 'EJS引擎',
  date: new Date('2020-02-02'),
  obj: { name: '张三', age: 10 },
  arr: [1, 2, 3, 4, 5],
  age: 12,
  name: 'Sunbridger'
}
const pat = path.resolve(__dirname, './ejs.json');
console.log(pat);
const tpl = fs.readFileSync(pat, 'utf-8');

const html = ejs.render(tpl, data);

console.log(html);
