let arr1=[1,2,3,4,5,2,1,1,6,7,1,2,3]
let arr2 = [12,1,3,31,2,]
let res=[];
for(let i=0;i<arr2.length;i++){
  let me2 = arr2[i];
  for(let j=0;j<arr1.length;j++){
    if(me2==arr1[j]){
      res.push(me2)
      break;
    }
  }
}
console.log(res,'===')