// class A{
//   constructor(name,age){
//     this._name=name;
//     this.age=age;
//   }
//   set name(va){
//     this._name=va
//   }
//   get name(){
//     return this._name
//   }
// }
// var a = new A('网桥',22)
// console.log(a)

let per= {
  name:'sun',
  age:22
}
Object.defineProperty(per,'name',{
  get(){
    return 'sunbridger'
  },
  set(v){
    console.log(this,'----this就是per这个对象么')
    this.name=v;
  }
})
per.name='sss'
console.log(per)
console.log(per.name)