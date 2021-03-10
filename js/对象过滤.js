let obj={
	a:10,
	b:20,
	c:30,
	d:40
};
let mm=new Map();
let maxV=0 ,maxK,ob={};
Object.keys(obj).forEach(el=>{
	// mm.set(el,obj[el])
		if(obj[el]>20){
			// maxV=obj[el];
			// maxK=el;
			ob[el]=obj[el]
		}
})
// for(var [key,value] of mm){
// 	if(value>maxV){
// 		maxV=value;
// 		maxK=key;
// 	}
// }
console.log(ob)