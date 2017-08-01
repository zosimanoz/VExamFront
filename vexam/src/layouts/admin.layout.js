import React, { Component } from 'react';

import {
  BrowserRouter as Router, Route, NavLink, Switch, Link, matchPath, match
} from 'react-router-dom';

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';

import AddDepartment from '../components/departments/add-department.component';
import DepartmentIndex from '../components/departments/department-index.component';



import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import '../css/AdminStyle.css';


const HeaderNavBar = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Verscend Exams</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav className="navbar-right">
      <NavDropdown title="User" id="basic-nav-dropdown">
        <MenuItem>Settings</MenuItem>
        <MenuItem divider />
        <MenuItem>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>
);

const SideBar = () => (
  <Row>
    <div className="absolute-wrapper"></div>
    <div className="side-menu">
      <div className="side-menu-container">
        <ul className="nav navbar-nav nav-bar-right-border">
          <li><NavLink exact to="/" activeClassName="active"><span className="glyphicon glyphicon-dashboard"></span> <span className="hidden-xs">Dashboard</span></NavLink></li>
          <li><NavLink to="/admin/departments" activeClassName="active"><span className="glyphicon glyphicon-home"></span> <span className="hidden-xs">Departments</span></NavLink></li>
          <li><NavLink to='/admin/categories' activeClassName="active"><span className="glyphicon glyphicon-bell"></span> <span className="hidden-xs">Categories</span></NavLink></li>
          <li><NavLink to='/admin/questions' activeClassName="active"><span className="glyphicon glyphicon-question-sign"></span> <span className="hidden-xs">Questions</span></NavLink></li>
          <li><NavLink to='/admin/users' activeClassName="active"><span className="glyphicon glyphicon-user"></span> <span className="hidden-xs">Users</span></NavLink></li>
          <li><NavLink to='/admin/settings' activeClassName="active"><span className="glyphicon glyphicon-cog"></span> <span className="hidden-xs">Settings</span></NavLink></li>
          <li><NavLink to='/admin/exam' activeClassName="active"><span className="glyphicon glyphicon-pencil"></span> <span className="hidden-xs">Exam</span></NavLink></li>
        </ul>
      </div>
    </div>
  </Row>
)


const Routings = () => (

  <div>
    <Switch>

      <Route exact path="/" render={() => <Home heading="Dashboard" />} />


      <Route exact
        path="/admin/departments"
        render={props => (
          <DepartmentIndex heading="Manage Departments" />
        )}
      />

       <Route exact
        path="/admin/departments/add"
        render={props => (
          <AddDepartment heading="Add New Department" {... props} />
        )}
      /> 

        <Route exact
        path="/admin/department/:id"
        render={props => (
          <AddDepartment heading="Edit Department"  {...props}/>
        )}
      /> 

      <Route exact
        path="/admin/categories"
        render={props => (
          <ProjectItem heading="Project" />
        )}
      />


      <Route exact
        path="/admin/exam"
        render={props => (
          <ProjectItem heading="Project" />
        )}
      />

      <Route exact
        path="/admin/questions"
        render={props => (
          <Projects heading="Project" />
        )}
      />

      <Route exact
        path="/admin/settings"
        render={props => (
          <Projects heading="Project" />
        )}
      />

      <Route exact
        path="/admin/users"
        render={props => (
          <Projects heading="Project Items Page" />
        )}
      />

      <Route path="*" component={Missed} />

    </Switch>

  </div>

)



const Projects = (props) => {
  return (
    <Panel header={props.heading}>
      <h1>Project Management</h1>
    </Panel>
  );
}


const Missed = (props) => {
  return (
    <h1>404</h1>
  );
}


const ProjectItem = (props) => {
  return (
    <Panel header={props.heading}>
      <h1>Item</h1>
      <NavLink exact to="/admin/departments/add">Add department</NavLink>
    </Panel>
  );
}


const Home = (props) => {
  return (
    <Panel header={props.heading}>
      <h1>Home</h1>
    </Panel>
  );
}



class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <HeaderNavBar />

        <Grid bsClass="container main-container">
          <Col xs={2} md={2} className="sidebar">
            <SideBar />
          </Col>

          <Col xs={10} md={10}>
            <Routings />
          </Col>
        </Grid>
      </div>
    );
  }

}



export default Admin;