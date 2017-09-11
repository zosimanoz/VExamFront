import React, { Component } from 'react';
import TransitiveNumber from 'react-transitive-number'
import Countdown, { zeroPad } from 'react-countdown-now';

import './timer.css'


export default class CountDownTimer extends Component {

    constructor(props) {
        super(props);
        this.state = {
           elapsed: 0
        }
    }

    render() {

        // Random component 
        const Completionist = () => <span>Time Up!</span>;

        // Renderer callback with condition 
        const renderer = ({ hours, minutes, seconds, completed }) => {
            if (completed) {
                // Render a completed state 
                return <Completionist />;
            } else {
                // Render a countdown 
                return <span><TransitiveNumber>{zeroPad(hours, 2)}</TransitiveNumber>:<TransitiveNumber>{zeroPad(minutes, 2)}</TransitiveNumber>:<TransitiveNumber>{zeroPad(seconds, 2)}</TransitiveNumber></span>;
            }

        };
        return (
            <div className="navbar navbar-default navbar-fixed-top clearfix">
                <div className="col-md-4">
                    <div id="countdown" className="pull-left countdownHolder">
                        <span className="Timeleft">Time Left: </span>
                        <span className="timer-div">
                            <Countdown date={Date.now() + 7200000} renderer={renderer} />
                        </span>
                    </div>
                </div>

                <div className="col-md-5 pull-right">
                    <div className="pull-right">
                        <a className="btn btn-success btnSubmitScore" href="#">Submit</a>
                        {/*<a className="btn btn-danger btnCancelExam" href="#">Cancel</a>*/}
                        <a className="btn btn-danger btnLogout" href="#">Logout</a>
                    </div>
                </div>
            </div>

        );
    }
}




