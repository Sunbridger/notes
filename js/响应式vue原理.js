function observe(data){ 
    if(typeof data !== 'object'){//不是对象不进行数据劫持
        return
    }
    return new Observe(data);
}

//将model->vm.data
function Observe(data){
    for(let key in data) { //遍历所有属性进行劫持
        let val = data[key];
        observe(val); //深入递归数据劫持exp：data:{a:{a:3},b:5}}
        Object.defineProperty(data,key,{
            enumerable: true,
            get(){
                return val; //此时的val已经进行了数据劫持，exp：{a:3}
            },
            set(newVal){
                if(newVal === val ){ //值不变则返回
                    return
                }
                val = newVal;
                observe(newVal); //新赋的值也必须进行数据劫持
            }
        })
    }
}

