// 你总可以在Reflect上获取默认行为。
const obj = {};
const fl = Object.defineProperty(obj, 'name', {
    value: 'sunbridger',
    enumerable: true
});
const flag = Reflect.defineProperty(obj, 'name', {
    value: 'sunbridger',
    enumerable: true
});
console.log(fl, flag, obj);
