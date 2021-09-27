const axios = require('axios');

const yapiList = [
    '/bidding-open/bid/notify/supplier/search',
    '/bidding-open/document/pdf/preview',
    '/bidding-tiga/notice/correct/detail',
    '/bidding-tiga/notice/correct/result/detail',
    '/bidding-tiga/notice/correct/result/update',
    '/bidding-tiga/notice/correct/update/simple',
    '/bidding-tiga/notice/correct/meta?xxx=as9',
    '/bidding-tiga/result/purchaserConfirmFile/sign/callback',
    '/bidding-tiga/result/purchaserConfirmFile/sign/cancel',
].map((url) => url.split('?')[0]);

const resultReturn = {};

const begin = async (list = []) => {
    const asyncMap = list.map((url) => {
        return axios.get(`http://paas.cai-inc.com/api/jarvis/search?keyword=${url}`)
    });
    Promise.all(asyncMap).then((resultArr) => {
        resultArr.forEach(({ data: { content: { data: { text }} } }, index) => {
            resultReturn[yapiList[index]] = text.includes(yapiList[index])
        });
        console.log(resultReturn);
    });
}

begin(yapiList);