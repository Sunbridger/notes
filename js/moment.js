const moment = require('moment');
let t = moment.unix('1557745127479');
// console.log(t, 'tt');
const items = [
    ['key', 'va'],
    ['key2', 'va2'],
    ['key3', 'va3']
];
items.forEach(([key, value]) => {
    console.log(key, value, '[[');
});
const [a, b] = [1, 4];
console.log(a, b);
