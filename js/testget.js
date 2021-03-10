const axios = require('axios');
// axios.get('http://127.0.0.1:7001/testget', {
//     params: {
//         a: 'xxxx'
//     }
// }).then(({data}) => {
//     console.log(data, 'get');
// })

axios.post('http://127.0.0.1:7001/testpost', {
    ads: 'xxx',
    sdsa: 'asdad'
}).then((res) => {
    console.log(res, 'post');
})
