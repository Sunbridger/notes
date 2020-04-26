const { formatTime } = require('../utils/date');

let a = formatTime(new Date(), 'YYYY/MM/DD') > '2020/03/14';

// 如果格式一样的话 其实是可以直接比对字符串的

console.log(a);


console.log('2016/02/13' > '2019/12/14');
