import React, { Component } from 'react';

import Countdown, { zeroPad } from 'react-countdown-now';

import './timer.css'


export default class CountDownTimer extends Component {
  render() {
  
    // Random component 
    const Completionist = () => <span>Time Up! Thank you for appearing the verscend exams.</span>;

    // Renderer callback with condition 
    const renderer = ({ hours, minutes, seconds, completed }) => {
    
        if (completed) {
            // Render a completed state 
            return <Completionist />;
        } else {
            // Render a countdown 
            return <span>{zeroPad(hours,2)}:{zeroPad(minutes,2)}:{zeroPad(seconds,2)}</span>;
        }
    
    };

    return (
        <div className="timer-div">
            <Countdown date={Date.now() + 10000} renderer={renderer}/>
        </div>
    );
  }
}


