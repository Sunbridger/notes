function fn(newobj, oldobj) {
    let likeData = {};
    for (let key in newobj) {
        if (newobj[key] && newobj[key] !== oldobj[key]) {
            likeData[key] = newobj[key]
        }
    }
}

let obj1 = {
    a: 1,
    b: 2,
    c: 3
};
let obj2 = {
    a: ''
};
