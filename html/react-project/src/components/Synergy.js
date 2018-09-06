import React from 'react';

class GenderSelect extends React.Component {
    render () {
        return (
            <select>
                <option value="male">男</option>
                <option value="famale">女</option>
            </select>
        );
    }
}

class SingupForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {

        }
    }
    render () {
        return (
            <form>
                <input type="text" placeholder="请输入用户名" />
                <input type="password" placeholder="请输入密码" />
                <GenderSelect />
            </form>
        );
    }
}

export default SingupForm;