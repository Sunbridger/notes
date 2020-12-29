const babel = require('@babel/core');
let   code = `let  fn = (a,b) => a + b`;
let   t = require('@babel/types');


let transformArrowFunctions = {
    visitor: {
        ArrowFunctionExpression: (path, state) => {
            // console.log(path.node)
            // console.log(path.parent.id)
            let node = path.node;
            let id = path.parent.id;
            let params = node.params;
            let body=t.blockStatement([
                t.returnStatement(node.body)
            ]);
            //将ArrowFunctionExpression  转化为  FunctionExpression ，传入不要的参数
            let functionExpression = t.functionExpression(id,params,body,false,false);
            path.replaceWith(functionExpression);
        }
    }
}
const result = babel.transform(code, {
    plugins: [transformArrowFunctions]
});
console.log(result.code);

// let fn = function fn(a, b) {
//     return a + b;
//   };
