function updatev_d(vdom,newdom){
  let v_children = vdom.children;
  let n_children = newdom.children;
  if(!n_children) return;
  v_children.forEach((v_,index)=>{
    let n_ = n_children[index];
    if(n_.tag==v_.tag){
      updatev_d(v_,n_);
    }else{
      replaceNode(v_,n_);
    }
  })
}

function replaceNode(oldv,newv){
  let parent =  document.body;
  let old_ele = oldv.tag;
  let new_ele = newv.tag;
  parent.replaceChild(old_ele,new_ele);
}