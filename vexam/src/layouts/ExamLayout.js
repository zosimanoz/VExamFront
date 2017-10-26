import React, { Component } from 'react';

import {
    BrowserRouter as Router, Route, NavLink, Switch, Link, matchPath, match
} from 'react-router-dom';


import DefaultLayout from './DefaultLayout';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


const ExamLayout = ({ component: Component, ...rest }) => {
    return (
        <DefaultLayout {...rest} component={matchProps => (
            <div>
                <Component {...matchProps} />
            </div>
        )} />
    );
};


export default ExamLayout;