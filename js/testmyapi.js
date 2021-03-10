const axios = require('axios');


axios.get('http://tracenorm.dasouche.net/gettrace', {}).then(res => {
    console.log(res.data.data.result, 'res');
});
