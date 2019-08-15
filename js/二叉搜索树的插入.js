function Tree(){
  function Node(key){
    this.key=key;
    this.left=null;
    this.right=null;
  }
  var root = null;
  this.insert=function(key){
    let node = new Node(key);
    console.log(node,'0----')
    if(root==null){
      root = node;
    }else{
      insertHelp(root,node)
    }
  }
  this.zhong=function(callback){
    zhongHelp(root,callback)
  }
  this.xian=function(callback){
    xianHelp(root,callback)
  }
  function insertHelp(root,node){
    if(root.key>node.key){
      if(root.left==null){
        root.left=node;
      }else{
        insertHelp(root.left,node)
      }
    }else{
      if(root.right==null){
        root.right=node;
      }else{
        insertHelp(root.right,node)
      }
    }
  }
  function zhongHelp(root,callback){
    if(root!==null){
      zhongHelp(root.left,callback)
      callback(root.key);
      zhongHelp(root.right,callback)
    }
  }
  
}
var t = new Tree()
t.insert(1)
t.insert(11)
t.insert(12)


function a(n){
  if(n<4){
    a(n+1)
    console.log(n)
  }
}
a(1);