var express = require("express");
var app = express();

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.post("/getRecheckRemark", function(req, res) {
   
    res.json({
        result: [
            { 
                operatorRole: 0,
                operatorName: 'aaaa',
                isCompliance: false,
                remark: '这是Addddd'
            },
            { 
                operatorRole: 1,
                operatorName: 'bbb',
                isCompliance: false,
                remark: 'bbbbbbbbb'
            },
        ],
        success: true,
    });
});

app.get('/detail', (req, res) => {
    res.json({
        result: {
            "allReviewerSubmitted": true,
            "editable": false,
            "supplierQualifyReviewDetails": [{
                "expertQualifyReviews": [{
                    "qualifyReviewDetails": [{
                        "orderNo": "1",
                        "reviewRemark": "",
                        "reviewStatus": 1
                    }, {
                        "orderNo": "2",
                        "reviewRemark": "",
                        "reviewStatus": 1
                    }],
                    "reviewPersonId": "10007408216",
                    "reviewStatus": 1
                }, {
                    "qualifyReviewDetails": [{
                        "orderNo": "1",
                        "reviewRemark": "是的",
                        "reviewStatus": 0
                    }, {
                        "orderNo": "2",
                        "reviewRemark": "计算出剧毒",
                        "reviewStatus": 0
                    }],
                    "reviewPersonId": "10007407224",
                    "reviewStatus": 0
                }, {
                    "qualifyReviewDetails": [{
                        "orderNo": "1",
                        "reviewRemark": "传递就",
                        "reviewStatus": 0
                    }, {
                        "orderNo": "2",
                        "reviewRemark": "吃的好好干",
                        "reviewStatus": 0
                    }],
                    "reviewPersonId": "10007408215",
                    "reviewStatus": 0
                }],
                "institutionType": "0202",
                "reviewRemark": "吃的好好干,传递就",
                "reviewStatus": 0,
                "supplierId": "148880362817536",
                "supplierName": "测试供应商16442090067"
            }, {
                "expertQualifyReviews": [{
                    "qualifyReviewDetails": [{
                        "orderNo": "1",
                        "reviewRemark": "",
                        "reviewStatus": 1
                    }, {
                        "orderNo": "2",
                        "reviewRemark": "",
                        "reviewStatus": 1
                    }],
                    "reviewPersonId": "10007408216",
                    "reviewStatus": 1
                }, {
                    "qualifyReviewDetails": [{
                        "orderNo": "1",
                        "reviewRemark": "",
                        "reviewStatus": 1
                    }, {
                        "orderNo": "2",
                        "reviewRemark": "",
                        "reviewStatus": 1
                    }],
                    "reviewPersonId": "10007407224",
                    "reviewStatus": 1
                }, {
                    "qualifyReviewDetails": [{
                        "orderNo": "1",
                        "reviewRemark": "",
                        "reviewStatus": 1
                    }, {
                        "orderNo": "2",
                        "reviewRemark": "",
                        "reviewStatus": 1
                    }],
                    "reviewPersonId": "10007408215",
                    "reviewStatus": 1
                }],
                "institutionType": "020101",
                "reviewRemark": "sycgydsgyy",
                "reviewStatus": 0,
                "supplierId": "189",
                "supplierName": "测试供应商12"
            }, {
                "expertQualifyReviews": [{
                    "qualifyReviewDetails": [{
                        "orderNo": "1",
                        "reviewRemark": "",
                        "reviewStatus": 1
                    }, {
                        "orderNo": "2",
                        "reviewRemark": "",
                        "reviewStatus": 1
                    }],
                    "reviewPersonId": "10007408216",
                    "reviewStatus": 1
                }, {
                    "qualifyReviewDetails": [{
                        "orderNo": "1",
                        "reviewRemark": "",
                        "reviewStatus": 1
                    }, {
                        "orderNo": "2",
                        "reviewRemark": "",
                        "reviewStatus": 1
                    }],
                    "reviewPersonId": "10007407224",
                    "reviewStatus": 1
                }, {
                    "qualifyReviewDetails": [{
                        "orderNo": "1",
                        "reviewRemark": "",
                        "reviewStatus": 1
                    }, {
                        "orderNo": "2",
                        "reviewRemark": "",
                        "reviewStatus": 1
                    }],
                    "reviewPersonId": "10007408215",
                    "reviewStatus": 1
                }],
                "institutionType": "020101",
                "reviewRemark": "",
                "reviewStatus": 1,
                "supplierId": "4",
                "supplierName": "测试供应商11"
            }],
            "supplierUnmatchedQualifyReviews": [{
                "supplierId": "148880362817536",
                "supplierName": "测试供应商16442090067",
                "unmatchedQualifyOrderNos": ["1", "2"]
            }]
        },
        "success": true
    })
});

