const todoData = {
    todos: [
        {
            text: 'eat food',
            completed: false
        },
        {
            text: 'play bool',
            completed: true
        }
    ],
    show: true
};

// function showReducer(state, action) {
//     if (action.type === 'changeShow') {
//         const newState = Object.assign({}, state);
//         newState.show = action.show;
//         return newState;
//     }
// }

function todosReducer(state, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case 'changeShow':
            newState.show = action.show;
            return newState;
        case 'add':
            newState.todos.push({
                text: action.text,
                completed: false
            });
            return newState;
        case 'delet':
            newState.todos.splice(action.index, 1);
            return newState;
        default:
            break;
    }
}

// function todoApp(state, action) {
//     return {
//         showReducer: showReducer(state, action),
//         todosReducer: todosReducer(state, action)
//     }
// }

let one = todosReducer(todoData, {
    type: 'changeShow',
    text: '阿达的'
});
console.log(one, '--');
