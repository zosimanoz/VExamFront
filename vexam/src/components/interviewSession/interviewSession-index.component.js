import React from 'react'

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import ActiveInterviewSessionList from './active-InterviewSession.component';


import { fetchActiveInterviewSessions } from '../../actions/interviewSession.action';


class InterviewSessionIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchActiveInterviewSessions();
    }

    render() {
        return (
            <Panel header={this.props.heading}>
                <form id="form-list-client">
                    <div className="pull-right">
                        <NavLink exact to="/admin/interviewSession/add" className="btn btn-primary btn-sm"><i className="glyphicon glyphicon-plus"></i>Add Session</NavLink>
                    </div>

                    <ActiveInterviewSessionList interviewSessions={this.props.interviewSessions} />

                </form>
            </Panel>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        interviewSessions: state.interviewSessions
    }
}

export default connect(mapStateToProps, { fetchActiveInterviewSessions })(InterviewSessionIndex);