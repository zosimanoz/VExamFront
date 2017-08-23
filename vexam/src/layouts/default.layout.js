import React from 'react';

import {
    BrowserRouter as Router, Route, NavLink, Switch, Link
} from 'react-router-dom';


import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';


import Login from '../components/auth/login.component';


const Home = ()=> (
    <h1>Home</h1>
)


const Missed = ()=> (
    <h1>404</h1>
)


const Schedule = () => (
    <h1>Schedule</h1>
)


const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/roster'>Roster</Link></li>
                <li><Link to='/schedule'>Schedule</Link></li>
            </ul>
        </nav>
    </header>
)


const HeaderNavBar = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Verscend Exams</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav className="navbar-right">
      <MenuItem href="/interviewee/login">Login</MenuItem>
    </Nav>
  </Navbar>
);



const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' />
            <Route exact path='/interviewee/login' />
            <Route exact path='/admin/login' />
        </Switch>
    </main>
)


const Routings = () => (

  <div>
    <Switch>

      <Route exact path="/" render={() => <Home />} />


      <Route exact
        path="/interviewee/login"
        render={props => (
          <Login  { ...props }/>
        )}
      />

       <Route exact
        path="/admin/login"
        render={props => (
          <Schedule {... props} />
        )}
      /> 
       
      <Route path="*" component={Missed} />

    </Switch>

  </div>

)






const DefaultLayout = () => (
        <div>
            <HeaderNavBar />
            <Routings />
        </div>

)


export default DefaultLayout;



