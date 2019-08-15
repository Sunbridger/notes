function mergeSort(arr){
	let len=arr.length;
	if(len===1)return arr;
	let mid=Math.floor(len/2);
	let left=arr.slice(0,mid);
	let right=arr.slice(mid);
	function merge(left,right){
		let result=[];
		let l=0;
		let r=0;
		while(l<left.length&&r<right.length){
			if(left[l]<right[r]){
				result.push(left[l++]);
			}else{
				result.push(right[r++]);
				}
			}
				while(l<left.length){
					result.push(left[l++]);
				}
				while(r<right.length){
					result.push(right[r++]);
				}
		return result;
	}
	return merge(mergeSort(left),mergeSort(right));	
}
console.log(mergeSort(createArr(5)));
/*
总结归并排序:
	若为一赶紧溜
 	左右中搞起来
 	搞完return上函数
 	上函数空集合
 	两个参数都为零
 	一while总结
 	后while分
	一共就是三个while
	千万记住返集合
 */




















// 生成一个随机数组 长度自己把握
function createArr(length){
		let arr=[];
	while(length>0){
			arr.push(parseInt(Math.random()*1000));
			length--;
	}
	return arr;
}
// let arr=createArr(5);
// console.log(arr);


