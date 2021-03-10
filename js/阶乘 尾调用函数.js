
// function a(){
// 	console.log(a.caller);//[Function: b]
// 	console.log(arguments.callee.caller)//[Function: b]
// 	console.log(arguments.callee)//[Function: a]
// }
// function b(){
// 	a();
// }
// b();


// function c(i){
// 	if(i===1)return 1;
// 	return i*c(i-1);
// }
// console.log(c(3));
// function d(i,total=1){
// 	if(i===1)return total;
// 	return d(i-1,i*total);
// }
// console.log(d(3));

function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n);
  };
}
let fn=function f(){
	console.log(arguments);
};
let a=currying(fn,'n');


a('m');

//调用a 就相当于