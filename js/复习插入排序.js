function insertSort(arr){
	let len=arr.length,i,j,t;
	for(i=1;i<len;i++){
		j=i;
		t=arr[i];
		while(j>0&&arr[j-1]<t){
			arr[j]=arr[j-1];
			j--;
		}
		arr[j]=t;
	}
	return arr;
}
let arr=[1,2,1,2,3,2,3,44,32312];
console.log(insertSort(arr))
/*
总结插入排序：
 四个变量搞起来
 一个for来一个while
 注意对称和用j
 */