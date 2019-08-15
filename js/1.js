function fn(newobj, oldobj) {
    let likeData = {};
    for (let key in newobj) {
        if (newobj[key] && newobj[key] !== oldobj[key]) {
            likeData[key] = newobj[key]
        }
    }
}
