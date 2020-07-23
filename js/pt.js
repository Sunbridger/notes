new Promise((res, rej) => {
    res(11)
}).then(r => {
    console.log(r);
    return 'asdasd'
}).then(res => {
    console.log(res);
}).then(e => {
    console.log(e);
}).catch(a => {
    console.log(a);
})
