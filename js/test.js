new Promise((res, rej) => {
    res()
    new Promise((ress) => {
        ress()
        console.log(2);
    }).then( r => {
        console.log(3);
    })
}).then(r => {
    console.log(1);
})
