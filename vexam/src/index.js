import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import { setCurrentUser, loadUserFromToken, meFromTokenSuccess } from './actions/auth.action';

import store from './store/index.store';

import setAuthorizationToken from './utils/setAuthorizationToken';

import CheckBrowserRefresh from './utils/RefreshHandler';


import axios from 'axios';

import { API_URL } from './utils/url';
import qs from 'qs'


window.onbeforeunload = function (e) {
    return window.confirm('Your progress will be cleared on reload. Are you sure you want to leave the page?');
}



if (localStorage.access_token) {
    // dispatch an action to get the current user
    // set the authenticated user into the store

    setAuthorizationToken(localStorage.access_token);

    let token = localStorage.getItem('access_token');

    var data = qs.stringify({ 'accessToken': token });
    axios({
        method: 'post',
        url: `${API_URL}/api/v1/token/decode`,
        data: data
    }).then((res) => {
        store.dispatch(meFromTokenSuccess(res.data.Data));
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.getElementById('root'));
    })

} else {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root'));
}




registerServiceWorker();
