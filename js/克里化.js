Function.prototype.cury=function(){
  let args = [...arguments];
  let that =this;
  console.log(that,'--t')
  return function c(){
    let allArgs = args.concat([...arguments]);
    that.apply(null,allArgs);
  }
};

function a(e){
	console.log(e)
}
let b=a.cury(2);
console.log(b)