import React from 'react'

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import JobList from './job-list.component';


import { fetchJobTypes } from '../../actions/jobTypes.action';

class JobIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchJobTypes();
    }

    render() {
        return (
            <Panel header={this.props.heading}>
                <form id="form-list-client">
                    <div className="pull-right">
                        <NavLink exact to="/admin/job/add" className="btn btn-primary btn-sm"><i className="glyphicon glyphicon-plus"></i>Add Job</NavLink>
                    </div>

                    <JobList jobTypes = {this.props.jobTypes} />

                </form>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        jobTypes: state.jobTypes
    }
}

export default connect(mapStateToProps, { fetchJobTypes })(JobIndex);