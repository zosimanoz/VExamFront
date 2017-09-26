import React from 'react'

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import ActiveInterviewSessionList from './active-InterviewSession.component';


import { fetchInterviewSessionHistory } from '../../actions/interviewSession.action';


class InterviewSessionIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            InterviewSessions : null
        }
    }

    componentDidMount() {
        this.props.fetchInterviewSessionHistory();
    }

    componentWillReceiveProps(new_props){
        this.setState({
            InterviewSessions : new_props.interviewSessions
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


    InterviewSessionHistory() {
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
                                    <NavLink title="Job Vacancies" to={`/admin/interviewsession/${item.InterviewSessionId}/jobs`} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-list-alt text-success"></i></NavLink>
                                    <NavLink title="Interviewees" to={`/admin/interviewSession/${item.InterviewSessionId}/interviewees`} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-user text-primary"></i></NavLink>
                                </td>

                            </tr>
                        )
                    }
                </tbody>
            </table>
        )
    }
    render() {
        console.log('interviewsession history', this.state.InterviewSessions)

        return (
            <Panel header={this.props.heading}>
                { this.state.InterviewSessions ? this.InterviewSessionHistory(): this.EmptyMessage() }
            </Panel>
        );
    }
}


const mapStateToProps = (state) => {

    return {
        interviewSessions: state.interviewSessionReducer.interviewSessions
    }

}

export default connect(mapStateToProps, { fetchInterviewSessionHistory })(InterviewSessionIndex);