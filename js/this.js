
// function a() {
//     ss = 'xxx';
//     console.log(a, '---a');
// }
// console.log(ss);
// a()

// for (let i = 0; i < 3; i++) {
//     setTimeout(() => {
//         console.log(i);
//     }, 0);
// }

// for (let [l, m] of [["a", 1], ["b", 2], ["c", 3]]) {
//     console.log(l, m);
//   }

// let a = {dd: 0};
// for (let i in a) {
//     console.log(i);
// }

// try {
//     throw 'xxx'
// } catch (error) {
//     let rr = 9;
//     console.log(error);
// }
// let mapObj = new Set([
//     { name: 'xxx', age: 12 },
//     { name: 'xxx', age: 13 },
//     { name: 'xxx', age: 14 },
// ]);

// let c = Array.from(mapObj, (e) => e.age);
// console.log(c);
// function aa() {

//     console.log(Array.from(arguments));
// }
// aa(1, 'as')
// 第一版


function aa(context) {
    var self = this;
    return  () => {
        console.log(self);
    }
}
aa()();
