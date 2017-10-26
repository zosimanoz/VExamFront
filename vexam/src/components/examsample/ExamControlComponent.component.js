import React, { Component } from 'react';
import { connect } from 'react-redux';


import { Redirect } from 'react-router';

import { submitFinalAnswers } from '../../actions/examQuiz.action';
import { logout } from '../../actions/auth.action';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css



class ExamControlComponent extends Component {

    constructor(props) {
        super(props);

        this.submitAnswers = this.submitAnswers.bind(this);
        this.logout = this.logout.bind(this);
    }

    formatAnswersByQuestionId() {
        var arr = this.props.objectiveAnswers;

        // group question by key like questionId 
        // we are using map and reduce function 
        // to group the options into single array based
        // on the questionId
        var group_by_questionId = arr.reduce(function (obj, item) {
            if (obj.subjectiveAnswer == null) {
                obj[item.questionId] = obj[item.questionId] || [];
                obj[item.questionId].push(item.optionId);
                return obj;
            } else {
                return obj;
            }
        }, {});

        // change the scope to that, to use props inside the map function
        let that = this;

        // create new object that has grouped arrays
        // in our case, we have multiple options that are 
        // stored in the array and these are grouped by keys
        var answers = Object.keys(group_by_questionId).map(function (key) {
            return {
                questionId: key,
                ObjectiveAnswers: group_by_questionId[key],
                IntervieweeId: that.props.user.IntervieweeId,
                AnswerBy: that.props.user.IntervieweeId,
                subjectiveAnswer: ''
            };
        });

        // created new arrya, that will store the overall previous array
        // that had the options stored in an array
        // here we will change them to CSV for sending to the API

        let newArrayWithSplittedElements = [];

        answers.forEach(function (element) {
            let optionsList = element.ObjectiveAnswers.join();
            var optionObj = {
                questionId: element.questionId,
                optionId: optionsList,
                IntervieweeId: element.IntervieweeId,
                AnswerBy: element.AnswerBy,
                subjectiveAnswer: ''
            }

            newArrayWithSplittedElements.push(optionObj);
        }, this);

        return newArrayWithSplittedElements;
    }


    formatFinalAnswers() {
        var optionsArr = this.formatAnswersByQuestionId();
        var subjectiveArr = this.props.subjectiveAnswers;

        for (var key in subjectiveArr) {
            optionsArr.push(subjectiveArr[key])
        }
    }



    submitAnswers() {
        // get the question list and pass it to the api
        this.props.submitFinalAnswers(this.props.questionsList);
    }


    logout() {
        confirmAlert({
            message: 'Are you sure logout?',
            confirmLabel: 'Yes',
            cancelLabel: 'No',
            onConfirm: () => this.props.logout()
        })

    }

    render() {
        if (this.props.auth.authenticated) {
            return (
                <div>
                    <a title="Submit" className="btn btn-success btnSubmitScore" onClick={() => confirmAlert({
                        message: 'Are you sure to submit answersheet?',              
                        confirmLabel: 'Yes',                           
                        cancelLabel: 'No',                             
                        onConfirm: () => this.submitAnswers  
                    })}> Submit</a>

                    
                    <button type="submit" className="btn btn-danger btnLogout" onClick={this.logout.bind(this)}>Logout</button>
                </div>
            );
        } else {
            return (
                <Redirect to="/" />
            )
        }


    }
}



const mapStateToProps = (state, props) => {
    return {
        questionsList: state.quizReducer.questions,
        user: state.authReducer.user,
        auth: state.authReducer
    }
}

export default connect(mapStateToProps, { submitFinalAnswers, logout })(ExamControlComponent);




