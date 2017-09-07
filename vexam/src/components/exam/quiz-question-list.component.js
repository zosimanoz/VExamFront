import React from 'react'

import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';

import QuestionCount from './question-count.component'
import Question from './question.component'
import AnswerOption from './answer-options.component'
import Quiz from './quiz.component'


class QuizQuestionList extends React.Component {

    constructor(props) {
        super(props);
        this.renderQuestionsList = this.renderQuestionsList.bind(this);
        this.renderQuestionOptionsList = this.renderQuestionOptionsList.bind(this);
        this.handleChangeForEditor = this.handleChangeForEditor.bind(this);
    }


    renderQuestionOptionsList = (option) => {
        return (
            <AnswerOption
                key={option.ObjectiveQuestionOptionId}
                optionId = {option.ObjectiveQuestionOptionId}
                answerContent={option.AnswerOption}
                answerType={option.QuestionId}
                questionId={option.QuestionId}
                attachment={option.Attachment}
            />
        );
    }

    handleChangeForEditor = (value) => {

    }

    renderSubjectiveField = () => {
        return (
            <div className="subjectiveAnswer">
                <ReactQuill name="SubjectiveAnswer" value=''
                    onChange={this.handleChangeForEditor} />
            </div>
        )
    }


    renderQuestionsList = (key) => {
        let i = 0;
        return (
            <div className="quiz-question-detail">
                <Question content={key.Question.Question} index={++i} />

                <div className="options">
                    {key.Question.QuestionTypeId === 2 ? key.Options.map(this.renderQuestionOptionsList) : this.renderSubjectiveField()}
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



export default QuizQuestionList;

