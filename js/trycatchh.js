function a() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(1);
        })
    });
}

async function b() {
    try {
        await a();
    } catch (error) {
        console.log(error);
    }
    console.log('顺利');
}

b();
