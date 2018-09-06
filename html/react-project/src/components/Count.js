import React from 'react';

class Counter extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            count: 0
        };
    }
    handleClick (num) {
        this.setState({count: this.state.count + num})
    }
    render () {
        return (
            <div>
                点击{this.state.count}次
                <button onClick={this.handleClick.bind(this, 1)}>+</button>
                <button onClick={this.handleClick.bind(this, -1)}>-</button>
                <button>奇变偶</button>
                <button>延时加1</button>
            </div>
        )
    }
}

export default Counter;
