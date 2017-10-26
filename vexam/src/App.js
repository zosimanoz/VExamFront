import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';

import {
  BrowserRouter as Router, Route, NavLink, Switch, Link, matchPath
} from 'react-router-dom';

import Admin from './layouts/admin.layout';
import TestLayout from './layouts/test.layout';

import Dashboard from './components/dashboard/dashboard.container';
import AddDepartment from './components/departments/add-department.component';
import ExamPage from './components/exam/ExamPage.container';

import ExamMain from './components/exam/ExamMain.container'
import ExamWrapper from './components/examsample/ExamWrapper.container'
import ExamInfoComponent from './components/examinfo/ExamInfoComponent.container'
import LoginWrapper from './components/auth/LoginWrapper.container'

// import Register from './components/auth/component.register';
// import Admin from './components/admin/admin.container';

import VexamRoutes from './routes/VexamRoutes';



const Loader = () => (
  <div>Loading...</div>
)

class App extends Component {

  constructor(props) {
    super(props);
  }


  render() {

    ///
    // if (this.props.authReducer.authenticated) {
      return (
        <Router>
          <VexamRoutes authed={this.props.authReducer.authenticated} />
        </Router>
      )
    /*} else {
      return (<Router>
        <VexamRoutes authed={this.props.authReducer.authenticated} />
      </Router>);

      return (<Loader />)
    }*/
  }
}



function mapStateToProps(state, props) {
  return {
    authReducer: state.authReducer
  }
}


export default connect(mapStateToProps, null)(App);
