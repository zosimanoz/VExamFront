import React, { Component } from 'react';

import {
    NavLink
} from 'react-router-dom';

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';



class HeaderNavBar extends Component {

    constructor(props) {
        super(props);
    }


    render() { 
        return (
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Cotiviti Exams</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav className="navbar-right">
                  <MenuItem><NavLink to='/admin/logout'>Logout</NavLink></MenuItem>
                </Nav>
            </Navbar>
        )
    }
}

export default HeaderNavBar;

