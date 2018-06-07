import React from 'react';

class Counter extends React.Component {
    render () {
        let {value, onAdd, onDel} = this.props;
        return (
            <div>
                点击{value}次
                <button onClick={onAdd}>+</button>
                <button onClick={onDel}>-</button>
                <button>奇变偶</button>
                <button>延时加1</button>
            </div>
        );
    }
}

export default Counter;