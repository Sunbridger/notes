const responseList = [
    { id: 1, a: 1 },
    { id: 2, a: 2 },
    { id: 1, a: 4 },
    { id: 3, a: 3 },
    { id: 1, a: 4 },
];

console.log(responseList.reduce((acc, cur) => {
    const ids = acc.map((e) => e.id);
    return ids.includes(cur.id) ? acc : [...acc, cur];
}, []));
