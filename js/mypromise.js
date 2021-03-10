const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

class MyPromise {
    constructor(exector) {
        this.state = PENDING;
        this.value = null;
        this.resolvedCallbacks = [];
        this.rejectedCallbacks = [];
        const resolve = (val) => {
            if (this.state === PENDING) {
                this.state = RESOLVED;
                this.value = val;
                this.resolvedCallbacks.forEach((cb) => cb(val));
            }
        };
        const reject = (val) => {
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.value = val;
                this.rejectedCallbacks.forEach((cb) => cb(val));
            }
        };
        try {
            exector(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    then(onFulfilled, onRejected) {
        if (this.state === PENDING) {
            onFulfilled && this.resolvedCallbacks.push(onFulfilled);
            onRejected && this.rejectedCallbacks.push(onRejected);
        }
        if (this.state === RESOLVED) {
            onFulfilled && onFulfilled(this.value);
        }
        if (this.state === REJECTED) {
            onRejected && onRejected(this.value);
        }
    }

    all(promiseArr) {
        let count = 0;
        let len = promiseArr.length;
        let resultArr = [];
        return new Promise((resolve, reject) => {
            promiseArr.forEach((itemPromise, index) => {
                Promise.resolve(itemPromise).then((itemResult) => {
                    resultArr[index] = itemResult;
                    count++;
                    if (count === len) {
                        resolve(resultArr);
                    }
                }).catch((itemErr) => {
                    reject(itemErr)
                });
            });
        })
    }
}



const p1 = new MyPromise((resolve, reject) => {
    // setTimeout(() => {
      resolve(1)
    // }, 2000)
})
p1.then(value => {
    console.log(value)
});

p1.then(value => {
    console.log(value)
})
