let arr = [{name: 'sunbridger', age: 12}, {name: 'sss', age: 13}, {name: 'sunbridger', age: 11}, {name: 'sunbridger', age: 12}, {name: 'sunbdger', age: 14}];

function checkAllIsSame(arr) {
    if (arr.length >= 2) {
        let flag = false;
        arr.forEach((el, index) => {
            let oldarr = {...arr};
            delete oldarr[index];
            oldarr.forEach((item) => {
                if (el.code === item.code && el.code === item.number) {
                    flag = true;
                }
            });
        });
        return flag;
    }
    return true;
}
// console.log(checkAllIsSame(arr));
// console.log(arr, arr.length);
console.log(arr.splice(1, 1));
