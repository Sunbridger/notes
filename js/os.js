// const interfaces = require('os').networkInterfaces();
// for (const devName in interfaces) {
//     const iface = interfaces[devName];

//     for (let i = 0; i < iface.length; i++) {
//         const alias = iface[i];

//         if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
//             console.log(alias.address);
//         }
//     }
// }
console.log(require('os').hostname());
