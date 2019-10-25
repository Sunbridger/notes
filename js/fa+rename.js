
const fs = require('fs');
async function moveFile(oldPath, newPath) {
    return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, function(err) {
            if (err) {
                if (err.code === 'EXDEV') {
                    copy();
                } else {
                    reject(err);
                }
                return;
            }
            resolve(true);
        });

        function copy() {
            const readStream = fs.createReadStream(oldPath);
            const writeStream = fs.createWriteStream(newPath);

            readStream.on('error', () => {
                reject(new Error('读取错误'));
            });
            writeStream.on('error', () => {
                reject(new Error('读取错误'));
            });

            readStream.on('close', function() {
                fs.unlink(oldPath, () => {
                    resolve(true);
                });
            });

            readStream.pipe(writeStream);
        }
    });
}


moveFile('./1.txt', './2.txt').then(res => {
    console.log(res, '---res');
})