const arr = [
    {p: 'A,C', name: '111'},
    {p: 'B', name: '222'},
    {p: 'C', name: '333'},
    {p: 'D', name: '444'},
    {p: '', name: '444'},
];

const pobj = {
    'A': '1',
    'B': '1'
};

let a = arr.filter((row) => row.p === '')
console.log(a);
