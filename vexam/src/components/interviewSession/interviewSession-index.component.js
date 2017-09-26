import React from 'react'

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import ActiveInterviewSessionList from './active-InterviewSession.component';


import { fetchActiveInterviewSessions,deleteInterviewSession } from '../../actions/interviewSession.action';


class InterviewSessionIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchActiveInterviewSessions();
    }
    deleteInterviewSession = (id) => {
        this.props.deleteInterviewSession(id)
            .then((res) => {
                this.setState({ loading: false });
                this.setState({ done: true });
            },
            (err) => {
                console.log(err.response.json());
                //err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
            });
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
                        <th colSpan="2">Action</th>

                    </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td colSpan="6">There are no Interview Session Created.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
         let interviewSessionsComponent;
        if (this.props.interviewSessions) {
            interviewSessionsComponent =  <ActiveInterviewSessionList interviewSessions={this.props.interviewSessions} deleteInterviewSession = {this.deleteInterviewSession} />
        } else {
            interviewSessionsComponent = this.EmptyMessage()
        }
        return (
            <Panel header={this.props.heading}>
                <form id="form-list-client">
                    <div className="pull-right">
                        <NavLink exact to="/admin/interviewSession/add" className="btn btn-primary btn-sm"><i className="glyphicon glyphicon-plus"></i>Add Session</NavLink>
                    </div>
                        {interviewSessionsComponent}
                </form>
            </Panel>
        );
    }
}


const mapStateToProps = (state) => {
    console.log("maptostate...",state.interviewSessionReducer.interviewSessions)
    return {
        interviewSessions: state.interviewSessionReducer.interviewSessions
    }
}

export default connect(mapStateToProps, { fetchActiveInterviewSessions,deleteInterviewSession })(InterviewSessionIndex);