import React from 'react'
import update from 'react-addons-update'

import { connect } from 'react-redux'

import { getExamQuestions } from '../../actions/examQuiz.action'

import CountDownTimer from '../timer/timer.component'
import ExamMainPage from './ExamMainPage.component'
import ExamControlComponent from './ExamControlComponent.component'

import '../exam/exam.css'

class ExamWrapper extends React.Component {

    constructor(props){
        console.log('cur props',props)
        super(props);
        this.state = {
            questions : null
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
        console.log('wrapper questions',this.state.questions)
        return (
            <div>
                <div className="navbar navbar-default navbar-fixed-top clearfix">
                    <div className="col-md-4">
                        <div id="countdown" className="pull-left countdownHolder">
                            <span className="Timeleft">Time Left: </span>
                            <span className="timer-div">
                                <CountDownTimer />
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
}


const mapStateToProps = (state, props) => {
    return {
        quizQuestions: state.quizReducer.questions,
        user: state.authReducer.user
    }
}


export default connect(mapStateToProps,{ getExamQuestions })(ExamWrapper);