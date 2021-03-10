// 多维数组的降维
function  getDown(arr) {
  return Array.isArray(arr)?arr.reduce( (a, b) => [...a, ...getDown(b)] ,[]):[arr]
}

var arrrs = [
  1,
  [2,3,4,5],
  [1,
    [
      2,3,4,[2,89]
    ]
  ]
]
var newarr = getDown(arrrs);
console.log(newarr,'newarr')