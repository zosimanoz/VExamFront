import React from 'react'

import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';

import QuestionCount from './question-count.component'
import Question from './question.component'
import AnswerOption from './answer-options.component'
import Quiz from './quiz.component'


const QuizQuestionList = (props) => {

    const renderQuestionOptionsList = (key) => {
        return (
            <AnswerOption
                key={key.ObjectiveQuestionOptionId}
                answerContent={key.AnswerOption}
                answerType={key.QuestionId}
                questionId={key.QuestionId}
                />
        );
    }

    const handleChangeForEditor = (value) => {
     
    }

    const renderSubjectiveField = () => {
        return (
            <div className="subjectiveAnswer">
              <ReactQuill name="SubjectiveAnswer" value=''
                            onChange={this.handleChangeForEditor} />
            </div>
        )
    }

    let i = 0;

    const renderQuestionsList = (key) => {
        return(
            <div className="quiz-question-detail">
                <Question content={key.Question.Question} index={++i}/>
                
                <div className="options">
                    { key.Question.QuestionTypeId === 2 ? key.Options.map(renderQuestionOptionsList) : renderSubjectiveField() }
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-question-list">
            {props.questions.map(renderQuestionsList)}
        </div>
    )
}



export default QuizQuestionList;

