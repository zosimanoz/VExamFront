import React, { Component } from 'react';

import {
  BrowserRouter as Router, Route, NavLink, Switch, Link, matchPath, match
} from 'react-router-dom';

import { Redirect } from 'react-router';
import { connect } from 'react-redux';


const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className="DefaultLayout">
        <Component {...matchProps} {...rest} />
      </div>
    )} />
  )

};

export default DefaultLayout;