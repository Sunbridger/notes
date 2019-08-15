const items = [
  ['name', '张三'],
  ['title', 'Author']
];
 
const map = new Map();
items.forEach(
  ([key, value]) => map.set(key, value)
);

let kk = map.keys()
for(let el of kk ){
  console.log(el)
}
var vv = map.values()
console.log([...vv]);
for(let el of vv ){
  console.log(el)
}
for (let [key,value] of map){
  console.log(key,'000000');
}
let arr = ["蚂蚁部落", 4, "www.softwhy.com", "青岛市南区"];
let it = arr[Symbol.iterator]();
console.log(it.next());