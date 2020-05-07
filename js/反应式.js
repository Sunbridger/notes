let target = null;

const data = {
    a: 12,
    b: 2
};

for (let key in data) {
    Object.defineProperty(data, key, {
        get() {
            dep.depend();
            return data[key];
        }
        set(newValue) {
            data[key] = newValue;
            dep.notify();
        }
    })
}

class Dep {
    constructor() {
        this.arr = [];
    }
    depend() {
        if (target && !this.arr.includes(target)) {
            this.arr.push(target);
        }
    }
    notify() {
        this.arr.forEach(fn => fn());
    }
}



const dep = new Dep();


const watcher = (myFunc) => {
    target = myFunc;
    dep.depend();
    target();
    target = null;
};

watcher(() => {
    data.c = data.a * data.b;
});
