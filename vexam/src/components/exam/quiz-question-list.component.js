import React from 'react'

import { connect } from 'react-redux'

import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';

import QuestionCount from './question-count.component'
import Question from './question.component'
import AnswerOption from './answer-options.component'
import Quiz from './quiz.component'


import { setAnswersToStore } from '../../actions/answers.action'


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

    handleChangeForEditor = (questionId,value) => {
        console.log(value)
        console.log(questionId)

       // this.setState({ text: value })
        
        var newItem = {
            questionId: questionId,
            optionId: null,
            IntervieweeId: this.props.user.IntervieweeId,
            AnswerBy: this.props.user.IntervieweeId,
            subjectiveAnswer: value
        };

        console.log(newItem)

        // this.setState({
        //     text: newItem
        // },()=> {
        //     console.log(this.state.text)
        //     //this.props.setAnswersToStore(this.state.answers);
        // });
    }

    renderSubjectiveField = (question) => {
        return (
            <div className="subjectiveAnswer">
                <ReactQuill name="SubjectiveAnswer" value=''
                    onChangeSelection={this.handleChangeForEditor.bind(this,question.QuestionId)} />
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


export default connect(mapStateToProps, { setAnswersToStore })(QuizQuestionList);

