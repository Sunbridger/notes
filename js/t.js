function getTime() {
    console.time('a');
    const a = '1,2,3,4,5,6,7,8,9,12'.indexOf('5');
    console.timeEnd('a');
    return a;
}
console.log(getTime());
