
import React from 'react';
import { NavLink } from 'react-router-dom';

const AuthenticatedNavigation = () => (
    <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
            <div id="navbar-collapse" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
                    <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li>Welcome</li>
                </ul>
            </div>
        </div>
    </nav>
);

export default AuthenticatedNavigation;