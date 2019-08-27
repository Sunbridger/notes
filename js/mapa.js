let arr =[{
    e: 1,
    c: 3
},{
    e: 2,
    c: 3
}];
let a = arr;
a = a.map((el) => {
    if (el.e === 1) {
        delete el.e
    }
    return el;
})
console.log(a, arr)