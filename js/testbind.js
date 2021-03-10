Function.prototype.bind2 = function(context) {
    const _this = this;
    return function F() {
        console.log(_this);
    }
}

const ctx = {
    name: 'suj',
    age: 9
};

function A(name, age) {
    // this.name = name;
    // this.age = age;
    console.log(this, name, age);
}

let a = A.bind2(ctx);
console.log(a);

console.log(a instanceof A);
