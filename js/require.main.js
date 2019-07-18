console.log(`When a file is run directly from Node.js, require.main is set to its module. `);
const flag = require.main === module;
console.log('该文件直接允许的而不是被引用允许的', flag)
