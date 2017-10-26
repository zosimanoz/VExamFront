import React, { Component } from 'react';

import {
  BrowserRouter as Router, Route, NavLink, Switch, Link, matchPath, match
} from 'react-router-dom';

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';

import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import DefaultLayout from './DefaultLayout';

import HeaderNavBar from './admin/HeaderNavBar.layout';
import SideBar from './admin/SideBar.layout';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import '../css/AdminStyle.css';
import './menu.css';



const AdminLayout = ({ component: Component, ...rest }) => {
  console.log(rest)
  if (rest.authed) {
    return (
      <DefaultLayout {...rest} component={matchProps => (
        <div>
          <HeaderNavBar />
          <Grid bsClass="container main-container">
            <Col xs={2} md={2} className="sidebar">
              <SideBar />
            </Col>
            <Col xs={10} md={10} >
              <Component {...matchProps} {...rest} />
            </Col>
          </Grid>
        </div>
      )} />
    )
  } else {
   return (<Redirect to={`/admin/login?redirect=${rest.location.pathname}`} />);
  }
};


export default AdminLayout;