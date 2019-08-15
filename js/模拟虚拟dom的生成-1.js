var vdom = {
  tag:'div',
  attrs:{
    id:'div_'
  },
  children:[
    {
      tag:'p',
      attrs:{
        id:'p_'
      },
      children:[
        {
          tag:'span'
        }
      ]
    }
  ]
}

function changeDom(vdom){
  let tag = vdom.tag;
  let attrs = vdom.attrs||{};
  let children = vdom.children||[];
  if(!tag) return;
  let ele = document.createElement(tag);
  for(var a_s in attrs){
    if(attrs.hasOwnProperty(a_s)){
      ele.setAttribute(a_s,attrs[a_s]);
    }
  }
  children.forEach(child=>{
    ele.appendChild(changeDom(child))
  })
  return ele;
}