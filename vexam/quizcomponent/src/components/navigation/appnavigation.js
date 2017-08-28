import React, { PropTypes } from 'react';
import { Navbar } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import PublicNavigation from './publicnavigation.js';
import AuthenticatedNavigation from './authenticatednavigation.js';

const renderNavigation = authenticated =>
    (authenticated ? <AuthenticatedNavigation /> : <PublicNavigation />);

const AppNavigation = ({ authenticated }) => (

    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">WebSiteName</a>
            </div>
            <ul class="nav navbar-nav">
                {renderNavigation(authenticated)}
            </ul>
        </div>
    </nav>
);

AppNavigation.propTypes = {
    authenticated: PropTypes.bool,
};

export default AppNavigation;
