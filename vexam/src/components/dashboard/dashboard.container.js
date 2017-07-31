import React from 'react';
import { connect } from 'react-redux';

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';


import DashboardIndex from './dashboard-index.component'


class Dashboard extends React.Component {

    render() {
        return (
            <Panel header="Dashboard">
                <DashboardIndex />
            </Panel>
        )
    }
}



export default Dashboard;