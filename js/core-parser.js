// 先转为ast 再transform
const parse = require('@babel/parser').parse; // 对js的代码进行词法分析 生成ast 前版本是用bbaylon这个包
const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
// const transform = require('@babel/core').transform;
function myParser(code, options = {}) {
    const ast = parse(code); // 解析
    traverse(ast, { // 遍历ast 给其注入新代码（plugin的功能出现）
        enter(node) {
            node.xxsun = 'sunbridger'
        }
    })
    const result = generate(ast); // 生成js代码
    console.log(result, 'res');
}

let code = 'let a = 8; class A{};'
myParser(code);