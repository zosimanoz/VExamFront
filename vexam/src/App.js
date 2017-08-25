import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import { connect } from 'react-redux';

import {
  BrowserRouter as Router, Route, NavLink, Switch, Link, matchPath
} from 'react-router-dom';





import Admin from './layouts/admin.layout';
import DefaultLayout from './layouts/default.layout';
import TestLayout from './layouts/test.layout';

import Login from './components/auth/login.component';
import Dashboard from './components/dashboard/dashboard.container';
import AddDepartment from './components/departments/add-department.component';

// import Register from './components/auth/component.register';
// import Admin from './components/admin/admin.container';


const Users = (props) => {
  return (
    <h1>User Management</h1>
  );
}


const SomeComponent = (props) => {
  return (
    <h1>SomeComponent</h1>
  );
}

const SomeComponentOne = (props) => {
  return (
    <h1>SomeComponentOne</h1>
  );
}

const SomeComponentTwo = (props) => {
  return (
    <h1>SomeComponentTwo</h1>
  );
}



class App extends Component {

  state = {
    role: 'admin'
  }

  render() {

    console.log('auth')
    console.log('authreducers',this.props.authReducer);

    if (this.props.authReducer.isAuthenticated && this.state.role === 'admin') {
      return (
        <Router>
          <Admin />
        </Router>
      )
    }

    if (this.props.authReducer.isAuthenticated && this.state.role === 'user') {
      return (
        <h1>Hello</h1>
      )
    }

    return (
      <Router>
        <DefaultLayout />
      </Router>
    )

  }
}



function mapStateToProps(state, props) {
    return {
        authReducer: state.authReducer
    }
}


export default connect(mapStateToProps, null)(App);
