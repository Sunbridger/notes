let str =`https://m.tangeche.com/bj/buy/
`;
const strBuy = /.*buy\/$/gi.test(str.trim());
console.log(strBuy);
