function isHigh(compareVersion, appVersion) {
    const appVersionArray = appVersion.split('.');
    const compareVersionArray = compareVersion.split('.');
    const len = Math.max(appVersionArray.length, compareVersionArray.length);
    const getNum = (elem) => Number.isNaN(parseInt(elem)) ? 0 : parseInt(elem);
    for (let index = 0; index < len; index++) {
        const appElem = getNum(appVersionArray[index]);
        const compareElem = getNum(compareVersionArray[index]);
        if (appElem !== compareElem) {
            return appElem > compareElem;
        }
    }
    return true;
}


console.log(isHigh('1.2.3', '1.2.0'));
