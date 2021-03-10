function a() {
    console.log(1);
}

function b() {
    console.log(2);
}

 [a, b,a, b].reduce(function(x,y){
  x(y())
})
// var aa = [1,2,3,4,5,6].reduce((a,b,c)=>{
//   console.log(a,b,c)
//   return a+b
// })
// console.log(aa,'aa')