app.get('/base-info', (req, res) => {
    res.json({
        "result": {
            "qualifyReviewItems": [{
                "orderNo": "1",
                "requirementDetail": "请根据\"落实政府采购政策需满足的资格要求\"，上传对应的资格文件，格式以采购文件要求为准",
                "reviewRequirement": "供应商应为中小企业",
                "type": 5
            }, {
                "orderNo": "2",
                "requirementDetail": "基本资质",
                "reviewRequirement": "基本资质",
                "type": 0
            }],
            "qualifyReviewers": [{
                "editable": false,
                "isLeader": 1,
                "remark": "的会话撤回原因",
                "reviewMemberId": "230",
                "reviewPersonId": "10007407224",
                "reviewStatus": 3,
                "reviewerName": "成都财政"
            }, {
                "editable": false,
                "isLeader": 0,
                "remark": "1111",
                "reviewMemberId": "236",
                "reviewPersonId": "10007408215",
                "reviewStatus": 2,
                "reviewerName": "雷佳明"
            }, {
                "editable": false,
                "isLeader": 0,
                "remark": "评审通过",
                "reviewMemberId": "238",
                "reviewPersonId": "10007408216",
                "reviewStatus": 2,
                "reviewerName": "操迪"
            }]
        },
        "success": true
    })
});

app.get('/flowable', (req, res) => {
    res.json({
    "success": true,
    "result":{
        "allPages":[
            {
                "isFinished":1,
                "name":"开标记录（资格商务技术）",
                "page":"OPEN_RECORD_BUS_TECH",
                "pageType":1,
                "sort":0,
                "statusNo":2
            },
            {
                "isFinished":1,
                "name":"资格评审",
                "page":"QUALIFY_REVIEW",
                "pageType":1,
                "sort":1,
                "statusNo":2
            },
            {
                "isFinished":1,
                "name":"资格审查汇总",
                "page":"QUALIFY_REVIEW_SUMMARY",
                "pageType":1,
                "sort":2,
                "statusNo":2
            },
            {
                "isFinished":1,
                "name":"符合性评审",
                "page":"COMPLIANCE_REVIEW",
                "pageType":2,
                "sort":3,
                "statusNo":2
            },
            {
                "isFinished":1,
                "name":"符合性评审汇总",
                "page":"COMPLIANCE_REVIEW_SUMMARY",
                "pageType":2,
                "sort":4,
                "statusNo":2
            },
            {
                "isFinished":1,
                "name":"商务技术结果公布",
                "page":"RESULT_BUS_TECH_PUBLISH",
                "pageType":1,
                "sort":5,
                "statusNo":2
            },
            {
                "isFinished":1,
                "name":"开标记录（报价）",
                "page":"OPEN_RECORD_QUOTE",
                "pageType":1,
                "sort":6,
                "statusNo":2
            },
            {
                "isFinished":1,
                "name":"报价评审",
                "page":"QUOTE_REVIEW",
                "pageType":2,
                "sort":7,
                "statusNo":2
            },
            {
                "isFinished":1,
                "name":"得分汇总",
                "page":"SCORE_SUMMARY",
                "pageType":2,
                "sort":8,
                "statusNo":2
            },
            {
                "isFinished":0,
                "name":"结果公布",
                "page":"RESULT_PUBLISH",
                "pageType":1,
                "sort":9,
                "statusNo":2
            }
        ],
        "currentPage":{
            "isFinished":0,
            "name":"结果公布",
            "page":"RESULT_PUBLISH",
            "pageType":1,
            "sort":8,
            "statusNo":2
        }
    },
    "code": 200,
    "message": "@string"
    })
})

app.post('/getbtn', (req, res) => {
    res.json({
        "result": {
            "buttons": [{
              "btnType": 4,
              "disabled": false,
              "key": "invalid",
              "name": "废标"
            }, {
              "btnType": 4,
              "disabled": false,
              "key": "Akey",
              "name": "A岗提交复核"
            }, {
              "btnType": 4,
              "disabled": false,
              "key": "Bkey",
              "name": "B岗审核复核"
            }, {
              btnType: 4,
              disabled: false,
              key: "next",
              name: "下一步",
            }, {
              btnType: 4,
              disabled: false,
              key: "save",
              name: "提交",
            }],
            "isModifiable": false
          },
          "success": true
    })
})


app.listen(3000, function() {
    console.log("App started on port 3000");
});