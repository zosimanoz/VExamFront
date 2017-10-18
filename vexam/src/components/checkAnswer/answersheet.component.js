import React from 'react'

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel,Tabs,Tab } from 'react-bootstrap';
import { NavLink} from 'react-router-dom';

import { connect } from 'react-redux';


import { fetchExamAttendedIntervieweesBySessionId } from '../../actions/interviewee.action';


class AnswerSheetContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    AllQuestionsTab() {
        return (
           <div>
               List of all questions here.
           </div>
        )
    }

    QuestionTabs() {
        return (
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="All Questions">{this. AllQuestionsTab()}</Tab>
                <Tab eventKey={2} title="Subjective Questions">Tab 2 content</Tab>
                <Tab eventKey={3} title="Objective Questions">Tab 3 content</Tab>
            </Tabs>
        )
    }

    render() {

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <NavLink to={`/admin/checkanswers`} ><span>&larr; Back &nbsp;</span></NavLink>
                    <span> {this.props.heading}</span>
                </div>
                <div className="panel-body">
                    {this.QuestionTabs()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    console.log('sdfsdfsdfsdfsd sdf sdf', state.intervieweeReducer.intervieweeList);
    if (props.match.params.id) {
        return {
            intervieweeList: state.intervieweeReducer.intervieweeList

        }
    }
    return {
        intervieweeList: null
    }
}


export default connect(mapStateToProps, { fetchExamAttendedIntervieweesBySessionId })(AnswerSheetContainer);