import React from 'react';

class UnControll extends React.Component {
    handleSubmit = () => {

    }
    render () {
        return (
           <form onSubmit={this.handleSubmit}>
            <input type="text" value="UnControll" />
            <button>提交</button>
           </form>
        );
    }
}

export default UnControll;