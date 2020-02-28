const request = require('request');
const getSecondCarList = new Promise(() => {
    return async function getSecondCarList(page = 1, []) {
        await request.post({
            url: 'https://leaseconsumer.souche.com//v1/secondCarSearchApi/querySecondCarListV3.json',
            form:{
                page: 1,
                pageSize: 50
            }
        }, (err, res, body) => {
            if (!err) {
                const { data, nextIndex, items } = JSON.parse(body).data || {};
                if (items.length === 0) {
                    return result;
                } else {
                    console.log(items, '---');
                    result.push(...items);
                    getSecondCarList(nextIndex, result)
                }
            }
        });
    }
})
getSecondCarList().then(res => {
    console.log(res.length, '---res');
});
