import React from 'react'

import { connect } from 'react-redux'

import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';

import QuestionCount from './question-count.component'
import Question from './question.component'
import AnswerOption from './answer-options.component'
import Quiz from './quiz.component'


import { setAnswersToStore } from '../../actions/answers.action'
import { setSubjectiveAnswerToStore } from '../../actions/answers.action'


class QuizQuestionList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            subjectiveAnswers: [],
            text: ''
        }
        this.renderQuestionsList = this.renderQuestionsList.bind(this);
        this.renderQuestionOptionsList = this.renderQuestionOptionsList.bind(this);
        
    }


    checkAnswer = (e) => {
        var array = this.state.answers;
        var index = array.findIndex(o => o.optionId == e.target.value);
        
        if( index > -1) {
            array.splice(index,1);
       
            this.setState({
                answers: array
            },()=> {
                this.props.setAnswersToStore(this.state.answers);
            })
        }else {
            this.saveAnswer(e);
        }
    }

    saveAnswer = (e) => {
        
        var newItem = {
            questionId: e.target.getAttribute('data-questionId'),
            optionId: e.target.value,
            IntervieweeId: this.props.user.IntervieweeId,
            AnswerBy: this.props.user.IntervieweeId,
            subjectiveAnswer: ''
        };

        this.setState({
            answers: this.state.answers.concat(newItem)
        },()=> {
            this.props.setAnswersToStore(this.state.answers);
        });
    }


    renderQuestionOptionsList = (option) => {
     
        return (
            <AnswerOption
                key={option.ObjectiveQuestionOptionId}
                optionId={option.ObjectiveQuestionOptionId}
                answerContent={option.AnswerOption}
                answerType={option.QuestionId}
                questionId={option.QuestionId}
                attachment={option.Attachment}
                checkAnswer={this.checkAnswer}
            />
        );
    }

    // onUpdateComments (id, e) {

    //     /*
    //         you can modify your state only using setState. But be carefull when trying to grab actual state and modify it's reference.
    //         So, the best way is to create a new object (immutable pattern), and one way of doing that is to use Object.assign
    //     */
    //     var comments = Object.assign({}, this.state.comments);

    //     console.log(e)
    //     /* set, for instance, comment[1] to "some text" */
    //     //comments[id] = e.target.value;

    //     /* set the state to the new variable */
    //    // this.setState({comments: comments});


    // }

    renderSubjectiveField = (question) => {
        //console.log('rerender question hello', this.props.comments)
         /* grab the comment for this ID. If undefined, set to empty */
        //var comment = this.props.comments ? (this.props.comments[question.QuestionId] || "") : "";
       
        return (
            <div className="subjectiveAnswer">
                <ReactQuill name="SubjectiveAnswer" 
                    onChange = {this.props.onUpdateComments.bind(this,question.QuestionId)} />
            </div>
        )
    }


    renderQuestionsList = (key) => {
        let i = 0;
        return (
            <div className="quiz-question-detail">
                <Question content={key.Question.Question} index={++i} />

                <div className="options">
                    {key.Question.QuestionTypeId === 2 ? key.Options.map(this.renderQuestionOptionsList) : this.renderSubjectiveField(key.Question)}
                </div>
            </div>
        );
    }

    render() {
     
        return (
            <div className="quiz-question-list">
                {this.props.questions.map(this.renderQuestionsList)}
            </div>
        )
    }

}


const mapStateToProps = (state, props) => {
    return {
        user: state.authReducer.user
    }
}


export default connect(mapStateToProps, { setAnswersToStore, setSubjectiveAnswerToStore })(QuizQuestionList);

