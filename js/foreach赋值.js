// 参数 值类型 还是引用类型 https://www.cnblogs.com/leiting/p/8081413.html
let arr = [
  { name: 'sun', age: 12 },
  { name: 'tex', age: 13 },
];

arr.forEach((row) => {
  if (row.name === 'sun') {
    row.xxx = {};
  }
});


console.log(arr);