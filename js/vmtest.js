const vm = require('vm');
// 实例化 script
   const code = `const add = (a, b) => a + b; const x = add(1, 2); console.log(x)`;
   const script = new vm.Script(code);
