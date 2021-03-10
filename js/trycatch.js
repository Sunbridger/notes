function a() {
    try {
        console.log('开始1');
        throw new Error('xxxx');
    } catch (error) {
        console.log('错误');
    }
    try {
        console.log('开始2');
    } catch (error) {
        console.log('错误2');
    }
    try {
        console.log('开始3');
    } catch (error) {
        console.log('错误3');
    }
}
a()
