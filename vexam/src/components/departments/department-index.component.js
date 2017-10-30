import React from 'react'

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import AddDepartment from './add-department.component';
import DepartmentList from './department-list.component';

import Loader from '../loader/loader.component';


import { fetchDepartments, deleteDepartment } from '../../actions/departments.action';


class DepartmentIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDepartments();
    }
    state = {
        loading: false,
        done: false
    }

    deleteDepartment = (id) => {
        this.props.deleteDepartment(id)
            .then((res) => {
                this.setState({ loading: false });
                this.setState({ done: true });
            },
            (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
            );
    }
    render() {
        if (this.props.loader.loading) {
            return (
                <Loader loading={this.props.loader.loading} />
            );
        }
        return (
            <Panel header={this.props.heading}>
                <form id="form-list-client">
                    <div className="pull-right">
                        <NavLink exact to="/admin/departments/add" className="btn btn-primary btn-sm"><i className="glyphicon glyphicon-plus"></i>Add department</NavLink>
                    </div>
                    <DepartmentList departments={this.props.departments} deleteDepartment={this.deleteDepartment} />
                </form>
            </Panel>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        departments: state.departments,
        loader: state.loaderReducer
    }
}

export default connect(mapStateToProps, { fetchDepartments, deleteDepartment })(DepartmentIndex);