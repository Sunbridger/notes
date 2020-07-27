// const axios = require('axios');
import axios from 'axios';
axios.get('https://mock.souche-inc.com/mock/5f17f3a058207567647e473b/example/getinfo').then((res) => {
    console.log(res.data);
})
