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

import ExamMain from './components/exam/ExamMain.container'
import ExamWrapper from './components/examsample/ExamWrapper.container'
import ExamInfoComponent from './components/examinfo/ExamInfoComponent.container'
import LoginWrapper from './components/auth/LoginWrapper.container'

// import Register from './components/auth/component.register';
// import Admin from './components/admin/admin.container';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      role: 'Interviewee'
    }
  }

  renderPage() {
    if (this.props.authReducer.authenticated && this.props.authReducer.user.Actor === 'User') {
      return (
        <Router>
          <Admin />
        </Router>
      )
    }
    if (this.props.authReducer.authenticated && this.props.authReducer.user.Actor === 'Interviewee') {
      return (
        <Router>
          <ExamWrapper />
          {/* if exam info is to be shown... use   <ExamInfoComponent />*/}
        </Router>
      )
    }
  }

  renderLoginPage() {
    return (
      <Router>
        <LoginWrapper />
      </Router>
    )
  }

  renderLoader() {
    return (<p>Loading...... </p>)
  }

  render() {
    return (
      this.props.authReducer.authenticated ? this.renderPage() : this.renderLoginPage()
    )
  }
}



function mapStateToProps(state, props) {
  return {
    authReducer: state.authReducer
  }
}


export default connect(mapStateToProps, null)(App);
