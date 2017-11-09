import React, { Component } from 'react';

import {
    NavLink
} from 'react-router-dom';


const SideBar = () => (
  <nav className="navigation">
    <ul className="mainmenu">
      <li><NavLink exact to="/admin" activeClassName="active"><span className="glyphicon glyphicon-dashboard"></span> <span className="hidden-xs">Dashboard</span></NavLink></li>
      <li><NavLink to='/admin/questions' activeClassName="active"><span className="glyphicon glyphicon-question-sign"></span> <span className="hidden-xs">Question Bank</span></NavLink></li>
      <li><NavLink to='/admin/examsets' activeClassName="active"><span className="glyphicon glyphicon-question-sign"></span> <span className="hidden-xs">Exam Sets</span></NavLink></li>
      {/*<li><NavLink to='/admin/interviewsessions' activeClassName="active"><span className="glyphicon glyphicon-user"></span> <span className="hidden-xs">Interview Sessions</span></NavLink></li>*/}

      <li><NavLink to='#' activeClassName="active"><span className="glyphicon glyphicon-user"></span> <span className="hidden-xs">Interview Sessions</span></NavLink>
        <ul className="submenu">
          <li><NavLink to='/admin/interviewsessions' activeClassName="active"><span className="hidden-xs">Active Sessions</span></NavLink></li>
          <li><NavLink to='/admin/interviewsession/history' activeClassName="active"><span className="hidden-xs">Session History</span></NavLink></li>
        </ul>
      </li>

      <li><NavLink to='/admin/checkanswers' activeClassName="active"><span className="glyphicon glyphicon-pencil"></span> <span className="hidden-xs">Check Answersheet </span></NavLink></li>
      <li><NavLink to='#' activeClassName="active"><span className="glyphicon glyphicon-cog"></span> <span className="hidden-xs">Settings</span></NavLink>
        <ul className="submenu">
          <li><NavLink to="/admin/departments" activeClassName="active"> <span className="hidden-xs">Departments</span></NavLink></li>
          <li><NavLink to='/admin/categories' activeClassName="active"> <span className="hidden-xs">Categories</span></NavLink></li>
          <li><NavLink to='/admin/complexities' activeClassName="active"><span className="hidden-xs">Question Complexity</span></NavLink></li>
          <li><NavLink to='/admin/jobs' activeClassName="active"><span className="hidden-xs">Jobs</span></NavLink></li>
        </ul>
      </li>

    </ul>
  </nav>
)


export default SideBar;