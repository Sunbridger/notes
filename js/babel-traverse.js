// 主要是给plugin 提供遍历ast节点的功能；
const traverse = require('@babel/traverse').default;
const parser = require('@babel/parser').parse;
const code = 'let a = 8;';
const ast = parser(code);
const options = {
    enter(node) {
        console.log(node, 'nod');
    }
};
traverse(ast, options);