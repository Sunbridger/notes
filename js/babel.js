const fs = require('fs');
const {parse} = require('@babel/parser');
const generate = require('@babel/generator');
const babel = require('@babel/core');

const code = 'class Example {}';
const ast = parse(code);
babel.transform(code, {}, function(err, result) {
    console.log(result,'result'); // => { code, map, ast }
});

fs.writeFile('./data.json',JSON.stringify(ast),(err)=>{
    if(err)console.log(err);
})