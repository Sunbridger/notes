let data = [
    { type: 1, el: '数据1' },
    { type: 2, el: '数据2' },
    { type: 3, el: '数据3' },
    { type: 4, el: '数据4' },
    { type: 5, el: '数据5' },
    { type: 4, el: '数据6' },
    { type: 1, el: '数据7' },
    { type: 2, el: '数据8' },
    { type: 3, el: '数据9' }
];

let result = [];
let type = '';
data.forEach((el, index) => {
    type = el.type;
    data.forEach((item, inx) => {
        if (type !== item.type) {
            result.push({
                type,
                el: [el.el]
            })
        } else {
            result[inx] && result[inx].el && result[inx].el.push(el.el);
        }
    });
})


console.log(result);
