import React, { Component } from 'react';
import { connect } from 'react-redux'
import TransitiveNumber from 'react-transitive-number'
import Countdown, { zeroPad } from 'react-countdown-now';

import './timer.css'


class CountDownTimer extends Component {

    constructor(props) {
        super(props);
        this.state = {
           elapsed: 0
        }
    }

    render() {
        var examDuration = this.props.examDuration *60 *1000
        // Random component 
        const Completionist = () => <span>Time Up!</span>;

        // Renderer callback with condition 
        const renderer = ({ hours, minutes, seconds, completed }) => {
            if (completed) {
                // Render a completed state

                this.props.submitFinalAnswers(this.props.questionsList);
                this.props.logout(); 
                // return <Completionist />;
            } else {
                // Render a countdown 
                return <span><TransitiveNumber>{zeroPad(hours, 2)}</TransitiveNumber>:<TransitiveNumber>{zeroPad(minutes, 2)}</TransitiveNumber>:<TransitiveNumber>{zeroPad(seconds, 2)}</TransitiveNumber></span>;
            }

        };
        return (
            /*<div className="navbar navbar-default navbar-fixed-top clearfix">
                <div className="col-md-4">
                    <div id="countdown" className="pull-left countdownHolder">
                        <span className="Timeleft">Time Left: </span>
                        <span className="timer-div">*/
                            <Countdown date={Date.now() + examDuration} renderer={renderer} />
                        /*</span>
                    </div>
                </div>

                <div className="col-md-5 pull-right">
                    <div className="pull-right">
                        <a className="btn btn-success btnSubmitScore" onClick={this.submitAnswers}>Submit</a>
                        <a className="btn btn-danger btnLogout" href="#">Logout</a>
                    </div>
                </div>
            </div>*/

        );
    }
}

export default CountDownTimer;




