let babel = require('@babel/core');
const code = 'let a = 4;';
const opt = {};
babel.transform(code, (err, result) => {
    console.log(result);
});
