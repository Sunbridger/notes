const arr = [{
    name: '家选',
    value: ['s1', 's2']
}];
const arrs = arr.map(e => e.value).flat(Infinity).toString();
console.log(arrs);
