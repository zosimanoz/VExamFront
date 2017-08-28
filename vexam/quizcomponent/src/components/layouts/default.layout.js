import React, { Component } from 'react';

import {
  BrowserRouter as Router, Route, NavLink, Switch, Link
} from 'react-router-dom';




const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div id="navbar-collapse" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
              <li><NavLink to="/exam" activeClassName="active">Exam</NavLink></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
              <li><NavLink to="/register" activeClassName="active">Sign Up</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}


const DefaultLayout = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);



export default DefaultLayout;