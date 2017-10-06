import React from 'react'

import { connect } from 'react-redux'

import CKEditor from "react-ckeditor-component";
import RichTextEditor from 'react-rte';


import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';

import { setAnswersToStore } from '../../actions/answers.action'
import { setSubjectiveAnswerToStore } from '../../actions/answers.action'


import Question from './Question.component'
import AnswerOption from './AnswerOption.component'




class ExamQuestionList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            subjectiveAnswers: [],
            text: '',
            questionsList: null,
            index: 0
        }
        this.renderQuestionsList = this.renderQuestionsList.bind(this);
        this.renderQuestionOptionsList = this.renderQuestionOptionsList.bind(this);
    }


    componentWillReceiveProps = (new_props) => {
        this.setState({
            questions: new_props.questions,
            questionsList: new_props.questionsList
        });
    }

    checkAnswer = (e) => {

        // console.log('chekcans', this.state);

        // var array = this.state.answers;

        // var index = array.findIndex(o => o.optionId == e.target.value);

        // console.log(index);

        // if (index > -1) {
        //     array.splice(index, 1);

        //     this.setState({
        //         ...this.state,
        //         answers: array
        //     }, () => {
        //         this.props.setAnswersToStore(this.state);
        //     })
        // } else {
        this.saveAnswer(e);
        // }
    }

    saveAnswer = (e) => {

        // get the current question from question id
        var questionId = e.target.getAttribute('data-questionId');

        // get the current option
        var optionId = e.target.value;

        var arr = this.props.questionsList.filter((key) => {
            return key.Question.QuestionId == questionId
        })

        arr[0].Options.map((key, value) => {
            if (key.ObjectiveQuestionOptionId == optionId) {
                key.IsAnswer = key.IsAnswer ? false : true;
            }
        })

        this.setState({
            questionsList: this.props.questionsList
        }, () => {
            this.props.setAnswersToStore(this.state);
        });
    }



    onAddSubjectiveAnswer(question, answer) {

        var arr = this.props.questionsList.filter((key) => {
            return key.Question.QuestionId == question.Question.QuestionId
        })

        arr[0].Answers = answer;

        /* set the state to the new variable */
        this.setState({
            questionsList: this.props.questionsList
        }, () => {
            this.props.setSubjectiveAnswerToStore(this.state);
        });
    }


    renderQuestionOptionsList = (option) => {
        // var array = this.props.objectiveAnswers;
        // var index = array.findIndex(o => o.optionId == option.ObjectiveQuestionOptionId);

        return (
            <AnswerOption
                key={option.ObjectiveQuestionOptionId}
                optionId={option.ObjectiveQuestionOptionId}
                answerContent={option.AnswerOption}
                answerType={option.QuestionId}
                questionId={option.QuestionId}
                attachment={option.Attachment}
                checkAnswer={this.checkAnswer}
                isChecked={option.IsAnswer}
            />
        )

    }

    checkIfObjectIsEmpty(obj) {
        return Object.keys(obj).length === 0;
    }



    renderSubjectiveField = (question) => {
        return (
            <div className="subjectiveAnswer" id={question.QuestionId}>
                <CKEditor activeClass={question.QuestionId} content={question.Answers} onChange={this.onAddSubjectiveAnswer.bind(this, question)} />
            </div>
        )
    }


    renderQuestionsList = (key) => {
        let i = 0;
    
        return (
            <div className="quiz-question-detail" key={key.Question.SetQuestionId}>
                <Question index={this.state.index} content={key.Question.Question} key={key.Question.SetQuestionId} />

                <div className="options">
                    {key.Question.QuestionTypeId === 2 ? key.Options.map(this.renderQuestionOptionsList) : this.renderSubjectiveField(key)}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="quiz-question-list">
                {this.props.questions.map(this.renderQuestionsList.bind(this))}
            </div>
        )
    }

}


const mapStateToProps = (state, props) => {
    return {
        user: state.authReducer.user,
        objectiveAnswers: state.answerReducer.objectiveAnswers,
        subjectiveAnswers: state.answerReducer.subjectiveAnswers
    }
}


export default connect(mapStateToProps, { setAnswersToStore, setSubjectiveAnswerToStore })(ExamQuestionList);

