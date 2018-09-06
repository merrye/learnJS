let nextTodo = 0;

const addTodo = text => ({
        type: 'ADD_TODO',
        id: nextTodo ++,
        text
    }),
    toggleTodo = id => ({
        id,
        type: 'TOGGLE_TODO'
    }),
    setVisibilityFilter = filter => ({
        filter,
        type: 'SET_VISIBILITY_FILTER'
    });

export { addTodo, toggleTodo, setVisibilityFilter };