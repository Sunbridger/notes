// new Promise((res, rej) => {
//     res()
//     new Promise((ress) => {
//         ress()
//         console.log(2);
//     }).then( r => {
//         console.log(3);
//     })
// }).then(r => {
//     console.log(1);
// })

new Promise(function(resolve, reject) {
    console.log(1100);  // 1
    resolve();
    new Promise(function(resolve, reject) {
        console.log(111111); // 2
        resolve();
    }).then(() => {
        console.log(11); //3
    }).then(() => {
        console.log(22); //5
    }).then(() => {
        console.log(33); //7
    })
}).then(() => {
    console.log(1); //4
}).then(() => {
    console.log(2); //6
}).then(() => {
    console.log(3);  //8
});


