const obj = {
    name: 'sun',
    age: 99,
    pageSize: 20,
    pageIndex: 1,
};
for (let key in obj) {
    if (!['pageSize', 'pageIndex'].includes(key)) {
        obj[key] = undefined;
    }
}
console.log(obj);
console.log([1, 2, '2323'].join())
undefined.toString();
