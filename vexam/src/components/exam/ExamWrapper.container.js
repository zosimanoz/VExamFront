import React from 'react'
import update from 'react-addons-update'

import { connect } from 'react-redux'

import { getExamQuestions } from '../../actions/examQuiz.action'

import { submitFinalAnswers } from '../../actions/examQuiz.action';
import { logout } from '../../actions/auth.action';

import CountDownTimer from '../timer/timer.component'
import ExamMainPage from './ExamMainPage.component'
import ExamControlComponent from './ExamControlComponent.component'

import './exam.css'


class ExamWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: null,
            ExamDuration:90,
            jobTitle:'Software Engineer'
        }
        
    }
    

    componentWillReceiveProps = (new_props) => {
        this.setState({
            questions: new_props.quizQuestions,
            ExamDuration:new_props.quizQuestions.length >0 ? new_props.quizQuestions[0].ExamSet.ExamDuration : 90,
            jobTitle:new_props.quizQuestions.length >0 ? new_props.quizQuestions[0].ExamSet.JobTitle : 'Software Engineer'
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
                <div className="navbar navbar-default navbar-fixed-top clearfix col-md-12">
                    <div className="pull-left">
                        <h3>Postition: {this.state.jobTitle} </h3>
                        </div>
                    <div className="pull-left div-counter">
                        (
                            <CountDownTimer logout={this.props.logout} submitFinalAnswers={this.props.submitFinalAnswers} questionsList={this.props.quizQuestions} examDuration={this.state.ExamDuration} />
                        )
                        </div>
                           <ExamControlComponent />
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