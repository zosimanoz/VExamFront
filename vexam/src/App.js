import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/styles.css';

import { connect } from 'react-redux';

import {
  HashRouter as Router, Route, NavLink, Switch, Link, matchPath
} from 'react-router-dom';


// import ExamWrapper from './components/examsample/ExamWrapper.container'
// import ExamInfoComponent from './components/examinfo/ExamInfoComponent.container'
// import LoginWrapper from './components/auth/LoginWrapper.container'

// import Register from './components/auth/component.register';
// import Admin from './components/admin/admin.container';

import VexamRoutes from './routes/VexamRoutes';

class App extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Router>
        <VexamRoutes authed={this.props.authReducer.authenticated} />
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
