import React, { Component } from 'react';
import TransitiveNumber from 'react-transitive-number'
import Countdown, { zeroPad } from 'react-countdown-now';

import './timer.css'


export default class CustomTimer extends React.Component {

    constructor(props){

        console.log('proppps',props);
        super(props);
        this.state = {
            elapsed: 0,
            timer: 0
        }

       this.tick = this.tick.bind(this);
    }
  

    getInitialState(){
        return { elapsed: 0 };
    }

    componentDidMount(){
        setInterval(this.tick, 50);
    }

    componentWillUnmount(){
        //clearInterval(this.state.timer);
    }

    tick(){
        console.log(this);
        let diff = Date.now() - this.props.start;
        this.setState({elapsed: Date.now() + diff});
    }

    render() {
        var elapsed = Math.round(this.state.elapsed / 100);

        // This will give a number with one digit after the decimal dot (xx.x):
        var seconds = (elapsed / 10).toFixed(1);    

        return (<p>{seconds}</p>);
    }
}