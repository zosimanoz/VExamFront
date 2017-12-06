import React from 'react'

import { Bootstrap, Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Panel, Tabs, Tab } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import AllQuestions from './allQuestions.component';
import SubjectiveQuestions from './subjectiveQuestions.component';
import ObjectiveQuestions from './objectiveQuestions.component';

import { fetchExamAttendedIntervieweesBySessionId } from '../../actions/interviewee.action';
import { fetchSubjectiveAnswersheetByIntervieweeId, fetchAllAnswersheetByIntervieweeId } from '../../actions/checkAnswer.action';

class AnswerSheetContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 1,
            listQuestions: null,
            answerType: null,
            allQuestions: null,
            lightboxIsOpen: false,
            currentImage: 0
        }

        this.handleSelect = this.handleSelect.bind(this);
        //   this.closeLightbox = this.closeLightbox.bind(this);
        // this.openLightbox = this.openLightbox.bind(this);
    }

    componentWillReceiveProps = (newProps) => {
        this.setState({
            listQuestions : newProps.questionList
        });
    }

    componentDidMount = (props) => {
        if (this.props.match.params.id) {
            this.props.fetchAllAnswersheetByIntervieweeId(this.props.match.params.id);
        }
    }


    //  openLightbox(index, event) {
    //     event.preventDefault();
    //     this.setState({
    //         currentImage: index,
    //         lightboxIsOpen: true
    //     });
    // }

    // test() {
    //     alert('test')
    // }

    // closeLightbox() {
  
    //     this.setState({
    //         currentImage: 0,
    //         lightboxIsOpen: false
    //     });
    // }

    handleSelect(key) {
        this.setState({ key: key });
        this.setState({ key: key }, () => {
            if (this.state.key == 1) {
                this.setState({
                    listQuestions: this.props.questionList
                });
            } else if (this.state.key == 2) {
                let arr = this.props.questionList.filter((item) => {
                    if (item.Question.QuestionTypeId == 1) {
                        return item;
                    }
                });
                this.setState({
                    listQuestions: arr
                });
            } else {
                let arr = this.props.questionList.filter((item) => {
                    if (item.Question.QuestionTypeId == 2) {
                        return item;
                    }
                });
                this.setState({
                    listQuestions: arr
                });
            }
        });
    }

    TabAllQuestions() {
        return (
            <div>
                <AllQuestions {...this.props} {...this.state} />
            </div>
        )
    }

    TabSubjectiveQuestions() {
        return (
            <div>
                <SubjectiveQuestions {...this.props} {...this.state} />
            </div>
        )
    }

    TabObjectiveQuestions() {
        return (
            <div>
                <ObjectiveQuestions {...this.props} {...this.state} />
            </div> 
        )
    }


    QuestionTabs() {
        return (
            <Tabs activeKey={this.state.key} onSelect={this.handleSelect} defaultActiveKey="1" id="uncontrolled-tab-example">
                <Tab eventKey={1} title="All Questions">{this.TabAllQuestions()}</Tab>
                <Tab eventKey={2} title="Subjective Questions">{this.TabSubjectiveQuestions()}</Tab>
                <Tab eventKey={3} title="Objective Questions">{this.TabObjectiveQuestions()}</Tab>
            </Tabs>
        )
    }

    render() {
        console.log('answersheet to view all props',this.state )
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
    if (props.match.params.id) {
        return {
            intervieweeList: state.intervieweeReducer.intervieweeList,
            questionList: state.answersheetReducer.answersheet
        }
    }
    return {
        intervieweeList: null
    }
}


export default connect(mapStateToProps, { fetchExamAttendedIntervieweesBySessionId, fetchSubjectiveAnswersheetByIntervieweeId, fetchAllAnswersheetByIntervieweeId })(AnswerSheetContainer);