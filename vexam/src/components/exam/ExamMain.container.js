import React from 'react'
import update from 'react-addons-update'

import { connect } from 'react-redux'
import CountDownTimer from '../timer/timer.component'
import ExamPage from './ExamPage.container'

import './exam.css'

class ExamMain extends React.Component {

    render() {
        return (
            <div>
                <CountDownTimer />

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

