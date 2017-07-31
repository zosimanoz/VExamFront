import React, { Component } from 'react';

import {
  BrowserRouter as Router, Route, NavLink, Switch, Link
} from 'react-router-dom';


const DefaultLayout = ({ children }) => (
  <div>
    {children}
  </div>
);


export default DefaultLayout;

