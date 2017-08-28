import React from 'react';
import { NavLink } from 'react-router-dom';

const PublicNavigation = () => (
    <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
            <div id="navbar-collapse" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
                    <li><NavLink to="/signup" activeClassName="active">Signup</NavLink></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                </ul>
            </div>
        </div>
    </nav>
);

export default PublicNavigation;