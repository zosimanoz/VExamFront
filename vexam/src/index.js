import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

//import jwt from 'jsonwebtoken';

import {setCurrentUser} from './actions/auth.action';

import store from './store/index.store';

import setAuthorizationToken from './utils/setAuthorizationToken';


// if(localStorage.access_token){
//     setAuthorizationToken(localStorage.access_token);
//    // store.dispatch(setCurrentUser(jwt.decode(localStorage.access_token)));
// }

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));


registerServiceWorker();
