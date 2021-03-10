const obj = {
    name: 'ww',
    likes: {
        sport: {
            ball: 'basketball'
        }
    }
};

const expr1 = 'likes.sport.ball';
const expr2 = 'name';


function getVal(expr, obj) {
    const arr = expr.split('.');
    if (arr.length) {
        return arr.reduce((all, cur, index) => {
            return all[cur]
        }, obj);
    } else {
        return obj[expr];
    }
}

const val = getVal(expr2, obj);
console.log(val);
