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
import ExamPage from './components/exam/ExamPage.container';

// import Register from './components/auth/component.register';
// import Admin from './components/admin/admin.container';


class App extends Component {

  state = {
    role: 'admin'
  }

  render() {
    if (this.props.authReducer.authenticated && this.props.authReducer.user.Actor === 'Interviewee') {
      return (
        <Router>
          <Admin />
        </Router>
      )
    }

    if (this.props.authReducer.authenticated && this.props.authReducer.user.Actor === 'User') {
      return (
        <ExamPage />
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
