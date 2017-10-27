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
            questions: null
        }
    }



    componentWillReceiveProps = (new_props) => {
        this.setState({
            questions: new_props.quizQuestions
        });
    }

    componentDidMount() {
        this.props.getExamQuestions();
    }

    render() {
        window.onbeforeunload = function (e) {
            return window.confirm('Your progress will be cleared on reload. Are you sure you want to leave the page?');
        }
        return (
            <div>
                <div className="navbar navbar-default navbar-fixed-top clearfix">
                    <div className="col-md-4">
                        <div id="countdown" className="pull-left countdownHolder">
                            <span className="Timeleft">Time Left: </span>
                            <span className="timer-div">
                                <CountDownTimer logout={this.props.logout} submitFinalAnswers={this.props.submitFinalAnswers} questionsList={this.props.quizQuestions} />
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
                        <ExamMainPage questionsList={this.state.questions} />
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