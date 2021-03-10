// 数组扁平化 Array.prototype.flat 这个api其实直接可以用
function myFlat(arr) {
    return arr.reduce((result, item)=> {
        return result.concat(Array.isArray(item) ? myFlat(item) : item);
    }, []);
}

function myFlat(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
