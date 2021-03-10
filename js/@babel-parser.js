let babelP = require('@babel/parser');

let code = 'let cp = 8';
let options = {};
let ast = babelP.parse(code, options);
console.log(ast, 'ast');