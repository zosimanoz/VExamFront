import React, { Component } from 'react';
import { connect } from 'react-redux'


class ExamControls extends Component {

    constructor(props) {
        super(props);

        this.submitAnswers = this.submitAnswers.bind(this);
    }

    formatAnswersByQuestionId() {
        var arr = this.props.answers;

        var group_by_questionId = arr.reduce(function(obj,item){
            if(obj.subjectiveAnswer == null){
                obj[item.questionId] = obj[item.questionId] || [];
                obj[item.questionId].push(item.optionId);
                return obj;
            }else{
                return obj;
            }
        }, {});


        var answers = Object.keys(group_by_questionId).map(function(key){
            return {questionId: key, ObjectiveAnswers: group_by_questionId[key]};
        });

        console.log('groups',answers);
    }

    submitAnswers() {
        console.log('submitting ans', this.props.answers)
        this.formatAnswersByQuestionId();
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
        answers: state.answerReducer.answers
    }
}

export default connect(mapStateToProps, {})(ExamControls);




