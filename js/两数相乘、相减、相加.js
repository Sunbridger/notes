// 相乘
function accMul(arg1,arg2){
    let m = 0, s1=arg1.toString(), s2=arg2.toString();
    m += Number.isInteger(arg1) ? 0 : s1.split('.')[1].length;
    m += Number.isInteger(arg2) ? 0 : s2.split('.')[1].length;
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

// 相减
function accSub(arg1,arg2){
    let r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    //last modify by deeka
    //动态控制精度长度
    return ((arg1*m-arg2*m)/m)
}

// 相加
function accAdd(arg1,arg2){
    let r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    //last modify by deeka
    //动态控制精度长度
    return ((arg1*m+arg2*m)/m)
}
