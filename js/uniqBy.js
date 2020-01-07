const _ = require('lodash');
let obj = [
    {name: 'asdd', a: '1d'},
    {name: 'assdd', a: '1d'},
    {name: 'asdd', a: '32d'},
    {name: 'asdd', a: '2d'},
    {name: 'asdd', a: '4d'},
]
let c = _.uniqBy(obj, 'a').length;
console.log(c);
