import React, { Component } from 'react';

import {
    BrowserRouter as Router, Route, NavLink, Switch, Link
} from 'react-router-dom';


import '../../AdminStyle.css';



const SideNav = () => (
    <nav className="navbar navbar-inverse navbar-static-top" role="navigation">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Online Exam</a>
            </div>

            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/">View Site</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <li><Link to="/about">Logout</Link></li>
            </ul>
        </div>

        <div className="navbar-default sidebar" role="navigation">
            <div className="sidebar-nav navbar-collapse">
                <ul className="nav" id="side-menu">
                    <li>
                        <NavLink exact activeClassName="active" to="/admin">Dashboard</NavLink>
                    </li>

                    <li>
                        <NavLink activeClassName="active" to="/admin/users">Manage Users</NavLink>
                    </li>

                    <li>
                        <NavLink activeClassName="active" to="/admin/departments">Manage Departments</NavLink>
                    </li>

                    <li>
                        <NavLink activeClassName="active" to="/result">Manage Result</NavLink>
                    </li>

                </ul>
            </div>
        </div>
    </nav>

)



const SideBar = () => (
    <div className="sidebar">
        <div className="sidebar-wrapper">
            <div className="logo">
                <a href="http://www.creative-tim.com" className="simple-text">
                    Creative Tim
                </a>
            </div>

            <ul className="nav">
                <li className="active">
                    <a href="dashboard.html">
                        <i className="pe-7s-graph"></i>
                        <p>Dashboard</p>
                    </a>
                </li>
                <li>
                    <a href="user.html">
                        <i className="pe-7s-user"></i>
                        <p>User Profile</p>
                    </a>
                </li>
                <li>
                    <a href="table.html">
                        <i className="pe-7s-note2"></i>
                        <p>Table List</p>
                    </a>
                </li>
                <li>
                    <a href="typography.html">
                        <i className="pe-7s-news-paper"></i>
                        <p>Typography</p>
                    </a>
                </li>
                <li>
                    <a href="icons.html">
                        <i className="pe-7s-science"></i>
                        <p>Icons</p>
                    </a>
                </li>
                <li>
                    <a href="maps.html">
                        <i className="pe-7s-map-marker"></i>
                        <p>Maps</p>
                    </a>
                </li>
                <li>
                    <a href="notifications.html">
                        <i className="pe-7s-bell"></i>
                        <p>Notifications</p>
                    </a>
                </li>
                <li class="active-pro">
                    <a href="upgrade.html">
                        <i className="pe-7s-rocket"></i>
                        <p>Upgrade to PRO</p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
);


const TopNav = () => (
    <nav className="navbar navbar-default navbar-fixed">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Dashboard</a>
            </div>
            <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-left">
                    <li>
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            <i className="fa fa-dashboard"></i>
                        </a>
                    </li>
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            <i className="fa fa-globe"></i>
                            <b className="caret"></b>
                            <span className="notification">5</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li><a href="#">Notification 1</a></li>
                            <li><a href="#">Notification 2</a></li>
                            <li><a href="#">Notification 3</a></li>
                            <li><a href="#">Notification 4</a></li>
                            <li><a href="#">Another notification</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="">
                            <i className="fa fa-search"></i>
                        </a>
                    </li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <a href="">
                            Account
                            </a>
                    </li>
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            Dropdown
                                    <b className="caret"></b>
                        </a>
                        <ul className="dropdown-menu">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something</a></li>
                            <li className="divider"></li>
                            <li><a href="#">Separated link</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            Log out
                            </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
)


const AdminLayout = ({ children }) => (

    <div>
       
        <div className="wrapper">
            <SideBar />

            <div className="main-panel">
                <TopNav />

                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           
        </div>
    </div>


)


export default AdminLayout;