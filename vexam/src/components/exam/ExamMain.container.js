import React from 'react'
import update from 'react-addons-update'

import { connect } from 'react-redux'
import CountDownTimer from '../timer/timer.component'
import ExamPage from './ExamPage.container'
import ExamControls from './ExamControls.component'

import './exam.css'

class ExamMain extends React.Component {

    render() {
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
                            <ExamControls />
                        </div>
                    </div>
                </div>

                <div className="container quiz-container">
                    <div className="row clearfix">
                        <ExamPage />
                    </div>
                </div>
            </div>
        )
    }
}




export default ExamMain;