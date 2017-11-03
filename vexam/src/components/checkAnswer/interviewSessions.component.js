import React from 'react'

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import Loader from '../loader/loader.component';


import { fetchAllInterviewSessions } from '../../actions/interviewSession.action';


class AllInterviewSessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            InterviewSessions: null
        }
    }

    componentDidMount() {
        this.props.fetchAllInterviewSessions();
    }

    componentWillReceiveProps(new_props) {
        this.setState({
            InterviewSessions: new_props.interviewSessions
        })
    }

    EmptyMessage() {
        return (
            <div className="clearfix">
                <table className="table table-bordered table-condensed table-hover">
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Title</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th >Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td colSpan="4">There are no Interview Session Created.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }


    InterviewSessions() {
        console.log(this.state.InterviewSessions)
        return (
            <table className="table table-bordered table-condensed table-hover">
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Title</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th colSpan="2">Action</th>
                    </tr>
                </thead>
                <tbody id="form-list-client-body">
                    {
                        this.state.InterviewSessions.map((item, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.Title}</td>
                                <td>{item.SessionStartDate}</td>
                                <td>{item.SessionEndDate}</td>
                                <td>
                                    <NavLink title="Interviewees" to={`/admin/interviewSessions/${item.InterviewSessionId}/attended/interviewees`} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-user text-primary"></i></NavLink>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        )
    }
    render() {
        if (this.props.loader.loading) {
            return (
                <Loader loading={this.props.loader.loading} />
            );
        }
        return (
            <Panel header={this.props.heading}>
                {this.state.InterviewSessions ? this.InterviewSessions() : this.EmptyMessage()}
            </Panel>
        );
    }
}


const mapStateToProps = (state) => {

    return {
        interviewSessions: state.interviewSessionReducer.interviewSessions,
        loader: state.loaderReducer
    }

}

export default connect(mapStateToProps, { fetchAllInterviewSessions })(AllInterviewSessions);