import React, { Component } from 'react';

import {
    BrowserRouter as Router, Route, NavLink, Switch, Link, matchPath, match
} from 'react-router-dom';

import '../../css/Auth.css';

import classnames from 'classnames';

import { connect } from 'react-redux';

import { login } from '../../actions/auth.action';
import { addFlashMessage } from '../../actions/flashMessage.action';

import AdminLogin from './AdminLogin.component';
import UserLogin from './UserLogin.component';

import Admin from '../../layouts/admin.layout';
import ExamWrapper from '../examsample/ExamWrapper.container';


import PrivateRoute from '../../utils/PrivateRouter';
import { Redirect } from 'react-router';



class LoginWrapper extends Component {
    constructor(props){
        super(props);
    }


    Routings = () => {
        return(<div>
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <UserLogin heading="User Login" />} />
                    <Route path="/admin/login" render={() => <AdminLogin heading="Admin Login" />} />
                    <PrivateRoute authed={this.props.auth.authenticated} path='/admin' component={Admin} />
                    <PrivateRoute authed={this.props.auth.authenticated} path='/exam' component={ExamWrapper} />
                </Switch>
            </Router>
        </div>)
    }


    render() {
        return (
            this.Routings()
        );
    }
}


function mapStateToProps(state, props) {
    return {
        auth: state.authReducer,
    }
}



export default connect(mapStateToProps, { login, addFlashMessage })(LoginWrapper);

