import React, { Component } from 'react';

import {
  NavLink
} from 'react-router-dom';


const SideBar = () => (
  <nav className="navigation">
    <ul className="mainmenu">
      <li><NavLink exact to="/admin" activeClassName="active" title="Dashboard"><span className="glyphicon glyphicon-dashboard"></span> <span className="hidden-xs">Dashboard</span></NavLink></li>
      <li><NavLink to='/admin/questions' activeClassName="active" title="Question Bank"><span className="glyphicon glyphicon-question-sign"></span> <span className="hidden-xs">Question Bank</span></NavLink></li>
      <li><NavLink to='/admin/examsets' activeClassName="active" title="Exam Sets"><span className="glyphicon glyphicon-question-sign"></span> <span className="hidden-xs">Exam Sets</span></NavLink></li>
      <li><NavLink to='/admin/interviewsessions' activeClassName="active" title="Active Interview Sessions"><span className="glyphicon glyphicon glyphicon-list-alt"></span> <span className="hidden-xs">Active Interview Session</span></NavLink></li>
      <li><NavLink to='/admin/checkanswers' activeClassName="active" title="Check Answersheet"><span className="glyphicon glyphicon-pencil"></span> <span className="hidden-xs">Check Answersheet </span></NavLink></li>
      
      <li><NavLink to='#' activeClassName="active" title="Settings"><span className="glyphicon glyphicon-cog"></span> <span className="hidden-xs">Settings</span></NavLink>
        <ul className="submenu">
          <li><NavLink to='/admin/users' activeClassName="active" title="User Management"><span className="hidden-xs">User Management </span></NavLink></li>
          <li><NavLink to="/admin/departments" activeClassName="active" title="Departments"> <span className="hidden-xs">Departments</span></NavLink></li>
          <li><NavLink to='/admin/categories' activeClassName="active" title="Categories"> <span className="hidden-xs">Categories</span></NavLink></li>
          <li><NavLink to='/admin/complexities' activeClassName="active" title="Question Complexity"><span className="hidden-xs">Question Complexity</span></NavLink></li>
          <li><NavLink to='/admin/jobs' activeClassName="active" title="Jobs"><span className="hidden-xs">Jobs</span></NavLink></li>
        </ul>
      </li>
      <li><NavLink to='/admin/interviewsession/history' activeClassName="active" title="Interview Session History"><span className="glyphicon glyphicon glyphicon-list-alt"></span> <span className="hidden-xs">Interview Session History</span></NavLink></li>
    </ul>
  </nav>
)


export default SideBar;