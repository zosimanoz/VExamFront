import React from 'react'

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import JobList from './job-list.component';
import Loader from '../loader/loader.component';


import { fetchJobTypes, deleteJobType } from '../../actions/jobTypes.action';

class JobIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchJobTypes();
    }

    state = {
        loading: false,
        done: false
    }

    deleteJobType = (id) => {
        this.props.deleteJobType(id)
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
                        <NavLink exact to="/admin/job/add" className="btn btn-primary btn-sm"><i className="glyphicon glyphicon-plus"></i>Add Job</NavLink>
                    </div>

                    <JobList jobTypes={this.props.jobTypes} deleteJobType={this.deleteJobType} />

                </form>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        jobTypes: state.jobTypes,
        loader: state.loaderReducer
    }
}

export default connect(mapStateToProps, { fetchJobTypes, deleteJobType })(JobIndex);