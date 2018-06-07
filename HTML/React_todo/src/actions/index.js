let nextTodo = 0;

const addTodo = text => ({
        type: 'ADD_TODO',
        id: nextTodo ++,
        text
    }),
    toggleTodo = id => ({
        type: 'TOGGLE_TODO',
        id
    }),
    setVisibilityFilter = filter => ({
        type: 'SET_VISIBILITY_FILTER',
        filter
    });

export {addTodo, toggleTodo, setVisibilityFilter};