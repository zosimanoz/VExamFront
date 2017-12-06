import React from 'react'

import { connect } from 'react-redux'

import CKEditor from "react-ckeditor-component";
import RichTextEditor from 'react-rte';


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
        //  this.componentDidMount = this.componentDidMount.bind(this);
    }


    checkAnswer = (e) => {
        var array = this.state.answers;
        var index = array.findIndex(o => o.optionId == e.target.value);

        if (index > -1) {
            array.splice(index, 1);

            this.setState({
                answers: array
            }, () => {
                this.props.setAnswersToStore(this.state.answers);
            })
        } else {
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
        }, () => {
            this.props.setAnswersToStore(this.state.answers);
        });
    }


    renderQuestionOptionsList = (option) => {
        var array = this.props.objectiveAnswers;
        var index = array.findIndex(o => o.optionId == option.ObjectiveQuestionOptionId);

        if (index > -1) {
            return (
                <AnswerOption
                    key={option.ObjectiveQuestionOptionId}
                    optionId={option.ObjectiveQuestionOptionId}
                    answerContent={option.AnswerOption}
                    answerType={option.QuestionId}
                    questionId={option.QuestionId}
                    attachment={option.Attachment}
                    checkAnswer={this.checkAnswer}
                    isChecked={true}
                />
            )
        } else {
            return (
                <AnswerOption
                    key={option.ObjectiveQuestionOptionId}
                    optionId={option.ObjectiveQuestionOptionId}
                    answerContent={option.AnswerOption}
                    answerType={option.QuestionId}
                    questionId={option.QuestionId}
                    attachment={option.Attachment}
                    checkAnswer={this.checkAnswer}
                    isChecked={false}
                />
            )
        }

    }

    checkIfObjectIsEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    // componentDidMount() {
    //     let configuration = {
    //         toolbar: "Basic"
    //     };
    //     CKEDITOR.replace("editor", configuration);
    //     CKEDITOR.instances.editor.on('change', function () {
    //         let data = CKEDITOR.instances.editor.getData();
    //         this.props.onChange(data);
    //     }.bind(this));
    // }

    renderSubjectiveField = (question) => {
        //console.log('rerender question hello', this.props.comments)
        /* grab the comment for this ID. If undefined, set to empty */
        //var comment = this.props.comments ? (this.props.comments[question.QuestionId] || "") : "";

        console.log('subjective question', question)

        let subjective_array = this.props.subjectiveAnswers;

        let check_for_sub_answers = this.checkIfObjectIsEmpty(subjective_array);

        let arr = [];

        for (var key in subjective_array) {
            arr.push(subjective_array[key]);
        }


        var index = arr.findIndex(o => o.questionId == question.QuestionId);

        console.log('index of current question', index)


        if (index > -1) {
            return (
                <div className="subjectiveAnswer" id={question.QuestionId}>
                    <textarea onChange={this.props.onAddSubjectiveAnswer.bind(this, question.QuestionId)}>{arr[index].subjectiveAnswer}</textarea>
                    {/*<CKEditor activeClass={question.QuestionId} content={arr[index].subjectiveAnswer} onChange={this.props.onAddSubjectiveAnswer.bind(this, question.QuestionId)} />*/}
                </div>
            )
        } else {

            return (
                <div className="subjectiveAnswer" id={question.QuestionId}>
                    <textarea onChange={this.props.onAddSubjectiveAnswer.bind(this, question.QuestionId)}></textarea>
                    {/*<CKEditor activeClass={question.QuestionId} content='' onChange={this.props.onAddSubjectiveAnswer.bind(this, question.QuestionId)} />*/}
                </div>
            )

        }
        //else {
        //     return (
        //         <div className="subjectiveAnswer" id={question.QuestionId}>
        //             <CKEditor activeClass={question.QuestionId} content='' onChange={this.props.onAddSubjectiveAnswer.bind(this, question.QuestionId)} />
        //         </div>
        //     )
        // }
        //for (var key in subjective_array) {

        // debugger;
        /*console.log('rerender')
        if (question.QuestionId == subjective_array[key].questionId) {
            console.log('QuestionId',question.QuestionId)
            console.log('subjective_array',subjective_array[key].questionId)
            return (
                <div className="subjectiveAnswer" id={question.QuestionId}>
                    <CKEditor activeClass={question.QuestionId} content={subjective_array[key].subjectiveAnswer} onChange={this.props.onAddSubjectiveAnswer.bind(this, question.QuestionId)} />
                </div>
            )
        }else {
            console.log('QuestionId',question.QuestionId)
            console.log('subjective_array',subjective_array[key].questionId)
            return (
                <div className="subjectiveAnswer" id={question.QuestionId}>
                    <CKEditor activeClass={question.QuestionId} content='' onChange={this.props.onAddSubjectiveAnswer.bind(this, question.QuestionId)} />
                </div>
            )
        }*/
        //}
        // }
    }


    renderQuestionsList = (key) => {
        alert();
        console.log(key.Question.SN);
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
        user: state.authReducer.user,
        objectiveAnswers: state.answerReducer.objectiveAnswers,
        subjectiveAnswers: state.answerReducer.subjectiveAnswers
    }
}


export default connect(mapStateToProps, { setAnswersToStore, setSubjectiveAnswerToStore })(QuizQuestionList);

