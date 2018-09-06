import React from 'react';
import { addTodo } from '../actions/index';
import { connect } from 'react-redux';

let AddTodo = ({ dispatch }) => {
    let node;
    return (
        <div>
            <form onSubmit={e => e.preventDefault()}>
                <input type="text" ref={text => node = text}/>
                <button onClick={
                    () => {
                        if (!node.value.trim()) {
                            return;
                        }
                        dispatch(addTodo(node.value))
                        node.value = '';
                    }
                }>Add todo item</button>
            </form>
        </div>
    );
}

AddTodo = connect()(AddTodo);

export default AddTodo;
