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
                        <MenuItem><NavLink to='/admin/logout'>Logout</NavLink></MenuItem>

                    </NavDropdown>
                </Nav>
            </Navbar>
        )
    }
}

export default HeaderNavBar;

