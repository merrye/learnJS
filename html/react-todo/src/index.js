import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import todoApp from './reducers/index';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// 异步处理的中间件  改造dispatch函数，使它可以接收一个函数
import thunk from 'redux-thunk';

let store = createStore(todoApp, applyMiddleware(logger, thunk));

// Render the main component into the dom
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('app'));
  