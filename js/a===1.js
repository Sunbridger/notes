// 如何实现 a === 1 && a === 2 && a === 3

let index = 0;
Object.defineProperty(global, 'a', {
    get() {
        // index++;
        switch (++index) {
            case 1:
                return 1;
            case 2:
                return 2;
            case 3:
                return 3;
            default:
                break;
        }
    }
})


if (a === 1 && a === 2 && a === 3) {
    console.log(1);
}
