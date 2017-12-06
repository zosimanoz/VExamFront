import React, { Component } from 'react';

import {
    BrowserRouter as Router, Route, NavLink, Switch, Link, matchPath, match
} from 'react-router-dom';

import { Redirect } from 'react-router';


import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';

import AdminLayout from '../layouts/AdminLayout';
import DefaultLayout from '../layouts/DefaultLayout';
import ExamLayout from '../layouts/ExamLayout';

import AdminLogin from '../components/auth/AdminLogin.component';
import UserLogin from '../components/auth/UserLogin.component';

const VauthRoutes = (props) => (
    <div>
        <Switch>
            <DefaultLayout exact path="/" component={UserLogin} heading="User Login" authed={props.authed} />
            <DefaultLayout exact path="/admin/login" component={AdminLogin} heading="Admin Login" authed={props.authed} />
        </Switch>
    </div>
)


export default VauthRoutes;