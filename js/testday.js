const handZero = (n) => {
    return n > 9 ? n : `0${n}`;
};

const getDayNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = handZero(date.getMonth() + 1);
    const day = handZero(date.getDay());
    return Number(`${year}${month}${day}`);
}

const getThirtyLater = () => {
    let date = new Date();
    date.setDate(date.getDate() + 29);
    const year = date.getFullYear();
    const month = handZero(date.getMonth() + 1);
    const day = handZero(date.getDate());
    return `${year}-${month}-${day}`;
};

console.log(getThirtyLater());
