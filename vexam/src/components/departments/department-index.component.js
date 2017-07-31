import React from 'react'

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import AddDepartment from './add-department.component';
import DepartMentList from './department-list.component';


import { fetchDepartments } from '../../actions/departments.action';


class DepartmentIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDepartments();
    }

    render() {
        return (
            <Panel header={this.props.heading}>
                <form id="form-list-client">


                    <div className="pull-right">
                        <NavLink exact to="/admin/departments/add" className="btn btn-primary btn-sm"><i className="glyphicon glyphicon-plus"></i>Add department</NavLink>
                    </div>

                    <DepartMentList departments={this.props.departments} />

                </form>
            </Panel>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        departments: state.departments
    }
}

export default connect(mapStateToProps, { fetchDepartments })(DepartmentIndex);