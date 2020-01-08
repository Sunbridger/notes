let axios = require('axios');

function fetchCap() {
    return axios.get('http://47.96.149.250:7001/getcap');
}
async function chainFetchCap(ispromise, item) {
    const obj = await ispromise;
    const res = await fetchCap(item);
    console.log(ispromise, '---');
    return {
        ...obj,
        [item]: res.data.text
    }
}
[1, 2, 3, 4].reduce(chainFetchCap, {}).then(console.log)
