setTimeout(() => {
    console.log('外部引入的文件script');
}, 15000);

// for (let i = 0; i < 80000; i++) {
//     console.log(i);
// }

console.log(a, '----a');

import * as a from './vue.js'

console.log(1);
