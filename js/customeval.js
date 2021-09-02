let type1 = '{"type":"date","title":"今日值班人员","20210729":"wangriqiao","202107290918":"刘颖","202107291924":"大黄"}'; // 按天或者时间段

let type2 = '{"type":"week","title":"今日值班人员","1":"wangriqiao","2":"刘颖","3":"大黄"}'; // 按周类型 

console.log(JSON.parse(type1));

const nowT = new Date()

console.log(nowT);