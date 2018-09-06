import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import Switch from './components/Switch';
import Redirect from './components/Redirect';

// Render the main component into the dom
ReactDOM.render(
    <div>
        <Redirect />
    </div>, document.getElementById('app'));
