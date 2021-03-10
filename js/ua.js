function formateUa(ua) {
    // 白名单参考自 https://ie.icoa.cn/bot
    const whiteSpider = ['360Spider', 'Googlebot', 'bingbot', 'Baiduspider', 'Sogou', 'YisouSpider', 'serpstatbot', 'Bytespider', 'AhrefsBot', 'YandexBot'];
    let result = '';
    whiteSpider.some(spidername => {
        if (ua.toLocaleLowerCase().match(spidername.toLocaleLowerCase())) {
            result = spidername;
        } else {
            result = ua;
        }
        return ua.toLocaleLowerCase().match(spidername.toLocaleLowerCase());
    });
    return result;
}


let a = formateUa("Mozilla/5.0 (compatible; /3.0; binssgbot +http://yandex.com/bots");
console.log(a);
