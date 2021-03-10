const axios = require('axios');
// import axios from 'axios';
// axios.get('https://mock.souche-inc.com/mock/5f17f3a058207567647e473b/example/getinfo').then((res) => {
//     console.log(res.data);
// })


axios.get('https://kyfw.12306.cn/otn/leftTicket/queryT?leftTicketDTO.train_date=2021-02-05&leftTicketDTO.from_station=HGH&leftTicketDTO.to_station=YTG&purpose_codes=ADULT', {}, {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
        'Cookie': '_uab_collina=160488793265541491548447; JSESSIONID=D1534A49A86DCAD1739B4A82D5CE0571; _jc_save_wfdc_flag=dc; BIGipServerpool_passport=98828810.50215.0000; route=6f50b51faa11b987e576cdb301e545c4; _jc_save_fromStation=%u676D%u5DDE%u4E1C%2CHGH; _jc_save_toStation=%u9E70%u6F6D%2CYTG; _jc_save_fromDate=2021-02-05; _jc_save_toDate=2021-01-07; RAIL_EXPIRATION=1610279023669; RAIL_DEVICEID=q_50Q5qf-rp6oQmhlx9Rjtc4ozMqdgsN_WLSPuZBwmx4YEGF0Idq6LEpOzgtkWGzpJkHt_rdR8raVT1zgGYugDoNtctyLIsJO26acvsZuXwZ0SQZCSLeM0W8yRWR7mXkxOgopwbJh420AlYgZrgWS6cqjGT4ltpn; BIGipServerotn=837812746.50210.0000; BIGipServerportal=3067347210.16671.0000'
    }
}).then((res) => {
    console.log(res.data);
})
