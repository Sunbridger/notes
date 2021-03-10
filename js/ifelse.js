// // 方式一：把 key 转成数组再判断

// let city = '广州'
// let obj = {
//     '广州,佛山': '广东',
//     '海口,三亚': '海南',
// }
// let keys = []
// for (let key in obj) {
//     keys = key.split(',')
//     if (keys.includes(city)) {
//         console.log(obj[key])
//         break
//     }
// }


// //  方式二：使用Map
// let city = '广州'
// let map = new Map([
//     [['广州', '佛山'], '广东'],
//     [['海口', '三亚'], '海南'],
// ])
// for (let key of map.keys()) {
//     if (key.includes(city)) {
//         console.log(obj[key])
//         break
//     }
// }
// //广东

const actions = new Map([
    [1, ['processing','IndexPage']],
    [2, ['fail','FailPage']],
    [3, ['fail','FailPage']],
    [4, ['success','SuccessPage']],
    [5, ['cancel','CancelPage']],
    ['default', ['other','Index']]
  ])

  Array.from(actions).forEach(e => {
      console.log(e, '--e');
  })
  /**
   * 按钮点击事件
   * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消
   */
  const onButtonClick = (status)=>{
    let action = actions.get(status) || actions.get('default')
    console.log(action,'---ac');
  }
  onButtonClick(1);
