const data = {
    name: 'sun',
    age: 12,
    family: {
        father: 'wzx',
        mothen: 'wjl',
        wife: ''
    }
};
myobserve(data);
data.age = 24; // 监听到age变化为24
data.family.wife = 'sunbridger'; // 监听到wife变化

function myobserve(data) {
    if (data && Object.prototype.toString.call(data) === '[object Object]') {
        Object.keys(data).forEach(key => {
            defineEveryKey(data, key, data[key]);
        });
    }
    return;
}

function defineEveryKey(obj, key, value) {
    myobserve(value);
    Object.defineProperty(obj, key, {
        get() {
            return value;
        },
        set(newv) {
            console.log(`监听到${key}变化为${newv}`);
            value = myobserve(value);
            arrsFn.forEach
        }
    });
}

let arrsFn = [];
let TargetFn = () => {};
