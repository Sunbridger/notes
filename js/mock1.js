const Mock = require('mockjs');

var Random = Mock.Random

Random.email();
Random.boolean();
Random.natural(); // 返回一个随机自然数大于等于0
Random.character(); // 随机字符
Random.cword(); // 随机一个中文
Random.cparagraph(); // 随机中文段
Random.image(); //随机生成图片
Random.guid(); // 随机生成一个guid
Random.id(); // 随机生成一个18位id
Random.cname(); // 随机生成常见的中文名字

let res = Mock.mock({
    name: '@cname',
    word: '@cparagraph(1, 3)',
    avatar: '@image',
    id: '@id',
    age: '@integer(12, 25)',
    'hasCar|1-2': true,
    'myobject|2-4': {
        "110000": "北京市",
        "120000": "天津市",
        "130000": "河北省",
        "140000": "山西省"
    },
    'oneof|1': ['ball', 'watcer', 'fruit'],
    'arr|1-10': [
        {
            'name|1': ['ball', 'watcer', 'fruit'],
        }
    ],
    'arrlikes|1-3': ['你等等'],
    email: '@email'
});

const userInfo = Mock.mock({
    'data|1-3': [
        {
            name: '@cname',
            text: '@cparagraph(1, 3)',
            avatar: '@image',
            id: '@id',
            age: '@integer(12, 25)',
        }
    ],
    code: 200
});


console.log(userInfo);
