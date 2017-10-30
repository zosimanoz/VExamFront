import React from 'react'
import update from 'react-addons-update'

import { connect } from 'react-redux'

import { getExamQuestions } from '../../actions/examQuiz.action'

import { submitFinalAnswers } from '../../actions/examQuiz.action';
import { logout } from '../../actions/auth.action';

import CountDownTimer from '../timer/timer.component'
import ExamMainPage from './ExamMainPage.component'
import ExamControlComponent from './ExamControlComponent.component'

import '../exam/exam.css'


class ExamWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: null,
            ExamDuration:90,
            jobTitle:''
        }
        
    }
    

    componentWillReceiveProps = (new_props) => {
        console.log('examwrapper prop revieved ->' ,new_props)
        this.setState({
            questions: new_props.quizQuestions,
            ExamDuration: new_props.quizQuestions.questions[0].ExamSet.ExamDuration,
            jobTitle:new_props.quizQuestions.questions[0].ExamSet.JobTitle 
        });
    }


    componentDidMount() {
        this.props.getExamQuestions();
         
    }

    render() {
        window.onbeforeunload = function (e) {
            return window.confirm('Your progress will be cleared on reload. Are you sure you want to leave the page?');
        }
     console.log('jobTitle -->',this.state.jobTitle);
        return (
            <div>
                <div className="navbar navbar-default navbar-fixed-top clearfix">
                    <div className="col-md-4">
                        <div id="countdown" className="pull-left countdownHolder">
                            <span className="Timeleft">Time Left: </span>
                            <span className="timer-div">
                                <CountDownTimer logout={this.props.logout} submitFinalAnswers={this.props.submitFinalAnswers} questionsList={this.props.quizQuestions} examDuration={this.state.ExamDuration} />
                            </span>
                        </div>
                    </div>

                    <div className="col-md-5 pull-right">
                        <div className="pull-right">
                            <ExamControlComponent />
                        </div>
                    </div>
                </div>

                <div className="container quiz-container">
                    <div className="row clearfix">
                        <ExamMainPage questionsList={this.state.questions} jobTitle={this.state.jobTitle} />
                    </div>
                </div>
            </div>
        )
    }


    componentWillUnmount = () => {
        window.onbeforeunload = function (e) {
            // unbind the reload event on index page
        }
    }
}


const mapStateToProps = (state, props) => {
    return {
        quizQuestions: state.quizReducer.questions,
        user: state.authReducer.user
    }
}


export default connect(mapStateToProps, { getExamQuestions, logout, submitFinalAnswers })(ExamWrapper);