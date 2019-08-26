const code = `
import Vue from 'vue';
import vueLoader from 'vue-loader';
Vue.use(vueLoader);
`;


let p = require("@babel/parser");
// let cp = p.parse(code, {
//     sourceType: "module",
//     plugins: [
//         "jsx"
//     ]
// });
let code2 = `
    let a = 'code2';
    console.log(a, '---a');
    function asy() {
        let v = await 9;
        console.log(v, '--v');
    }
    say();
`
let cp2 = p.parse(code2, {
    allowReturnOutsideFunction: true
});

console.log(cp, '----', cp2);
// require('fs').writeFile('./js/data2.json',JSON.stringify(cp),(err)=>{
//     if(err)console.log(err);
// })