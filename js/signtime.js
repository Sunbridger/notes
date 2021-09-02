// // const sign = 'E+UJO170eDctiypDkMyrOQcAm0laYk1vXXyWwZ0gO50=';
// const crypto = require('crypto');
// const timestamp = 1624524428384;
// const secret="WK0TB1AX0MFMTAzKQtDz26K01nGCEFp5RoEDo3TySLlpluSKn1ImJzqTnzcseaim"

// const stringToSign = timestamp + "\n" + secret

// const sign = crypto.createHmac('sha256', secret).update(stringToSign).digest("base64")
// // 最终得到的签名sign
// const sign_urlencode = encodeURIComponent(sign)
// console.log(sign_urlencode);


// [
//     {
//         "value":"新人",
//         "label":"新人"
//     },
//     {
//         "value": "前端",
//         "label": "前端",
//         "children": [
//             {
//                 "value":"前端文档",
//                 "label":"前端文档",
//                 "children": [
//                     {
//                         "value":"项目采购文档",
//                         "label":"项目采购文档",
//                     },
//                     {
//                         "value":"电子卖场文档",
//                         "label":"电子卖场文档",
//                     },
//                     {
//                         "value":"运营平台文档",
//                         "label":"运营平台文档",
//                     },
//                     {
//                         "value":"共享平台文档",
//                         "label":"共享平台文档",
//                     },
//                     {
//                         "value":"数据可视化文档",
//                         "label":"数据可视化文档",
//                     },
//                 ]
//             },
//             {
//                 "value":"前端基建",
//                 "label":"前端基建",
//                 "children": [
//                     {
//                         "value":"敦煌",
//                         "label":"敦煌"
//                     },
//                     {
//                         "value":"鲁班",
//                         "label":"鲁班"
//                     },
//                     {
//                         "value":"云长",
//                         "label":"云长"
//                     },
//                     {
//                         "value":"浑仪",
//                         "label":"浑仪"
//                     },
//                     {
//                         "value":"百策",
//                         "label":"百策"
//                     },
//                     {
//                         "value":"水镜",
//                         "label":"水镜"
//                     },
//                     {
//                         "value":"门神",
//                         "label":"门神"
//                     },
//                     {
//                         "value":"铜雀台",
//                         "label":"铜雀台"
//                     },
//                     {
//                         "value":"智能问答机器人",
//                         "label":"智能问答机器人"
//                     },
//                     {
//                         "value":"D2C",
//                         "label":"D2C"
//                     },
//                     {
//                         "value":"Node微服务",
//                         "label":"Node微服务"
//                     },
//                 ]
//             },
//         ],
//     },
//     {
//         "value":"技术保障",
//         "label":"技术保障"
//     },
//     {
//         "value":"质量保障",
//         "label":"质量保障"
//     },
//     {
//         "value":"后端文档",
//         "label":"后端文档"
//     },
//     {
//         "value":"测试文档",
//         "label":"测试文档"
//     },
//     {
//         "value":"机器人闲聊",
//         "label":"机器人闲聊"
//     }
// ]



// [{"value":"新人","label":"新人"},{"value":"前端文档","label":"前端文档"},{"value":"后端文档","label":"后端文档"},{"value":"测试文档","label":"测试文档"},{"value":"敦煌","label":"敦煌"},{"value":"鲁班","label":"鲁班"},{"value":"云长","label":"云长"},{"value":"浑仪","label":"浑仪"},{"value":"百策","label":"百策"},{"value":"水镜","label":"水镜"},{"value":"门神","label":"门神"},{"value":"铜雀台","label":"铜雀台"},{"value":"运维","label":"运维"},{"value":"D2C","label":"D2C"},{"value":"Node微服务","label":"Node微服务"},{"value":"机器人闲聊","label":"机器人闲聊"}]


