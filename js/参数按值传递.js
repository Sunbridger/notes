function  fn(a) {
  var c = a ;
  // c.as='dad' 在点的时候 才会引用改变 直接赋值的话就是 相当于局部变量的独立 
  c={
    pp:'asdas'
  }
  console.log(c);
}
var aa = {
  name:'nihao',
  as:'asd'
}
fn(aa);
console.log(aa,'原本的')