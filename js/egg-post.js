const axios = require('axios');




const projectDataArr = [{
    url: '121312qweqwe',
    error: 'asdasdadasdasd'
},{
    url: 'xxx',
    error: 'xxxxxxx'
},{
    url: 'xxx',
    error: 'sdasdasdasdasdasdasd'
},{
    url: 'xxx',
    error: 'asdasdasdasdasdadadadasd'}];

function fn (arr) {
    arr.forEach(id => {
        axios.post('http://127.0.0.1:6001/api/msgCollect', {
            id,
            error_list: JSON.stringify(projectDataArr),
            success_pages: 78 + id
        }).then(res => {
            console.log(res.data, 'res');
        });
    });
}
