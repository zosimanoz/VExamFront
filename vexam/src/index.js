import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import {setCurrentUser} from './actions/auth.action';

import store from './store/index.store';

import setAuthorizationToken from './utils/setAuthorizationToken';


if(localStorage.access_token){
    setAuthorizationToken(localStorage.access_token);
    // dispatch an action to get the current user
    // set the authenticated user into the store
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));


registerServiceWorker();
