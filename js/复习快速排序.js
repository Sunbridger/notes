function qucikSort(arr){
	quick(arr,0,arr.length-1);
	function quick(arr,left,right){
		let index; //基准数
		if(arr.length>1){
			index=qie(arr,left,right);
		}
		if(left<index-1){ //向下取整的统一
			quick(arr,left,index-1);
		}
		if(right>index){
			quick(arr,index,right);
		}
	} 
	function qie(arr,left,right){
		let center=arr[Math.floor((left+right)/2)]; //向下取整
		while(left<=right){
			while(arr[right]>center){
				right--;
			}
			while(arr[left]<center){
				left++;
			}
			if(left<=right){
				[arr[left],arr[right]]=[arr[right],arr[left]];
				left++;
				right--;
      }
      return left;
		}
	}
	return arr;
}
let arr=[1,2,3,23,123,434,4];
console.log(qucikSort(arr));
/*
总结快速排序：
	首先就是个quick
	接着声明index
	两个qucik三if
	左右中间搞起来
	三个while一if
 */