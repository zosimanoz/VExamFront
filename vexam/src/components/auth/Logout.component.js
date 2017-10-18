import React, { Component } from 'react';

import {
    BrowserRouter as Router, Route, NavLink, Switch, Link, matchPath, match
} from 'react-router-dom';

import { connect } from 'react-redux';

import { login, logout } from '../../actions/auth.action';

import { Redirect } from 'react-router';



class Logout extends Component {
    constructor(props){
        super(props);
    }

    render() {
        this.props.logout();

        return (<Redirect to={{pathname: '/'}} />);
    }
}


function mapStateToProps(state, props) {
    return {
        auth: state.authReducer,
    }
}



export default connect(mapStateToProps, { login, logout })(Logout);

