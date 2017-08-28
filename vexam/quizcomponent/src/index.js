import ReactDOM from 'react-dom';
import React from 'react';

import store from './store/store';
import { Provider } from 'react-redux';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker';

import App from './App';





ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'));


registerServiceWorker();
