// const ajax = (url, cb) => {
//     setTimeout(() => {
//         console.log(url, '----');
//         cb();
//     }, 765);
// }

// function *fetch() {
//     const result1 = yield ajax('url1', () => {

//     })
//     const result2 = yield ajax('url2', () => {
//         return {
//             data: 'r2'
//         }
//     })
//     yield ajax('url3', () => {
//         console.log(result1, result2);
//     })
// }
// let it = fetch();
// let result1 = it.next()
// let result2 = it.next()
// let result3 = it.next()
// console.log(result1, result2);


Promise.resolve(1).then((r) => {
    console.log(1);
})
