let url ='https://www.nowcoder.com/discuss/?a=2&b=sun&c=true';
function getU(url){
	let str =url.split("?")[1];
	let obj={};
	if(str.indexOf("&")!=-1){
		str.split('&').forEach(el=>{
			let key = el.split("=")[0];
			let value = el.split("=")[1];
			obj[key]=value;
		});
	}else{
		let key = str.split("=")[0];
		let value = str.split("=")[1];
		obj[key]=value
	}
	return obj;
}
console.log(getU(url))
