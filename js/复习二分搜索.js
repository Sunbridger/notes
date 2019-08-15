function binarySearch(arr,item){
	 arr=arr.sort((a,b)=>{a>b});
	 let low=0,h=arr.length-1,mid,center;
	 	mid=Math.floor((low+h)/2);
	 	center=arr[mid];
	 	if(center<item){
	 		low=mid+1;
	 	}else if(center>item){
	 		h=mid-1;
	 	}else{
	 		return mid;
	 	}
	 
	 return -1;
}

console.log(binarySearch([1,2,23],2))

/*
数组首先要排序
大中小也齐上阵
查小中小中加一
查大中大中减一
三个else后返中
 */












function createArr(length){
		let arr=[];
	while(length>0){
			arr.push(parseInt(Math.random()*3));
			length--;
	}
	return arr;
}