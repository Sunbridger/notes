let arr = ['name','age','job','where'];
let set = new Set(arr);
for(let i in arr)
let newarr = [];
for(let el of set.entries()){
  console.log(el)
  newarr.push(el);
}
let map = new Map(newarr)
console.log(map)
let newobj = {};
for(let [key,value] of map){
  newobj[key]=value
}
console.log(newobj); 


let obj={}
arr.forEach(el=>{
  obj[el]=el
})
