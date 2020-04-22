const fruitBasket = {
    apple: 27,
    grape: 0,
    pear: 14
};


const sleep = (fruit) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 600);
    });
};

const getFruit = (fruit) => {
    return sleep().then(() => {
        return fruitBasket[fruit];
    });
};


const fruitsToGet = ['apple', 'grape', 'pear'];


// const async_Fn = () => {
//     console.log(1);
//     fruitsToGet.forEach(async e => {
//         const len = await getFruit(e);
//         console.log(len);
//     });
//     console.log(2);
// };

// const async_Fn = async () => {
//     console.log(1);
//     for (let i = 0; i < fruitsToGet.length; i++) {
//         const len = await getFruit(fruitsToGet[i]);
//         console.log(len);
//     }
//     console.log(2);
// };
async_Fn()
