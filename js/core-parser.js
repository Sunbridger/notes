// 先转为ast 再transform
const parse = require('@babel/parser').parse;
const generate = require('@babel/generator').default;
// const transform = require('@babel/core').transform;
function myParser(code, options = {}) {
    const ast = parse(code);
    const result = generate(ast, options, code);
    console.log(result, 'res');
}

let code = 'let a = 8; class A{}'
myParser(code);