import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/Main';
// import App from './components/Count';
import App from './components/index';
import reducer from './reducers/index';
import {createStore} from 'redux';

let store = createStore(reducer);


// Render the main component into the dom
const render = () => ReactDOM.render(<App
        value={store.getState()}
        onAdd={() => store.dispatch({type: 'ADD'})}
        onDel={() => store.dispatch({type: 'DEL'})}
    />,document.getElementById('app'));

render();

store.subscribe(render);
