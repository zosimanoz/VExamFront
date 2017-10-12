import React, { Component } from 'react';

import {
    BrowserRouter as Router, Route, NavLink, Switch, Link, matchPath, match
} from 'react-router-dom';

import '../../css/Auth.css';

import classnames from 'classnames';

import { connect } from 'react-redux';

import { login } from '../../actions/auth.action';
import { addFlashMessage } from '../../actions/flashMessage.action';

import AdminLogin from './AdminLogin.component'
import UserLogin from './UserLogin.component'


const Routings = () => (
    <div>
        <Router>
            <Switch>
            <Route exact path="/" render={() => <UserLogin heading="User Login" />} />
            <Route exact path="/admin/login" render={() => <AdminLogin heading="Admin Login" />} />
            </Switch>
        </Router>
    </div>
)

class LoginWrapper extends Component {
    render() {
        return (
            <Routings />
        );
    }
}


function mapStateToProps(state, props) {
    return {
        authReducer: state.authReducer,
    }
}



export default connect(mapStateToProps, { login, addFlashMessage })(LoginWrapper);

