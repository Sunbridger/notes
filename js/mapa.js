let arr =[{
    e: 1,
    c: 3
},{
    e: 2,
    c: 3
}];
// let a = arr;
//  let a = Object.assign([], arr);
let a = JSON.parse(JSON.stringify(arr));
a = a.map((el) => {
    if (el.e === 1) {
        delete el.e
    }
    return el;
})
console.log(arr)

console.log('dev/test merge会把commit打乱 。。。');