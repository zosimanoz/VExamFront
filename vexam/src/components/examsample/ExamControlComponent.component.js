import React, { Component } from 'react';
import { connect } from 'react-redux'

import { submitFinalAnswers } from '../../actions/examQuiz.action'


class ExamControlComponent extends Component {

    constructor(props) {
        super(props);

        this.submitAnswers = this.submitAnswers.bind(this);
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

        console.log(optionsArr)
    }



    submitAnswers() {
        // get the question list and pass it to the api
        this.props.submitFinalAnswers(this.props.questionsList);
    }

    render() {
        return (

            <div>
                <a className="btn btn-success btnSubmitScore" onClick={this.submitAnswers}>Submit</a>
                <a className="btn btn-danger btnLogout" href="#">Logout</a>
            </div>

        );
    }
}



const mapStateToProps = (state, props) => {
    return {
        questionsList: state.quizReducer.questions,
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, { submitFinalAnswers })(ExamControlComponent);




