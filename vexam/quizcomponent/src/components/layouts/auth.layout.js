import React, { Component } from 'react';

import {
  BrowserRouter as Router, Route, NavLink, Switch, Link
} from 'react-router-dom';


const AuthLayout = ({ children }) => (
  <div>
    {children}
  </div>
);


export default AuthLayout;

