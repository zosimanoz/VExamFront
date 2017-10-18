import React, { Component } from 'react';

import {
  BrowserRouter as Router, Route, NavLink, Switch, Link, matchPath, match
} from 'react-router-dom';


import { connect } from 'react-redux';

import { Redirect } from 'react-router';
<<<<<<< HEAD
=======

import { logout } from '../actions/auth.action';
>>>>>>> 927348f904005e499fdb61d8d12eba0a6f434d04

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';

import { logout } from '../actions/auth.action';

import HeaderNavBar from './admin/HeaderNavBar.layout'
import SideBar from './admin/SideBar.layout'
import VExamRoutes from './admin/VExamRoutes'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import '../css/AdminStyle.css';
import './menu.css';






class Admin extends React.Component {
  constructor(props) {
    super(props);
    document.title = "VExam";
  }


  render() {
   
      return (
        <div>
          <HeaderNavBar />
          <Grid bsClass="container main-container">
            <Col xs={2} md={2} className="sidebar">
              <SideBar />
            </Col>
            <Col xs={10} md={10} >
              <VExamRoutes />
            </Col>
          </Grid>
        </div>
      );
    } 

}



const mapStateToProps = (state, props) => {
  return {
    auth: state.authReducer
  }
}


const mapStateToProps = (state, props) => {
  return {
    auth: state.authReducer
  }
}


export default connect(mapStateToProps, { logout })(Admin);