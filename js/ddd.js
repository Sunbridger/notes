const detail = {
    // name: 'wangriqiao',
    age: 6,
};

// const { name, age } = detail;

const name = detail.name || {};
const age = detail.age || {};

console.log(name, age);