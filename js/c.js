let arr1 = [1, 3, 4];
let arr2 = [1, 2, 3];

function test(arr1, arr2) {
    let result = false;
    let i = 0;
    if (arr1.length === arr2.length) {
        arr1.forEach((el, index) => {
            i++;
            if (el === arr2[index]) {
                result = true;
                return;
            }
        });
    }
    console.log(i);
    return result;
}
let a = test(arr1, arr2);
console.log(a);
