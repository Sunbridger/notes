const obj = [
    {
        env: ['prod'],
        id: 1,
        name: 'sunbridger',
    }
];


const id = 1;

// let item = null;


// obj.forEach((el) => {
//     if (el.id === id) {
//         item = el;
//     }
// });
// console.log(item);

const item = obj.filter((el) => el.id === id);

console.log(item);