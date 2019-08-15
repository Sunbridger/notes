function deepClone(obj){
    let objClone = Array.isArray(obj)?[]:{};
    if(obj && typeof obj==="object"){
        for(key in obj){
            if(obj.hasOwnProperty(key)){
                //判断ojb子元素是否为对象，如果是，递归复制
                if(obj[key]&&typeof obj[key] ==="object"){
                    objClone[key] = deepClone(obj[key]);
                }else{
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}    
// 借用JSON对象的parse和stringify
function deepClone(obj){
    if(typeof obj != 'object'||obj==null)return;
    let _str = JSON.stringify(obj),
        objClone = JSON.parse(_str);
    return objClone
}    

deepCopy(o) {
    if(typeof o != 'object') return o;
    let objClone = o instanceof Array?[]:{};
    for (let i in o) {
      // 如果不遍历原型链查找的添加if(o.hasOwnProperty(i))判断
      objClone[i] = deepCopy(o[i]);
    }
    return objClone;
    
  }
