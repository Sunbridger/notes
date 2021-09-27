const axios = require('axios');


const toDingTalk = (text) => {
	axios({
		headers: {'Content-Type': 'application/json'},
		method: 'post',
		url: 'https://oapi.dingtalk.com/robot/send?access_token=03dd8c0f4451660cb959650b99318c770726cb3c49a6c3c98ccd40e9e3bba242',
		data: {
			"msgtype": "text",
			"text": {
				"content": `${text}`
			},
			// "at": text.includes('@') ? {
			// 	"atMobiles": atMobiles
			// } : {}
		}
	});
};

toDingTalk('test文案');
