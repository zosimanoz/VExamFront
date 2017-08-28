import React, { Component } from 'react';

import logo from './logo.svg';
import './style.css';


import {
  BrowserRouter as Router, Route, NavLink, Switch, Link
} from 'react-router-dom';



import AdminLayout from './components/layouts/admin.layout';
import AuthLayout from './components/layouts/auth.layout';
import DefaultLayout from './components/layouts/default.layout';

import Login from './components/auth/component.login';
import Register from './components/auth/component.register';
import Home from './components/home/home.container';

import Exam from './components/exam/exam.container';
import AddGame from './components/home/add-game.container';




const Admin = () => {
  return (
    <h1>Admin dashboard</h1>
  );
}



const Users = (props) => {
  return (
    <h1>User Management</h1>
  );
}


const Department = (props) => {
  return (
    <h1>Departments Management</h1>
  );
}




class App extends Component {

  render() {

    return (
      <Router>
        <div>
          <Switch>>
            <Route exact path="/" render={() => <DefaultLayout><Home /></DefaultLayout>} />
            <Route path="/add/game" render={() => <DefaultLayout><AddGame /></DefaultLayout>} />
            <Route path="/exam" render={() => <DefaultLayout><Exam /></DefaultLayout>} />

            <Route path="/login" render={() => <AuthLayout> <Login /> </AuthLayout>} />
            <Route path="/register" render={() => <AuthLayout> <Register /> </AuthLayout>} />

            <Route exact path="/admin" render={() => <AdminLayout><Admin /></AdminLayout>} />
            <Route path="/admin/users" render={() => <AdminLayout><Users /></AdminLayout>} />
            <Route path="/admin/departments" render={() => <AdminLayout><Department /></AdminLayout>} />
          </Switch>
        </div>
      </Router>
    )
  }


}


export default App;
