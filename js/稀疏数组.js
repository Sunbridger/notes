var arr1 = new Array(5) //ES6 Array.of()解决这个bug let arr5 = Array.of(5);=>[5]
var arr2 = Array(5)
var arr3 = [];
arr3[5] = 99;
var arr4 = [,,,,]
console.log(arr1,arr2,arr3,arr4)
// forEach map filter等方法对empty是会跳过处理的 所以存在不能遍历
// ES6解决方法为Array.from(arr)将他们转化为真实承认的数组
console.log(Array.from(arr4).forEach(e=>console.log(e)))