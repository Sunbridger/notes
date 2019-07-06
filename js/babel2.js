const code = `
import Vue from 'vue';
import vueLoader from 'vue-loader';
Vue.use(vueLoader);
`
let cp = require("@babel/parser").parse(code, {
    sourceType: "module",
    plugins: [
        "jsx"
    ]
});
require('fs').writeFile('./js/data2.json',JSON.stringify(cp),(err)=>{
    if(err)console.log(err);
})