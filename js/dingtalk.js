const axios = require('axios');


const toDingTalk = (text) => {
	axios({
		headers: {'Content-Type': 'application/json'},
		method: 'post',
		url: 'https://oapi.dingtalk.com/robot/send?access_token=b02d06b20782441338c85d43ca0c6fd6f0a404958906adfd570b66f3e475d37f',
		data: {
			"msgtype": "text",
			"text": {
				"content": `${text}-来自埋点规范定时任务。`
			},
			// "at": text.includes('@') ? {
			// 	"atMobiles": atMobiles
			// } : {}
		}
	});
};

toDingTalk('test文案');
