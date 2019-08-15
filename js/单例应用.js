// 实现Storage，使得该对象为单例，并对localStorage进行封装设置值setItem(key,value)和getItem(key)


var SingleTon = function(name){ //创建一个对象
    this.name = name;
    this.instance = null;
};
SingleTon.prototype.getName = function(){
    console.log(this.name);
};
SingleTon.getInstance = function(name){
  console.log(this,'9')
   if(!this.instance){
        this.instance = new SingleTon(name);
    }
    return this.instance;
}

var a = SingleTon.getInstance('老王');
var b = SingleTon.getInstance('老liu');
console.log(a,b)