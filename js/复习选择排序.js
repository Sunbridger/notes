function selectSort(arr){
	let len=arr.length,indexmin,i,j;
	for(i=0;i<len;i++){
		indexmin=i;
		for(j=i+1;j<len;j++){
			if(arr[indexmin]>arr[j])
				indexmin=j;
      }
      if(indexmin!==i){
        [arr[indexmin],arr[i]]=[arr[i],arr[indexmin]];	
      }
	}
	return arr;
}
let arr=[1,2,23,23,54,5665,3,0,43];
console.log(selectSort(arr));
/*
总结下选择排序：
	四个变量选择排
	后面变量跟着我
	其中有个是最小
	若不相等就交换
 */