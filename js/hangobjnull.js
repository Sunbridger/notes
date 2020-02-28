let obj = {
    a: 1,
    c: '',
    da: 'asda'
};
let na = {};
Object.keys(obj).forEach(k => {
    if (obj[k]) {
        na[k] = obj[k];
    }
})
console.log(na);
