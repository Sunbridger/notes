const detail = {
    // name: '往日桥',
    age: 6,
};

// const { name, age } = detail;

const name = detail.name || {};
const age = detail.age || {};

console.log(name, age);