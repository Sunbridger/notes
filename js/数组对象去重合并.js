const arr1 = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }];
const arr2 = [{ name: 'name1', id: 1 }, { name: 'name4', id: 4 }, { name: 'name5', id: 5 }];
let arr3 = arr1.concat(arr2);
let result = [];
let obj = [];
result = arr3.reduce(function (prev, cur, index, arr) {
    if (!obj[cur.id]) {
        obj[cur.id] = true;
        prev.push(cur)
    }
//   obj[cur.id] ? '' : obj[cur.id] = true && prev.push(cur);
  return prev;
}, []);
console.log(result);
//[{ name: 'name1', id: 1 },{ name: 'name2', id: 2 },{ name: 'name3', id: 3 },{ name: 'name4', id: 4 },{ name: 'name5', id: 5 }]



// 对象数组 抽去交集
// let arr1 = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }];
// let arr2 = [{ name: 'name1', id: 1 }, { name: 'name4', id: 4 }, { name: 'name5', id: 5 }];
// let result = arr1.filter(function (v) {
//   return arr2.every(n => JSON.stringify(n) !== JSON.stringify(v))
// })
// console.log(result); // [ { name: 'name2', id: 2 }, { name: 'name3', id: 3 } ]
