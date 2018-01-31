import React from 'react'

import { connect } from 'react-redux'

import CKEditor from "react-ckeditor-component";
import RichTextEditor from 'react-rte';


import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';


import './exam.css'

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

    saveObjectiveAnswer = (e) => {

        // get the current question from question id
        var questionId = e.target.getAttribute('data-questionId');

        // get the current option
        var optionId = e.target.value;

        var arr = this.props.questionsList.filter((key) => {
            return key.Question.QuestionId == questionId
        });

        arr[0].Options.map((key, value) => {
            if (key.ObjectiveQuestionOptionId == optionId) {
                key.AnswerByInterviewees = key.AnswerByInterviewees ? false: true;
            }
        });

        let objectForAnswer = {
            IntervieweeId: this.props.user.IntervieweeId,
            SetQuestionId: arr[0].Question.SetQuestionId,
            subjectiveAnswer: '',
            ObjectiveAnswer: '',
            AnsweredBy: this.props.user.IntervieweeId
        }

        arr[0].Answers = objectForAnswer;
        
        this.setState({
            questionsList: this.props.questionsList
        }, () => {
            this.props.setAnswersToStore(this.state);
        });
    }



    onAddSubjectiveAnswer(question, answer) {

        let arr = this.props.questionsList.filter((key) => {
            return key.Question.QuestionId == question.Question.QuestionId
        });

        let objectForAnswer = {
            IntervieweeId: this.props.user.IntervieweeId,
            SetQuestionId: question.Question.SetQuestionId,
            subjectiveAnswer: answer,
            ObjectiveAnswer: '',
            AnsweredBy: this.props.user.IntervieweeId
        }

        arr[0].Answers = objectForAnswer;
        
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
                saveObjectiveAnswer={this.saveObjectiveAnswer}
                isChecked={option.AnswerByInterviewees}
            />
        )

    }

    checkIfObjectIsEmpty(obj) {
        return Object.keys(obj).length === 0;
    }



    renderSubjectiveField = (question) => {
        return (
            <div className="subjectiveAnswer" id={question.QuestionId}>
                 <ReactQuill value={question.Answers == null ? '': question.Answers.subjectiveAnswer} onChange={this.onAddSubjectiveAnswer.bind(this, question)} />
                {/*<CKEditor activeClass={question.QuestionId} content={question.Answers == null ? '': question.Answers.subjectiveAnswer} onChange={this.onAddSubjectiveAnswer.bind(this, question)} />*/}
            </div>
        )
    }


    renderQuestionsList = (key) => {
        let i = 0;
        return (
            <div className="quiz-question-detail" key={key.Question.SetQuestionId}>
                <Question index={this.state.index} content={key.Question.Question} key={key.Question.SetQuestionId} sn={key.Question.SN} attachment={key.Question.Attachment}/>

                <div className="options clear">
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
        examset: state.quizReducer.questions
    }
}


export default connect(mapStateToProps, { setAnswersToStore, setSubjectiveAnswerToStore })(ExamQuestionList);

