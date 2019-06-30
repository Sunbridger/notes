let Person = {
    say(){
        console.log('你好人类')
    }
}
let Anima = {
    say(){
        console.log('你好动物')
    }
}

let a = Object.create(Person);
a.say();  //你好人类

Object.setPrototypeOf(a,Anima);
a.say();  //你好动物


let f = {
    mysay(){
        console.log(this,'this f');
        //Object.getPrototypeOf(this).say.cal(this)
        // return super.say()
    }
}
let e = {
    mysay:function(){
        console.log(this,'this e');
        //语法错误
        // return super.say()
    }
};
//二者唯一的区别是，简写方法可以使用super关键字，而普通方法不可以