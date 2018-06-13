import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { toggleTodo } from '../actions/index'

const getVisibleTodos = (todos, filter) => {
        switch (filter) {
            case 'SHOW_ALL':
                return todos;
            case 'SHOW_ACTIVE':
                return todos.filter(t => !t.completed);
            case 'SHOW_COMPLETED':
                return todos.filter(t => t.completed);
            default:
                throw new Error('未知的' + filter);
        }
    },
    mapStateToProps = state => ({
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }),
    mapDispatchToProps = {
        onTodoClick: toggleTodo
    },
    VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;