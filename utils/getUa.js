function getAppFrom() {
        var ua = navigator.userAgent.toLowerCase();
        if (/MicroMessenger/i.test(ua) === true) {
            return 'weixin';
        }
        return '';
}
