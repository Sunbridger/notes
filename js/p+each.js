let axios = require('axios');
async function g() {
    let a = await axios.get('http://sunbridger.top:7001/getcap').then(({data}) => {
        return data.text
    });
    console.log('完成请求');
}

async function test() {
    let arr = await new Promise((resolve) => {
        const arr = [1, 2];
        resolve(arr)
    }).then(arr => {
        return arr;
    });
    await Promise.all(arr.map(async el => {
        await g();
    }));
    // arr.forEach(async el => {
    //     await g();
    // });
    console.log('test函数执行完了');
}

test()
