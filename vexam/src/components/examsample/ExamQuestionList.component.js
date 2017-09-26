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
            questionsList : null
        }
        this.renderQuestionsList = this.renderQuestionsList.bind(this);
        this.renderQuestionOptionsList = this.renderQuestionOptionsList.bind(this);
        //  this.componentDidMount = this.componentDidMount.bind(this);
    }


    componentWillReceiveProps = (new_props) => {
        console.log('props new got', new_props)
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

        var arr = this.props.questionsList.filter((key)=>{
            return key.Question.QuestionId == questionId
        })

        arr[0].Options.map((key,value)=>{
            if(key.ObjectiveQuestionOptionId == optionId){
                key.IsAnswer = key.IsAnswer ? false : true;
            }
        })

        // var newItem = {
        //     questionId: e.target.getAttribute('data-questionId'),
        //     optionId: e.target.value,
        //     // IntervieweeId: this.props.user.IntervieweeId,
        //     // AnswerBy: this.props.user.IntervieweeId,
        //     subjectiveAnswer: ''
        // };

        this.setState({
            questionsList: this.props.questionsList
        }, () => {
            this.props.setAnswersToStore(this.state);
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

        /*if (index > -1) {
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
        }*/

    }

    checkIfObjectIsEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

   

    renderSubjectiveField = (question) => {
      
        console.log('page question',question)

        // let subjective_array = this.props.subjectiveAnswers;

        // let check_for_sub_answers = this.checkIfObjectIsEmpty(subjective_array);

        // let arr = [];

        // for (var key in subjective_array) {
        //     arr.push(subjective_array[key]);
        // }


       // var index = arr.findIndex(o => o.questionId == question.QuestionId);



            return (
                <div className="subjectiveAnswer" id={question.QuestionId}>
                    <CKEditor activeClass={question.QuestionId} content='' onChange={this.props.onAddSubjectiveAnswer.bind(this, question.QuestionId)} />
                </div>
            )
        
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
        return (
            <div className="quiz-question-detail" key={key.Question.SetQuestionId}>
                <Question content={key.Question.Question} key={key.Question.SetQuestionId} />

                <div className="options">
                    {key.Question.QuestionTypeId === 2 ? key.Options.map(this.renderQuestionOptionsList) : this.renderSubjectiveField(key)}
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


export default connect(mapStateToProps, { setAnswersToStore, setSubjectiveAnswerToStore })(ExamQuestionList);

