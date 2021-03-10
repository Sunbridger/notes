// this.homeIconsData = res.data && res.data.filter(row => {
//     return row.permission.split(',').some((r) => permissionObj[r]);
// }).map((row) => {
//     const {
//         text, protocol, icon, buryId
//     } = row.item || {};
//     return {
//         text,
//         protocol,
//         icon,
//         buryId
//     };
// });

const arr = [
    {
        // permission: 'a,b,c',
        name: '这是abc的权限'
    },
    {
        // permission: 'a',
        name: '这是a的权限'
    },
    {
        permission: 'c',
        name: '这是c的权限'
    },
    {
        permission: '',
        name: '这是无任何的权限'
    },
];

const permissionObj = {
    a: 1,
    d: 1,
    c: 1
};

let a = arr.filter(row => {
    return row.permission && row.permission.split(',').some((r) => permissionObj[r]);
});
console.log(a, '---');
