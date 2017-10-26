import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import {setCurrentUser, loadUserFromToken} from './actions/auth.action';

import store from './store/index.store';

import setAuthorizationToken from './utils/setAuthorizationToken';

import CheckBrowserRefresh from './utils/RefreshHandler';

if(localStorage.access_token){
    setAuthorizationToken(localStorage.access_token);
    store.dispatch(loadUserFromToken());
    // dispatch an action to get the current user
    // set the authenticated user into the store
}

window.onbeforeunload = function(e) {
    return window.confirm('Your progress will be cleared on reload. Are you sure you want to leave the page?');
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));


registerServiceWorker();
