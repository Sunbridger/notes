function formatMul(str, dealFunc) {
    if (!str) return;
    let arr = str.split(';')
        .map(item => item.trim());
    if (dealFunc) {
        arr = arr.map(dealFunc);
    }
    return arr.filter(item => item);
}
let a = formatMul('sad,asdad,fe,aasd', (a) => a);
console.log(a);
