async function fn() {
    for(let i = 0; i < 5; i++) {
        console.log(i, '-----i');
        await delay();
    }
}


async function delay() {
    setTimeout(() => {
        console.log('delay');
    }, 3000);
}


fn();