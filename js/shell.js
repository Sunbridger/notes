const shell = require('shelljs');
const log = console.log;

async function doShell(str, exit = true) {
    log(`开始执行命令: ${str}`);
    return new Promise((resolve, reject) => {
        shell.exec(str, function(code, stdout, stderr) {
            if (code === 0) {
                log(`${str}  执行成功!\n`);
                resolve();
            } else {
                log(`${str}  执行失败!\n`);
                reject(stderr);
            }
        });
    });
}

module.exports = doShell;
