/**
 * 
 menus:[{
        id:"index",
        title:"首页",
        isVisible:true
    },{
        id:"apps",
        title:"应用中心",
        isVisible:true,
        children:[{
                id:"index",
                title:"首页",
                isVisible:true
            }
        ]
    }
]
 */
for(var i=0;i<menus.length;i++){
    if(menus[i].isVisible == true){
        // dosomething....
        if(menus[i].children){
            for(var j=0;j<menus[i].children.length;j++){
                if(menus[i].children[j].isVisible == true){
                    // dosomething.....
                }
            }
        }
    }
}


// 这种含有子元素children，并且子元素和父级元素的结构是相似的，明显应该用递归或者while来进行遍历嘛。
(function forEach(menus){
    for(var i = 0; i < menus.length; i++){
        //这里的 == true 完全没有必要
        if(menus[i].isVisible){
            //dosomething....
            if(menus[i].children){
                //有子元素，那么就递归
                forEach(menus[i].children);
            }
        }
    }
})(menus);